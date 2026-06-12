import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { CommentItem, Project, Task } from '../../core/models/api.model';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { SessionStore } from '../../core/services/session.store';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';

/**
 * Project detail: header card, task list (with subtask progress) and a
 * comment thread. New comments are appended OPTIMISTICALLY — they appear
 * instantly with a "sending" state and roll back on failure.
 */
@Component({
  selector: 'app-project-detail',
  imports: [
    RouterLink, FormsModule, TranslocoModule, ButtonModule, TagModule, Skeleton,
    LocalizedDatePipe, SkeletonCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  private readonly api = inject(ProjectsApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly session = inject(SessionStore);

  protected readonly project = signal<Project | null>(null);
  protected readonly tasks = signal<Task[] | null>(null);
  protected readonly comments = signal<(CommentItem & { pending?: boolean })[] | null>(null);
  protected readonly notFound = signal(false);

  protected newComment = '';
  protected readonly projectId = signal<number>(0);

  protected readonly taskStats = computed(() => {
    const list = this.tasks() ?? [];
    return {
      total: list.length,
      done: list.filter((t) => t.status === 'done').length,
    };
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.projectId.set(id);
      this.project.set(null);
      this.tasks.set(null);
      this.comments.set(null);
      this.notFound.set(false);

      this.api.get(id).subscribe({
        next: (p) => this.project.set(p),
        error: () => this.notFound.set(true),
      });
      this.api.tasks(id).subscribe({ next: (t) => this.tasks.set(t) });
      this.api.comments(id).subscribe({ next: (c) => this.comments.set(c) });
    });
  }

  protected send(): void {
    const text = this.newComment.trim();
    const me = this.session.user();
    if (!text) return;

    // optimistic append
    const temp: CommentItem & { pending: boolean } = {
      id: -Date.now(),
      author: me?.name ?? '—',
      text,
      createdAt: new Date().toISOString(),
      pending: true,
    };
    const previous = this.comments() ?? [];
    this.comments.set([...previous, temp]);
    this.newComment = '';

    this.api.addComment(this.projectId(), text).subscribe({
      next: (saved) => {
        this.comments.update((list) =>
          (list ?? []).map((c) => (c.id === temp.id ? saved : c)),
        );
      },
      error: () => {
        this.comments.set(previous); // rollback; interceptor shows the toast
        this.newComment = text; // give the user their text back
      },
    });
  }

  protected statusSeverity(p: Project): 'success' | 'warn' | 'secondary' {
    return p.status === 'active' ? 'success' : p.status === 'paused' ? 'warn' : 'secondary';
  }

  protected doneSubtasks(t: Task): number {
    return t.subtasks.filter((s) => s.done).length;
  }

  protected initials(name: string): string {
    return name.split(/\s+/).slice(0, 2).map((x) => x.charAt(0)).join('');
  }

  protected taskStatusClass(t: Task): string {
    return t.status === 'done'
      ? 'bg-green-500'
      : t.status === 'doing'
        ? 'bg-primary'
        : 'bg-surface-400';
  }
}
