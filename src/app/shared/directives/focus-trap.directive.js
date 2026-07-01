import { __decorate } from "tslib";
import { DestroyRef, Directive, ElementRef, inject, input, } from '@angular/core';
const FOCUSABLE = 'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
/**
 * Traps Tab focus inside the host element while it's open — required for
 * accessible modal overlays (command palette, tour). Restores focus to the
 * previously focused element on destroy. PrimeNG dialogs trap focus already;
 * this is for our custom overlays.
 *
 *   <div appFocusTrap> … </div>
 */
let FocusTrapDirective = class FocusTrapDirective {
    host = inject((ElementRef));
    destroyRef = inject(DestroyRef);
    /** Set false to disable without removing the directive. */
    appFocusTrap = input('');
    previouslyFocused = null;
    ngAfterViewInit() {
        if (this.appFocusTrap() === false)
            return;
        this.previouslyFocused = document.activeElement;
        queueMicrotask(() => this.focusFirst());
        const onKeydown = (e) => this.onKeydown(e);
        this.host.nativeElement.addEventListener('keydown', onKeydown);
        this.destroyRef.onDestroy(() => {
            this.host.nativeElement.removeEventListener('keydown', onKeydown);
            this.previouslyFocused?.focus?.();
        });
    }
    focusable() {
        const nodes = this.host.nativeElement.querySelectorAll(FOCUSABLE);
        return Array.from(nodes).filter((el) => el.offsetParent !== null);
    }
    focusFirst() {
        const els = this.focusable();
        (els[0] ?? this.host.nativeElement).focus?.();
    }
    onKeydown(e) {
        if (e.key !== 'Tab')
            return;
        const els = this.focusable();
        if (!els.length)
            return;
        const first = els[0];
        const last = els[els.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }
    }
};
FocusTrapDirective = __decorate([
    Directive({ selector: '[appFocusTrap]' })
], FocusTrapDirective);
export { FocusTrapDirective };
