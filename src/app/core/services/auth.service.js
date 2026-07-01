import { __decorate } from "tslib";
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { SessionStore } from './session.store';
import { isTwoFactor } from '../models/user.model';
import { SILENT_ERRORS } from '../interceptors/http-context';
/** Auth API client. Errors are SILENT here — pages render them inline. */
let AuthService = class AuthService {
    http = inject(HttpClient);
    session = inject(SessionStore);
    router = inject(Router);
    silent() {
        return { context: new HttpContext().set(SILENT_ERRORS, true) };
    }
    /**
     * Login may resolve to a full session OR a 2FA challenge. The session is
     * only set when a real AuthResponse comes back; callers inspect the result
     * with isTwoFactor() to decide whether to show the OTP step.
     */
    login(username, password) {
        return this.http
            .post('/api/auth/login', { username, password }, this.silent())
            .pipe(tap((res) => { if (!isTwoFactor(res))
            this.session.set(res); }));
    }
    verifyTwoFactor(challengeId, code) {
        return this.http
            .post('/api/auth/verify-2fa', { challengeId, code }, this.silent())
            .pipe(tap((res) => this.session.set(res)));
    }
    getTwoFactor() {
        return this.http.get('/api/me/2fa', this.silent());
    }
    setTwoFactor(enabled) {
        return this.http.post('/api/me/2fa', { enabled }, this.silent());
    }
    register(name, email, password) {
        return this.http
            .post('/api/auth/register', { name, email, password }, this.silent())
            .pipe(tap((res) => this.session.set(res)));
    }
    /** Request a recovery OTP for a mobile number. Returns a challenge to verify. */
    requestPasswordOtp(phone) {
        return this.http.post('/api/auth/forgot', { phone }, this.silent());
    }
    /** Verify the recovery OTP for a given challenge. */
    verifyPasswordOtp(challengeId, code) {
        return this.http.post('/api/auth/verify-otp', { challengeId, code }, this.silent());
    }
    updateMe(name) {
        return this.http
            .put('/api/me', { name })
            .pipe(tap((user) => this.session.updateUser(user)));
    }
    changePassword(current, next) {
        return this.http.post('/api/me/password', { current, next }, this.silent());
    }
    logout() {
        this.session.clear();
        this.router.navigate(['/auth/login']);
    }
};
AuthService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
export { AuthService };
