/** Minimal mock Supabase client when env vars are not set. No-op / empty responses. */
export function createMockSupabaseClient() {
  const noop = () => Promise.resolve({ data: [], error: null });
  const mockTable = {
    select: noop,
    insert: noop,
    update: noop,
    upsert: noop,
    delete: noop,
    eq: () => mockTable,
    neq: () => mockTable,
    gt: () => mockTable,
    gte: () => mockTable,
    lt: () => mockTable,
    lte: () => mockTable,
    like: () => mockTable,
    ilike: () => mockTable,
    is: () => mockTable,
    in: () => mockTable,
    contains: () => mockTable,
    containedBy: () => mockTable,
    range: () => mockTable,
    limit: () => mockTable,
    order: () => mockTable,
    single: () => Promise.resolve({ data: null, error: null }),
    maybeSingle: () => Promise.resolve({ data: null, error: null }),
  };
  return {
    from: () => mockTable,
    auth: {
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getClaims: () => Promise.resolve({ data: null, error: null }),
      signIn: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        download: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        remove: () => Promise.resolve({ data: null, error: null }),
        list: () => Promise.resolve({ data: null, error: null }),
      }),
    },
  };
}
