export const isNonEmptyObject = (obj: {}) =>
  obj != null &&
  typeof obj === "object" &&
  !Array.isArray(obj) &&
  Object.keys(obj).length > 0;

export const CACHE_KEY_USER = ["user"]
