import {
  ActivityItem, CalEvent, CommentItem, FileNode, Member, NotificationItem, Project, Task, TeamMember,
} from '../models/api.model';
import { User } from '../models/user.model';

/** Deterministic-ish mock data. Replace the whole mock layer with a real API later. */
const OWNERS = ['سارا محمدی', 'علی رضایی', 'مریم احمدی', 'حسین کریمی', 'نگار موسوی'];
const NAMES = [
  'بازطراحی وب‌سایت شرکتی', 'اپلیکیشن موبایل فروشگاه', 'سامانه مدیریت انبار',
  'داشبورد تحلیل فروش', 'پرتال منابع انسانی', 'سیستم تیکتینگ پشتیبانی',
  'یکپارچه‌سازی پرداخت', 'ماژول گزارش‌گیری مالی', 'باشگاه مشتریان',
  'اتوماسیون اداری', 'سامانه رزرو آنلاین', 'پنل مدیریت محتوا',
  'API عمومی نسخه ۲', 'مهاجرت به کلود', 'بهینه‌سازی سئو',
  'سیستم اعلان‌ها', 'کیف پول دیجیتال', 'داشبورد مانیتورینگ',
];
const STATUSES = ['active', 'paused', 'done'] as const;

export const PROJECTS: Project[] = NAMES.map((name, i) => {
  const due = Date.now() + (i * 4 - 20) * 864e5;
  const start = due - (12 + (i % 5) * 14) * 864e5;
  return {
    id: i + 1,
    name,
    status: STATUSES[i % 3],
    progress: ((i * 17) % 90) + 10,
    owner: OWNERS[i % OWNERS.length],
    startDate: new Date(start).toISOString(),
    dueDate: new Date(due).toISOString(),
    updatedAt: new Date(Date.now() - i * 36e5 * 7).toISOString(),
  };
});

export interface MockUser extends User {
  username: string;
  password: string;
  phone?: string;
  twoFactor?: boolean;
}

/** Demo accounts. Login is by username; the default account is `1` / `1`. */
export const USERS: MockUser[] = [
  { id: 1, name: 'کاربر پیش‌فرض', username: '1', email: 'one@demo.com', phone: '09120000001', password: '1', roles: ['admin', 'user'] },
  { id: 2, name: 'مدیر سیستم', username: 'admin', email: 'admin@demo.com', phone: '09120000002', password: '123456', roles: ['admin', 'user'], twoFactor: true },
  { id: 3, name: 'کاربر آزمایشی', username: 'user', email: 'user@demo.com', phone: '09120000003', password: '123456', roles: ['user'] },
];

export function toPublicUser(u: MockUser): User {
  return { id: u.id, name: u.name, username: u.username, email: u.email, roles: u.roles };
}

export const MEMBERS: Member[] = OWNERS.map((name, i) => ({ id: i + 1, name }));

export const ACTIVITY: ActivityItem[] = [
  { id: 1, icon: 'pi pi-plus-circle', messageKey: 'activity.projectCreated', messageParams: { user: 'سارا', project: NAMES[0] }, minutesAgo: 12 },
  { id: 2, icon: 'pi pi-check-circle', messageKey: 'activity.taskDone', messageParams: { user: 'علی', task: 'طراحی صفحه ورود' }, minutesAgo: 47 },
  { id: 3, icon: 'pi pi-comment', messageKey: 'activity.commented', messageParams: { user: 'مریم', project: NAMES[3] }, minutesAgo: 95 },
  { id: 4, icon: 'pi pi-user-plus', messageKey: 'activity.memberJoined', messageParams: { user: 'حسین', project: NAMES[1] }, minutesAgo: 180 },
  { id: 5, icon: 'pi pi-flag', messageKey: 'activity.deadlineSet', messageParams: { user: 'نگار', project: NAMES[5] }, minutesAgo: 320 },
];

// ---------------- Tasks (Kanban / detail page) ----------------

const TASK_TITLES = [
  'طراحی رابط کاربری صفحه اصلی', 'پیاده‌سازی احراز هویت', 'نوشتن تست‌های واحد',
  'بهینه‌سازی کوئری‌های دیتابیس', 'بررسی و ادغام Pull Requestها', 'مستندسازی API',
  'رفع باگ‌های گزارش‌شده', 'جلسه هماهنگی با کارفرما', 'استقرار نسخه آزمایشی',
  'بازبینی امنیتی', 'طراحی لوگو و هویت بصری', 'تنظیم CI/CD',
];
const SUBTASK_TITLES = ['تحلیل نیازمندی', 'پیاده‌سازی اولیه', 'بازبینی کد', 'تست نهایی'];

let taskSeq = 1;
let subSeq = 1;

export const TASKS: Task[] = [];
for (let p = 1; p <= 8; p++) {
  const count = 4 + (p % 4);
  for (let t = 0; t < count; t++) {
    const idx = (p * 3 + t) % TASK_TITLES.length;
    const subCount = (p + t) % 4;
    TASKS.push({
      id: taskSeq++,
      projectId: p,
      title: TASK_TITLES[idx],
      status: (['todo', 'doing', 'done'] as const)[(p + t) % 3],
      priority: (['low', 'medium', 'high'] as const)[(p * 2 + t) % 3],
      assignee: OWNERS[(p + t) % OWNERS.length],
      dueDate: (p + t) % 3 === 0 ? null : new Date(Date.now() + ((t * 5 - 6) % 18) * 864e5).toISOString(),
      subtasks: Array.from({ length: subCount }, (_, k) => ({
        id: subSeq++,
        title: SUBTASK_TITLES[k],
        done: k < subCount - 1,
      })),
    });
  }
}

