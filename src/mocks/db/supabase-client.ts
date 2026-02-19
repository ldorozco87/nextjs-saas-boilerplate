const emptyResult = { data: [] as const, error: null };

/** Sample rows for the dashboard "items" table when using the Supabase mock. */
const MOCK_ITEMS = [
  {
    id: "mock-item-1",
    name: "Sample item A",
    created_at: "2025-02-15T10:00:00.000Z",
  },
  {
    id: "mock-item-2",
    name: "Sample item B",
    created_at: "2025-02-14T14:30:00.000Z",
  },
  {
    id: "mock-item-3",
    name: "Sample item C",
    created_at: "2025-02-13T09:15:00.000Z",
  },
] as const;

/** Chainable mock table: methods return self and the object is thenable so `await table.select().order()` works. */
function createMockTable(result: { data: readonly unknown[]; error: null }) {
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
    single: () =>
      Promise.resolve({
        data: result.data[0] ?? null,
        error: null,
      }),
    maybeSingle: () =>
      Promise.resolve({
        data: result.data[0] ?? null,
        error: null,
      }),
    then(onFulfilled: (value: { data: unknown[]; error: null }) => unknown) {
      return Promise.resolve({
        data: [...result.data],
        error: null,
      }).then(onFulfilled);
    },
  };
  return mockTable;
}

/** Minimal mock Supabase client when env vars are not set. No-op / empty responses; "items" table returns sample rows. */
export function createMockSupabaseClient() {
  return {
    from: (table: string) =>
      table === "items"
        ? createMockTable({ data: MOCK_ITEMS, error: null })
        : createMockTable(emptyResult),
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
