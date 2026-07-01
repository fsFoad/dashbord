import { __decorate } from "tslib";
import { DOCUMENT, DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
/** Tailwind-aligned widths. */
const TABLET_MIN = 768; // md
const DESKTOP_MIN = 1024; // lg
/**
 * Reactive viewport awareness. Components read `isMobile()` etc. as signals.
 * Used by the layout to switch the sidebar to a slide-over drawer on phones.
 */
let ResponsiveService = class ResponsiveService {
    doc = inject(DOCUMENT);
    destroyRef = inject(DestroyRef);
    width = signal(this.currentWidth());
    breakpoint = computed(() => {
        const w = this.width();
        if (w < TABLET_MIN)
            return 'mobile';
        if (w < DESKTOP_MIN)
            return 'tablet';
        return 'desktop';
    });
    isMobile = computed(() => this.breakpoint() === 'mobile');
    isTablet = computed(() => this.breakpoint() === 'tablet');
    isDesktop = computed(() => this.breakpoint() === 'desktop');
    /** Below the desktop breakpoint the sidebar should behave as an overlay. */
    isHandheld = computed(() => this.width() < DESKTOP_MIN);
    constructor() {
        const view = this.doc.defaultView;
        if (!view)
            return;
        const onResize = () => this.width.set(this.currentWidth());
        view.addEventListener('resize', onResize, { passive: true });
        this.destroyRef.onDestroy(() => view.removeEventListener('resize', onResize));
    }
    currentWidth() {
        return this.doc.defaultView?.innerWidth ?? DESKTOP_MIN;
    }
};
ResponsiveService = __decorate([
    Injectable({ providedIn: 'root' })
], ResponsiveService);
export { ResponsiveService };
