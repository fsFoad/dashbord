import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Drawer } from 'primeng/drawer';
import { Sidebar } from '../components/sidebar/sidebar';
import { Topbar } from '../components/topbar/topbar';
import { Footer } from '../components/footer/footer';
import { SettingsPanel } from '../components/settings-panel/settings-panel';
import { LayoutService } from '../../core/services/layout.service';
import { LoadingService } from '../../core/services/loading.service';
import { ShortcutService } from '../../core/services/shortcut.service';
import { TourService } from '../../core/services/tour.service';
import { TabBar } from '../components/tab-bar/tab-bar';
import { Tour } from '../components/tour/tour';
import { CommandPalette } from '../../shared/components/command-palette/command-palette';
import { SettingsStore } from '../../core/services/settings.store';
let DashboardLayout = class DashboardLayout {
    layout = inject(LayoutService);
    loading = inject(LoadingService);
    shortcuts = inject(ShortcutService);
    tour = inject(TourService);
    constructor() {
        this.shortcuts.install();
        this.tour.maybeAutoStart();
    }
    settings = inject(SettingsStore);
    overlay = computed(() => this.layout.isOverlayMode());
    onSettingsVisible(v) { this.layout.setSettingsOpen(v); }
    onDrawerVisible(v) {
        if (!v)
            this.layout.closeMobileDrawer();
    }
};
DashboardLayout = __decorate([
    Component({
        selector: 'app-dashboard-layout',
        imports: [RouterOutlet, TranslocoModule, Drawer, Sidebar, Topbar, Footer, SettingsPanel, TabBar, Tour, CommandPalette],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './dashboard-layout.html',
    })
], DashboardLayout);
export { DashboardLayout };
