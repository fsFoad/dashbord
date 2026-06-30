import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { delay, of, switchMap, throwError, timer } from 'rxjs';
import {
  ACTIVITY, COMMENTS, EVENTS, FILES, MEMBERS, NOTIFICATIONS, PROJECTS, TASKS, TEAM, USERS,
  nextEventId, nextFileId, toPublicUser,
} from '../mock/mock-db';
import { AuthResponse } from '../models/user.model';
import { CalEvent, CommentItem, FileNode, Paged, Project, Task, TeamMember } from '../models/api.model';

/** In-memory 2FA challenges: challengeId → userId (mock only). */
const PENDING_2FA = new Map<string, number>();

/** In-memory password-reset OTP challenges: challengeId → phone (mock only). */
const PENDING_RESET = new Map<string, string>();

const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min));

/**
 * In-memory mock backend. Components talk to HttpClient exactly as they will
 * with a real server; deleting this interceptor (and pointing the same URLs
 * at a real API) is the entire migration. Endpoints:
 *
 *   GET /api/projects?page&size&q     paged project list
 *   GET /api/projects/:id             single project
 *   GET /api/activity                 recent activity feed
 *   GET /api/demo/slow?ms=N           responds after N ms (loading/timeout demos)
 *   GET /api/demo/error/:status       fails with that HTTP status
 *   GET /api/demo/network             simulates a network failure (status 0)
 */