// ---------------- Comments (project detail) ----------------

const COMMENT_TEXTS = [
  'فاز اول طبق برنامه جلو می‌رود، فقط بخش گزارش‌ها کمی عقب است.',
  'لطفاً قبل از استقرار، تست‌های رگرسیون را کامل اجرا کنید.',
  'دیزاین جدید تأیید شد؛ می‌توانیم پیاده‌سازی را شروع کنیم. 👍',
  'جلسه بعدی با کارفرما برای پنجشنبه هماهنگ شد.',
];

let commentSeq = 1;
export const COMMENTS = new Map<number, CommentItem[]>();
for (let p = 1; p <= 8; p++) {
  COMMENTS.set(
    p,
    COMMENT_TEXTS.slice(0, 2 + (p % 3)).map((text, k) => ({
      id: commentSeq++,
      author: OWNERS[(p + k) % OWNERS.length],
      text,
      createdAt: new Date(Date.now() - (k + 1) * 36e5 * 9).toISOString(),
    })),
  );
}

// ---------------- Team ----------------

export const TEAM: TeamMember[] = OWNERS.map((name, i) => ({
  id: i + 1,
  name,
  email: ['sara', 'ali', 'maryam', 'hossein', 'negar'][i] + '@demo.com',
  role: (['admin', 'manager', 'member', 'member', 'member'] as const)[i],
  active: i !== 3,
  joinedAt: new Date(Date.now() - (200 - i * 30) * 864e5).toISOString(),
}));

// ---------------- Notifications (seed; live ones come from the mock socket) ----------------
export const NOTIFICATIONS: NotificationItem[] = [
  { id: 1, icon: 'pi pi-check-circle', messageKey: 'notif.taskDone', messageParams: { user: 'علی', task: 'طراحی صفحه ورود' }, createdAt: new Date(Date.now() - 25 * 6e4).toISOString(), read: false },
  { id: 2, icon: 'pi pi-comment', messageKey: 'notif.comment', messageParams: { user: 'مریم', project: NAMES[3] }, createdAt: new Date(Date.now() - 3 * 36e5).toISOString(), read: false },
  { id: 3, icon: 'pi pi-calendar', messageKey: 'notif.deadline', messageParams: { project: NAMES[0] }, createdAt: new Date(Date.now() - 26 * 36e5).toISOString(), read: true },
];

/** Templates the mock socket picks from for "live" notifications. */
export const LIVE_NOTIF_TEMPLATES: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>[] = [
  { icon: 'pi pi-check-circle', messageKey: 'notif.taskDone', messageParams: { user: 'نگار', task: 'تنظیم CI/CD' } },
  { icon: 'pi pi-user-plus', messageKey: 'notif.joined', messageParams: { user: 'حسین', project: NAMES[1] } },
  { icon: 'pi pi-comment', messageKey: 'notif.comment', messageParams: { user: 'سارا', project: NAMES[5] } },
  { icon: 'pi pi-exclamation-circle', messageKey: 'notif.deadline', messageParams: { project: NAMES[2] } },
];

// ---------------- Calendar events ----------------
function isoDay(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
}

let eventSeq = 1;
export const EVENTS: CalEvent[] = [
  { id: eventSeq++, title: 'جلسه اسپرینت', date: isoDay(0), color: 'primary' },
  { id: eventSeq++, title: 'دمو برای کارفرما', date: isoDay(2), color: 'green' },
  { id: eventSeq++, title: 'مهلت فاز اول', date: isoDay(5), color: 'red' },
  { id: eventSeq++, title: 'مصاحبه استخدام', date: isoDay(-3), color: 'amber' },
  { id: eventSeq++, title: 'بازبینی کد', date: isoDay(8), color: 'primary' },
  { id: eventSeq++, title: 'انتشار نسخه ۲', date: isoDay(14), color: 'green' },
];
export const nextEventId = () => eventSeq++;

// ---------------- File manager ----------------
let fileSeq = 1;
const F = (
  parentId: number | null, name: string, type: 'folder' | 'file', size: number | null = null,
): FileNode => ({
  id: fileSeq++, parentId, name, type, size,
  updatedAt: new Date(Date.now() - fileSeq * 36e5 * 5).toISOString(),
});

export const FILES: FileNode[] = [];
const fDocs = F(null, 'اسناد', 'folder');
const fImgs = F(null, 'تصاویر', 'folder');
const fContracts = F(null, 'قراردادها', 'folder');
FILES.push(
  fDocs, fImgs, fContracts,
  F(null, 'برنامه-فازبندی.xlsx', 'file', 48_500),
  F(fDocs.id, 'پروپوزال-نهایی.pdf', 'file', 1_240_000),
  F(fDocs.id, 'صورتجلسه-خرداد.docx', 'file', 86_000),
  F(fDocs.id, 'گزارش‌ها', 'folder'),
  F(fImgs.id, 'لوگو.png', 'file', 210_000),
  F(fImgs.id, 'بنر-کمپین.jpg', 'file', 2_400_000),
  F(fContracts.id, 'قرارداد-اصلی.pdf', 'file', 540_000),
);
export const nextFileId = () => fileSeq++;
