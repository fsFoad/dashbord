import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TellerDashboard } from '../models/teller.model';

@Injectable({ providedIn: 'root' })
export class TellerApiService {
  private readonly http = inject(HttpClient);

  dashboard(): Observable<TellerDashboard> {
    return this.http.get<TellerDashboard>('/api/teller/dashboard');
  }
}
