import { __decorate } from "tslib";
import { Directive, effect, inject, signal } from '@angular/core';
import { SettingsStore } from '../../../core/services/settings.store';
/**
 * Base for chart widgets: re-renders the chart whenever the theme, custom
 * brand color, surface, dark mode or language changes. A short coalescing
 * timer ensures that changing several settings at once (e.g. applying a theme
 * pack, which updates dark mode + preset + surface together) results in a
 * SINGLE rebuild instead of several stacked Chart.js destroy/recreate cycles.
 */
let ChartBase = class ChartBase {
    settings = inject(SettingsStore);
    chartData = signal(null);
    chartOptions = signal({});
    rebuildTimer = null;
    constructor() {
        effect(() => {
            // theme/locale dependencies:
            this.settings.darkMode();
            this.settings.themePreset();
            this.settings.customPrimaryColor();
            this.settings.surface();
            this.settings.language();
            this.trigger();
            // Coalesce: cancel any pending rebuild and schedule a single one. This
            // collapses a burst of setting changes into one chart rebuild.
            if (this.rebuildTimer !== null)
                clearTimeout(this.rebuildTimer);
            this.rebuildTimer = setTimeout(() => {
                this.rebuildTimer = null;
                this.rebuild();
            }, 60);
        });
    }
};
ChartBase = __decorate([
    Directive()
], ChartBase);
export { ChartBase };
