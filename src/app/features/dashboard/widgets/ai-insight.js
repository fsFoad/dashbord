import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { AiAssistService } from '../../../core/services/ai-assist.service';
import { SettingsStore } from '../../../core/services/settings.store';
/**
 * "Smart summary" — a mock AI assistant that turns the current dashboard data
 * into written, localized insights. Shows a thinking state, then reveals the
 * bullet insights one by one.
 */
let AiInsight = class AiInsight {
    ai = inject(AiAssistService);
    settings = inject(SettingsStore);
    loading = signal(false);
    all = signal([]);
    revealed = signal(0);
    visibleInsights = computed(() => this.all().slice(0, this.revealed()));
    generate() {
        this.loading.set(true);
        this.all.set([]);
        this.revealed.set(0);
        this.ai.summary().subscribe({
            next: (res) => {
                const lang = this.settings.language();
                const lines = res.insights[lang] ?? res.insights.en;
                this.loading.set(false);
                this.all.set(lines);
                this.revealReplay(lines.length);
            },
            error: () => this.loading.set(false),
        });
    }
    /** Reveal insights one-by-one for a generative feel. */
    revealReplay(count) {
        const tick = () => {
            if (this.revealed() >= count)
                return;
            this.revealed.update((n) => n + 1);
            setTimeout(tick, 350);
        };
        tick();
    }
};
AiInsight = __decorate([
    Component({
        selector: 'app-ai-insight',
        imports: [TranslocoModule, ButtonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
      <div class="flex items-center justify-between gap-3">
        <h2 class="flex items-center gap-2 text-base font-semibold text-surface-900 dark:text-surface-0">
          <span class="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
            <i class="pi pi-star-fill"></i>
          </span>
          {{ 'ai.title' | transloco }}
        </h2>
        <p-button
          [label]="loading() ? ('ai.thinking' | transloco) : ('ai.generate' | transloco)"
          [icon]="loading() ? 'pi pi-spin pi-spinner' : 'pi pi-bolt'"
          size="small"
          [disabled]="loading()"
          (onClick)="generate()"
        />
      </div>

      @if (visibleInsights().length) {
        <ul class="mt-4 flex flex-col gap-2.5">
          @for (line of visibleInsights(); track $index) {
            <li class="flex items-start gap-2.5 text-sm leading-relaxed">
              <i class="pi pi-angle-left mt-1 shrink-0 text-xs text-primary ltr:rotate-180"></i>
              <span>{{ line }}</span>
            </li>
          }
        </ul>
        <p class="mt-3 text-[11px] text-muted-color">{{ 'ai.disclaimer' | transloco }}</p>
      } @else if (!loading()) {
        <p class="mt-4 text-sm text-muted-color">{{ 'ai.hint' | transloco }}</p>
      }
    </div>
  `,
    })
], AiInsight);
export { AiInsight };
