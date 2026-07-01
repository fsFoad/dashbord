import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { SessionStore } from '../../core/services/session.store';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';
/**
 * Project detail: header card, task list (with subtask progress) and a
 * comment thread. New comments are appended OPTIMISTICALLY — they appear
 * instantly with a "sending" state and roll back on failure.
 */
let ProjectDetail = class ProjectDetail {
    api = inject(ProjectsApiService);
    route = inject(ActivatedRoute);
    session = inject(SessionStore);
    project = signal(null);
    tasks = signal(null);
    comments = signal(null);
    notFound = signal(false);
    newComment = '';
    projectId = signal(0);
    taskStats = computed(() => {
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
    send() {
        const text = this.newComment.trim();
        const me = this.session.user();
        if (!text)
            return;
        // optimistic append
        const temp = {
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
                this.comments.update((list) => (list ?? []).map((c) => (c.id === temp.id ? saved : c)));
            },
            error: () => {
                this.comments.set(previous); // rollback; interceptor shows the toast
                this.newComment = text; // give the user their text back
            },
        });
    }
    statusSeverity(p) {
        return p.status === 'active' ? 'success' : p.status === 'paused' ? 'warn' : 'secondary';
    }
    doneSubtasks(t) {
        return t.subtasks.filter((s) => s.done).length;
    }
    initials(name) {
        return name.split(/\s+/).slice(0, 2).map((x) => x.charAt(0)).join('');
    }
    taskStatusClass(t) {
        return t.status === 'done'
            ? 'bg-green-500'
            : t.status === 'doing'
                ? 'bg-primary'
                : 'bg-surface-400';
    }
};
ProjectDetail = __decorate([
    Component({
        selector: 'app-project-detail',
        imports: [
            RouterLink, FormsModule, TranslocoModule, ButtonModule, TagModule, Skeleton,
            LocalizedDatePipe, SkeletonCard,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './project-detail.html',
    })
], ProjectDetail);
export { ProjectDetail };
