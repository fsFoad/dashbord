import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { Avatar } from 'primeng/avatar';
import { LayoutService } from '../../../../core/services/layout.service';
import { SettingsStore } from '../../../../core/services/settings.store';
import { SessionStore } from '../../../../core/services/session.store';
import { JALALI_MONTHS, JALALI_WEEKDAYS_FULL, dateToJalali, faDigits } from '../../../../core/utils/jalali';

/**
 * Sidebar profile block (above the menu): a centered circular avatar that
 * links to the profile page, the username beneath it, and the current Jalali
 * date — weekday + day + month (no year) — with a season icon. Collapses to
 * just the avatar in slim mode.
 */
@Component({
  selector: 'app-sidebar-profile',
  imports: [RouterLink, TranslocoModule, Tooltip, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col items-center gap-2 border-b border-surface-200 p-3 dark:border-surface-800"
      [class.p-2]="slim()"
    >
      <!-- Avatar → profile page -->
      <a
        routerLink="/profile"
        [pTooltip]="slim() ? (session.user()?.name ?? '') : ''"
        [tooltipPosition]="tooltipPos()"
        class="block rounded-full transition-transform hover:scale-105"
        aria-label="Profile"
      >
        <p-avatar [label]="initials()" [size]="slim() ? 'normal' : 'large'" shape="circle"
          styleClass="bg-primary! text-primary-contrast!" />
      </a>

      @if (!slim()) {
        <!-- Username only -->
        <span class="truncate-1 max-w-full text-center text-sm font-semibold" dir="ltr">
          {{ session.user()?.username }}
        </span>

        <!-- Current Jalali date: weekday + day + month (from the system date, no year) -->
        <div
          [pTooltip]="('season.' + season) | transloco"
          [tooltipPosition]="tooltipPos()"
          class="flex items-center justify-center gap-1.5 text-xs font-medium text-surface-700 dark:text-surface-200"
        >
          <span class="grid size-5 shrink-0 place-items-center">
            @switch (season) {
              @case ('spring') {
                <svg viewBox="0 0 24 24" class="size-5" xmlns="http://www.w3.org/2000/svg">
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
                <svg viewBox="0 0 24 24" class="size-5" xmlns="http://www.w3.org/2000/svg">
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
                <svg viewBox="0 0 24 24" class="size-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3c4 2 6 5 6 9 0 3.3-2.4 6-6 6s-6-2.7-6-6c0-4 2-7 6-9z" fill="#ea580c"/>
                  <path d="M12 6v12M12 10l3-2M12 13l-3-2M12 16l3-2" stroke="#7c2d12" stroke-width="1" fill="none" stroke-linecap="round"/>
                </svg>
              }
              @case ('winter') {
                <svg viewBox="0 0 24 24" class="size-5" xmlns="http://www.w3.org/2000/svg" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round">
                  <line x1="12" y1="2" x2="12" y2="22"/><line x1="3" y1="7" x2="21" y2="17"/><line x1="21" y1="7" x2="3" y2="17"/>
                  <g stroke-width="1.3">
                    <path d="M12 5l-2 1.6M12 5l2 1.6"/><path d="M12 19l-2-1.6M12 19l2-1.6"/>
                    <path d="M4.4 8.2l.4 2M19.6 8.2l-.4 2M4.4 15.8l.4-2M19.6 15.8l-.4-2"/>
                  </g>
                </svg>
              }
            }
          </span>
          <span>{{ jalaliDate }}</span>
        </div>
      }
    </div>
  `,
})
export class SidebarProfile {
  private readonly layout = inject(LayoutService);
  private readonly settings = inject(SettingsStore);
  protected readonly session = inject(SessionStore);

  protected readonly slim = computed(() => this.layout.isSlim());
  /** Tooltips open toward the content side, away from the sidebar. */
  protected readonly tooltipPos = computed(() => (this.settings.isRtl() ? 'left' : 'right'));

  protected readonly initials = computed(() => {
    const name = this.session.user()?.name ?? '?';
    return name.split(/\s+/).slice(0, 2).map((p) => p.charAt(0)).join('');
  });

  // ---- Current Jalali date (from the live system date): weekday + day + month, no year ----
  private readonly now = new Date();
  private readonly todayJalali = dateToJalali(this.now);
  /** e.g. «سه‌شنبه ۹ تیر» */
  protected readonly jalaliDate =
    `${JALALI_WEEKDAYS_FULL[this.now.getDay()]} ${faDigits(this.todayJalali.d)} ${JALALI_MONTHS[this.todayJalali.m - 1]}`;
  protected readonly season: 'spring' | 'summer' | 'autumn' | 'winter' = (() => {
    const m = this.todayJalali.m;
    if (m <= 3) return 'spring';
    if (m <= 6) return 'summer';
    if (m <= 9) return 'autumn';
    return 'winter';
  })();
}
