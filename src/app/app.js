import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { SettingsStore } from './core/services/settings.store';
let App = class App {
    settings = inject(SettingsStore);
    toastPos = computed(() => (this.settings.isRtl() ? 'top-left' : 'top-right'));
};
App = __decorate([
    Component({
        selector: 'app-root',
        imports: [RouterOutlet, Toast, ConfirmDialog],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <router-outlet />
    <p-toast [position]="toastPos()" />
    <p-confirmdialog [style]="{ maxWidth: '92vw', width: '26rem' }" />
  `,
    })
], App);
export { App };
