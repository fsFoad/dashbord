import { Routes } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './core/guards/auth.guard';

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
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      // Gateway routes
      {
        path: 'home',
        loadComponent: () => import('./gateway/home/home.component').then((m) => m.HomeComponent),
        data: { titleKey: 'صفحه اصلی' },
      },
      {
        path: 'messages-management',
        loadComponent: () => import('./gateway/components/messages-management/messages-management.component').then((m) => m.MessagesManagementComponent),
        data: { titleKey: 'پیام ها' },
      },
      {
        path: 'rules',
        loadComponent: () => import('./gateway/components/rules/rules.component').then((m) => m.RulesComponent),
        data: { titleKey: 'قواعد' },
      },
      {
        path: 'data-hub',
        loadComponent: () => import('./gateway/components/hub-management/hub-management.component').then((m) => m.HubManagementComponent),
        data: { titleKey: 'هاب داده' },
      },
      {
        path: 'party',
        loadComponent: () => import('./gateway/components/party/components/party-management/party-management.component').then((m) => m.PartyManagementComponent),
        data: { titleKey: 'سازمان' },
      },
      {
        path: 'moduleBase',
        loadComponent: () => import('./gateway/components/module-base/module-base.component').then((m) => m.ModuleBaseComponent),
        data: { titleKey: 'ماژول' },
      },
      {
        path: 'client',
        loadComponent: () => import('./gateway/components/client/client.component').then((m) => m.ClientComponent),
        data: { titleKey: 'کلاینت' },
      },
      {
        path: 'wage-services',
        loadComponent: () => import('./gateway/components/wage/wage.component').then((m) => m.WageComponent),
        data: { titleKey: 'کارمزد سرویس' },
      },
      {
        path: 'access-list',
        loadComponent: () => import('./gateway/components/access-list/access-list.component').then((m) => m.AccessListComponent),
        data: { titleKey: 'لیست دسترسی' },
      },
      {
        path: 'mediators',
        loadComponent: () => import('./gateway/components/mediators-list-root/mediators-list-root.component').then((m) => m.MediatorsListRootComponent),
        data: { titleKey: 'لیست مدیاتور ها' },
      },
      {
        path: 'mediatorsXml',
        loadComponent: () => import('./gateway/components/mediators/mediators.component').then((m) => m.MediatorsComponent),
        data: { titleKey: 'مدیاتور xml' },
      },
      {
        path: 'mediatorsJson',
        loadComponent: () => import('./gateway/components/mediators/mediators-json/mediators-json.component').then((m) => m.MediatorsJsonComponent),
        data: { titleKey: 'مدیاتور json' },
      },
      {
        path: 'log-reports',
        loadComponent: () => import('./gateway/components/log-reports/log-reports.component').then((m) => m.LogReportsComponent),
        data: { titleKey: 'ریز کارکرد سرویس' },
      },
      {
        path: 'call-services-report',
        loadComponent: () => import('./gateway/components/call-services-report/call-services-report.component').then((m) => m.CallServicesReportComponent),
        data: { titleKey: 'فراخوانی تجمیعی سرویس‌ها' },
      },
      {
        path: 'chart-report',
        loadComponent: () => import('./gateway/components/chart-report/chart-report.component').then((m) => m.ChartReportComponent),
        data: { titleKey: 'نموداری' },
      },
      {
        path: 'response-rate',
        loadComponent: () => import('./gateway/components/response-rate/response-rate.component').then((m) => m.ResponseRateComponent),
        data: { titleKey: 'میزان پاسخ‌دهی' },
      },
      {
        path: 'factor',
        loadComponent: () => import('./gateway/components/factor/factor.component').then((m) => m.FactorComponent),
        data: { titleKey: 'فاکتور' },
      },
      {
        path: 'bill-store',
        loadComponent: () => import('./gateway/components/bill-store-cartable/bill-store-cartable.component').then((m) => m.BillStoreCartableComponent),
        data: { titleKey: 'کارتابل صورتحساب' },
      },
      {
        path: 'about',
        loadComponent: () => import('./gateway/components/about/about.component').then((m) => m.AboutComponent),
        data: { titleKey: 'درباره' },
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        data: { titleKey: 'menu.dashboard' },
      },
      {
        path: 'dashboard/analytics',
        loadComponent: () => import('./features/dashboard/analytics').then((m) => m.Analytics),
        data: { titleKey: 'analytics.title' },
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects-table').then((m) => m.ProjectsTable),
        data: { titleKey: 'menu.projects.all' },
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./features/projects/project-wizard').then((m) => m.ProjectWizard),
        data: { titleKey: 'wizard.title' },
      },
      {
        path: 'projects/board',
        loadComponent: () => import('./features/projects/kanban').then((m) => m.Kanban),
        data: { titleKey: 'menu.projects.board' },
      },
      {
        path: 'projects/gantt',
        loadComponent: () => import('./features/projects/gantt').then((m) => m.Gantt),
        data: { titleKey: 'gantt.title' },
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/projects/project-detail').then((m) => m.ProjectDetail),
        data: { titleKey: 'projects.detail' },
      },
      {
        path: 'components/form-builder',
        loadComponent: () =>
          import('./features/components-demo/form-builder/form-builder-demo').then((m) => m.FormBuilderDemo),
        data: { titleKey: 'menu.formBuilder' },
      },
      {
        path: 'components/gallery',
        loadComponent: () =>
          import('./features/components-demo/gallery/components-gallery').then((m) => m.ComponentsGallery),
        data: { titleKey: 'menu.gallery' },
      },
      {
        path: 'components/date-picker',
        loadComponent: () =>
          import('./features/components-demo/date-picker-demo').then((m) => m.DatePickerDemo),
        data: { titleKey: 'menu.datePicker' },
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
        data: { titleKey: 'menu.profile' },
      },
      {
        path: 'people/team',
        loadComponent: () => import('./features/team/team').then((m) => m.Team),
        data: { titleKey: 'menu.people.team' },
      },
      {
        path: 'calendar',
        loadComponent: () => import('./features/calendar/calendar').then((m) => m.CalendarPage),
        data: { titleKey: 'menu.calendar' },
      },
      {
        path: 'files',
        loadComponent: () => import('./features/files/file-manager').then((m) => m.FileManager),
        data: { titleKey: 'menu.files' },
      },
      {
        path: 'people/roles',
        loadComponent: () => import('./features/admin/roles-demo').then((m) => m.RolesDemo),
        canActivate: [roleGuard(['admin'])],
        data: { titleKey: 'menu.people.roles' },
      },
      {
        path: 'playground',
        loadComponent: () =>
          import('./features/playground/playground').then((m) => m.Playground),
        data: { titleKey: 'menu.playground' },
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

  // Auth layout: login / register / forgot — only for guests.
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    canActivate: [guestGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadComponent: () => import('./features/auth/login').then((m) => m.Login) },
      { path: 'register', loadComponent: () => import('./features/auth/register').then((m) => m.Register) },
      { path: 'forgot', loadComponent: () => import('./features/auth/forgot').then((m) => m.Forgot) },
    ],
  },

  // The "site" layout (public pages) — separate shell, reachable for preview.
  {
    path: 'site',
    loadComponent: () => import('./layout/site-layout/site-layout').then((m) => m.SiteLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/landing/landing').then((m) => m.Landing),
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
      {
        path: '500',
        loadComponent: () => import('./features/error/server-error').then((m) => m.ServerError),
      },
      {
        path: '403',
        loadComponent: () => import('./features/error/forbidden').then((m) => m.Forbidden),
      },
    ],
  },

  { path: '**', redirectTo: '404' },
];
