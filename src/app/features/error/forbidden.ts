import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink, TranslocoModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <div class="text-7xl font-black text-primary">403</div>
        <h1 class="mt-3 text-xl font-semibold text-surface-900 dark:text-surface-0">
          {{ 'error.403.title' | transloco }}
        </h1>
        <p class="mt-2 text-sm text-muted-color">{{ 'error.403.body' | transloco }}</p>
        <a routerLink="/dashboard" class="mt-6 inline-block">
          <p-button [label]="'error.backHome' | transloco" icon="pi pi-home" />
        </a>
      </div>
    </div>
  `,
})
export class Forbidden {}
