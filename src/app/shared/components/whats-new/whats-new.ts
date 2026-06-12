import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CHANGELOG, ChangeType } from '../../../core/config/changelog.config';
import { WhatsNewService } from '../../../core/services/whats-new.service';
import { SettingsStore } from '../../../core/services/settings.store';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';

/** Release-notes dialog fed by changelog.config.ts. */
@Component({
  selector: 'app-whats-new',
  imports: [TranslocoModule, Dialog, ButtonModule, TagModule, LocalizedDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-dialog
      [visible]="svc.open()"
      (visibleChange)="$event ? null : svc.dismiss()"
      [modal]="true"
      [draggable]="false"
      [style]="{ width: '30rem', maxWidth: '94vw' }"
    >
      <ng-template #header>
        <div class="flex items-center gap-2.5">
          <span class="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
            <i class="pi pi-megaphone"></i>
          </span>
          <span class="text-lg font-semibold">{{ 'whatsnew.title' | transloco }}</span>
        </div>
      </ng-template>

      <div class="thin-scroll flex max-h-[55vh] flex-col gap-6 overflow-y-auto pe-1">
        @for (release of releases; track release.version; let first = $first) {
          <section>
            <div class="mb-3 flex items-center gap-2.5">
              <span class="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-contrast" dir="ltr">
                v{{ release.version }}
              </span>
              @if (first) {
                <p-tag [value]="'whatsnew.latest' | transloco" severity="success" />
              }
              <span class="text-xs text-muted-color">{{ release.date | appDate }}</span>
            </div>

            <ul class="flex flex-col gap-2.5">
              @for (entry of release.entries; track $index) {
                <li class="flex items-start gap-2.5">
                  <span
                    class="mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                    [class]="badgeClass(entry.type)"
                  >{{ 'whatsnew.type.' + entry.type | transloco }}</span>
                  <span class="text-sm leading-relaxed">{{ isFa() ? entry.fa : entry.en }}</span>
                </li>
              }
            </ul>
          </section>
        }
      </div>

      <ng-template #footer>
        <p-button [label]="'whatsnew.gotIt' | transloco" icon="pi pi-check" size="small" (onClick)="svc.dismiss()" />
      </ng-template>
    </p-dialog>
  `,
})
export class WhatsNew {
  protected readonly svc = inject(WhatsNewService);
  private readonly settings = inject(SettingsStore);

  protected readonly releases = CHANGELOG;
  protected readonly isFa = computed(() => this.settings.language() === 'fa');

  protected badgeClass(type: ChangeType): string {
    switch (type) {
      case 'feature':
        return 'bg-primary/15 text-primary';
      case 'improvement':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400';
      case 'fix':
        return 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400';
    }
  }
}
