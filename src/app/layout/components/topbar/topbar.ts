import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Menu } from 'primeng/menu';
import { Avatar } from 'primeng/avatar';
import type { MenuItem as PrimeMenuItem } from 'primeng/api';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { LayoutService } from '../../../core/services/layout.service';
import { LanguageService } from '../../../core/services/language.service';
import { SettingsStore } from '../../../core/services/settings.store';

@Component({
  selector: 'app-topbar',
  imports: [TranslocoModule, ButtonModule, Tooltip, Menu, Avatar, Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topbar.html',
})
export class Topbar {
  protected readonly layout = inject(LayoutService);
  protected readonly language = inject(LanguageService);
  protected readonly settings = inject(SettingsStore);

  private readonly profileMenu = viewChild.required<Menu>('profileMenu');

  protected readonly isDark = computed(() => this.settings.darkMode());
  protected readonly langLabel = computed(() => (this.settings.language() === 'fa' ? 'EN' : 'فا'));

  protected readonly profileItems: PrimeMenuItem[] = [
    { label: 'پروفایل', icon: 'pi pi-user' },
    { label: 'تنظیمات', icon: 'pi pi-cog', command: () => this.layout.openSettings() },
    { separator: true },
    { label: 'خروج', icon: 'pi pi-sign-out' },
  ];

  protected toggleSidebar(): void { this.layout.toggleSidebar(); }
  protected toggleDark(): void { this.settings.toggleDarkMode(); }
  protected toggleLang(): void { this.language.toggle(); }
  protected openSettings(): void { this.layout.openSettings(); }
  protected openProfile(e: Event): void { this.profileMenu().toggle(e); }
}
