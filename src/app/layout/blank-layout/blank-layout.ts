import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Bare shell for error pages and full-screen views. */
@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-dvh bg-surface-50 dark:bg-surface-950">
      <router-outlet />
    </div>
  `,
})
export class BlankLayout {}
