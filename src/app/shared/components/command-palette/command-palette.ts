import {
  ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild, ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Dialog } from 'primeng/dialog';
import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { ShortcutService } from '../../../core/services/shortcut.service';
import { MenuService } from '../../../core/services/menu.service';
import { SettingsStore } from '../../../core/services/settings.store';
import { LanguageService } from '../../../core/services/language.service';
import { LayoutService } from '../../../core/services/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { TourService } from '../../../core/services/tour.service';
import { WhatsNewService } from '../../../core/services/whats-new.service';

interface Command {
  id: string;
  labelKey: string;
  icon: string;
  groupKey: string;
  run: () => void;
}

/**
 * Ctrl+K command palette: jump to any page (role-filtered menu) or run quick
 * actions (theme/language/settings/tour/logout). Full keyboard navigation.
 * Also hosts the Shift+? shortcuts-help dialog.
 */
@Component({
  selector: 'app-command-palette',
  imports: [TranslocoModule, Dialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command-palette.html',
})
export class CommandPalette {
  protected readonly palette = inject(CommandPaletteService);
  protected readonly shortcuts = inject(ShortcutService);
  private readonly menu = inject(MenuService);
  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);
  private readonly settings = inject(SettingsStore);
  private readonly language = inject(LanguageService);
  private readonly layout = inject(LayoutService);
  private readonly auth = inject(AuthService);
  private readonly tour = inject(TourService);
  private readonly whatsNew = inject(WhatsNewService);

  protected readonly query = signal('');
  protected readonly selected = signal(0);
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private readonly commands = computed<Command[]>(() => {
    const nav: Command[] = this.menu
      .flatRows()
      .filter((r) => !r.isSection && r.item.route)
      .map((r) => ({
        id: 'nav:' + r.item.id,
        labelKey: r.item.labelKey,
        icon: r.item.icon ?? 'pi pi-angle-left',
        groupKey: 'palette.group.pages',
        run: () => this.router.navigateByUrl(r.item.route!),
      }));

    const actions: Command[] = [
      {
        id: 'act:dark', icon: 'pi pi-moon', groupKey: 'palette.group.actions',
        labelKey: this.settings.darkMode() ? 'palette.lightMode' : 'palette.darkMode',
        run: () => this.settings.toggleDarkMode(),
      },
      {
        id: 'act:lang', icon: 'pi pi-globe', groupKey: 'palette.group.actions',
        labelKey: 'palette.switchLang',
        run: () => this.language.toggle(),
      },
      {
        id: 'act:settings', icon: 'pi pi-sliders-h', groupKey: 'palette.group.actions',
        labelKey: 'common.settings',
        run: () => this.layout.openSettings(),
      },
      {
        id: 'act:tour', icon: 'pi pi-compass', groupKey: 'palette.group.actions',
        labelKey: 'palette.startTour',
        run: () => this.tour.start(),
      },
      {
        id: 'act:whatsnew', icon: 'pi pi-megaphone', groupKey: 'palette.group.actions',
        labelKey: 'whatsnew.title',
        run: () => this.whatsNew.show(),
      },
      {
        id: 'act:help', icon: 'pi pi-question-circle', groupKey: 'palette.group.actions',
        labelKey: 'shortcuts.title',
        run: () => this.shortcuts.helpOpen.set(true),
      },
      {
        id: 'act:logout', icon: 'pi pi-sign-out', groupKey: 'palette.group.actions',
        labelKey: 'auth.logout',
        run: () => this.auth.logout(),
      },
    ];

    return [...nav, ...actions];
  });

  protected readonly filtered = computed<Command[]>(() => {
    const q = this.query().trim().toLowerCase();
    const all = this.commands();
    if (!q) return all;
    return all.filter((c) =>
      this.transloco.translate(c.labelKey).toLowerCase().includes(q),
    );
  });

  constructor() {
    // reset & focus on every open
    effect(() => {
      if (this.palette.open()) {
        this.query.set('');
        this.selected.set(0);
        setTimeout(() => this.searchInput()?.nativeElement.focus(), 60);
      }
    });
  }

  protected onKeydown(e: KeyboardEvent): void {
    const list = this.filtered();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selected.update((i) => Math.min(list.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selected.update((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = list[this.selected()];
      if (cmd) this.execute(cmd);
    } else if (e.key === 'Escape') {
      this.palette.hide();
    }
  }

  protected onQuery(value: string): void {
    this.query.set(value);
    this.selected.set(0);
  }

  protected execute(cmd: Command): void {
    this.palette.hide();
    cmd.run();
  }

  protected isNewGroup(i: number): boolean {
    const list = this.filtered();
    return i === 0 || list[i].groupKey !== list[i - 1].groupKey;
  }
}
