import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

export const SKIP_EMPTY_CHECK = new HttpContextToken<boolean>(() => false);

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  protected http = inject(HttpClient);

  getConnection(url: string, baseUrl?: string, options?: any): Observable<any> {
    return this.http.get(`${baseUrl ?? ''}/${url}`, options);
  }

  postConnection(url: string, body: any, baseUrl?: string, options?: any): Observable<any> {
    return this.http.post(`${baseUrl ?? ''}/${url}`, body, options);
  }

  putConnection(url: string, body: any, baseUrl?: string, options?: any): Observable<any> {
    return this.http.put(`${baseUrl ?? ''}/${url}`, body, options);
  }

  deleteConnection(url: string, baseUrl?: string, options?: any): Observable<any> {
    return this.http.delete(`${baseUrl ?? ''}/${url}`, options);
  }
}
