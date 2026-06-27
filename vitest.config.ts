import { defineConfig } from 'vitest/config';

/**
 * Vitest setup for this zoneless Angular app. We test PURE logic (date math,
 * RBAC, optimistic helpers, schema validators) — no TestBed needed — so a
 * lightweight jsdom environment is enough and runs fast.
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: [],
    reporters: 'default',
    coverage: {
      provider: 'v8',
      include: ['src/app/core/**/*.ts', 'src/app/shared/**/*.ts'],
      exclude: ['**/*.spec.ts'],
    },
  },
  resolve: {
    alias: { '@app': '/src/app' },
  },
});
