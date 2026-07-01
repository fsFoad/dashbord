import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { MenuItemComponent } from './menu-item/menu-item';
import { SidebarProfile } from './sidebar-profile/sidebar-profile';
import { BRANDING } from '../../../core/config/branding.config';
import { LayoutService } from '../../../core/services/layout.service';
import { MenuService } from '../../../core/services/menu.service';
import { WhatsNewService } from '../../../core/services/whats-new.service';
import { APP_RELEASE_DATE, APP_VERSION } from '../../../core/config/changelog.config';
import { LocalizedDatePipe } from '../../../shared/pipes/localized-date.pipe';
let Sidebar = class Sidebar {
    layout = inject(LayoutService);
    menuService = inject(MenuService);
    whatsNew = inject(WhatsNewService);
    version = APP_VERSION;
    releaseDate = APP_RELEASE_DATE;
    branding = BRANDING;
    slim = computed(() => this.layout.isSlim());
};
Sidebar = __decorate([
    Component({
        selector: 'app-sidebar',
        imports: [RouterLink, TranslocoModule, Tooltip, MenuItemComponent, SidebarProfile, LocalizedDatePipe],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './sidebar.html',
    })
], Sidebar);
export { Sidebar };
