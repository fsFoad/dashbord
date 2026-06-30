import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';

export interface Crumb {
  /** i18n key (auto breadcrumb from route data). */
  labelKey?: string;
  /** Literal label — used when there is no translation key (e.g. demos). */
  label?: string;
  /** Optional link target. */
  route?: string;
}

/** A rendered breadcrumb cell: a real crumb, or the collapsed "…" marker. */
type CrumbView =
  | { kind: 'crumb'; crumb: Crumb; last: boolean }
  | { kind: 'ellipsis' };

/**
 * Auto breadcrumb. Walks the *snapshot* tree (router.routerState.snapshot),
 * which is always defined — unlike ActivatedRoute.snapshot during the very
 * first render — and collects every route `data.titleKey` on the way down.
 *
 * Overflow handling (so a long trail never collides with the topbar search):
 *  1. The host container in the topbar is `min-w-0 flex-1`, so the breadcrumb
 *     shares space and the (shrink-0) quick-actions are never pushed.
 *  2. Each crumb truncates individually to one line (`max-w-[40vw]`).
 *  3. Beyond `MAX_VISIBLE` crumbs the middle collapses to a clickable "…"
 *     (first + … + last two). Clicking it expands the full trail, which then
 *     scrolls horizontally inside its own track rather than overflowing.
 *
 * Pass an explicit `items` array to render a fixed trail (used by demos);
 * otherwise it builds itself from the active route.
 */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, TranslocoModule, Tooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="thin-scroll flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm text-muted-color"
      aria-label="breadcrumb"
    >
      <a routerLink="/dashboard" class="shrink-0 hover:text-primary"><i class="pi pi-home text-xs"></i></a>
      @for (v of display(); track $index) {
        <i class="pi pi-angle-left shrink-0 text-[10px] opacity-60 ltr:rotate-180"></i>
        @if (v.kind === 'ellipsis') {
          <button
            type="button"
            (click)="expanded.set(true)"
            [pTooltip]="'breadcrumb.showAll' | transloco"
            tooltipPosition="bottom"
            class="shrink-0 rounded px-1 font-semibold leading-none hover:text-primary"
            aria-label="Show all breadcrumb items"
          >…</button>
        } @else if (v.crumb.route && !v.last) {
          <a
            [routerLink]="v.crumb.route"
            class="truncate-1 max-w-[40vw] shrink-0 hover:text-primary"
          >
            @if (v.crumb.label) { {{ v.crumb.label }} } @else { {{ v.crumb.labelKey! | transloco }} }
          </a>
        } @else {
          <span
            class="truncate-1 max-w-[40vw] shrink-0"
            [class.text-surface-900]="v.last"
            [class.dark:text-surface-0]="v.last"
          >
            @if (v.crumb.label) { {{ v.crumb.label }} } @else { {{ v.crumb.labelKey! | transloco }} }
          </span>
        }
      }
    </nav>
  `,
})
export class Breadcrumb {
  private readonly router = inject(Router);

  /** Optional fixed trail; when null the breadcrumb derives itself from routes. */
  readonly items = input<Crumb[] | null>(null);

  /** Show the first + … + last two when the trail is longer than this. */
  private readonly MAX_VISIBLE = 4;

  private readonly auto = signal<Crumb[]>([]);
  protected readonly crumbs = computed(() => this.items() ?? this.auto());
  protected readonly expanded = signal(false);

  protected readonly collapsed = computed(
    () => !this.expanded() && this.crumbs().length > this.MAX_VISIBLE,
  );

  protected readonly display = computed<CrumbView[]>(() => {
    const all = this.crumbs();
    const lastIdx = all.length - 1;
    if (!this.collapsed()) {
      return all.map((crumb, i) => ({ kind: 'crumb', crumb, last: i === lastIdx }));
    }
    // Collapsed: first crumb + ellipsis + the last two crumbs.
    const out: CrumbView[] = [
      { kind: 'crumb', crumb: all[0], last: false },
      { kind: 'ellipsis' },
    ];
    for (let i = lastIdx - 1; i <= lastIdx; i++) {
      out.push({ kind: 'crumb', crumb: all[i], last: i === lastIdx });
    }
    return out;
  });

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.auto.set(this.build()));

    // Initial value (safe even mid-first-navigation thanks to the snapshot tree).
    this.auto.set(this.build());

    // Re-collapse whenever the trail changes (navigation or new demo input).
    effect(() => {
      this.crumbs();
      this.expanded.set(false);
    });
  }

  private build(): Crumb[] {
    const trail: Crumb[] = [];
    let s: ActivatedRouteSnapshot | null | undefined = this.router.routerState?.snapshot?.root;
    while (s) {
      const key = s.data?.['titleKey'] as string | undefined;
      if (key) trail.push({ labelKey: key });
      s = s.firstChild;
    }
    return trail;
  }
}
