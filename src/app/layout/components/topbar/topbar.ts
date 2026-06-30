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
@Component({
  selector: 'app-topbar',
  imports: [TranslocoModule, Tooltip, Popover, Breadcrumb, LocalizedDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topbar.html',
})
export class Topbar {
  protected readonly layout = inject(LayoutService);
  protected readonly language = inject(LanguageService);
  protected readonly settings = inject(SettingsStore);
  private readonly auth = inject(AuthService);
  protected readonly notifications = inject(NotificationService);
  private readonly palette = inject(CommandPaletteService);

  protected readonly isDark = computed(() => this.settings.darkMode());
  protected readonly langLabel = computed(
    () => this.language.languages.find((l) => l.code === this.settings.language())?.label ?? '',
  );
  protected readonly currentFlagSrc = computed(
    () => this.language.languages.find((l) => l.code === this.settings.language())?.flagSrc ?? '',
  );

  protected toggleSidebar(): void { this.layout.toggleSidebar(); }
  protected toggleDark(): void { this.settings.toggleDarkMode(); }
  protected pickLang(code: 'fa' | 'en' | 'ar'): void { this.language.set(code); }
  protected openSettings(): void { this.layout.openSettings(); }
  protected openPalette(): void { this.palette.show(); }
  protected logout(): void { this.auth.logout(); }
}
