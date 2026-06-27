import { describe, expect, it, vi } from 'vitest';
import { applyOptimistic } from './optimistic';

describe('optimistic update + rollback', () => {
  it('applies the change immediately and keeps it on success', async () => {
    let state = [{ id: 1, status: 'todo' }];
    const set = (v: typeof state) => (state = v);

    await applyOptimistic({
      get: () => state,
      set,
      mutate: (s) => s.map((x) => (x.id === 1 ? { ...x, status: 'done' } : x)),
      commit: () => Promise.resolve(),
    });

    expect(state[0].status).toBe('done'); // applied and kept
  });

  it('rolls back to the previous state on failure', async () => {
    let state = [{ id: 1, status: 'todo' }];
    const set = (v: typeof state) => (state = v);
    const onError = vi.fn();

    await applyOptimistic({
      get: () => state,
      set,
      mutate: (s) => s.map((x) => (x.id === 1 ? { ...x, status: 'done' } : x)),
      commit: () => Promise.reject(new Error('server said no')),
      onError,
    });

    expect(state[0].status).toBe('todo'); // rolled back
    expect(onError).toHaveBeenCalledOnce();
  });

  it('shows the optimistic value DURING the in-flight request', async () => {
    let state = [{ id: 1, status: 'todo' }];
    const set = (v: typeof state) => (state = v);
    let resolve!: () => void;

    const p = applyOptimistic({
      get: () => state,
      set,
      mutate: (s) => s.map((x) => ({ ...x, status: 'done' })),
      commit: () => new Promise<void>((r) => (resolve = r)),
    });

    // before commit resolves, the optimistic value is already visible
    expect(state[0].status).toBe('done');
    resolve();
    await p;
    expect(state[0].status).toBe('done');
  });
});
