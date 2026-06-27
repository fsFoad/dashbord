import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BRANDING } from '../../core/config/branding.config';
import { resolveSiteMegaMenu } from '../../core/config/menu.config';
import { MenuItem } from '../../core/models/menu-item.model';
import { SettingsStore } from '../../core/services/settings.store';
import { THEME_PACKS } from '../../core/config/theme-packs.config';
import { LanguageService } from '../../core/services/language.service';
import { Footer } from '../components/footer/footer';
import { SiteMegaMenu } from './site-mega-menu/site-mega-menu';
import { SiteMobileAccordion } from './site-mobile-menu/site-mobile-accordion';

/**
 * "Site" layout — a public-facing shell with a modern, clean horizontal
 * navigation (pill style, inspired by contemporary fintech dashboards):
 *   - brand mark on the inline-start
 *   - centered pill nav with a highlight behind the active link
 *   - language / dark-mode controls + a primary CTA on the inline-end
 *   - a slide-in mobile menu under a hamburger on small screens
 *
 * All colors come from the active theme tokens (primary / surface), so the
 * site chrome automatically matches whatever theme pack is selected.
 */
@Component({
  selector: 'app-site-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslocoModule, Footer, SiteMegaMenu, SiteMobileAccordion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-dvh flex-col bg-surface-50 dark:bg-surface-950">
      <!-- ============ HEADER ============ -->
      <header
        class="sticky top-0 z-40 px-3 transition-all duration-300 sm:px-6 relative"
        [class.pt-3]="!scrolled()"
        [class.pt-2]="scrolled()"
      >
        <div
          class="site-bar-tint mx-auto flex h-16 max-w-[80rem] items-center gap-3 rounded-2xl border px-3 transition-all duration-300 sm:px-4"
          [class.shadow-lg]="scrolled()"
        >
          <!-- brand -->
          <a routerLink="/site" class="group flex shrink-0 items-center gap-2.5">
            <span
              class="grid size-9 place-items-center rounded-xl bg-primary font-bold text-primary-contrast shadow-sm transition-transform duration-200 group-hover:scale-105"
            >
              {{ branding.appShortName }}
            </span>
            <span class="hidden text-base font-semibold text-surface-900 dark:text-surface-0 sm:block">
              {{ branding.appName }}
            </span>
          </a>

          <!-- mega menu moved to its own row below for more space -->

          <!-- right controls -->
          <div class="ms-auto flex shrink-0 items-center gap-1">
            <!-- search (opens the mega-menu search overlay) -->
            <button
              type="button"
              (click)="mega.openSearch()"
              [title]="'mega.search' | transloco"
              class="grid size-10 place-items-center rounded-lg text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
            >
              <i class="pi pi-search text-base"></i>
            </button>

            <!-- language dropdown (SVG flag) -->
            <div class="relative">
              <button
                type="button"
                (click)="langMenuOpen.set(!langMenuOpen())"
                [title]="langLabel()"
                class="grid size-10 place-items-center rounded-lg text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                <img [src]="currentFlagSrc()" [alt]="langLabel()" class="size-6 rounded" />
              </button>
              @if (langMenuOpen()) {
                <div
                  class="animate-fade-up absolute end-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-surface-200 bg-surface-0 p-1 shadow-lg dark:border-surface-800 dark:bg-surface-900"
                >
                  @for (l of language.languages; track l.code) {
                    <button
                      type="button"
                      (click)="language.set(l.code); langMenuOpen.set(false)"
                      [class.bg-primary]="settings.language() === l.code"
                      [class.text-primary-contrast]="settings.language() === l.code"
                      [class.hover:bg-surface-100]="settings.language() !== l.code"
                      [class.dark:hover:bg-surface-800]="settings.language() !== l.code"
                      class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    >
                      <img [src]="l.flagSrc" [alt]="l.label" class="size-5 rounded" />
                      <span class="flex-1 text-start">{{ l.label }}</span>
                      @if (settings.language() === l.code) { <i class="pi pi-check text-xs"></i> }
                    </button>
                  }
                </div>
              }
            </div>

            <button
              type="button"
              (click)="settings.toggleDarkMode()"
              class="grid size-10 place-items-center rounded-lg text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              aria-label="Toggle dark mode"
            >
              <i class="pi" [class.pi-moon]="!settings.darkMode()" [class.pi-sun]="settings.darkMode()"></i>
            </button>

            <!-- appearance / theme picker (themes only) -->
            <div class="relative">
              <button
                type="button"
                (click)="themeMenuOpen.set(!themeMenuOpen())"
                [title]="'settings.title' | transloco"
                class="grid size-10 place-items-center rounded-lg text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
              >
                <i class="pi pi-palette text-base"></i>
              </button>
              @if (themeMenuOpen()) {
                <div
                  class="animate-fade-up absolute end-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-2xl border border-surface-200 bg-surface-0 shadow-xl dark:border-surface-800 dark:bg-surface-900"
                >
                  <div class="flex items-center justify-between border-b border-surface-100 px-4 py-2.5 dark:border-surface-800">
                    <span class="text-sm font-semibold">{{ 'settings.themePacks' | transloco }}</span>
                    <button type="button" (click)="themeMenuOpen.set(false)" class="text-surface-400 hover:text-surface-600">
                      <i class="pi pi-times text-xs"></i>
                    </button>
                  </div>
                  <div class="max-h-[60vh] overflow-y-auto p-2">
                    <div class="grid grid-cols-2 gap-1.5">
                      @for (pk of themePacks; track pk.key) {
                        <button
                          type="button"
                          (click)="settings.applyThemePack(pk)"
                          [class.ring-2]="settings.themePack() === pk.key"
                          [class.ring-primary]="settings.themePack() === pk.key"
                          class="group flex flex-col gap-1.5 rounded-xl border border-surface-200 p-2 text-start transition-all hover:-translate-y-0.5 dark:border-surface-700"
                        >
                          <!-- mini-layout preview: strong sidebar + light surface + card -->
                          <span class="flex h-10 w-full overflow-hidden rounded-lg">
                            <span class="h-full w-1/4" [style.background]="pk.sidebarLight"></span>
                            <span class="flex h-full flex-1 flex-col gap-1 p-1" [style.background]="pk.surfaceLight">
                              <span class="h-1.5 w-3/4 rounded-sm bg-white/90"></span>
                              <span class="h-full w-full rounded-sm bg-white/90"></span>
                            </span>
                          </span>
                          <span class="truncate text-[11px] font-medium text-surface-700 dark:text-surface-300">
                            {{ pk.labelKey | transloco }}
                          </span>
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>

            <a
              routerLink="/dashboard"
              class="ms-1 hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-contrast shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 sm:flex"
            >
              {{ 'site.cta' | transloco }}
              <i class="pi pi-arrow-left text-xs rtl:rotate-180"></i>
            </a>

            <button
              type="button"
              (click)="mobileOpen.set(!mobileOpen())"
              [attr.aria-label]="'site.menu' | transloco"
              [attr.aria-expanded]="mobileOpen()"
              class="grid size-10 place-items-center rounded-lg text-surface-700 transition-colors hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800 lg:hidden"
            >
              <i class="pi text-lg" [class.pi-bars]="!mobileOpen()" [class.pi-times]="mobileOpen()"></i>
            </button>
          </div>
        </div>

        <!-- ============ SECOND ROW: full-width mega menu ============ -->
        <div class="mx-auto mt-2 hidden max-w-[80rem] lg:block">
          <div
            class="site-bar-tint flex items-center rounded-2xl border px-2 py-1 transition-all duration-300"
            [class.shadow-lg]="scrolled()"
          >
            <app-site-mega-menu #mega class="w-full" />
          </div>
        </div>

        <!-- ============ MOBILE MENU ============ -->
        @if (mobileOpen()) {
          <div
            class="animate-fade-up mx-auto mt-2 max-w-[80rem] overflow-hidden rounded-2xl border border-surface-200 bg-surface-0/95 p-2 shadow-lg dark:border-surface-800 dark:bg-surface-900/95 lg:hidden"
          >
            <nav class="flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto">
              @for (link of navLinks; track link.id) {
                <app-site-mobile-accordion
                  [item]="link"
                  (navigate)="mobileOpen.set(false)" />
              }
              <a
                routerLink="/dashboard"
                (click)="mobileOpen.set(false)"
                class="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-contrast"
              >
                {{ 'site.cta' | transloco }}
                <i class="pi pi-arrow-left text-xs rtl:rotate-180"></i>
              </a>
            </nav>
          </div>
        }
      </header>

      <!-- ============ CONTENT ============ -->
      <main class="mx-auto w-full max-w-[80rem] flex-1 p-4 sm:p-8">
        <router-outlet />
      </main>

      <app-footer />
    </div>
  `,
})
export class SiteLayout {
  protected readonly branding = BRANDING;
  protected readonly settings = inject(SettingsStore);
  protected readonly language = inject(LanguageService);

  protected readonly navLinks: MenuItem[] = resolveSiteMegaMenu();

  protected readonly mobileOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly langLabel = computed(() =>
    this.language.languages.find((l) => l.code === this.settings.language())?.label ?? '',
  );
  protected readonly currentFlag = computed(() =>
    this.language.languages.find((l) => l.code === this.settings.language())?.flag ?? '🌐',
  );
  protected readonly currentFlagSrc = computed(() =>
    this.language.languages.find((l) => l.code === this.settings.language())?.flagSrc ?? '',
  );
  protected readonly langMenuOpen = signal(false);
  protected readonly themeMenuOpen = signal(false);
  protected readonly themePacks = THEME_PACKS;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'scroll',
        () => this.scrolled.set(window.scrollY > 8),
        { passive: true },
      );
    }
  }
}
