import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStats } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class StatsApiService {
  private readonly http = inject(HttpClient);

  stats(range?: { from?: Date | null; to?: Date | null }): Observable<DashboardStats> {
    let params = new HttpParams();
    if (range?.from) params = params.set('from', range.from.toISOString().slice(0, 10));
    if (range?.to) params = params.set('to', range.to.toISOString().slice(0, 10));
    return this.http.get<DashboardStats>('/api/stats', { params });
  }
}
