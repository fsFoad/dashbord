import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-server-error',
  imports: [RouterLink, TranslocoModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <div class="text-7xl font-black text-primary">500</div>
        <h1 class="mt-3 text-xl font-semibold text-surface-900 dark:text-surface-0">
          {{ 'error.500.title' | transloco }}
        </h1>
        <p class="mt-2 text-sm text-muted-color">{{ 'error.500.body' | transloco }}</p>
        <div class="mt-6 flex items-center justify-center gap-2">
          <p-button
            [label]="'common.refresh' | transloco"
            icon="pi pi-refresh"
            severity="secondary"
            (onClick)="reload()"
          />
          <a routerLink="/dashboard">
            <p-button [label]="'error.backHome' | transloco" icon="pi pi-home" />
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ServerError {
  protected reload(): void {
    location.reload();
  }
}
