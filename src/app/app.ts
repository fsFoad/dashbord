import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { SettingsStore } from './core/services/settings.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet />
    <p-toast [position]="toastPos()" />
    <p-confirmdialog [style]="{ maxWidth: '92vw', width: '26rem' }" />
  `,
})
export class App {
  private readonly settings = inject(SettingsStore);
  protected readonly toastPos = computed(() => (this.settings.isRtl() ? 'top-left' : 'top-right'));
}
