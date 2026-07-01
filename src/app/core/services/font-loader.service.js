import { __decorate } from "tslib";
import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
/**
 * Loads on-demand web fonts by injecting their CDN @font-face stylesheet the
 * first time they're selected. The browser fetches the font files itself — the
 * user installs nothing. Bundled/ready fonts resolve instantly.
 */
let FontLoaderService = class FontLoaderService {
    doc = inject(DOCUMENT);
    status = new Map();
    /** Reactive status signal for a given font value. */
    statusOf(value) {
        let s = this.status.get(value);
        if (!s) {
            s = signal('idle');
            this.status.set(value, s);
        }
        return s;
    }
    /** Ensure the font is available; resolves true on success. */
    async ensure(font) {
        const sig = this.statusOf(font.value);
        if (font.ready || !font.cssUrl) {
            sig.set('loaded');
            return true;
        }
        if (sig() === 'loaded')
            return true;
        const id = 'font-' + font.cssUrl;
        if (this.doc.getElementById(id)) {
            sig.set('loaded');
            return true;
        }
        sig.set('loading');
        try {
            await this.injectStylesheet(id, font.cssUrl);
            sig.set('loaded');
            return true;
        }
        catch {
            sig.set('failed');
            return false;
        }
    }
    injectStylesheet(id, href) {
        return new Promise((resolve, reject) => {
            const link = this.doc.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = href;
            const timer = setTimeout(() => {
                link.remove();
                reject(new Error('timeout'));
            }, 8000);
            link.onload = () => {
                clearTimeout(timer);
                resolve();
            };
            link.onerror = () => {
                clearTimeout(timer);
                link.remove();
                reject(new Error('failed'));
            };
            this.doc.head.appendChild(link);
        });
    }
};
FontLoaderService = __decorate([
    Injectable({ providedIn: 'root' })
], FontLoaderService);
export { FontLoaderService };
