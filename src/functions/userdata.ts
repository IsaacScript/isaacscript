/**
 * Helper function to get the type of a userdata object from the Isaac API. This is contained within
 * the "__type" metatable key.
 *
 * For example, a `Vector` class is userdata with a type of "Vector".
 */
export function getUserdataType(object: unknown): string | undefined {
  const objectType = type(object);
  if (objectType !== "userdata") {
    return undefined;
  }

  const metatable = getmetatable(object) as LuaTable;
  if (metatable === undefined) {
    return undefined;
  }

  return metatable.get("__type") as string | undefined;
}

/**
 * Helper function to check if something is an instantiated class from the Isaac API. (All classes
 * from the Isaac API have a type of "userdata" in Lua with a metatable key of "__type".)
 */
export function isUserdataObject(object: unknown, objectType: string): boolean {
  const userdataType = getUserdataType(object);
  return userdataType === objectType || userdataType === `const ${objectType}`;
}
