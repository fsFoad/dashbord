import { __decorate } from "tslib";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
/** Typed client over the (mock) backend. Same shape will fit the real API. */
let ProjectsApiService = class ProjectsApiService {
    http = inject(HttpClient);
    list(opts = {}) {
        let params = new HttpParams()
            .set('page', opts.page ?? 1)
            .set('size', opts.size ?? 10);
        if (opts.q)
            params = params.set('q', opts.q);
        if (opts.statuses?.length)
            params = params.set('status', opts.statuses.join(','));
        if (opts.sortField) {
            params = params.set('sortField', opts.sortField).set('sortOrder', opts.sortOrder ?? 1);
        }
        return this.http.get('/api/projects', { params });
    }
    create(body) {
        return this.http.post('/api/projects', body);
    }
    update(id, body) {
        return this.http.put(`/api/projects/${id}`, body);
    }
    remove(id) {
        return this.http.delete(`/api/projects/${id}`);
    }
    bulkDelete(ids) {
        return this.http.post('/api/projects/bulk-delete', { ids });
    }
    members() {
        return this.http.get('/api/members');
    }
    upload(file) {
        const form = new FormData();
        form.append('file', file);
        return this.http.post('/api/upload', form);
    }
    get(id) {
        return this.http.get(`/api/projects/${id}`);
    }
    tasks(projectId) {
        return this.http.get(`/api/projects/${projectId}/tasks`);
    }
    createTask(projectId, body) {
        return this.http.post(`/api/projects/${projectId}/tasks`, body);
    }
    updateTask(id, body) {
        return this.http.put(`/api/tasks/${id}`, body);
    }
    deleteTask(id) {
        return this.http.delete(`/api/tasks/${id}`);
    }
    comments(projectId) {
        return this.http.get(`/api/projects/${projectId}/comments`);
    }
    addComment(projectId, text) {
        return this.http.post(`/api/projects/${projectId}/comments`, { text });
    }
    activity() {
        return this.http.get('/api/activity');
    }
};
ProjectsApiService = __decorate([
    Injectable({ providedIn: 'root' })
], ProjectsApiService);
export { ProjectsApiService };
