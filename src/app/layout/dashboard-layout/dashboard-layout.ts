import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Drawer, Sidebar, Topbar, Footer, SettingsPanel, TabBar, Tour, CommandPalette],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  protected readonly layout = inject(LayoutService);
  protected readonly loading = inject(LoadingService);
  private readonly shortcuts = inject(ShortcutService);
  private readonly tour = inject(TourService);

  constructor() {
    this.shortcuts.install();
    this.tour.maybeAutoStart();
  }
  protected readonly settings = inject(SettingsStore);

  protected readonly overlay = computed(() => this.layout.isOverlayMode());

  protected onSettingsVisible(v: boolean): void { this.layout.setSettingsOpen(v); }
  protected onDrawerVisible(v: boolean): void {
    if (!v) this.layout.closeMobileDrawer();
  }
}
