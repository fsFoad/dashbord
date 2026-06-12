/** Standard paged result returned by list endpoints. */
export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

export type ProjectStatus = 'active' | 'paused' | 'done';

export interface Project {
  id: number;
  name: string;
  status: ProjectStatus;
  /** 0..100 */
  progress: number;
  owner: string;
  startDate: string; // ISO date
  dueDate: string; // ISO date
  updatedAt: string; // ISO date
}

export type TaskStatus = 'todo' | 'doing' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: number;
  title: string;
  done: boolean;
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  dueDate: string | null; // ISO date
  subtasks: Subtask[];
}

export interface CommentItem {
  id: number;
  author: string;
  text: string;
  createdAt: string; // ISO
}

export interface Member {
  id: number;
  name: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  active: boolean;
  joinedAt: string; // ISO
}

export interface NotificationItem {
  id: number;
  icon: string;
  messageKey: string;
  messageParams: Record<string, string>;
  createdAt: string; // ISO
  read: boolean;
}

export type EventColor = 'primary' | 'green' | 'amber' | 'red';

export interface CalEvent {
  id: number;
  title: string;
  date: string; // ISO date (single day)
  color: EventColor;
}

export interface FileNode {
  id: number;
  parentId: number | null;
  name: string;
  type: 'folder' | 'file';
  size: number | null;
  updatedAt: string; // ISO
}

/** Aggregate numbers behind the dashboards. */
export interface DashboardStats {
  kpis: {
    projects: number;
    tasks: number;
    members: number;
    overdue: number;
    /** percent change vs previous period, aligned with the four kpis */
    deltas: [number, number, number, number];
  };
  /** 12 monthly values */
  revenue: number[];
  /** 7 daily values each */
  tasksNew: number[];
  tasksDone: number[];
  byStatus: { active: number; paused: number; done: number };
}

export interface ActivityItem {
  id: number;
  icon: string;
  /** i18n template key, e.g. 'activity.projectCreated' */
  messageKey: string;
  messageParams: Record<string, string>;
  /** minutes ago (mock-friendly relative time) */
  minutesAgo: number;
}
