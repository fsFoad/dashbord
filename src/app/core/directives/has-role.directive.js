import { __decorate } from "tslib";
import { Directive, TemplateRef, ViewContainerRef, effect, inject, input, } from '@angular/core';
import { SessionStore } from '../services/session.store';
/**
 * Renders the host template only when the current user holds at least one of
 * the given roles. Usage:
 *   <button *appHasRole="'admin'">…</button>
 *   <div *appHasRole="['admin', 'manager']">…</div>
 */
let HasRoleDirective = class HasRoleDirective {
    tpl = inject((TemplateRef));
    vcr = inject(ViewContainerRef);
    session = inject(SessionStore);
    appHasRole = input.required();
    constructor() {
        effect(() => {
            const wanted = this.appHasRole();
            const roles = Array.isArray(wanted) ? wanted : [wanted];
            this.vcr.clear();
            if (this.session.hasAnyRole(roles)) {
                this.vcr.createEmbeddedView(this.tpl);
            }
        });
    }
};
HasRoleDirective = __decorate([
    Directive({ selector: '[appHasRole]' })
], HasRoleDirective);
export { HasRoleDirective };
