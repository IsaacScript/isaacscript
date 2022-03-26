import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { IsaacAPIClass } from "../types/private/IsaacAPIClass";
import { SerializableIsaacAPIClass } from "../types/private/SerializableIsaacAPIClass";
import { getEnumValues } from "./utils";

const SERIALIZABLE_ISAAC_API_CLASS_TYPES_SET = new Set<string>(
  getEnumValues(SerializableIsaacAPIClassType),
);

/**
 * Helper function to get the type of a class from the Isaac API. This is contained within the
 * "__type" metatable key. In this context, the type of the class is equivalent to the name.
 *
 * For example, a `Vector` class is has a type of "Vector".
 *
 * Returns undefined if the object is not of type `userdata` or if the "__type" metatable key does
 * not exist.
 */
export function getIsaacAPIClassType(object: unknown): string | undefined {
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
  const isaacAPIClassType = getIsaacAPIClassType(object);
  return isaacAPIClassType !== undefined;
}

export function isIsaacAPIClassOfType(
  object: unknown,
  classType: string,
): boolean {
  const isaacAPIClassType = getIsaacAPIClassType(object);
  return (
    isaacAPIClassType === classType ||
    isaacAPIClassType === `const ${classType}`
  );
}

export function isSerializableIsaacAPIClass(
  object: unknown,
): object is SerializableIsaacAPIClass {
  const classType = getIsaacAPIClassType(object);
  if (classType === undefined) {
    return false;
  }

  return SERIALIZABLE_ISAAC_API_CLASS_TYPES_SET.has(classType);
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
  const table1 = object1 as LuaTable;
  const table2 = object2 as LuaTable;

  return keys.every((key) => table1.get(key) === table2.get(key));
}
