import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivityItem, CommentItem, Member, Paged, Project, ProjectStatus, Task,
} from '../models/api.model';

/** Typed client over the (mock) backend. Same shape will fit the real API. */
@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly http = inject(HttpClient);

  list(
    opts: {
      page?: number;
      size?: number;
      q?: string;
      statuses?: ProjectStatus[];
      sortField?: string;
      sortOrder?: number;
    } = {},
  ): Observable<Paged<Project>> {
    let params = new HttpParams()
      .set('page', opts.page ?? 1)
      .set('size', opts.size ?? 10);
    if (opts.q) params = params.set('q', opts.q);
    if (opts.statuses?.length) params = params.set('status', opts.statuses.join(','));
    if (opts.sortField) {
      params = params.set('sortField', opts.sortField).set('sortOrder', opts.sortOrder ?? 1);
    }
    return this.http.get<Paged<Project>>('/api/projects', { params });
  }

  create(body: {
    name: string;
    status: ProjectStatus;
    owner: string;
    startDate?: string;
    dueDate?: string;
  }): Observable<Project> {
    return this.http.post<Project>('/api/projects', body);
  }

  update(id: number, body: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`/api/projects/${id}`, body);
  }

  remove(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/api/projects/${id}`);
  }

  bulkDelete(ids: number[]): Observable<{ ok: boolean; removed: number }> {
    return this.http.post<{ ok: boolean; removed: number }>('/api/projects/bulk-delete', { ids });
  }

  members(): Observable<Member[]> {
    return this.http.get<Member[]>('/api/members');
  }

  upload(file: File): Observable<{ id: number; ok: boolean }> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ id: number; ok: boolean }>('/api/upload', form);
  }

  get(id: number): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${id}`);
  }

  tasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/projects/${projectId}/tasks`);
  }

  createTask(projectId: number, body: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`/api/projects/${projectId}/tasks`, body);
  }

  updateTask(id: number, body: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`/api/tasks/${id}`, body);
  }

  deleteTask(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/api/tasks/${id}`);
  }

  comments(projectId: number): Observable<CommentItem[]> {
    return this.http.get<CommentItem[]>(`/api/projects/${projectId}/comments`);
  }

  addComment(projectId: number, text: string): Observable<CommentItem> {
    return this.http.post<CommentItem>(`/api/projects/${projectId}/comments`, { text });
  }

  activity(): Observable<ActivityItem[]> {
    return this.http.get<ActivityItem[]>('/api/activity');
  }
}