export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  // Disabled entirely when the app targets a real backend.
  if (!environment.useMock || !req.url.startsWith('/api/')) return next(req);

  const ok = <T>(body: T, ms = rand(250, 650)) =>
    of(new HttpResponse({ status: 200, body })).pipe(delay(ms));

  const fail = (status: number, ms = rand(150, 400)) =>
    timer(ms).pipe(
      switchMap(() =>
        throwError(
          () => new HttpErrorResponse({ status, statusText: 'Mock Error', url: req.url }),
        ),
      ),
    );

  const url = new URL(req.url, 'http://mock.local');
  const path = url.pathname;

  // Resolve the signed-in user from the Authorization header (mock tokens).
  const authUser = () => {
    const header = req.headers.get('Authorization') ?? '';
    const id = Number(header.replace('Bearer mock-', ''));
    return USERS.find((u) => u.id === id) ?? null;
  };

  // --- demo endpoints ---
  if (path === '/api/demo/network') return fail(0);
  const errMatch = path.match(/^\/api\/demo\/error\/(\d+)$/);
  if (errMatch) return fail(Number(errMatch[1]));
  if (path === '/api/demo/slow') {
    const ms = Number(url.searchParams.get('ms') ?? 2_500);
    return ok({ sleptMs: ms }, ms);
  }

  // --- auth ---
  if (path === '/api/auth/login' && req.method === 'POST') {
    const { username, password } = (req.body ?? {}) as { username?: string; password?: string };
    // Match by username (email also accepted for convenience).
    const found = USERS.find(
      (u) => (u.username === username || u.email === username) && u.password === password,
    );
    if (found && found.twoFactor) {
      // Issue a 2FA challenge instead of a session. (Demo OTP is always 111111.)
      const challengeId = `chal-${found.id}-${Date.now()}`;
      PENDING_2FA.set(challengeId, found.id);
      const masked = '***' + found.username.slice(-2);
      return ok({ twoFactorRequired: true, challengeId, hint: masked }, 500);
    }
    if (!found) return fail(401, 600);
    const body: AuthResponse = { token: `mock-${found.id}`, user: toPublicUser(found) };
    return ok(body, 600);
  }

  if (path === '/api/auth/verify-2fa' && req.method === 'POST') {
    const { challengeId, code } = (req.body ?? {}) as { challengeId?: string; code?: string };
    const uid = challengeId ? PENDING_2FA.get(challengeId) : undefined;
    if (!uid) return fail(401);
    if (code !== '111111') return fail(422); // wrong OTP (demo code: all ones)
    PENDING_2FA.delete(challengeId!);
    const user = USERS.find((u) => u.id === uid)!;
    const body: AuthResponse = { token: `mock-${user.id}`, user: toPublicUser(user) };
    return ok(body, 400);
  }

  if (path === '/api/me/2fa' && req.method === 'GET') {
    const me = authUser();
    if (!me) return fail(401);
    const u = USERS.find((x) => x.id === me.id);
    return ok({ enabled: !!u?.twoFactor });
  }

  if (path === '/api/me/2fa' && req.method === 'POST') {
    const me = authUser();
    if (!me) return fail(401);
    const { enabled } = (req.body ?? {}) as { enabled?: boolean };
    const u = USERS.find((x) => x.id === me.id);
    if (u) u.twoFactor = !!enabled;
    return ok({ enabled: !!enabled }, 400);
  }

  if (path === '/api/auth/register' && req.method === 'POST') {
    const { name, email, password } = (req.body ?? {}) as {
      name?: string; email?: string; password?: string;
    };
    if (!name || !email || !password) return fail(400);
    if (USERS.some((u) => u.email === email)) return fail(409, 600);
    const user = { id: USERS.length + 1, name, username: email, email, password, roles: ['user'] };
    USERS.push(user);
    const body: AuthResponse = { token: `mock-${user.id}`, user: toPublicUser(user) };
    return ok(body, 700);
  }

  // Password recovery by mobile number: issue an OTP challenge.
  // (Demo OTP is always 111111. We never reveal whether the phone exists.)
  if (path === '/api/auth/forgot' && req.method === 'POST') {
    const { phone } = (req.body ?? {}) as { phone?: string };
    const challengeId = `reset-${Date.now()}`;
    PENDING_RESET.set(challengeId, phone ?? '');
    const masked = phone ? phone.slice(0, 4) + '****' + phone.slice(-2) : '***';
    return ok({ sent: true, challengeId, hint: masked }, 700);
  }

  // Verify the recovery OTP.
  if (path === '/api/auth/verify-otp' && req.method === 'POST') {
    const { challengeId, code } = (req.body ?? {}) as { challengeId?: string; code?: string };
    if (!challengeId || !PENDING_RESET.has(challengeId)) return fail(401);
    if (code !== '111111') return fail(422); // wrong OTP (demo code: all ones)
    PENDING_RESET.delete(challengeId);
    return ok({ ok: true }, 400);
  }

  if (path === '/api/me' && req.method === 'PUT') {
    const me = authUser();
    if (!me) return fail(401);
    const { name } = (req.body ?? {}) as { name?: string };
    if (!name?.trim()) return fail(400);
    me.name = name.trim();
    return ok(toPublicUser(me));
  }

  if (path === '/api/me/password' && req.method === 'POST') {
    const me = authUser();
    if (!me) return fail(401);
    const { current, next } = (req.body ?? {}) as { current?: string; next?: string };
    if (me.password !== current) return fail(400, 500);
    if (!next || next.length < 6) return fail(422);
    me.password = next;
    return ok({ ok: true });
  }

  // --- projects ---
  if (path === '/api/projects' && req.method === 'GET') {
    const page = Number(url.searchParams.get('page') ?? 1);
    const size = Number(url.searchParams.get('size') ?? 10);
    const q = (url.searchParams.get('q') ?? '').trim();
    const statuses = (url.searchParams.get('status') ?? '').split(',').filter(Boolean);
    const sortField = url.searchParams.get('sortField') ?? '';
    const sortOrder = Number(url.searchParams.get('sortOrder') ?? 1);

    let filtered = PROJECTS.filter(
      (p) =>
        (!q || p.name.includes(q) || p.owner.includes(q)) &&
        (!statuses.length || statuses.includes(p.status)),
    );

    if (sortField) {
      const key = sortField as keyof Project;
      filtered = [...filtered].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        const cmp =
          typeof av === 'number' && typeof bv === 'number'
            ? av - bv
            : String(av).localeCompare(String(bv), 'fa');
        return cmp * (sortOrder < 0 ? -1 : 1);
      });
    }

    const start = (page - 1) * size;
    const body: Paged<Project> = {
      items: filtered.slice(start, start + size),
      total: filtered.length,
      page,
      size,
    };
    return ok(body);
  }

  if (path === '/api/projects' && req.method === 'POST') {
    const b = (req.body ?? {}) as Partial<Project> & { name?: string };
    if (!b.name?.trim()) return fail(400);
    const project: Project = {
      id: Math.max(0, ...PROJECTS.map((p) => p.id)) + 1,
      name: b.name.trim(),
      status: b.status ?? 'active',
      progress: 0,
      owner: b.owner ?? MEMBERS[0].name,
      startDate: b.startDate ?? new Date().toISOString(),
      dueDate: b.dueDate ?? new Date(Date.now() + 14 * 864e5).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    PROJECTS.unshift(project);
    return ok(project, 700);
  }

  const updMatch = path.match(/^\/api\/projects\/(\d+)$/);
  if (updMatch && req.method === 'GET') {
    const found = PROJECTS.find((x) => x.id === Number(updMatch[1]));
    return found ? ok(found) : fail(404);
  }

  if (updMatch && req.method === 'PUT') {
    const p = PROJECTS.find((x) => x.id === Number(updMatch[1]));
    if (!p) return fail(404);
    const b = (req.body ?? {}) as Partial<Project>;
    if (b.name !== undefined) p.name = String(b.name).trim() || p.name;
    if (b.status !== undefined) p.status = b.status;
    if (b.progress !== undefined) p.progress = Math.min(100, Math.max(0, Number(b.progress)));
    if (b.dueDate !== undefined) p.dueDate = b.dueDate;
    if (b.startDate !== undefined) p.startDate = b.startDate;
    p.updatedAt = new Date().toISOString();
    return ok(p);
  }

  if (updMatch && req.method === 'DELETE') {
    const i = PROJECTS.findIndex((x) => x.id === Number(updMatch[1]));
    if (i < 0) return fail(404);
    PROJECTS.splice(i, 1);
    return ok({ ok: true });
  }

  if (path === '/api/projects/bulk-delete' && req.method === 'POST') {
    const { ids } = (req.body ?? {}) as { ids?: number[] };
    if (!ids?.length) return fail(400);
    for (const id of ids) {
      const i = PROJECTS.findIndex((x) => x.id === id);
      if (i >= 0) PROJECTS.splice(i, 1);
    }
    return ok({ ok: true, removed: ids.length }, 700);
  }

  if (path === '/api/members' && req.method === 'GET') {
    return ok(MEMBERS, 300);
  }

  if (path === '/api/upload' && req.method === 'POST') {
    return ok({ id: Date.now(), ok: true }, rand(600, 1400));
  }

  // --- tasks ---
  const projTasksMatch = path.match(/^\/api\/projects\/(\d+)\/tasks$/);
  if (projTasksMatch && req.method === 'GET') {
    const pid = Number(projTasksMatch[1]);
    return ok(TASKS.filter((t) => t.projectId === pid).map((t) => ({ ...t, subtasks: [...t.subtasks] })));
  }

  if (projTasksMatch && req.method === 'POST') {
    const pid = Number(projTasksMatch[1]);
    const b = (req.body ?? {}) as Partial<Task>;
    if (!b.title?.trim()) return fail(400);
    const task: Task = {
      id: Math.max(0, ...TASKS.map((t) => t.id)) + 1,
      projectId: pid,
      title: b.title.trim(),
      status: b.status ?? 'todo',
      priority: b.priority ?? 'medium',
      assignee: b.assignee ?? MEMBERS[0].name,
      dueDate: b.dueDate ?? null,
      subtasks: [],
    };
    TASKS.unshift(task);
    return ok(task, 500);
  }

  const taskMatch = path.match(/^\/api\/tasks\/(\d+)$/);
  if (taskMatch && req.method === 'PUT') {
    const task = TASKS.find((t) => t.id === Number(taskMatch[1]));
    if (!task) return fail(404);
    const b = (req.body ?? {}) as Partial<Task>;
    if (b.title !== undefined) task.title = String(b.title).trim() || task.title;
    if (b.status !== undefined) task.status = b.status;
    if (b.priority !== undefined) task.priority = b.priority;
    if (b.assignee !== undefined) task.assignee = b.assignee;
    if (b.dueDate !== undefined) task.dueDate = b.dueDate;
    if (b.subtasks !== undefined) task.subtasks = b.subtasks;
    return ok({ ...task, subtasks: [...task.subtasks] }, 450);
  }

  if (taskMatch && req.method === 'DELETE') {
    const i = TASKS.findIndex((t) => t.id === Number(taskMatch[1]));
    if (i < 0) return fail(404);
    TASKS.splice(i, 1);
    return ok({ ok: true });
  }

  // --- comments ---
  const commentsMatch = path.match(/^\/api\/projects\/(\d+)\/comments$/);
  if (commentsMatch && req.method === 'GET') {
    return ok([...(COMMENTS.get(Number(commentsMatch[1])) ?? [])]);
  }

  if (commentsMatch && req.method === 'POST') {
    const pid = Number(commentsMatch[1]);
    const me = authUser();
    const { text } = (req.body ?? {}) as { text?: string };
    if (!text?.trim()) return fail(400);
    const list = COMMENTS.get(pid) ?? [];
    const comment: CommentItem = {
      id: Date.now(),
      author: me?.name ?? 'مهمان',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    list.push(comment);
    COMMENTS.set(pid, list);
    return ok(comment, 500);
  }

  // --- team ---
  if (path === '/api/team' && req.method === 'GET') {
    return ok(TEAM.map((m) => ({ ...m })));
  }
  if (path === '/api/team' && req.method === 'POST') {
    const b = (req.body ?? {}) as Partial<TeamMember>;
    if (!b.name?.trim() || !b.email?.trim()) return fail(400);
    if (TEAM.some((m) => m.email === b.email)) return fail(409);
    const member: TeamMember = {
      id: Math.max(0, ...TEAM.map((m) => m.id)) + 1,
      name: b.name.trim(),
      email: b.email.trim(),
      role: b.role ?? 'member',
      active: true,
      joinedAt: new Date().toISOString(),
    };
    TEAM.push(member);
    return ok(member, 600);
  }
  const teamMatch = path.match(/^\/api\/team\/(\d+)$/);
  if (teamMatch && req.method === 'PUT') {
    const m = TEAM.find((x) => x.id === Number(teamMatch[1]));
    if (!m) return fail(404);
    const b = (req.body ?? {}) as Partial<TeamMember>;
    if (b.role !== undefined) m.role = b.role;
    if (b.active !== undefined) m.active = b.active;
    if (b.name !== undefined) m.name = String(b.name);
    return ok({ ...m }, 450);
  }

  // --- notifications (seed) ---
  if (path === '/api/notifications' && req.method === 'GET') {
    return ok(NOTIFICATIONS.map((n) => ({ ...n })));
  }

  // --- calendar events ---
  if (path === '/api/events' && req.method === 'GET') {
    return ok(EVENTS.map((e) => ({ ...e })));
  }
  if (path === '/api/events' && req.method === 'POST') {
    const b = (req.body ?? {}) as Partial<CalEvent>;
    if (!b.title?.trim() || !b.date) return fail(400);
    const event: CalEvent = {
      id: nextEventId(),
      title: b.title.trim(),
      date: b.date,
      color: b.color ?? 'primary',
    };
    EVENTS.push(event);
    return ok(event, 450);
  }
  const eventMatch = path.match(/^\/api\/events\/(\d+)$/);
  if (eventMatch && req.method === 'PUT') {
    const e = EVENTS.find((x) => x.id === Number(eventMatch[1]));
    if (!e) return fail(404);
    const b = (req.body ?? {}) as Partial<CalEvent>;
    if (b.title !== undefined) e.title = String(b.title).trim() || e.title;
    if (b.date !== undefined) e.date = b.date;
    if (b.color !== undefined) e.color = b.color;
    return ok({ ...e }, 400);
  }
  if (eventMatch && req.method === 'DELETE') {
    const i = EVENTS.findIndex((x) => x.id === Number(eventMatch[1]));
    if (i < 0) return fail(404);
    EVENTS.splice(i, 1);
    return ok({ ok: true });
  }

  // --- file manager ---
  if (path === '/api/files' && req.method === 'GET') {
    const parentRaw = url.searchParams.get('parent');
    const parentId = parentRaw === null || parentRaw === '' ? null : Number(parentRaw);
    const items = FILES.filter((f) => f.parentId === parentId).map((f) => ({ ...f }));
    const trail: { id: number; name: string }[] = [];
    let cur = parentId === null ? null : FILES.find((f) => f.id === parentId) ?? null;
    while (cur) {
      trail.unshift({ id: cur.id, name: cur.name });
      cur = cur.parentId === null ? null : FILES.find((f) => f.id === cur!.parentId) ?? null;
    }
    return ok({ items, trail });
  }
  if (path === '/api/files' && req.method === 'POST') {
    const b = (req.body ?? {}) as Partial<FileNode>;
    if (!b.name?.trim() || !b.type) return fail(400);
    const node: FileNode = {
      id: nextFileId(),
      parentId: b.parentId ?? null,
      name: b.name.trim(),
      type: b.type,
      size: b.type === 'file' ? (b.size ?? 0) : null,
      updatedAt: new Date().toISOString(),
    };
    FILES.push(node);
    return ok(node, 450);
  }
  const fileMatch = path.match(/^\/api\/files\/(\d+)$/);
  if (fileMatch && req.method === 'PUT') {
    const f = FILES.find((x) => x.id === Number(fileMatch[1]));
    if (!f) return fail(404);
    const { name } = (req.body ?? {}) as { name?: string };
    if (!name?.trim()) return fail(400);
    f.name = name.trim();
    f.updatedAt = new Date().toISOString();
    return ok({ ...f }, 350);
  }
  if (fileMatch && req.method === 'DELETE') {
    const id = Number(fileMatch[1]);
    const toDelete = new Set<number>([id]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const f of FILES) {
        if (f.parentId !== null && toDelete.has(f.parentId) && !toDelete.has(f.id)) {
          toDelete.add(f.id);
          grew = true;
        }
      }
    }
    for (let i = FILES.length - 1; i >= 0; i--) {
      if (toDelete.has(FILES[i].id)) FILES.splice(i, 1);
    }
    return ok({ deleted: toDelete.size });
  }

  // --- AI assistant (mock): builds a written insight from current data ---
  if (path === '/api/ai/summary' && req.method === 'POST') {
    const active = PROJECTS.filter((p) => p.status === 'active').length;
    const done = PROJECTS.filter((p) => p.status === 'done').length;
    const paused = PROJECTS.filter((p) => p.status === 'paused').length;
    const overdue = PROJECTS.filter(
      (p) => p.status !== 'done' && new Date(p.dueDate).getTime() < Date.now(),
    ).length;
    const avgProgress = Math.round(
      PROJECTS.reduce((s, p) => s + p.progress, 0) / Math.max(1, PROJECTS.length),
    );
    const openTasks = TASKS.filter((t) => t.status !== 'done').length;

    const body = {
      generatedAt: new Date().toISOString(),
      // bilingual bullet insights (UI picks by language)
      insights: {
        fa: [
          `در حال حاضر ${active} پروژه فعال، ${paused} متوقف‌شده و ${done} پروژه تکمیل‌شده دارید.`,
          `میانگین پیشرفت پروژه‌ها ${avgProgress}٪ است.`,
          overdue > 0
            ? `⚠️ ${overdue} پروژه از موعد مقرر عقب افتاده‌اند؛ پیشنهاد می‌شود اولویت‌بندی شوند.`
            : `هیچ پروژه‌ای از موعد عقب نیست — وضعیت زمان‌بندی مطلوب است.`,
          `${openTasks} وظیفه‌ی باز در جریان است.`,
          avgProgress < 50
            ? 'توصیه: روی پروژه‌های با پیشرفت پایین تمرکز کنید تا میانگین بهبود یابد.'
            : 'روند کلی مثبت است؛ تمرکز را روی تکمیل پروژه‌های نزدیک به پایان نگه دارید.',
        ],
        en: [
          `You currently have ${active} active, ${paused} paused and ${done} completed projects.`,
          `Average project progress is ${avgProgress}%.`,
          overdue > 0
            ? `⚠️ ${overdue} project(s) are overdue — consider re-prioritizing them.`
            : `No projects are overdue — scheduling looks healthy.`,
          `${openTasks} open tasks are in progress.`,
          avgProgress < 50
            ? 'Tip: focus on low-progress projects to lift the average.'
            : 'Overall trend is positive; keep pushing near-complete projects to the finish.',
        ],
        ar: [
          `لديك حاليًا ${active} مشاريع نشطة و${paused} متوقفة و${done} مكتملة.`,
          `متوسط تقدّم المشاريع هو ${avgProgress}٪.`,
          overdue > 0
            ? `⚠️ ${overdue} مشروع متأخر عن موعده — يُنصح بإعادة ترتيب الأولويات.`
            : `لا توجد مشاريع متأخرة — الجدول الزمني جيد.`,
          `${openTasks} مهمة مفتوحة قيد التنفيذ.`,
          avgProgress < 50
            ? 'نصيحة: ركّز على المشاريع منخفضة التقدّم لرفع المتوسط.'
            : 'الاتجاه العام إيجابي؛ واصل دفع المشاريع القريبة من الاكتمال.',
        ],
      },
    };
    return ok(body, rand(900, 1600)); // feels like the model is "thinking"
  }

  // --- dashboard stats (seeded by from/to so the analytics filter visibly changes data) ---
  if (path === '/api/stats' && req.method === 'GET') {
    const seedStr = (url.searchParams.get('from') ?? '') + (url.searchParams.get('to') ?? '');
    let seed = 13;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 100000;
    const next = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const series = (n: number, min: number, max: number) =>
      Array.from({ length: n }, () => Math.round(min + next() * (max - min)));

    const byStatus = {
      active: PROJECTS.filter((p) => p.status === 'active').length,
      paused: PROJECTS.filter((p) => p.status === 'paused').length,
      done: PROJECTS.filter((p) => p.status === 'done').length,
    };
    const body = {
      kpis: {
        projects: PROJECTS.length,
        tasks: 140 + series(1, 0, 90)[0],
        members: MEMBERS.length * 6 + series(1, 0, 9)[0],
        overdue: series(1, 2, 14)[0],
        deltas: [series(1, 2, 18)[0], series(1, 1, 12)[0], series(1, 0, 6)[0], -series(1, 1, 9)[0]],
      },
      revenue: series(12, 40, 220),
      tasksNew: series(7, 4, 28),
      tasksDone: series(7, 3, 26),
      byStatus,
    };
    return ok(body, rand(450, 900));
  }

  // --- activity feed ---
  if (path === '/api/activity' && req.method === 'GET') {
    return ok(ACTIVITY, rand(500, 1_100));
  }

  return fail(404);
};
