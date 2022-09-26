import { DefaultMap } from "../classes/DefaultMap";
import { TSTLClassMetatable } from "../interfaces/private/TSTLClassMetatable";
import { FunctionTuple } from "../types/FunctionTuple";
import { TSTLClass } from "../types/TSTLClass";
import { isString, isTable } from "./types";

const VANILLA_TSTL_CLASSES = new Set(["Map", "Set", "WeakMap", "WeakSet"]);

const TSTL_CLASS_METATABLE_KEYS: ReadonlySet<string> = new Set([
  "____constructor",
  "__index",
  "constructor",
]);

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

export function getTSTLClassMethods(object: unknown): FunctionTuple[] {
  const constructor = getTSTLClassConstructor(object);
  if (constructor === undefined) {
    return [];
  }

  const classEntries = Object.entries(constructor.prototype);
  return classEntries.filter(
    ([key, value]) =>
      // Ignore the stock TSTL keys that are baked into every class.
      !TSTL_CLASS_METATABLE_KEYS.has(key) && type(value) === "function",
  );
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

/**
 * Returns whether or not this is a class that is provided by the `isaacscript-common` library, such
 * as a `DefaultMap`.
 */
export function isIsaacScriptCommonClass(object: unknown): boolean {
  return isDefaultMap(object);
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

/** TypeScriptToLua classes are Lua tables that have a metatable with a certain amount of keys. */
export function isUserDefinedTSTLClass(object: unknown): object is TSTLClass {
  if (isVanillaTSTLClass(object) || isIsaacScriptCommonClass(object)) {
    return false;
  }

  if (!isTable(object)) {
    return false;
  }

  const metatable = getmetatable(object);
  if (metatable === undefined) {
    return false;
  }

  let numKeys = 0;
  for (const [key] of pairs(metatable)) {
    numKeys++;

    if (!isString(key)) {
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
  const className = getTSTLClassName(object);
  if (className === undefined) {
    return false;
  }

  return VANILLA_TSTL_CLASSES.has(className);
}

/**
 * Initializes a new TypeScriptToLua class in the situation where you do not know what kind of class
 * it is. This function requires that you provide an instantiated class of the same type, as it will
 * use the class constructor that is present on the other object's metatable to initialize the new
 * class.
 */
export function newTSTLClass(oldClass: TSTLClass): TSTLClass {
  const constructor = getTSTLClassConstructor(oldClass);
  if (constructor === undefined) {
    error(
      "Failed to instantiate a new TypeScriptToLua class since the provided old class does not have a metatable/constructor.",
    );
  }

  // We re-implement some of the logic from the transpiled "__TS__New" function.
  const newClass = new LuaMap<AnyNotNil, unknown>();
  const newClassMetatable = setmetatable(
    newClass,
    constructor.prototype,
  ) as unknown as TSTLClassMetatable;
  newClassMetatable.____constructor(); // eslint-disable-line no-underscore-dangle

  return newClass as unknown as TSTLClass;
}
