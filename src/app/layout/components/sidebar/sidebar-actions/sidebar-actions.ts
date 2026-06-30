import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';
import { Popover } from 'primeng/popover';
import type { MenuItem as PrimeMenuItem } from 'primeng/api';
import { LayoutService } from '../../../../core/services/layout.service';
import { LanguageService } from '../../../../core/services/language.service';
import { SettingsStore } from '../../../../core/services/settings.store';
import { SessionStore } from '../../../../core/services/session.store';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommandPaletteService } from '../../../../core/services/command-palette.service';
import { LocalizedDatePipe } from '../../../../shared/pipes/localized-date.pipe';
import { JALALI_MONTHS, dateToJalali, faDigits } from '../../../../core/utils/jalali';

/**
 * The cluster of global actions that used to live in the topbar — search,
 * language, dark/light, notifications, appearance settings, the profile menu
 * (circular avatar) and a seasonal Jalali-date indicator. It sits at the top
 * of the sidebar, above the menu. Collapses to an icon-only stack in slim mode.
 */
@Component({
  selector: 'app-sidebar-actions',
  imports: [TranslocoModule, Tooltip, Menu, Avatar, Popover, LocalizedDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col border-b border-surface-200 p-2 dark:border-surface-800"
      [class.gap-2]="!slim()"
      [class.items-center]="slim()"
      [class.gap-1]="slim()"
    >
      <!-- Profile (circular avatar) -->
      <button
        type="button"
        (click)="profileMenu.toggle($event)"
        [pTooltip]="slim() ? (session.user()?.name ?? '') : ''"
        [tooltipPosition]="tooltipPos()"
        class="flex items-center gap-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
        [class.w-full]="!slim()"
        [class.p-1.5]="!slim()"
        [class.p-1]="slim()"
        aria-label="Profile"
      >
        <p-avatar [label]="initials()" shape="circle" styleClass="bg-primary! text-primary-contrast!" />
        @if (!slim()) {
          <span class="min-w-0 flex-1 text-start">
            <span class="truncate-1 block text-sm font-medium">{{ session.user()?.name }}</span>
            <span class="truncate-1 block text-[11px] text-muted-color" dir="ltr">{{ session.user()?.username }}</span>
          </span>
          <i class="pi pi-angle-down shrink-0 text-xs text-muted-color"></i>
        }
      </button>
      <p-menu #profileMenu [model]="profileItems()" [popup]="true" appendTo="body" />

      <!-- Action icons -->
      <div
        class="flex items-center gap-1"
        [class.justify-between]="!slim()"
        [class.flex-col]="slim()"
      >
        <!-- Search (command palette) -->
        <button
          type="button"
          data-tour="palette"
          (click)="openPalette()"
          [pTooltip]="'palette.tooltip' | transloco"
          [tooltipPosition]="tooltipPos()"
          class="grid size-10 place-items-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          aria-label="Search"
        >
          <i class="pi pi-search text-lg"></i>
        </button>

        <!-- Language -->
        <button
          type="button"
          (click)="langMenu.toggle($event)"
          [pTooltip]="langLabel()"
          [tooltipPosition]="tooltipPos()"
          class="grid size-10 place-items-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
        >
          <img [src]="currentFlagSrc()" [alt]="langLabel()" class="size-6 rounded" />
        </button>
        <p-popover #langMenu>
          <div class="flex w-40 flex-col">
            @for (l of language.languages; track l.code) {
              <button
                type="button"
                (click)="pickLang(l.code); langMenu.hide()"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-start text-sm hover:bg-surface-100 dark:hover:bg-surface-800"
                [class.text-primary]="settings.language() === l.code"
                [class.font-semibold]="settings.language() === l.code"
              >
                <img [src]="l.flagSrc" [alt]="l.label" class="size-5 rounded" />
                <span class="flex-1">{{ l.label }}</span>
                @if (settings.language() === l.code) { <i class="pi pi-check text-xs"></i> }
              </button>
            }
          </div>
        </p-popover>

        <!-- Dark / light -->
        <button
          type="button"
          (click)="toggleDark()"
          [pTooltip]="'common.theme' | transloco"
          [tooltipPosition]="tooltipPos()"
          class="grid size-10 place-items-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          aria-label="Toggle dark mode"
        >
          <i class="pi text-lg" [class.pi-moon]="!isDark()" [class.pi-sun]="isDark()"></i>
        </button>

        <!-- Notifications -->
        <button
          type="button"
          data-tour="bell"
          (click)="notifPanel.toggle($event)"
          [pTooltip]="'common.notifications' | transloco"
          [tooltipPosition]="tooltipPos()"
          class="relative grid size-10 place-items-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          aria-label="Notifications"
        >
          <i class="pi pi-bell text-lg"></i>
          @if (notifications.unread() > 0) {
            <span class="absolute -end-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-contrast">
              {{ notifications.unread() }}
            </span>
          }
        </button>
        <p-popover #notifPanel [style]="{ width: '22rem', maxWidth: '92vw' }">
          <div class="flex items-center justify-between pb-2">
            <span class="text-sm font-semibold">{{ 'common.notifications' | transloco }}</span>
            @if (notifications.unread() > 0) {
              <button type="button" (click)="notifications.markAllRead()" class="text-xs text-primary hover:underline">
                {{ 'notif.markAll' | transloco }}
              </button>
            }
          </div>
          <ul class="thin-scroll -mx-1 flex max-h-80 flex-col gap-0.5 overflow-y-auto px-1">
            @for (n of notifications.items(); track n.id) {
              <li>
                <button
                  type="button"
                  (click)="notifications.markRead(n.id)"
                  class="flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start hover:bg-surface-100 dark:hover:bg-surface-800"
                >
                  <span class="relative mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <i [class]="n.icon" class="text-sm"></i>
                    @if (!n.read) {
                      <span class="absolute -end-0.5 -top-0.5 size-2 rounded-full bg-primary"></span>
                    }
                  </span>
                  <span class="min-w-0">
                    <span class="block text-sm leading-snug" [class.font-semibold]="!n.read">
                      {{ n.messageKey | transloco: n.messageParams }}
                    </span>
                    <span class="mt-0.5 block text-[11px] text-muted-color">{{ n.createdAt | appDate: true }}</span>
                  </span>
                </button>
              </li>
            } @empty {
              <li class="py-8 text-center text-sm text-muted-color">{{ 'notif.empty' | transloco }}</li>
            }
          </ul>
        </p-popover>

        <!-- Appearance settings -->
        <button
          type="button"
          data-tour="settings"
          (click)="openSettings()"
          [pTooltip]="'common.settings' | transloco"
          [tooltipPosition]="tooltipPos()"
          class="grid size-10 place-items-center rounded-lg text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          aria-label="Settings"
        >
          <i class="pi pi-sliders-h text-lg"></i>
        </button>
      </div>

      <!-- Seasonal indicator: season icon + today's Jalali day & month (no year) -->
      @if (!slim()) {
        <div
          [pTooltip]="('season.' + season) | transloco"
          [tooltipPosition]="tooltipPos()"
          class="flex h-9 items-center justify-center gap-2 rounded-lg border border-surface-200 px-2.5 dark:border-surface-700"
        >
          <span class="grid size-6 shrink-0 place-items-center">
            @switch (season) {
              @case ('spring') {
                <svg viewBox="0 0 24 24" class="size-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13v8" stroke="#16a34a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                  <path d="M12 18c-2 0-3.6-1-4.2-2.6" stroke="#16a34a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
                  <g fill="#f472b6">
                    <circle cx="12" cy="6.6" r="2.4"/><circle cx="8.6" cy="8.8" r="2.4"/>
                    <circle cx="15.4" cy="8.8" r="2.4"/><circle cx="9.6" cy="5.4" r="2.4"/><circle cx="14.4" cy="5.4" r="2.4"/>
                  </g>
                  <circle cx="12" cy="7" r="1.7" fill="#fde047"/>
                </svg>
              }
              @case ('summer') {
                <svg viewBox="0 0 24 24" class="size-6" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" fill="#fbbf24"/>
                  <g stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round">
                    <line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/>
                    <line x1="4.9" y1="4.9" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.1" y2="19.1"/>
                    <line x1="19.1" y1="4.9" x2="17.3" y2="6.7"/><line x1="6.7" y1="17.3" x2="4.9" y2="19.1"/>
                  </g>
                </svg>
              }
              @case ('autumn') {
                <svg viewBox="0 0 24 24" class="size-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3c4 2 6 5 6 9 0 3.3-2.4 6-6 6s-6-2.7-6-6c0-4 2-7 6-9z" fill="#ea580c"/>
                  <path d="M12 6v12M12 10l3-2M12 13l-3-2M12 16l3-2" stroke="#7c2d12" stroke-width="1" fill="none" stroke-linecap="round"/>
                </svg>
              }
              @case ('winter') {
                <svg viewBox="0 0 24 24" class="size-6" xmlns="http://www.w3.org/2000/svg" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round">
                  <line x1="12" y1="2" x2="12" y2="22"/><line x1="3" y1="7" x2="21" y2="17"/><line x1="21" y1="7" x2="3" y2="17"/>
                  <g stroke-width="1.3">
                    <path d="M12 5l-2 1.6M12 5l2 1.6"/><path d="M12 19l-2-1.6M12 19l2-1.6"/>
                    <path d="M4.4 8.2l.4 2M19.6 8.2l-.4 2M4.4 15.8l.4-2M19.6 15.8l-.4-2"/>
                  </g>
                </svg>
              }
            }
          </span>
          <span class="text-xs font-medium text-surface-700 dark:text-surface-200">{{ jalaliDayMonth }}</span>
        </div>
      }
    </div>
  `,
})
export class SidebarActions {
  protected readonly layout = inject(LayoutService);
  protected readonly language = inject(LanguageService);
  protected readonly settings = inject(SettingsStore);
  protected readonly session = inject(SessionStore);
  private readonly auth = inject(AuthService);
  protected readonly notifications = inject(NotificationService);
  private readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);

  protected readonly slim = computed(() => this.layout.isSlim());

  /** Tooltips open toward the content side, away from the sidebar. */
  protected readonly tooltipPos = computed(() => (this.settings.isRtl() ? 'left' : 'right'));

  /** Re-emits whenever the active translation (re)loads → labels stay i18n'd. */
  private readonly translation = toSignal(this.transloco.selectTranslation(), { initialValue: {} });

  protected readonly isDark = computed(() => this.settings.darkMode());
  protected readonly langLabel = computed(
    () => this.language.languages.find((l) => l.code === this.settings.language())?.label ?? '',
  );
  protected readonly currentFlagSrc = computed(
    () => this.language.languages.find((l) => l.code === this.settings.language())?.flagSrc ?? '',
  );

  protected readonly initials = computed(() => {
    const name = this.session.user()?.name ?? '?';
    return name.split(/\s+/).slice(0, 2).map((p) => p.charAt(0)).join('');
  });

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

  // ---- Seasonal indicator: season icon + today's Jalali day & month (no year) ----
  private readonly todayJalali = dateToJalali(new Date());
  protected readonly jalaliDayMonth =
    `${faDigits(this.todayJalali.d)} ${JALALI_MONTHS[this.todayJalali.m - 1]}`;
  protected readonly season: 'spring' | 'summer' | 'autumn' | 'winter' = (() => {
    const m = this.todayJalali.m;
    if (m <= 3) return 'spring';
    if (m <= 6) return 'summer';
    if (m <= 9) return 'autumn';
    return 'winter';
  })();

  protected toggleDark(): void { this.settings.toggleDarkMode(); }
  protected pickLang(code: 'fa' | 'en' | 'ar'): void { this.language.set(code); }
  protected openSettings(): void { this.layout.openSettings(); }
  protected openPalette(): void { this.palette.show(); }
}
