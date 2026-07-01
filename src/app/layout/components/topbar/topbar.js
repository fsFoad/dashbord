import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { Popover } from 'primeng/popover';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { LayoutService } from '../../../core/services/layout.service';
import { LanguageService } from '../../../core/services/language.service';
import { SettingsStore } from '../../../core/services/settings.store';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { LocalizedDatePipe } from '../../../shared/pipes/localized-date.pipe';
/**
 * Topbar: sidebar toggle, breadcrumb, and the global action icons — search,
 * language, dark/light, notifications, appearance settings and logout. The
 * profile avatar, username and the current Jalali date live in the sidebar
 * (see `SidebarProfile`).
 */
let Topbar = class Topbar {
    layout = inject(LayoutService);
    language = inject(LanguageService);
    settings = inject(SettingsStore);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    palette = inject(CommandPaletteService);
    isDark = computed(() => this.settings.darkMode());
    langLabel = computed(() => this.language.languages.find((l) => l.code === this.settings.language())?.label ?? '');
    currentFlagSrc = computed(() => this.language.languages.find((l) => l.code === this.settings.language())?.flagSrc ?? '');
    toggleSidebar() { this.layout.toggleSidebar(); }
    toggleDark() { this.settings.toggleDarkMode(); }
    pickLang(code) { this.language.set(code); }
    openSettings() { this.layout.openSettings(); }
    openPalette() { this.palette.show(); }
    logout() { this.auth.logout(); }
};
Topbar = __decorate([
    Component({
        selector: 'app-topbar',
        imports: [TranslocoModule, Tooltip, Popover, Breadcrumb, LocalizedDatePipe],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './topbar.html',
    })
], Topbar);
export { Topbar };
