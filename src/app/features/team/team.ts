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
import { TeamMember } from '../../core/models/api.model';
import { ToastService } from '../../core/services/toast.service';
import { HasRoleDirective } from '../../core/directives/has-role.directive';
import { LocalizedDatePipe } from '../../shared/pipes/localized-date.pipe';
import { SkeletonCard } from '../../shared/components/skeleton/skeleton-card';

/** Team management: member cards, role editing & activation (admin only), invite dialog. */
@Component({
  selector: 'app-team',
  imports: [
    FormsModule, TranslocoModule, ButtonModule, InputTextModule, Select, Dialog,
    TagModule, ToggleSwitch, HasRoleDirective, LocalizedDatePipe, SkeletonCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team.html',
})
export class Team {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);

  protected readonly members = signal<TeamMember[] | null>(null);
  protected q = '';
  protected readonly query = signal('');

  protected readonly filtered = computed(() => {
    const list = this.members() ?? [];
    const q = this.query().trim();
    if (!q) return list;
    return list.filter((m) => m.name.includes(q) || m.email.includes(q));
  });

  // invite dialog
  protected readonly inviteOpen = signal(false);
  protected readonly inviting = signal(false);
  protected invite = { name: '', email: '', role: 'member' as TeamMember['role'] };
  protected inviteError = signal<string | null>(null);

  protected readonly roleOptions = [
    { value: 'admin' as const }, { value: 'manager' as const }, { value: 'member' as const },
  ];

  constructor() {
    this.http.get<TeamMember[]>('/api/team').subscribe({ next: (m) => this.members.set(m) });
  }

  protected setRole(m: TeamMember, role: TeamMember['role']): void {
    const previous = this.members();
    this.members.update((list) =>
      (list ?? []).map((x) => (x.id === m.id ? { ...x, role } : x)),
    ); // optimistic
    this.http.put(`/api/team/${m.id}`, { role }).subscribe({
      error: () => this.members.set(previous),
    });
  }

  protected setActive(m: TeamMember, active: boolean): void {
    const previous = this.members();
    this.members.update((list) =>
      (list ?? []).map((x) => (x.id === m.id ? { ...x, active } : x)),
    );
    this.http.put(`/api/team/${m.id}`, { active }).subscribe({
      error: () => this.members.set(previous),
    });
  }

  protected sendInvite(): void {
    if (!this.invite.name.trim() || !this.invite.email.includes('@')) {
      this.inviteError.set('validation.email');
      return;
    }
    this.inviting.set(true);
    this.inviteError.set(null);
    this.http.post<TeamMember>('/api/team', this.invite).subscribe({
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

  protected initials(name: string): string {
    return name.split(/\s+/).slice(0, 2).map((p) => p.charAt(0)).join('');
  }

  protected roleSeverity(r: TeamMember['role']): 'danger' | 'warn' | 'secondary' {
    return r === 'admin' ? 'danger' : r === 'manager' ? 'warn' : 'secondary';
  }
}
