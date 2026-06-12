import { MenuItem } from '../models/menu-item.model';

/**
 * Default navigation tree. It is intentionally multi-level (up to 3 deep)
 * and includes a very long label to demonstrate truncation + tooltip in the
 * sidebar. In later phases the per-user menu service filters/reorders this
 * by role and pinned items.
 */
export const APP_MENU: MenuItem[] = [
  { id: 'sec-main', labelKey: 'menu.section.main', separator: true },
  {
    id: 'dashboard',
    labelKey: 'menu.dashboard',
    icon: 'pi pi-home',
    children: [
      { id: 'dashboard-overview', labelKey: 'menu.dashboard.overview', icon: 'pi pi-th-large', route: '/dashboard' },
      { id: 'dashboard-analytics', labelKey: 'menu.dashboard.analytics', icon: 'pi pi-chart-line', route: '/dashboard/analytics' },
    ],
  },
  {
    id: 'projects',
    labelKey: 'menu.projects',
    icon: 'pi pi-folder',
    children: [
      { id: 'projects-all', labelKey: 'menu.projects.all', icon: 'pi pi-list', route: '/projects' },
      { id: 'projects-new', labelKey: 'menu.projects.new', icon: 'pi pi-plus', route: '/projects/new' },
      { id: 'projects-board', labelKey: 'menu.projects.board', icon: 'pi pi-th-large', route: '/projects/board' },
      { id: 'projects-gantt', labelKey: 'menu.projects.gantt', icon: 'pi pi-chart-bar', route: '/projects/gantt' },
      {
        id: 'projects-reports',
        labelKey: 'menu.projects.reports',
        icon: 'pi pi-chart-bar',
        children: [
          { id: 'rep-weekly', labelKey: 'menu.projects.reports.weekly', route: '/projects/reports/weekly' },
          {
            id: 'rep-long',
            // Deliberately long to test single-line truncation + hover tooltip:
            labelKey: 'menu.projects.reports.long',
            route: '/projects/reports/quarterly-cross-department-summary',
          },
        ],
      },
    ],
  },
  {
    id: 'people',
    labelKey: 'menu.people',
    icon: 'pi pi-users',
    children: [
      { id: 'team', labelKey: 'menu.people.team', icon: 'pi pi-user', route: '/people/team' },
      { id: 'roles', labelKey: 'menu.people.roles', icon: 'pi pi-shield', route: '/people/roles', roles: ['admin'] },
    ],
  },
  { id: 'calendar', labelKey: 'menu.calendar', icon: 'pi pi-calendar', route: '/calendar' },
  { id: 'files', labelKey: 'menu.files', icon: 'pi pi-folder-open', route: '/files' },

  { id: 'sec-components', labelKey: 'menu.section.components', separator: true },
  { id: 'date-picker', labelKey: 'menu.datePicker', icon: 'pi pi-calendar-plus', route: '/components/date-picker' },

  { id: 'sec-system', labelKey: 'menu.section.system', separator: true },
  { id: 'playground', labelKey: 'menu.playground', icon: 'pi pi-bolt', route: '/playground' },
  { id: 'settings', labelKey: 'menu.settings', icon: 'pi pi-cog', route: '/settings' },
  { id: 'docs', labelKey: 'menu.docs', icon: 'pi pi-book', href: 'https://primeng.org' },
];
