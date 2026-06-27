import {
  Directive, ElementRef, OnChanges, effect, inject, input, signal,
} from '@angular/core';

/**
 * Animates an element's text from 0 up to [appCountUp] when the value changes.
 * Used on KPI cards for a lively dashboard. Honors prefers-reduced-motion
 * (snaps straight to the value) for accessibility.
 *
 *   <span [appCountUp]="value()"></span>
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly appCountUp = input.required<number>();
  /** ms */
  readonly countUpDuration = input(900);

  private raf = 0;

  constructor() {
    effect(() => {
      const target = this.appCountUp();
      this.animate(target);
    });
  }

  private animate(target: number): void {
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

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(from + (target - from) * eased));
      if (t < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }
}
