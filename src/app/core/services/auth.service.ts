import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SessionStore } from './session.store';
import { AuthResponse, User } from '../models/user.model';
import { SILENT_ERRORS } from '../interceptors/http-context';

/** Auth API client. Errors are SILENT here — pages render them inline. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionStore);
  private readonly router = inject(Router);

  private silent(): { context: HttpContext } {
    return { context: new HttpContext().set(SILENT_ERRORS, true) };
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/login', { email, password }, this.silent())
      .pipe(tap((res) => this.session.set(res)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/register', { name, email, password }, this.silent())
      .pipe(tap((res) => this.session.set(res)));
  }

  forgotPassword(email: string): Observable<{ sent: boolean }> {
    return this.http.post<{ sent: boolean }>('/api/auth/forgot', { email }, this.silent());
  }

  updateMe(name: string): Observable<User> {
    return this.http
      .put<User>('/api/me', { name })
      .pipe(tap((user) => this.session.updateUser(user)));
  }

  changePassword(current: string, next: string): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>('/api/me/password', { current, next }, this.silent());
  }

  logout(): void {
    this.session.clear();
    this.router.navigate(['/auth/login']);
  }
}
