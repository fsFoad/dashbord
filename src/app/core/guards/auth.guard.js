import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../services/session.store';
/** Blocks unauthenticated access; remembers the target URL for after login. */
export const authGuard = (_route, state) => {
    const session = inject(SessionStore);
    if (session.isAuthenticated())
        return true;
    return inject(Router).createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url },
    });
};
/** Keeps authenticated users away from auth pages. */
export const guestGuard = () => {
    const session = inject(SessionStore);
    return session.isAuthenticated() ? inject(Router).createUrlTree(['/dashboard']) : true;
};
/** Factory: allows only users holding at least one of the given roles. */
export function roleGuard(roles) {
    return () => {
        const session = inject(SessionStore);
        const router = inject(Router);
        if (!session.isAuthenticated()) {
            return router.createUrlTree(['/auth/login']);
        }
        return session.hasAnyRole(roles) ? true : router.createUrlTree(['/403']);
    };
}
