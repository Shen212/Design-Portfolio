// Base44 has been removed. This file is a stub.
// If your pages call base44.entities.X.list() etc., replace those
// calls with local static data or a different data source.

export const base44 = {
  entities: new Proxy({}, {
    get: () => ({
      list: async () => [],
      get: async () => null,
      create: async (data) => data,
      update: async (id, data) => data,
      delete: async () => {},
    })
  })
};
