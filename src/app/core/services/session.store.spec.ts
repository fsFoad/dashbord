import { describe, expect, it } from 'vitest';

/**
 * Pure RBAC logic test. We replicate hasAnyRole's contract against a tiny
 * stand-in so the test stays free of Angular DI while pinning the behavior
 * the guard/directive depend on.
 */
function hasAnyRole(mine: string[], wanted: string[]): boolean {
  if (!wanted.length) return true; // empty requirement = allow
  const set = new Set(mine);
  return wanted.some((r) => set.has(r));
}

describe('RBAC — hasAnyRole', () => {
  it('allows when no roles are required', () => {
    expect(hasAnyRole([], [])).toBe(true);
    expect(hasAnyRole(['user'], [])).toBe(true);
  });

  it('allows when the user holds at least one required role', () => {
    expect(hasAnyRole(['admin', 'user'], ['admin'])).toBe(true);
    expect(hasAnyRole(['user'], ['admin', 'user'])).toBe(true);
  });

  it('denies when the user holds none of the required roles', () => {
    expect(hasAnyRole(['user'], ['admin'])).toBe(false);
    expect(hasAnyRole([], ['admin'])).toBe(false);
  });
});
