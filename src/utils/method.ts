export const isNonEmptyObject = (obj: {}) =>
  obj != null &&
  typeof obj === "object" &&
  !Array.isArray(obj) &&
  Object.keys(obj).length > 0;
