import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { Popover } from 'primeng/popover';
import type { MenuItem as PrimeMenuItem } from 'primeng/api';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { JALALI_MONTHS, dateToJalali, faDigits } from '../../../core/utils/jalali';
import { LayoutService } from '../../../core/services/layout.service';
import { LanguageService } from '../../../core/services/language.service';
import { SettingsStore } from '../../../core/services/settings.store';
import { SessionStore } from '../../../core/services/session.store';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { LocalizedDatePipe } from '../../../shared/pipes/localized-date.pipe';

@Component({
  selector: 'app-topbar',
  imports: [TranslocoModule, ButtonModule, Tooltip, Menu, Popover, Breadcrumb, LocalizedDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topbar.html',
})
export class Topbar {
  protected readonly layout = inject(LayoutService);
  protected readonly language = inject(LanguageService);
  protected readonly settings = inject(SettingsStore);
  protected readonly session = inject(SessionStore);
  private readonly auth = inject(AuthService);
  protected readonly notifications = inject(NotificationService);
  private readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);

  private readonly profileMenu = viewChild.required<Menu>('profileMenu');

  /** Re-emits whenever the active translation (re)loads → labels stay i18n'd. */
  private readonly translation = toSignal(this.transloco.selectTranslation(), {
    initialValue: {},
  });

  protected readonly isDark = computed(() => this.settings.darkMode());
  protected readonly langLabel = computed(() =>
    this.language.languages.find((l) => l.code === this.settings.language())?.label ?? '',
  );
  /** Flag emoji of the currently active language (compact language indicator). */
  protected readonly currentFlag = computed(() =>
    this.language.languages.find((l) => l.code === this.settings.language())?.flag ?? '🌐',
  );
  protected readonly currentFlagSrc = computed(() =>
    this.language.languages.find((l) => l.code === this.settings.language())?.flagSrc ?? '',
  );

  /** The signed-in user's username (shown in the topbar instead of an avatar). */
  protected readonly username = computed(() => this.session.user()?.username ?? '');

  // ---- Seasonal indicator: a season icon + today's Jalali day & month (no year) ----
  private readonly todayJalali = dateToJalali(new Date());

  /** e.g. «۹ تیر» — Jalali day + month name, no year. */
  protected readonly jalaliDayMonth =
    `${faDigits(this.todayJalali.d)} ${JALALI_MONTHS[this.todayJalali.m - 1]}`;

  /** Current season derived from the Jalali month (1-3 spring, … 10-12 winter). */
  protected readonly season: 'spring' | 'summer' | 'autumn' | 'winter' = (() => {
    const m = this.todayJalali.m;
    if (m <= 3) return 'spring';
    if (m <= 6) return 'summer';
    if (m <= 9) return 'autumn';
    return 'winter';
  })();

  protected readonly profileItems = computed<PrimeMenuItem[]>(() => {
    this.translation(); // dependency: rebuild on language change
    const t = (key: string) => this.transloco.translate(key);
    return [
      { label: t('menu.profile'), icon: 'pi pi-user', command: () => this.router.navigate(['/profile']) },
      { label: t('common.settings'), icon: 'pi pi-sliders-h', command: () => this.layout.openSettings() },
      { separator: true },
      { label: t('auth.logout'), icon: 'pi pi-sign-out', command: () => this.auth.logout() },
    ];
  });

  protected toggleSidebar(): void { this.layout.toggleSidebar(); }
  protected toggleDark(): void { this.settings.toggleDarkMode(); }
  protected toggleLang(): void { this.language.toggle(); }
  protected pickLang(code: 'fa' | 'en' | 'ar'): void { this.language.set(code); }
  protected openSettings(): void { this.layout.openSettings(); }
  protected openProfile(e: Event): void { this.profileMenu().toggle(e); }
  protected openPalette(): void { this.palette.show(); }
}
