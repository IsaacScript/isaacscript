import { IsaacAPIClass } from "../types/private/IsaacAPIClass";

/**
 * Helper function to get the name of a class from the Isaac API. This is contained within the
 * "__type" metatable key.
 *
 * For example, a `Vector` class is has a name of "Vector".
 *
 * Returns undefined if the object is not of type `userdata` or if the "__type" metatable key does
 * not exist.
 */
export function getIsaacAPIClassName(object: unknown): string | undefined {
  const objectType = type(object);
  if (objectType !== "userdata") {
    return undefined;
  }

  const metatable = getmetatable(object) as LuaTable<string, unknown>;
  if (metatable === undefined) {
    return undefined;
  }

  const classType = metatable.get("__type");
  if (typeof classType !== "string") {
    return undefined;
  }

  return classType;
}

/**
 * Helper function to check if something is an instantiated class from the Isaac API. (All classes
 * from the Isaac API have a type of "userdata" in Lua with a metatable key of "__type" equal to the
 * name of the class.)
 */
export function isIsaacAPIClass(object: unknown): object is IsaacAPIClass {
  const isaacAPIClassType = getIsaacAPIClassName(object);
  return isaacAPIClassType !== undefined;
}

export function isIsaacAPIClassOfType(
  object: unknown,
  classType: string,
): boolean {
  const isaacAPIClassType = getIsaacAPIClassName(object);
  return (
    isaacAPIClassType === classType ||
    isaacAPIClassType === `const ${classType}`
  );
}

/**
 * Helper function to check if an instantiated Isaac API class is equal to another one of the same
 * type. You must provide the list of keys to check for.
 */
export function isaacAPIClassEquals(
  object1: unknown,
  object2: unknown,
  keys: string[],
): boolean {
  const table1 = object1 as LuaTable<AnyNotNil, unknown>;
  const table2 = object2 as LuaTable<AnyNotNil, unknown>;

  return keys.every((key) => table1.get(key) === table2.get(key));
}
