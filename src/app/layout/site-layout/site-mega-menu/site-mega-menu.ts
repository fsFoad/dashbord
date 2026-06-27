import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { MenuItem } from '../../../core/models/menu-item.model';
import { resolveSiteMegaMenu } from '../../../core/config/menu.config';

interface FlatLink {
  label: string;
  route: string;
  path: string[]; // breadcrumb of ancestor labels
}

/**
 * Site MEGA MENU — designed for large, deep navigation trees (banking-style:
 * dozens of categories, hundreds of leaves). Three pieces working together:
 *
 *   1. A horizontal bar of TOP-LEVEL categories.
 *   2. A full-width dropdown panel that opens under the hovered/clicked
 *      category, laying its sub-groups out in responsive columns.
 *   3. A search box that flattens the whole tree and filters leaf links live,
 *      so users can jump anywhere without drilling through menus.
 *
 * Data comes from resolveSiteMenu() (the shared MenuItem tree), so it tracks
 * whatever APP_MENU / SITE_MENU provides. All colors use theme tokens.
 */
@Component({
  selector: 'app-site-mega-menu',
  imports: [RouterLink, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-1 min-w-0">
      <!-- category bar -->
      <nav class="thin-scroll flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto" style="-webkit-mask-image: linear-gradient(to left, transparent, black 1.5rem, black calc(100% - 1.5rem), transparent); mask-image: linear-gradient(to left, transparent, black 1.5rem, black calc(100% - 1.5rem), transparent);">
        @for (cat of categories; track cat.id) {
          <button
            type="button"
            (click)="toggle(cat.id)"
            (mouseenter)="openOnHover(cat.id)"
            [class.bg-primary]="openId() === cat.id"
            [class.text-primary-contrast]="openId() === cat.id"
            [class.text-surface-600]="openId() !== cat.id"
            [class.dark:text-surface-300]="openId() !== cat.id"
            [class.hover:bg-surface-100]="openId() !== cat.id"
            [class.dark:hover:bg-surface-800]="openId() !== cat.id"
            class="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors"
          >
            @if (cat.icon) { <i [class]="cat.icon" class="text-sm"></i> }
            {{ cat.labelKey | transloco }}
            @if (cat.children?.length) {
              <i class="pi pi-angle-down text-xs transition-transform" [class.rotate-180]="openId() === cat.id"></i>
            }
          </button>
        }
      </nav>

    </div>

    <!-- ===== FULL-WIDTH DROPDOWN PANEL ===== -->
    @if (openId(); as oid) {
      @if (activeCategory(); as cat) {
        <div
          class="animate-fade-up absolute inset-x-0 top-full z-50 mt-2 px-3 sm:px-6"
          (mouseleave)="scheduleClose()"
          (mouseenter)="cancelClose()"
        >
          <div
            class="mx-auto max-w-[80rem] overflow-hidden rounded-2xl border border-surface-200 bg-surface-0 shadow-xl dark:border-surface-800 dark:bg-surface-900"
          >
            <div class="grid max-h-[70vh] grid-cols-2 gap-x-6 gap-y-5 overflow-y-auto p-6 md:grid-cols-3 lg:grid-cols-4">
              @for (group of cat.children; track group.id) {
                <div class="min-w-0">
                  <!-- group heading -->
                  <div class="mb-2 flex items-center gap-2 border-b border-surface-100 pb-1.5 dark:border-surface-800">
                    <span class="text-sm font-semibold text-surface-900 dark:text-surface-0">
                      {{ group.labelKey | transloco }}
                    </span>
                  </div>
                  <!-- leaves -->
                  @if (group.children?.length) {
                    <ul class="flex flex-col gap-0.5">
                      @for (leaf of group.children; track leaf.id) {
                        <li>
                          <a
                            [routerLink]="leaf.route"
                            (click)="closeAll()"
                            class="block rounded-md px-2 py-1.5 text-[13px] text-surface-600 transition-colors hover:bg-primary/10 hover:text-primary dark:text-surface-300"
                          >
                            {{ leaf.labelKey | transloco }}
                          </a>
                        </li>
                      }
                    </ul>
                  } @else if (group.route) {
                    <a
                      [routerLink]="group.route"
                      (click)="closeAll()"
                      class="block rounded-md px-2 py-1.5 text-[13px] text-surface-600 transition-colors hover:bg-primary/10 hover:text-primary dark:text-surface-300"
                    >
                      {{ 'mega.open' | transloco }}
                    </a>
                  } @else {
                    <span class="px-2 text-xs text-muted-color">{{ 'mega.empty' | transloco }}</span>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }
    }

    <!-- ===== SEARCH OVERLAY ===== -->
    @if (searchOpen()) {
      <div
        class="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-[12vh]"
        (click)="searchOpen.set(false)"
      >
        <div
          class="animate-fade-up w-full max-w-xl overflow-hidden rounded-2xl border border-surface-200 bg-surface-0 shadow-2xl dark:border-surface-800 dark:bg-surface-900"
          (click)="$event.stopPropagation()"
        >
          <div class="flex items-center gap-3 border-b border-surface-200 px-4 dark:border-surface-800">
            <i class="pi pi-search text-surface-400"></i>
            <input
              #searchInput
              type="text"
              [value]="query()"
              (input)="query.set(searchInput.value)"
              [placeholder]="'mega.searchPlaceholder' | transloco"
              class="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-surface-400"
              autofocus
            />
            <button type="button" (click)="searchOpen.set(false)" class="text-surface-400 hover:text-surface-600">
              <i class="pi pi-times"></i>
            </button>
          </div>
          <div class="max-h-[50vh] overflow-y-auto p-2">
            @if (results().length === 0) {
              <p class="p-6 text-center text-sm text-muted-color">{{ 'mega.noResults' | transloco }}</p>
            } @else {
              @for (r of results(); track r.route) {
                <a
                  [routerLink]="r.route"
                  (click)="closeAll()"
                  class="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
                >
                  <span class="text-sm font-medium text-surface-800 dark:text-surface-100">{{ r.label }}</span>
                  <span class="truncate text-xs text-muted-color">{{ r.path.join(' / ') }}</span>
                </a>
              }
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class SiteMegaMenu {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly categories: MenuItem[] = resolveSiteMegaMenu();

  protected readonly openId = signal<string | null>(null);
  protected readonly searchOpen = signal(false);
  protected readonly query = signal('');
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly activeCategory = computed(() =>
    this.categories.find((c) => c.id === this.openId()) ?? null,
  );

  /** Flatten the whole tree into searchable leaf links (with breadcrumb). */
  private readonly allLinks = computed<FlatLink[]>(() => {
    const out: FlatLink[] = [];
    const walk = (items: MenuItem[], trail: string[]) => {
      for (const it of items) {
        const label = it.labelKey;
        if (it.children?.length) {
          walk(it.children, [...trail, label]);
        } else if (it.route) {
          out.push({ label, route: it.route, path: trail });
        }
      }
    };
    walk(this.categories, []);
    return out;
  });

  protected readonly results = computed<FlatLink[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.allLinks().slice(0, 12);
    return this.allLinks()
      .filter((l) => l.label.toLowerCase().includes(q) || l.path.join(' ').toLowerCase().includes(q))
      .slice(0, 30);
  });

  /** Public: open the search overlay (called from the layout's top bar). */
  openSearch(): void { this.searchOpen.set(true); }

  protected toggle(id: string): void {
    this.openId.update((cur) => (cur === id ? null : id));
  }
  protected openOnHover(id: string): void {
    this.cancelClose();
    if (this.openId() !== null) this.openId.set(id); // only hover-switch if a panel is already open
  }
  protected scheduleClose(): void {
    this.closeTimer = setTimeout(() => this.openId.set(null), 180);
  }
  protected cancelClose(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
  protected closeAll(): void {
    this.openId.set(null);
    this.searchOpen.set(false);
    this.query.set('');
  }
}
