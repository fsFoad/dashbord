import { Routes } from '@angular/router';

/**
 * Each layout is a separate shell. Feature pages are lazy-loaded as standalone
 * components. Phase 1 wires the dashboard layout + a couple of demo pages so the
 * shell, multi-level menu, configs and settings panel can all be exercised.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard-layout/dashboard-layout').then((m) => m.DashboardLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        data: { titleKey: 'menu.dashboard' },
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects-demo/projects-demo').then((m) => m.ProjectsDemo),
        data: { titleKey: 'menu.projects.all' },
      },
      {
        // Demonstrates the deep nested menu route + breadcrumb.
        path: 'projects/reports/quarterly-cross-department-summary',
        loadComponent: () =>
          import('./features/projects-demo/projects-demo').then((m) => m.ProjectsDemo),
        data: { titleKey: 'menu.projects.reports.long' },
      },
    ],
  },

  // The "site" layout (public pages) — separate shell, reachable for preview.
  {
    path: 'site',
    loadComponent: () => import('./layout/site-layout/site-layout').then((m) => m.SiteLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },

  // Blank/error layout.
  {
    path: '',
    loadComponent: () => import('./layout/blank-layout/blank-layout').then((m) => m.BlankLayout),
    children: [
      {
        path: '404',
        loadComponent: () => import('./features/error/not-found').then((m) => m.NotFound),
      },
    ],
  },

  { path: '**', redirectTo: '404' },
];
