import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideTransloco } from '@jsverse/transloco';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { mockBackendInterceptor } from './core/interceptors/mock-backend.interceptor';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { GlobalErrorHandler } from './core/handlers/global-error-handler';
import { TabReuseStrategy } from './core/routing/tab-reuse.strategy';
import { ThemeService } from './core/services/theme.service';
import { FontService } from './core/services/font.service';
import { LanguageService } from './core/services/language.service';
import { provideTableDefaults } from './shared/components/data-table';

/**
 * Base preset built on Aura. The actual primary/surface palettes are swapped
 * at runtime by ThemeService, so here we only fix structural choices.
 */
const AppPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}', 100: '{indigo.100}', 200: '{indigo.200}', 300: '{indigo.300}',
      400: '{indigo.400}', 500: '{indigo.500}', 600: '{indigo.600}', 700: '{indigo.700}',
      800: '{indigo.800}', 900: '{indigo.900}', 950: '{indigo.950}',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // پیش‌فرض سراسری همه‌ی جدول‌ها — اینجا تغییر بده تا روی همه اعمال شود
    provideTableDefaults({ striped: true, rows: 10, size: 'normal' }),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideHttpClient(
      withFetch(),
      // Order matters: loading wraps everything; errors are mapped before the
      // mock backend is swapped for a real API (just remove the last one then).
      withInterceptors([
        baseUrlInterceptor,
        authInterceptor,
        loadingInterceptor,
        errorInterceptor,
        mockBackendInterceptor,
      ]),
    ),
    provideAnimationsAsync(),

    // Global UX services (toast / confirm) + runtime error handler.
    MessageService,
    ConfirmationService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // Keep each open tab's component alive (Signals state survives tab switches).
    { provide: RouteReuseStrategy, useClass: TabReuseStrategy },

    providePrimeNG({
      ripple: true,
      theme: {
        preset: AppPreset,
        options: {
          // Manual dark mode toggled via the .app-dark class (see ThemeService).
          darkModeSelector: '.app-dark',
          // Put PrimeNG styles in their own layer so Tailwind utilities win.
          cssLayer: { name: 'primeng', order: 'theme, base, primeng, components, utilities' },
        },
      },
    }),

    provideTransloco({
      config: {
        availableLangs: ['fa', 'en', 'ar'],
        defaultLang: 'fa',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false,
      },
      loader: TranslocoHttpLoader,
    }),

    // Instantiate the side-effect services once at startup so their effects
    // (theme/font/language) run and apply persisted settings immediately.
    provideAppInitializer(() => {
      inject(ThemeService);
      inject(FontService);
      inject(LanguageService);
    }),
  ],
};
