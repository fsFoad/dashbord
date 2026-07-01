import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/** Bare shell for error pages and full-screen views. */
let BlankLayout = class BlankLayout {
};
BlankLayout = __decorate([
    Component({
        selector: 'app-blank-layout',
        imports: [RouterOutlet],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="min-h-dvh bg-surface-50 dark:bg-surface-950">
      <router-outlet />
    </div>
  `,
    })
], BlankLayout);
export { BlankLayout };
