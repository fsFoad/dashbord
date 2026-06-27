import {
  AfterViewInit, DestroyRef, Directive, ElementRef, inject, input,
} from '@angular/core';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus inside the host element while it's open — required for
 * accessible modal overlays (command palette, tour). Restores focus to the
 * previously focused element on destroy. PrimeNG dialogs trap focus already;
 * this is for our custom overlays.
 *
 *   <div appFocusTrap> … </div>
 */
@Directive({ selector: '[appFocusTrap]' })
export class FocusTrapDirective implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** Set false to disable without removing the directive. */
  readonly appFocusTrap = input<boolean | ''>('');

  private previouslyFocused: HTMLElement | null = null;

  ngAfterViewInit(): void {
    if (this.appFocusTrap() === false) return;

    this.previouslyFocused = document.activeElement as HTMLElement | null;
    queueMicrotask(() => this.focusFirst());

    const onKeydown = (e: KeyboardEvent) => this.onKeydown(e);
    this.host.nativeElement.addEventListener('keydown', onKeydown);

    this.destroyRef.onDestroy(() => {
      this.host.nativeElement.removeEventListener('keydown', onKeydown);
      this.previouslyFocused?.focus?.();
    });
  }

  private focusable(): HTMLElement[] {
    const nodes = this.host.nativeElement.querySelectorAll(FOCUSABLE);
    return (Array.from(nodes) as HTMLElement[]).filter((el) => el.offsetParent !== null);
  }

  private focusFirst(): void {
    const els = this.focusable();
    (els[0] ?? this.host.nativeElement).focus?.();
  }

  private onKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const els = this.focusable();
    if (!els.length) return;
    const first = els[0];
    const last = els[els.length - 1];
    const active = document.activeElement as HTMLElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
