import { TSTLClass } from "../types/private/TSTLClass";
import { TSTLClassMetatable } from "../types/private/TSTLClassMetatable";

const TSTL_CLASS_METATABLE_KEYS: ReadonlySet<string> = new Set([
  "____constructor",
  "__index",
  "constructor",
]);

/**
 * TypeScriptToLua classes are Lua tables that have a metatable with a certain amount of keys.
 *
 * For the purposes of this function, TSTL Maps, Sets, WeakMaps, and WeakSets do not count as TSTL
 * classes, because this function is intended to detect user-defined classes.
 */
export function isTSTLClass(object: unknown): object is TSTLClass {
  if (
    object instanceof Map ||
    object instanceof Set ||
    object instanceof WeakMap ||
    object instanceof WeakSet
  ) {
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
