import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { SessionStore } from '../services/session.store';
import { Role } from '../models/user.model';

/**
 * Renders the host template only when the current user holds at least one of
 * the given roles. Usage:
 *   <button *appHasRole="'admin'">…</button>
 *   <div *appHasRole="['admin', 'manager']">…</div>
 */
@Directive({ selector: '[appHasRole]' })
export class HasRoleDirective {
  private readonly tpl = inject(TemplateRef<unknown>);
  private readonly vcr = inject(ViewContainerRef);
  private readonly session = inject(SessionStore);

  readonly appHasRole = input.required<Role | Role[]>();

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
}
