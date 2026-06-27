import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SettingsStore } from '../../core/services/settings.store';

interface Feature { icon: string; t: string; d: string; }
interface Stat { value: string; label: string; }
interface Step { n: string; t: string; d: string; }
interface Plan { key: string; popular: boolean; features: string[]; }

/**
 * Public LANDING page for the site shell. Sections (each with an id so the
 * site nav / search can anchor to them): hero, stats, features, access,
 * steps, pricing, cta. All colors derive from the active theme tokens
 * (primary / surface), so the page recolors with the selected theme pack.
 * Real photos live in /public/landing (optimized webp).
 */
@Component({
  selector: 'app-landing',
  imports: [RouterLink, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ===================== HERO ===================== -->
    <section id="hero" class="relative overflow-hidden pb-16 pt-6 sm:pt-10">
      <!-- ambient gradient blobs (theme-tinted) -->
      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute -top-24 start-1/4 size-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div class="absolute -bottom-32 end-1/4 size-96 rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div class="grid items-center gap-10 lg:grid-cols-2">
        <!-- copy -->
        <div class="text-center lg:text-start">
          <span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span class="size-1.5 rounded-full bg-primary"></span>
            {{ 'landing.hero.badge' | transloco }}
          </span>
          <h1 class="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight text-surface-900 dark:text-surface-0 sm:text-5xl">
            {{ 'landing.hero.title' | transloco }}
          </h1>
          <p class="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-surface-600 dark:text-surface-300 lg:mx-0">
            {{ 'landing.hero.subtitle' | transloco }}
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a routerLink="/dashboard"
               class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-contrast shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">
              {{ 'landing.hero.ctaPrimary' | transloco }}
              <i class="pi pi-arrow-left text-xs rtl:rotate-180"></i>
            </a>
            <a routerLink="/dashboard"
               class="inline-flex items-center gap-2 rounded-xl border border-surface-300 px-6 py-3 text-sm font-semibold text-surface-700 transition-colors hover:bg-surface-100 dark:border-surface-700 dark:text-surface-200 dark:hover:bg-surface-800">
              <i class="pi pi-play-circle"></i>
              {{ 'landing.hero.ctaSecondary' | transloco }}
            </a>
          </div>
        </div>

        <!-- signature: live dashboard mock-up (theme-aware, no stock photo) -->
        <div class="relative mx-auto w-full max-w-md lg:max-w-none">
          <div class="rounded-3xl border border-surface-200 bg-surface-0 p-4 shadow-2xl shadow-primary/10 dark:border-surface-800 dark:bg-surface-900">
            <!-- balance card -->
            <div class="rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-5 text-primary-contrast">
              <p class="text-xs opacity-80">{{ 'landing.hero.mockTitle' | transloco }}</p>
              <p class="mt-1 text-2xl font-bold" dir="ltr">۸٬۵۲۴٬۶۰۰٬۰۰۰ <span class="text-sm font-normal opacity-80">﷼</span></p>
              <div class="mt-4 flex gap-2">
                <span class="h-8 w-12 rounded-md bg-white/25"></span>
                <span class="h-8 w-12 rounded-md bg-white/15"></span>
              </div>
            </div>
            <!-- tx list -->
            <div class="mt-3 space-y-2">
              <p class="px-1 text-xs font-medium text-muted-color">{{ 'landing.hero.mockTxs' | transloco }}</p>
              @for (i of [1,2,3]; track i) {
                <div class="flex items-center gap-3 rounded-xl border border-surface-100 p-2.5 dark:border-surface-800">
                  <span class="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <i class="pi pi-arrow-up-right text-xs rtl:rotate-90"></i>
                  </span>
                  <span class="h-2.5 flex-1 rounded-full bg-surface-200 dark:bg-surface-700"></span>
                  <span class="h-2.5 w-14 rounded-full bg-surface-200 dark:bg-surface-700"></span>
                </div>
              }
            </div>
            <!-- mini chart -->
            <div class="mt-3 flex h-20 items-end gap-1.5 rounded-xl border border-surface-100 p-3 dark:border-surface-800">
              @for (h of barHeights; track $index) {
                <span class="flex-1 rounded-t bg-primary/70" [style.height.%]="h"></span>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== STATS ===================== -->
    <section id="stats" class="border-y border-surface-200 py-10 dark:border-surface-800">
      <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
        @for (s of stats; track s.label) {
          <div class="text-center">
            <p class="text-3xl font-extrabold text-primary sm:text-4xl">{{ s.value }}</p>
            <p class="mt-1 text-xs text-surface-600 dark:text-surface-400 sm:text-sm">{{ s.label | transloco }}</p>
          </div>
        }
      </div>
    </section>

    <!-- ===================== FEATURES ===================== -->
    <section id="features" class="py-16">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wide text-primary">{{ 'landing.features.eyebrow' | transloco }}</span>
        <h2 class="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-0">{{ 'landing.features.title' | transloco }}</h2>
      </div>
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (f of features; track f.t) {
          <div class="group rounded-2xl border border-surface-200 bg-surface-0 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 dark:border-surface-800 dark:bg-surface-900">
            <span class="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-contrast">
              <i [class]="f.icon" class="text-xl"></i>
            </span>
            <h3 class="mt-4 text-lg font-semibold text-surface-900 dark:text-surface-0">{{ f.t | transloco }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-surface-600 dark:text-surface-400">{{ f.d | transloco }}</p>
          </div>
        }
      </div>
    </section>

    <!-- ===================== ACCESS (photo) ===================== -->
    <section id="about" class="grid items-center gap-10 py-16 lg:grid-cols-2">
      <div class="order-2 lg:order-1">
        <span class="text-sm font-semibold uppercase tracking-wide text-primary">{{ 'landing.access.eyebrow' | transloco }}</span>
        <h2 class="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-0">{{ 'landing.access.title' | transloco }}</h2>
        <p class="mt-4 text-base leading-relaxed text-surface-600 dark:text-surface-300">{{ 'landing.access.desc' | transloco }}</p>
        <ul class="mt-6 space-y-3">
          @for (p of accessPoints; track p) {
            <li class="flex items-center gap-3 text-sm text-surface-700 dark:text-surface-200">
              <span class="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <i class="pi pi-check text-[10px]"></i>
              </span>
              {{ p | transloco }}
            </li>
          }
        </ul>
      </div>
      <div class="order-1 lg:order-2">
        <img src="/landing/banking-senior.webp" alt=""
             loading="lazy" width="1000" height="666"
             class="w-full rounded-3xl border border-surface-200 object-cover shadow-xl dark:border-surface-800" />
      </div>
    </section>

    <!-- ===================== TEAM / TRUST (photo) ===================== -->
    <section id="team" class="grid items-center gap-10 py-16 lg:grid-cols-2">
      <div>
        <img src="/landing/team.webp" alt=""
             loading="lazy" width="1200" height="829"
             class="w-full rounded-3xl border border-surface-200 object-cover shadow-xl dark:border-surface-800" />
      </div>
      <div>
        <span class="text-sm font-semibold uppercase tracking-wide text-primary">{{ 'landing.team.eyebrow' | transloco }}</span>
        <h2 class="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-0">{{ 'landing.team.title' | transloco }}</h2>
        <p class="mt-4 text-base leading-relaxed text-surface-600 dark:text-surface-300">{{ 'landing.team.desc' | transloco }}</p>
        <!-- small secondary photos -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <img src="/landing/workspace.webp" alt=""
               loading="lazy" width="1200" height="798"
               class="h-28 w-full rounded-2xl border border-surface-200 object-cover dark:border-surface-800" />
          <img src="/landing/mobile-pay.webp" alt=""
               loading="lazy" width="900" height="1200"
               class="h-28 w-full rounded-2xl border border-surface-200 object-cover object-top dark:border-surface-800" />
        </div>
      </div>
    </section>

    <!-- ===================== STEPS ===================== -->
    <section id="steps" class="py-16">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wide text-primary">{{ 'landing.steps.eyebrow' | transloco }}</span>
        <h2 class="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-0">{{ 'landing.steps.title' | transloco }}</h2>
      </div>
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        @for (st of steps; track st.n) {
          <div class="relative text-center">
            <span class="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-contrast shadow-lg shadow-primary/25">
              {{ st.n }}
            </span>
            <h3 class="mt-4 text-lg font-semibold text-surface-900 dark:text-surface-0">{{ st.t | transloco }}</h3>
            <p class="mt-2 text-sm text-surface-600 dark:text-surface-400">{{ st.d | transloco }}</p>
          </div>
        }
      </div>
    </section>

    <!-- ===================== PRICING ===================== -->
    <section id="pricing" class="py-16">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wide text-primary">{{ 'landing.pricing.eyebrow' | transloco }}</span>
        <h2 class="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-0">{{ 'landing.pricing.title' | transloco }}</h2>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        @for (pl of plans; track pl.key) {
          <div class="relative flex flex-col rounded-2xl border bg-surface-0 p-6 dark:bg-surface-900"
               [class.border-primary]="pl.popular"
               [class.shadow-xl]="pl.popular"
               [class.shadow-primary/10]="pl.popular"
               [class.border-surface-200]="!pl.popular"
               [class.dark:border-surface-800]="!pl.popular">
            @if (pl.popular) {
              <span class="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-contrast rtl:translate-x-1/2">
                {{ 'landing.pricing.popular' | transloco }}
              </span>
            }
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0">{{ 'landing.pricing.' + pl.key + '.t' | transloco }}</h3>
            <p class="mt-3 text-2xl font-extrabold text-surface-900 dark:text-surface-0">{{ 'landing.pricing.' + pl.key + '.price' | transloco }}</p>
            <ul class="mt-6 flex-1 space-y-3">
              @for (f of pl.features; track f) {
                <li class="flex items-center gap-2.5 text-sm text-surface-700 dark:text-surface-200">
                  <i class="pi pi-check text-xs text-primary"></i>
                  {{ f | transloco }}
                </li>
              }
            </ul>
            <a routerLink="/dashboard"
               class="mt-6 rounded-xl py-2.5 text-center text-sm font-semibold transition-colors"
               [class.bg-primary]="pl.popular"
               [class.text-primary-contrast]="pl.popular"
               [class.hover:brightness-105]="pl.popular"
               [class.border]="!pl.popular"
               [class.border-surface-300]="!pl.popular"
               [class.text-surface-700]="!pl.popular"
               [class.hover:bg-surface-100]="!pl.popular"
               [class.dark:border-surface-700]="!pl.popular"
               [class.dark:text-surface-200]="!pl.popular">
              {{ 'landing.pricing.cta' | transloco }}
            </a>
          </div>
        }
      </div>
    </section>

    <!-- ===================== FINAL CTA ===================== -->
    <section id="contact" class="my-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 px-6 py-14 text-center text-primary-contrast">
      <h2 class="mx-auto max-w-2xl text-3xl font-bold">{{ 'landing.cta.title' | transloco }}</h2>
      <p class="mx-auto mt-3 max-w-xl text-sm opacity-90">{{ 'landing.cta.subtitle' | transloco }}</p>
      <a routerLink="/dashboard"
         class="mt-8 inline-flex items-center gap-2 rounded-xl bg-surface-0 px-7 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:-translate-y-0.5">
        {{ 'landing.cta.button' | transloco }}
        <i class="pi pi-arrow-left text-xs rtl:rotate-180"></i>
      </a>
    </section>
  `,
})
export class Landing {
  protected readonly settings = inject(SettingsStore);

  protected readonly barHeights = [40, 65, 50, 80, 55, 90, 70];

  protected readonly stats: Stat[] = [
    { value: '۱۲٬۰۰۰+', label: 'landing.stats.s1' },
    { value: '۸۵۰+', label: 'landing.stats.s2' },
    { value: '٪۹۹٫۹', label: 'landing.stats.s3' },
    { value: '۳۰+', label: 'landing.stats.s4' },
  ];

  protected readonly features: Feature[] = [
    { icon: 'pi pi-wallet', t: 'landing.features.f1.t', d: 'landing.features.f1.d' },
    { icon: 'pi pi-send', t: 'landing.features.f2.t', d: 'landing.features.f2.d' },
    { icon: 'pi pi-percentage', t: 'landing.features.f3.t', d: 'landing.features.f3.d' },
    { icon: 'pi pi-credit-card', t: 'landing.features.f4.t', d: 'landing.features.f4.d' },
    { icon: 'pi pi-chart-bar', t: 'landing.features.f5.t', d: 'landing.features.f5.d' },
    { icon: 'pi pi-shield', t: 'landing.features.f6.t', d: 'landing.features.f6.d' },
  ];

  protected readonly accessPoints = ['landing.access.p1', 'landing.access.p2', 'landing.access.p3'];

  protected readonly steps: Step[] = [
    { n: '۱', t: 'landing.steps.s1.t', d: 'landing.steps.s1.d' },
    { n: '۲', t: 'landing.steps.s2.t', d: 'landing.steps.s2.d' },
    { n: '۳', t: 'landing.steps.s3.t', d: 'landing.steps.s3.d' },
  ];

  protected readonly plans: Plan[] = [
    { key: 'p1', popular: false, features: ['landing.pricing.p1.f1', 'landing.pricing.p1.f2', 'landing.pricing.p1.f3'] },
    { key: 'p2', popular: true, features: ['landing.pricing.p2.f1', 'landing.pricing.p2.f2', 'landing.pricing.p2.f3', 'landing.pricing.p2.f4'] },
    { key: 'p3', popular: false, features: ['landing.pricing.p3.f1', 'landing.pricing.p3.f2', 'landing.pricing.p3.f3'] },
  ];
}
