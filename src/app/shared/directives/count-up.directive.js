import { __decorate } from "tslib";
import { Directive, ElementRef, effect, inject, input, } from '@angular/core';
/**
 * Animates an element's text from 0 up to [appCountUp] when the value changes.
 * Used on KPI cards for a lively dashboard. Honors prefers-reduced-motion
 * (snaps straight to the value) for accessibility.
 *
 *   <span [appCountUp]="value()"></span>
 */
let CountUpDirective = class CountUpDirective {
    host = inject((ElementRef));
    appCountUp = input.required();
    /** ms */
    countUpDuration = input(900);
    raf = 0;
    constructor() {
        effect(() => {
            const target = this.appCountUp();
            this.animate(target);
        });
    }
    animate(target) {
        cancelAnimationFrame(this.raf);
        const el = this.host.nativeElement;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (reduce || target === 0) {
            el.textContent = String(target);
            return;
        }
        const duration = this.countUpDuration();
        const start = performance.now();
        const from = 0;
        const step = (now) => {
            const t = Math.min(1, (now - start) / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(from + (target - from) * eased));
            if (t < 1)
                this.raf = requestAnimationFrame(step);
        };
        this.raf = requestAnimationFrame(step);
    }
};
CountUpDirective = __decorate([
    Directive({ selector: '[appCountUp]' })
], CountUpDirective);
export { CountUpDirective };
