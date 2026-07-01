export async function applyOptimistic(opts) {
    const previous = opts.get();
    opts.set(opts.mutate(previous));
    try {
        await opts.commit();
        return true;
    }
    catch (error) {
        opts.set(previous); // rollback
        opts.onError?.(error);
        return false;
    }
}
