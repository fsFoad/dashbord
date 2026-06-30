import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortalInfo } from '../../core/models/portal-info.model';
import { PortalInfoService } from '../../core/services/portal-info.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-dvh overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">

      <!-- Left branding panel (desktop only) -->
      <div class="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden">

        <!-- Dark background -->
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"></div>

        <!-- Ambient blobs -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-sky-500/10 to-purple-500/10 blur-3xl animate-pulse"></div>
          <div class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-500/15 to-cyan-500/10 blur-3xl"
               style="animation: pulse 6s ease-in-out infinite 2s;"></div>
          <div class="absolute inset-0 opacity-[0.03]"
               style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center px-10 py-12 text-white w-full max-w-lg">

          <!-- Logo -->
          <div class="mb-8 relative">
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/30 via-indigo-500/20 to-purple-500/30 blur-2xl animate-pulse"></div>
            <div class="relative bg-white/10 backdrop-blur-xl rounded-3xl p-2 border border-white/10 shadow-2xl">
              <div class="bg-slate-900/60 rounded-2xl p-8 backdrop-blur-sm flex items-center justify-center min-h-[9rem] min-w-[13rem]">
                @if (portal()?.logoUrl) {
                  <img
                    [src]="portal()!.logoUrl"
                    [alt]="portal()!.appName"
                    class="w-48 h-auto drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                } @else {
                  <span class="text-4xl font-bold bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
                    {{ portal()?.appName ?? '' }}
                  </span>
                }
              </div>
            </div>
            <div class="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 shadow-lg"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-300 shadow-lg"></div>
          </div>

          <!-- App name + version badge -->
          <div class="flex justify-center mb-4">
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
              <span class="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"></span>
              <span class="text-xs font-medium" dir="ltr">{{ portal()?.appName ?? '' }}</span>
              @if (portal()?.version) {
                <div class="h-4 w-px bg-white/20"></div>
                <span class="text-[11px] text-sky-200/80" dir="ltr">v{{ portal()!.version }}</span>
              }
            </div>
          </div>

          <h1 class="text-3xl xl:text-4xl font-bold text-center mb-4 leading-tight">
            <span class="bg-gradient-to-r from-sky-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {{ portal()?.tagline ?? '' }}
            </span>
          </h1>

          @if (portal()?.description) {
            <div class="w-full backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-5 mb-6">
              <p class="text-sm xl:text-base text-sky-100/90 leading-relaxed text-center">
                {{ portal()!.description }}
              </p>
            </div>
          }

          <!-- Feature cards -->
          @if (portal()?.features?.length) {
            <div class="grid grid-cols-2 gap-3 w-full mb-6">
              @for (f of portal()!.features; track f.title) {
                <div class="relative group h-full">
                  <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       [ngClass]="{
                         'bg-gradient-to-br from-sky-500/10 to-transparent': f.color === 'sky',
                         'bg-gradient-to-br from-indigo-500/10 to-transparent': f.color === 'indigo',
                         'bg-gradient-to-br from-emerald-500/10 to-transparent': f.color === 'emerald',
                         'bg-gradient-to-br from-purple-500/10 to-transparent': f.color === 'purple'
                       }">
                  </div>
                  <div class="relative flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 transition-all duration-300 h-full"
                       [ngClass]="{
                         'group-hover:border-sky-400/30': f.color === 'sky',
                         'group-hover:border-indigo-400/30': f.color === 'indigo',
                         'group-hover:border-emerald-400/30': f.color === 'emerald',
                         'group-hover:border-purple-400/30': f.color === 'purple'
                       }">
                    <div class="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                         [ngClass]="{
                           'bg-gradient-to-br from-sky-500/20 to-indigo-500/20': f.color === 'sky',
                           'bg-gradient-to-br from-indigo-500/20 to-purple-500/20': f.color === 'indigo',
                           'bg-gradient-to-br from-emerald-500/20 to-teal-500/20': f.color === 'emerald',
                           'bg-gradient-to-br from-purple-500/20 to-pink-500/20': f.color === 'purple'
                         }">
                      <svg class="w-3.5 h-3.5"
                           [ngClass]="{
                             'text-sky-300': f.color === 'sky',
                             'text-indigo-300': f.color === 'indigo',
                             'text-emerald-300': f.color === 'emerald',
                             'text-purple-300': f.color === 'purple'
                           }"
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="f.icon"></path>
                      </svg>
                    </div>
                    <div class="min-w-0">
                      <h3 class="text-xs font-semibold text-white leading-tight">{{ f.title }}</h3>
                      <p class="text-[10px] text-sky-100/70 leading-tight whitespace-nowrap">{{ f.description }}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          }

          <!-- Badges -->
          @if (portal()?.badges?.length) {
            <div class="flex flex-wrap gap-2 justify-center">
              @for (badge of portal()!.badges; track badge) {
                <span class="px-3 py-1.5 rounded-full text-xs bg-white/10 backdrop-blur-sm border border-white/10 text-sky-100/80">
                  {{ badge }}
                </span>
              }
            </div>
          }
        </div>
      </div>

      <!-- Right login panel -->
      <div class="relative flex flex-col justify-center w-full px-4 py-12 sm:px-6 lg:px-12 lg:w-1/2">

        <!-- Mobile: ambient background blobs -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden lg:hidden" aria-hidden="true">
          <div class="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 via-indigo-500/15 to-purple-500/10 blur-3xl"></div>
          <div class="absolute left-0 bottom-1/3 h-80 w-80 rounded-full bg-gradient-to-tr from-sky-300/15 via-indigo-400/10 to-emerald-400/10 blur-3xl"></div>
        </div>

        <div class="mx-auto w-full max-w-md">

          <!-- Mobile: app name header -->
          <div class="mb-8 flex flex-col items-center gap-2 lg:hidden">
            @if (portal()?.logoUrl) {
              <img [src]="portal()!.logoUrl" [alt]="portal()!.appName" class="h-14 w-auto" />
            } @else {
              <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ portal()?.appName ?? '' }}</span>
            }
          </div>

          <!-- Login card -->
          <div class="relative bg-white/60 dark:bg-slate-900/95 rounded-3xl shadow-2xl shadow-slate-300/30 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl px-7 py-8 sm:px-9 sm:py-9 transition-all duration-500">

            <router-outlet />

          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: contents; }
  `],
})
export class AuthLayout implements OnInit {
  private readonly portalInfoService = inject(PortalInfoService);

  protected readonly portal = signal<PortalInfo | null>(null);

  ngOnInit(): void {
    this.portalInfoService.get().subscribe(info => this.portal.set(info));
  }
}
