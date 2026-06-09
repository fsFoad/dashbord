import { DOCUMENT, DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/** Tailwind-aligned widths. */
const TABLET_MIN = 768; // md
const DESKTOP_MIN = 1024; // lg

/**
 * Reactive viewport awareness. Components read `isMobile()` etc. as signals.
 * Used by the layout to switch the sidebar to a slide-over drawer on phones.
 */
@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly width = signal<number>(this.currentWidth());

  readonly breakpoint = computed<Breakpoint>(() => {
    const w = this.width();
    if (w < TABLET_MIN) return 'mobile';
    if (w < DESKTOP_MIN) return 'tablet';
    return 'desktop';
  });

  readonly isMobile = computed(() => this.breakpoint() === 'mobile');
  readonly isTablet = computed(() => this.breakpoint() === 'tablet');
  readonly isDesktop = computed(() => this.breakpoint() === 'desktop');
  /** Below the desktop breakpoint the sidebar should behave as an overlay. */
  readonly isHandheld = computed(() => this.width() < DESKTOP_MIN);

  constructor() {
    const view = this.doc.defaultView;
    if (!view) return;

    const onResize = () => this.width.set(this.currentWidth());
    view.addEventListener('resize', onResize, { passive: true });
    this.destroyRef.onDestroy(() => view.removeEventListener('resize', onResize));
  }

  private currentWidth(): number {
    return this.doc.defaultView?.innerWidth ?? DESKTOP_MIN;
  }
}
