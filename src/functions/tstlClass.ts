const TSTL_CLASS_KEYS: ReadonlySet<string> = new Set([
  "____constructor",
  "__index",
  "constructor",
]);

export function isTSTLClass(object: LuaTable): boolean {
  const metatable = getmetatable(object);
  if (metatable === undefined) {
    return false;
  }

  if (object instanceof Map || object instanceof Set) {
    return false;
  }

  // TSTL classes have a metatable with a certain amount of keys
  let numKeys = 0;
  for (const [key] of pairs(metatable)) {
    numKeys += 1;

    if (typeof key !== "string") {
      return false;
    }

    if (!TSTL_CLASS_KEYS.has(key)) {
      return false;
    }
  }

  return numKeys === TSTL_CLASS_KEYS.size;
}
