import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

interface Capability {
  key: string;
  admin: boolean;
  manager: boolean;
  member: boolean;
}

/**
 * Access-control center — reachable only with the 'admin' role (see roleGuard
 * on its route). Documents what each role can do (the permission matrix the
 * guards/`*appHasRole` directive enforce) and links to live team management.
 */
@Component({
  selector: 'app-roles-demo',
  imports: [RouterLink, TranslocoModule, TableModule, TagModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="flex items-center gap-2 text-2xl font-bold text-surface-900 dark:text-surface-0">
          <i class="pi pi-shield text-primary"></i>
          {{ 'rolesDemo.title' | transloco }}
        </h1>
        <p class="mt-2 max-w-prose text-sm text-muted-color">{{ 'rolesDemo.body' | transloco }}</p>
      </div>
      <a routerLink="/people/team">
        <p-button [label]="'rolesDemo.manageTeam' | transloco" icon="pi pi-users" size="small" />
      </a>
    </div>

    <!-- role summary cards -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      @for (r of roles; track r.key) {
        <div class="surface-card p-5">
          <div class="flex items-center gap-2.5">
            <span class="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <i [class]="r.icon"></i>
            </span>
            <h3 class="font-semibold">{{ ('role.' + r.key) | transloco }}</h3>
          </div>
          <p class="mt-2 text-xs leading-relaxed text-muted-color">
            {{ ('rolesDemo.role.' + r.key) | transloco }}
          </p>
        </div>
      }
    </div>

    <!-- capability matrix -->
    <div class="surface-card overflow-hidden">
      <p-table [value]="capabilities" styleClass="text-sm">
        <ng-template #header>
          <tr>
            <th>{{ 'rolesDemo.capability' | transloco }}</th>
            <th class="text-center">{{ 'role.admin' | transloco }}</th>
            <th class="text-center">{{ 'role.manager' | transloco }}</th>
            <th class="text-center">{{ 'role.member' | transloco }}</th>
          </tr>
        </ng-template>
        <ng-template #body let-c>
          <tr>
            <td class="font-medium">{{ ('rolesDemo.cap.' + c.key) | transloco }}</td>
            <td class="text-center">
              <i [class]="c.admin ? 'pi pi-check-circle text-green-500' : 'pi pi-minus text-muted-color'"></i>
            </td>
            <td class="text-center">
              <i [class]="c.manager ? 'pi pi-check-circle text-green-500' : 'pi pi-minus text-muted-color'"></i>
            </td>
            <td class="text-center">
              <i [class]="c.member ? 'pi pi-check-circle text-green-500' : 'pi pi-minus text-muted-color'"></i>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class RolesDemo {
  protected readonly roles = [
    { key: 'admin', icon: 'pi pi-star-fill' },
    { key: 'manager', icon: 'pi pi-briefcase' },
    { key: 'member', icon: 'pi pi-user' },
  ];

  protected readonly capabilities: Capability[] = [
    { key: 'viewDashboard', admin: true, manager: true, member: true },
    { key: 'manageProjects', admin: true, manager: true, member: false },
    { key: 'editTasks', admin: true, manager: true, member: true },
    { key: 'manageTeam', admin: true, manager: false, member: false },
    { key: 'changeRoles', admin: true, manager: false, member: false },
    { key: 'accessSettings', admin: true, manager: true, member: true },
    { key: 'systemConfig', admin: true, manager: false, member: false },
  ];
}
