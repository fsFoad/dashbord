/**
 * Optimistic update helper — the pattern used across Kanban, comments, team
 * and files: apply a change immediately, then commit to the server; on failure
 * restore the previous state. Extracted so it's testable and consistent.
 *
 *   await applyOptimistic({
 *     get: () => this.tasks(),
 *     set: (v) => this.tasks.set(v),
 *     mutate: (s) => s.map(t => t.id === id ? { ...t, status } : t),
 *     commit: () => firstValueFrom(this.api.updateTask(id, { status })),
 *   });
 */
export interface OptimisticOptions<T> {
  get: () => T;
  set: (value: T) => void;
  mutate: (current: T) => T;
  commit: () => Promise<unknown>;
  onError?: (error: unknown) => void;
}

export async function applyOptimistic<T>(opts: OptimisticOptions<T>): Promise<boolean> {
  const previous = opts.get();
  opts.set(opts.mutate(previous));
  try {
    await opts.commit();
    return true;
  } catch (error) {
    opts.set(previous); // rollback
    opts.onError?.(error);
    return false;
  }
}
