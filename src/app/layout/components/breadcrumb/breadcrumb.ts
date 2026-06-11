import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';

interface Crumb {
  labelKey: string;
}

/**
 * Auto breadcrumb. Walks the *snapshot* tree (router.routerState.snapshot),
 * which is always defined — unlike ActivatedRoute.snapshot during the very
 * first render — and collects every route `data.titleKey` on the way down.
 */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center gap-1.5 text-sm text-muted-color" aria-label="breadcrumb">
      <a routerLink="/dashboard" class="hover:text-primary"><i class="pi pi-home text-xs"></i></a>
      @for (c of crumbs(); track $index) {
        <i class="pi pi-angle-left text-[10px] opacity-60 ltr:rotate-180"></i>
        <span
          class="truncate-1 max-w-[40vw]"
          [class.text-surface-900]="$last"
          [class.dark:text-surface-0]="$last"
        >
          {{ c.labelKey | transloco }}
        </span>
      }
    </nav>
  `,
})
export class Breadcrumb {
  private readonly router = inject(Router);

  protected readonly crumbs = signal<Crumb[]>([]);

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.crumbs.set(this.build()));

    // Initial value (safe even mid-first-navigation thanks to the snapshot tree).
    this.crumbs.set(this.build());
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
