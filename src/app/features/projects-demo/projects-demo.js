import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
let ProjectsDemo = class ProjectsDemo {
};
ProjectsDemo = __decorate([
    Component({
        selector: 'app-projects-demo',
        imports: [TranslocoModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
      {{ 'projects.demo.title' | transloco }}
    </h1>
    <p class="mt-2 max-w-prose text-sm text-muted-color">
      {{ 'projects.demo.body' | transloco }}
    </p>
  `,
    })
], ProjectsDemo);
export { ProjectsDemo };
