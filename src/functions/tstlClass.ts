import { DefaultMap } from "../classes/DefaultMap";
import { TSTLClass } from "../types/private/TSTLClass";
import { TSTLClassMetatable } from "../types/private/TSTLClassMetatable";

const TSTL_CLASS_METATABLE_KEYS: ReadonlySet<string> = new Set([
  "____constructor",
  "__index",
  "constructor",
]);

/**
 * Returns whether or not this is a class that is provided by the `isaacscript-common` library, such
 * as a `DefaultMap`.
 */
export function isIsaacScriptCommonClass(object: unknown): boolean {
  return object instanceof DefaultMap;
}

/** TypeScriptToLua classes are Lua tables that have a metatable with a certain amount of keys. */
export function isUserDefinedTSTLClass(object: unknown): object is TSTLClass {
  if (isVanillaTSTLClass(object) || isIsaacScriptCommonClass(object)) {
    return false;
  }

  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const metatable = getmetatable(object);
  if (metatable === undefined) {
    return false;
  }

  let numKeys = 0;
  for (const [key] of pairs(metatable)) {
    numKeys += 1;

    if (typeof key !== "string") {
      return false;
    }

    if (!TSTL_CLASS_METATABLE_KEYS.has(key)) {
      return false;
    }
  }

  return numKeys === TSTL_CLASS_METATABLE_KEYS.size;
}

/**
 * Returns whether or not this is a class that is provided as part of the TypeScriptToLua
 * transpiler, such as a `Map` or a `Set`.
 */
export function isVanillaTSTLClass(object: unknown): boolean {
  return (
    object instanceof Map ||
    object instanceof Set ||
    object instanceof WeakMap ||
    object instanceof WeakSet
  );
}

/**
 * Initializes a new TypeScriptToLua class in the situation where you do not know what kind of class
 * it is. This function requires that you provide an instantiated class of the same type, as it will
 * use the class constructor that is present on the other object's metatable to initialize the new
 * class.
 */
export function newTSTLClass(oldClass: TSTLClass): TSTLClass {
  const metatable = getmetatable(oldClass) as TSTLClassMetatable | undefined;
  if (metatable === undefined) {
    error(
      "Failed to instantiate a new TypeScriptToLua class since the provided old class does not have a metatable.",
    );
  }

  return newTSTLClassFromMetatable(metatable);
}

/** This is a re-implementation of the transpiled "__TS__New" function. */
function newTSTLClassFromMetatable(metatable: TSTLClassMetatable): TSTLClass {
  const newClass = new LuaTable<AnyNotNil, unknown>();
  const newClassMetatable = setmetatable(
    newClass,
    metatable.constructor.prototype,
  ) as unknown as TSTLClassMetatable;
  newClassMetatable.____constructor(); // eslint-disable-line no-underscore-dangle

  return newClass as unknown as TSTLClass;
}
