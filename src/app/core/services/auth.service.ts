import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SessionStore } from './session.store';
import { AuthResponse, LoginResult, User, isTwoFactor } from '../models/user.model';
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

  /**
   * Login may resolve to a full session OR a 2FA challenge. The session is
   * only set when a real AuthResponse comes back; callers inspect the result
   * with isTwoFactor() to decide whether to show the OTP step.
   */
  login(username: string, password: string): Observable<LoginResult> {
    return this.http
      .post<LoginResult>('/api/auth/login', { username, password }, this.silent())
      .pipe(tap((res) => { if (!isTwoFactor(res)) this.session.set(res); }));
  }

  verifyTwoFactor(challengeId: string, code: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/verify-2fa', { challengeId, code }, this.silent())
      .pipe(tap((res) => this.session.set(res)));
  }

  getTwoFactor(): Observable<{ enabled: boolean }> {
    return this.http.get<{ enabled: boolean }>('/api/me/2fa', this.silent());
  }

  setTwoFactor(enabled: boolean): Observable<{ enabled: boolean }> {
    return this.http.post<{ enabled: boolean }>('/api/me/2fa', { enabled }, this.silent());
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/register', { name, email, password }, this.silent())
      .pipe(tap((res) => this.session.set(res)));
  }

  /** Request a recovery OTP for a mobile number. Returns a challenge to verify. */
  requestPasswordOtp(phone: string): Observable<{ sent: boolean; challengeId: string; hint: string }> {
    return this.http.post<{ sent: boolean; challengeId: string; hint: string }>(
      '/api/auth/forgot', { phone }, this.silent(),
    );
  }

  /** Verify the recovery OTP for a given challenge. */
  verifyPasswordOtp(challengeId: string, code: string): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(
      '/api/auth/verify-otp', { challengeId, code }, this.silent(),
    );
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
