import { __decorate } from "tslib";
import { Injectable, inject, signal } from '@angular/core';
import { APP_VERSION } from '../config/changelog.config';
import { SessionStore } from './session.store';
import { StorageService } from './storage.service';
const keyFor = (uid) => `app.whatsnew.${uid}`;
/**
 * Shows the "What's new" dialog exactly once per user per version:
 *  - fresh users: current version becomes their baseline (no dialog —
 *    they get the onboarding tour instead)
 *  - returning users on a NEW version: dialog opens automatically
 *  - anyone can reopen it from the footer / sidebar / command palette
 */
let WhatsNewService = class WhatsNewService {
    session = inject(SessionStore);
    storage = inject(StorageService);
    open = signal(false);
    checked = false;
    /** Call once after the shell renders (Footer does this). */
    autoCheck() {
        if (this.checked)
            return;
        const user = this.session.user();
        if (!user)
            return;
        this.checked = true;
        const key = keyFor(user.id);
        const seen = this.storage.read(key, null);
        if (seen === null) {
            // First run for this user: set the baseline silently.
            this.storage.write(key, APP_VERSION);
            return;
        }
        if (seen !== APP_VERSION)
            this.open.set(true);
    }
    show() {
        this.open.set(true);
    }
    /** Close + remember the current version for this user. */
    dismiss() {
        this.open.set(false);
        const user = this.session.user();
        if (user)
            this.storage.write(keyFor(user.id), APP_VERSION);
    }
};
WhatsNewService = __decorate([
    Injectable({ providedIn: 'root' })
], WhatsNewService);
export { WhatsNewService };
