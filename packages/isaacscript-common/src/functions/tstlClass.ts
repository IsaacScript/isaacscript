import type { DefaultMap } from "../classes/DefaultMap";
import type { TSTLClassMetatable } from "../interfaces/TSTLClassMetatable";
import type { TSTLClass } from "../types/TSTLClass";
import { isTable } from "./types";
import { assertDefined } from "./utils";

/**
 * Helper function to get the constructor from an instantiated TypeScriptToLua class, which is
 * located on the metatable.
 *
 * Returns undefined if passed a non-table or if the provided table does not have a metatable.
 */
export function getTSTLClassConstructor(
  object: unknown,
): TSTLClassMetatable["constructor"] | undefined {
  if (!isTable(object)) {
    return undefined;
  }

  const metatable = getmetatable(object);
  if (metatable === undefined) {
    return undefined;
  }

  return metatable.constructor;
}

/**
 * Helper function to get the name of a TypeScriptToLua class from the instantiated class object.
 *
 * TSTL classes are Lua tables created with the `__TS__Class` Lua function from the TSTL lualib.
 * Their name is contained within "constructor.name" metatable key.
 *
 * For example, a `Map` class is has a name of "Map".
 *
 * Returns undefined if passed a non-table or if the provided table does not have a metatable.
 */
export function getTSTLClassName(object: unknown): string | undefined {
  const constructor = getTSTLClassConstructor(object);
  if (constructor === undefined) {
    return undefined;
  }

  return constructor.name;
}

/**
 * Helper function to determine if a given object is a TypeScriptToLua `Map`.
 *
 * It is not reliable to use the `instanceof` operator to determine this because each Lua module has
 * their own copies of the entire lualib and thus their own instantiated version of a `Map`.
 */
export function isDefaultMap(
  object: unknown,
): object is DefaultMap<AnyNotNil, unknown> {
  const className = getTSTLClassName(object);
  return className === "DefaultMap";
}

/** Helper function to check if a given table is a class table created by TypeScriptToLua. */
export function isTSTLClass(object: unknown): object is TSTLClass {
  const tstlClassName = getTSTLClassName(object);
  return tstlClassName !== undefined;
}

/**
 * Helper function to determine if a given object is a TypeScriptToLua `Map`.
 *
 * It is not reliable to use the `instanceof` operator to determine this because each Lua module
 * might have their own copy of the entire lualib and thus their own instantiated version of a
 * `Map`.
 */
export function isTSTLMap(object: unknown): object is Map<AnyNotNil, unknown> {
  const className = getTSTLClassName(object);
  return className === "Map";
}

/**
 * Helper function to determine if a given object is a TypeScriptToLua `Set`.
 *
 * It is not reliable to use the `instanceof` operator to determine this because each Lua module
 * might have their own copy of the entire lualib and thus their own instantiated version of a
 * `Set`.
 */
export function isTSTLSet(object: unknown): object is Set<AnyNotNil> {
  const className = getTSTLClassName(object);
  return className === "Set";
}

/**
 * Initializes a new TypeScriptToLua class in the situation where you do not know what kind of class
 * it is. This function requires that you provide an instantiated class of the same type, as it will
 * use the class constructor that is present on the other object's metatable to initialize the new
 * class.
 */
export function newTSTLClass(oldClass: TSTLClass): TSTLClass {
  const constructor = getTSTLClassConstructor(oldClass);
  assertDefined(
    constructor,
    "Failed to instantiate a new TypeScriptToLua class since the provided old class does not have a metatable/constructor.",
  );

  // We re-implement some of the logic from the transpiled "__TS__New" function.
  const newClass = new LuaMap<AnyNotNil, unknown>();
  const newClassMetatable = setmetatable(
    newClass,
    constructor.prototype,
  ) as unknown as TSTLClassMetatable;
  newClassMetatable.____constructor();

  return newClass as unknown as TSTLClass;
}
