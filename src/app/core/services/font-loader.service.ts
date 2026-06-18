import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { FontOption } from '../config/fonts.config';

export type FontStatus = 'idle' | 'loading' | 'loaded' | 'failed';

/**
 * Loads on-demand web fonts by injecting their CDN @font-face stylesheet the
 * first time they're selected. The browser fetches the font files itself — the
 * user installs nothing. Bundled/ready fonts resolve instantly.
 */
@Injectable({ providedIn: 'root' })
export class FontLoaderService {
  private readonly doc = inject(DOCUMENT);
  private readonly status = new Map<string, ReturnType<typeof signal<FontStatus>>>();

  /** Reactive status signal for a given font value. */
  statusOf(value: string) {
    let s = this.status.get(value);
    if (!s) {
      s = signal<FontStatus>('idle');
      this.status.set(value, s);
    }
    return s;
  }

  /** Ensure the font is available; resolves true on success. */
  async ensure(font: FontOption): Promise<boolean> {
    const sig = this.statusOf(font.value);
    if (font.ready || !font.cssUrl) {
      sig.set('loaded');
      return true;
    }
    if (sig() === 'loaded') return true;

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
    } catch {
      sig.set('failed');
      return false;
    }
  }

  private injectStylesheet(id: string, href: string): Promise<void> {
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
}
