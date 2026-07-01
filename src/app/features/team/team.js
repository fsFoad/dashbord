import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ToastService } from '../../core/services/toast.service';
import { HasRoleDirective } from '../../core/directives/has-role.directive';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';
/** Team management: member cards, role editing & activation (admin only), invite dialog. */
let Team = class Team {
    http = inject(HttpClient);
    toast = inject(ToastService);
    members = signal(null);
    q = '';
    query = signal('');
    filtered = computed(() => {
        const list = this.members() ?? [];
        const q = this.query().trim();
        if (!q)
            return list;
        return list.filter((m) => m.name.includes(q) || m.email.includes(q));
    });
    // invite dialog
    inviteOpen = signal(false);
    inviting = signal(false);
    invite = { name: '', email: '', role: 'member' };
    inviteError = signal(null);
    roleOptions = [
        { value: 'admin' }, { value: 'manager' }, { value: 'member' },
    ];
    constructor() {
        this.http.get('/api/team').subscribe({ next: (m) => this.members.set(m) });
    }
    setRole(m, role) {
        const previous = this.members();
        this.members.update((list) => (list ?? []).map((x) => (x.id === m.id ? { ...x, role } : x))); // optimistic
        this.http.put(`/api/team/${m.id}`, { role }).subscribe({
            error: () => this.members.set(previous),
        });
    }
    setActive(m, active) {
        const previous = this.members();
        this.members.update((list) => (list ?? []).map((x) => (x.id === m.id ? { ...x, active } : x)));
        this.http.put(`/api/team/${m.id}`, { active }).subscribe({
            error: () => this.members.set(previous),
        });
    }
    sendInvite() {
        if (!this.invite.name.trim() || !this.invite.email.includes('@')) {
            this.inviteError.set('validation.email');
            return;
        }
        this.inviting.set(true);
        this.inviteError.set(null);
        this.http.post('/api/team', this.invite).subscribe({
            next: (m) => {
                this.members.update((list) => [...(list ?? []), m]);
                this.inviting.set(false);
                this.inviteOpen.set(false);
                this.invite = { name: '', email: '', role: 'member' };
                this.toast.success('team.invited', { name: m.name });
            },
            error: () => this.inviting.set(false),
        });
    }
    initials(name) {
        return name.split(/\s+/).slice(0, 2).map((p) => p.charAt(0)).join('');
    }
    roleSeverity(r) {
        return r === 'admin' ? 'danger' : r === 'manager' ? 'warn' : 'secondary';
    }
};
Team = __decorate([
    Component({
        selector: 'app-team',
        imports: [
            FormsModule, TranslocoModule, ButtonModule, InputTextModule, Select, Dialog,
            TagModule, ToggleSwitch, HasRoleDirective, LocalizedDatePipe, SkeletonCard,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './team.html',
    })
], Team);
export { Team };
