import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { map } from 'rxjs';
import { ProjectsApiService } from '../../core/services/projects-api.service';
import { ToastService } from '../../core/services/toast.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';
/**
 * Kanban board with OPTIMISTIC drag & drop: dropping a card moves it
 * instantly; if the server later rejects the change, the previous state is
 * rolled back (the error toast comes from the global interceptor).
 */
let Kanban = class Kanban {
    api = inject(ProjectsApiService);
    toast = inject(ToastService);
    confirm = inject(ConfirmService);
    route = inject(ActivatedRoute);
    statuses = ['todo', 'doing', 'done'];
    // ---- project selector ----
    projects = toSignal(this.api.list({ size: 50 }).pipe(map((r) => r.items)), { initialValue: [] });
    selectedProjectId = signal(Number(this.route.snapshot.queryParamMap.get('project')) || null);
    syncQueryParam = this.route.queryParamMap
        .pipe(takeUntilDestroyed())
        .subscribe((pm) => {
        const id = Number(pm.get('project'));
        if (id)
            this.selectedProjectId.set(id);
    });
    // ---- board state ----
    tasks = signal([]);
    loading = signal(true);
    quickTitles = { todo: '', doing: '', done: '' };
    addingTo = signal(null);
    draggingId = signal(null);
    dragOverCol = signal(null);
    columns = computed(() => this.statuses.map((status) => ({
        status,
        tasks: this.tasks().filter((t) => t.status === status),
    })));
    // ---- edit dialog ----
    editing = signal(null);
    savingTask = signal(false);
    draft = { title: '', priority: 'medium', assignee: '', dueDate: null, subtasks: [] };
    newSubtask = '';
    priorityOptions = [
        { value: 'low' }, { value: 'medium' }, { value: 'high' },
    ];
    members = toSignal(this.api.members(), { initialValue: [] });
    constructor() {
        // default to the first project once the list arrives
        effect(() => {
            const list = this.projects();
            if (list.length && this.selectedProjectId() === null) {
                this.selectedProjectId.set(list[0].id);
            }
        });
        // (re)load tasks when the selected project changes
        effect(() => {
            const id = this.selectedProjectId();
            if (id === null)
                return;
            this.loading.set(true);
            this.api.tasks(id).subscribe({
                next: (tasks) => {
                    this.tasks.set(tasks);
                    this.loading.set(false);
                },
                error: () => this.loading.set(false),
            });
        });
    }
    // ---- drag & drop (optimistic) ----
    onDragStart(t) {
        this.draggingId.set(t.id);
    }
    onDragOver(e, col) {
        if (this.draggingId() === null)
            return;
        e.preventDefault();
        this.dragOverCol.set(col);
    }
    onDrop(col) {
        const id = this.draggingId();
        this.draggingId.set(null);
        this.dragOverCol.set(null);
        if (id === null)
            return;
        const task = this.tasks().find((t) => t.id === id);
        if (!task || task.status === col)
            return;
        const previous = this.tasks();
        // optimistic: apply immediately
        this.tasks.set(previous.map((t) => (t.id === id ? { ...t, status: col } : t)));
        this.api.updateTask(id, { status: col }).subscribe({
            error: () => this.tasks.set(previous), // rollback; interceptor shows the toast
        });
    }
    onDragEnd() {
        this.draggingId.set(null);
        this.dragOverCol.set(null);
    }
    // ---- quick add ----
    quickAdd(status) {
        const title = this.quickTitles[status].trim();
        const pid = this.selectedProjectId();
        if (!title || pid === null)
            return;
        this.addingTo.set(status);
        this.api.createTask(pid, { title, status }).subscribe({
            next: (task) => {
                this.tasks.update((list) => [task, ...list]);
                this.quickTitles[status] = '';
                this.addingTo.set(null);
            },
            error: () => this.addingTo.set(null),
        });
    }
    // ---- edit dialog ----
    openTask(t) {
        this.draft = {
            title: t.title,
            priority: t.priority,
            assignee: t.assignee,
            dueDate: t.dueDate ? new Date(t.dueDate) : null,
            subtasks: t.subtasks.map((s) => ({ ...s })),
        };
        this.newSubtask = '';
        this.editing.set(t);
    }
    addSubtask() {
        const title = this.newSubtask.trim();
        if (!title)
            return;
        this.draft.subtasks = [
            ...this.draft.subtasks,
            { id: -Date.now() - this.draft.subtasks.length, title, done: false },
        ];
        this.newSubtask = '';
    }
    toggleSubtask(id) {
        this.draft.subtasks = this.draft.subtasks.map((s) => s.id === id ? { ...s, done: !s.done } : s);
    }
    removeSubtask(id) {
        this.draft.subtasks = this.draft.subtasks.filter((s) => s.id !== id);
    }
    saveTask() {
        const t = this.editing();
        if (!t || !this.draft.title.trim())
            return;
        this.savingTask.set(true);
        const body = {
            title: this.draft.title.trim(),
            priority: this.draft.priority,
            assignee: this.draft.assignee,
            dueDate: this.draft.dueDate ? this.draft.dueDate.toISOString() : null,
            subtasks: this.draft.subtasks.map((s, i) => ({ ...s, id: s.id < 0 ? i + 1_000_000 : s.id })),
        };
        this.api.updateTask(t.id, body).subscribe({
            next: (updated) => {
                this.tasks.update((list) => list.map((x) => (x.id === t.id ? updated : x)));
                this.savingTask.set(false);
                this.editing.set(null);
                this.toast.success('task.saved');
            },
            error: () => this.savingTask.set(false),
        });
    }
    async deleteTask() {
        const t = this.editing();
        if (!t || !(await this.confirm.delete(t.title)))
            return;
        const previous = this.tasks();
        this.tasks.set(previous.filter((x) => x.id !== t.id)); // optimistic
        this.editing.set(null);
        this.api.deleteTask(t.id).subscribe({
            next: () => this.toast.success('task.deleted'),
            error: () => this.tasks.set(previous),
        });
    }
    // ---- helpers ----
    doneSubtasks(t) {
        return t.subtasks.filter((s) => s.done).length;
    }
    isOverdue(t) {
        return !!t.dueDate && t.status !== 'done' && new Date(t.dueDate).getTime() < Date.now();
    }
    initials(name) {
        return name.split(/\s+/).slice(0, 2).map((p) => p.charAt(0)).join('');
    }
    priorityClass(p) {
        return p === 'high' ? 'bg-red-500' : p === 'medium' ? 'bg-amber-500' : 'bg-surface-400';
    }
};
Kanban = __decorate([
    Component({
        selector: 'app-kanban',
        imports: [
            FormsModule, TranslocoModule, ButtonModule, InputTextModule, Select, Dialog,
            LocalizedDatePipe, DatePickerComponent, SkeletonCard,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './kanban.html',
    })
], Kanban);
export { Kanban };
