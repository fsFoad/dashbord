import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

/** Reachable only with the 'admin' role (see roleGuard on its route). */
@Component({
  selector: 'app-roles-demo',
  imports: [TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="flex items-center gap-2 text-2xl font-bold text-surface-900 dark:text-surface-0">
      <i class="pi pi-shield text-primary"></i>
      {{ 'rolesDemo.title' | transloco }}
    </h1>
    <p class="mt-2 max-w-prose text-sm text-muted-color">{{ 'rolesDemo.body' | transloco }}</p>
  `,
})
export class RolesDemo {}
