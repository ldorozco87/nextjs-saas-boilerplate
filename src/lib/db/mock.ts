const emptyResult = { data: [] as const, error: null };

/** Chainable mock table: methods return self and the object is thenable so `await table.select().order()` works. */
function createMockTable() {
  const mockTable = {
    select: () => mockTable,
    insert: () => mockTable,
    update: () => mockTable,
    upsert: () => mockTable,
    delete: () => mockTable,
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
    then(onFulfilled: (value: typeof emptyResult) => unknown) {
      return Promise.resolve(emptyResult).then(onFulfilled);
    },
  };
  return mockTable;
}

/** Minimal mock Supabase client when env vars are not set. No-op / empty responses. */
export function createMockSupabaseClient() {
  return {
    from: () => createMockTable(),
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
