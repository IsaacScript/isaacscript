import { DefaultMap } from "../classes/DefaultMap";
import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import {
  isSerializationBrand,
  SerializationBrand,
} from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { SAVE_DATA_MANAGER_DEBUG } from "../features/saveDataManager/constants";
import { SerializableIsaacAPIClass } from "../types/private/SerializableIsaacAPIClass";
import { SerializedIsaacAPIClass } from "../types/private/SerializedIsaacAPIClass";
import { TSTLClassMetatable } from "../types/private/TSTLClassMetatable";
import { copyColor, isSerializedColor } from "./color";
import {
  getIsaacAPIClassType,
  isSerializableIsaacAPIClass,
} from "./isaacAPIClass";
import { copyKColor, isSerializedKColor } from "./kColor";
import { log } from "./log";
import { copyRNG, isSerializedRNG } from "./rng";
import {
  ensureAllCases,
  getEnumValues,
  getTraversalDescription,
} from "./utils";
import { copyVector, isSerializedVector } from "./vector";

const TSTL_CLASS_KEYS: ReadonlySet<string> = new Set([
  "____constructor",
  "__index",
  "constructor",
]);

/**
 * deepCopy is a semi-generic deep cloner. It will recursively copy all of the values so that none
 * of the nested references remain.
 *
 * It supports the following object types:
 *
 * - `LuaTable` / basic TSTL objects
 * - TSTL `Map`
 * - TSTL `Set`
 * - TSTL classes
 * - `DefaultMap`
 * - Isaac `Color` objects
 * - Isaac `KColor` objects
 * - Isaac `RNG` objects
 * - Isaac `Vector` objects
 *
 * @param oldObject The object to copy.
 * @param serializationType Has 3 possible values. Can leave TypeScriptToLua objects as-is, or can
 * serialize objects to Lua tables, or can deserialize Lua tables to objects. Default is
 * `SerializationType.NONE`.
 * @param traversalDescription Used to track the current key that we are operating on.
 */
export function deepCopy(
  oldObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  serializationType = SerializationType.NONE,
  traversalDescription = "",
): LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil> {
  if (SAVE_DATA_MANAGER_DEBUG) {
    let logString = `deepCopy is operating on: ${traversalDescription}`;
    if (serializationType === SerializationType.SERIALIZE) {
      logString += " (serializing)";
    } else if (serializationType === SerializationType.DESERIALIZE) {
      logString += " (deserializing)";
    }
    log(logString);
  }

  const oldObjectType = type(oldObject);
  if (oldObjectType !== "table") {
    error(
      `The deepCopy function was given a ${oldObjectType} instead of a table.`,
    );
  }

  const oldTable = oldObject as unknown as LuaTable;
  const isClass = isTSTLClass(oldTable);

  let hasTSTLDefaultMapBrand = false;
  let hasTSTLMapBrand = false;
  let hasTSTLSetBrand = false;
  let hasTSTLClassBrand = false;
  if (!(oldObject instanceof Map) && !(oldObject instanceof Set) && !isClass) {
    checkMetatable(oldTable, traversalDescription);

    hasTSTLDefaultMapBrand = oldTable.has(SerializationBrand.DEFAULT_MAP);
    hasTSTLMapBrand = oldTable.has(SerializationBrand.MAP);
    hasTSTLSetBrand = oldTable.has(SerializationBrand.SET);
    hasTSTLClassBrand = oldTable.has(SerializationBrand.CLASS);
  }

  // Instantiate the new object
  let newObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>;
  if (
    serializationType === SerializationType.NONE &&
    oldObject instanceof DefaultMap
  ) {
    const oldDefaultMap = oldObject as DefaultMap<AnyNotNil, unknown>;
    const constructorArg = oldDefaultMap.getConstructorArg();
    newObject = new DefaultMap(constructorArg);
  } else if (
    serializationType === SerializationType.DESERIALIZE &&
    hasTSTLDefaultMapBrand
  ) {
    const defaultValue: unknown = oldTable.get(
      SerializationBrand.DEFAULT_MAP_VALUE,
    );
    if (
      typeof defaultValue !== "boolean" &&
      typeof defaultValue !== "number" &&
      typeof defaultValue !== "string"
    ) {
      error(
        "The deepCopy function failed to get a valid default value for a DefaultMap object when deserializing.",
      );
    } else {
      newObject = new DefaultMap(defaultValue);
    }
  } else if (
    (serializationType === SerializationType.NONE &&
      oldObject instanceof Map) ||
    (serializationType === SerializationType.DESERIALIZE && hasTSTLMapBrand)
  ) {
    newObject = new Map();
  } else if (
    (serializationType === SerializationType.NONE &&
      oldObject instanceof Set) ||
    (serializationType === SerializationType.DESERIALIZE && hasTSTLSetBrand)
  ) {
    newObject = new Set();
  } else if (
    (serializationType === SerializationType.NONE && isClass) ||
    (serializationType === SerializationType.DESERIALIZE && hasTSTLClassBrand)
  ) {
    newObject = copyClass(oldObject);
  } else {
    newObject = new LuaTable();
  }

  // If we are serializing, brand TSTL objects
  if (serializationType === SerializationType.SERIALIZE) {
    const newTable = newObject as LuaTable;

    if (oldObject instanceof DefaultMap) {
      newTable.set(SerializationBrand.DEFAULT_MAP, "");

      const oldDefaultMap = oldObject as DefaultMap<AnyNotNil, unknown>;
      const defaultValue = oldDefaultMap.getConstructorArg();

      // The constructor argument can be a reference to a factory function
      // If this is the case, then we can't serialize it
      if (
        typeof defaultValue === "boolean" ||
        typeof defaultValue === "number" ||
        typeof defaultValue === "string"
      ) {
        newTable.set(SerializationBrand.DEFAULT_MAP_VALUE, defaultValue);
      }
    } else if (oldObject instanceof Map) {
      newTable.set(SerializationBrand.MAP, "");
    } else if (oldObject instanceof Set) {
      newTable.set(SerializationBrand.SET, "");
    } else if (isClass) {
      newTable.set(SerializationBrand.CLASS, "");
    }
  }

  // Depending on whether we are working on a Lua table or a TypeScriptToLua object,
  // we need to iterate over the object in a specific way
  if (oldObject instanceof Map) {
    for (const [key, value] of oldObject.entries()) {
      if (isSerializationBrand(key)) {
        continue;
      }

      deepCopyValue(
        oldObject,
        newObject,
        key,
        value,
        traversalDescription,
        serializationType,
      );
    }
  } else if (oldObject instanceof Set) {
    for (const key of oldObject.values()) {
      if (isSerializationBrand(key)) {
        continue;
      }

      // For serialization purposes, represent a Set as a table with keys that match the values in
      // the set and values that are an empty string
      const value = "";
      deepCopyValue(
        oldObject,
        newObject,
        key,
        value,
        traversalDescription,
        serializationType,
      );
    }
  } else {
    // This applies to both Lua tables and TypeScriptToLua classes
    for (const [key, value] of pairs(oldObject)) {
      if (isSerializationBrand(key)) {
        continue;
      }

      deepCopyValue(
        oldObject,
        newObject,
        key,
        value,
        traversalDescription,
        serializationType,
      );
    }
  }

  return newObject;
}

function isTSTLClass(object: LuaTable): boolean {
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

function checkMetatable(table: LuaTable, traversalDescription: string) {
  // Lua tables can have metatables, which make writing a generic deep-cloner impossible
  // We will refuse to copy an unknown table type that has a metatable
  const metatable = getmetatable(table);
  if (metatable === undefined) {
    return;
  }

  const tableDescription =
    traversalDescription === ""
      ? "the table to copy"
      : `"${traversalDescription}"`;

  error(
    `The deepCopy function detected that "${tableDescription}" has a metatable. Copying tables with metatables is not supported, unless they are explicitly handled by the save data manager. (e.g. Vectors, TypeScriptToLua Maps, etc.)`,
  );
}

function copyClass(oldClass: unknown) {
  const metatable = getmetatable(oldClass) as TSTLClassMetatable;
  const newClass = getNewClassFromMetatable(metatable);

  for (const [key, value] of pairs(oldClass)) {
    newClass.set(key, value);
  }

  return newClass;
}

function getNewClassFromMetatable(metatable: TSTLClassMetatable) {
  // This is a re-implementation of the transpiled "__TS__New" function
  // eslint-disable-next-line
  const instance = setmetatable({}, metatable.constructor.prototype as any);
  const newClass = instance as TSTLClassMetatable;
  newClass.____constructor(); // eslint-disable-line no-underscore-dangle

  return newClass as unknown as LuaTable;
}

function deepCopyValue(
  oldObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  key: AnyNotNil,
  value: unknown,
  traversalDescription: string,
  serializationType: SerializationType,
) {
  const valueType = type(value);
  validateValue(value, valueType, traversalDescription);

  // First, handle the special case of serializing a value for a TSTL object that uses integer keys
  // These will be converted to JSON as an array, which will insert a bunch of unnecessary "null"
  // entires (e.g. "[null, null, null, 123]" for a TSTL Map with one entry at index 4)
  // To work around this, we simply convert all integer keys to strings
  // We mark the table with a special identifier key so that we can properly deserialize it later
  // This key will be set over and over for every element in the Map, but we have to do it here
  // since we are not able to derive the type of Map keys at runtime
  let convertNumberKeysToString = false;
  const isTSTLObject = oldObject instanceof Map || oldObject instanceof Set;
  const keyType = type(key);
  if (
    serializationType === SerializationType.SERIALIZE &&
    isTSTLObject &&
    keyType === "number"
  ) {
    convertNumberKeysToString = true;

    const newTable = newObject as LuaTable;
    newTable.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");

    if (SAVE_DATA_MANAGER_DEBUG) {
      log("deepCopy is converting a TSTL map with number keys to strings.");
    }
  }

  const newValue = getNewValue(
    key,
    value,
    traversalDescription,
    serializationType,
  );

  // Set the value on the new object
  // Even though the "set" invocations below are identical,
  // we must narrow the type for the method to be transpiled correctly
  if (newObject instanceof Map) {
    newObject.set(key, newValue);
  } else if (newObject instanceof Set) {
    newObject.add(key);
  } else {
    const keyToUse = convertNumberKeysToString ? tostring(key) : key;
    newObject.set(keyToUse, newValue);
  }
}

function validateValue(
  value: unknown,
  valueType: string,
  traversalDescription: string,
) {
  // Isaac API classes are type "userdata"
  // Whitelist the ones that we can copy
  if (isSerializableIsaacAPIClass(value)) {
    return;
  }

  if (
    valueType === "function" ||
    valueType === "nil" ||
    valueType === "thread" ||
    valueType === "userdata"
  ) {
    error(
      `The deepCopy function detected that "${traversalDescription}" has a value of type "${valueType}", which is not supported.`,
    );
  }
}

/** Returns the value to set on the new object. */
function getNewValue(
  key: AnyNotNil,
  value: unknown,
  traversalDescription: string,
  serializationType: SerializationType,
) {
  if (isSerializableIsaacAPIClass(value)) {
    return copySerializableIsaacAPIClass(value, serializationType);
  }

  if (
    isSerializedIsaacAPIClass(value) &&
    serializationType === SerializationType.DESERIALIZE
  ) {
    return copySerializableIsaacAPIClass(value, serializationType);
  }

  if (type(value) === "table") {
    const table = value as LuaTable;
    traversalDescription = getTraversalDescription(key, traversalDescription);
    return deepCopy(table, serializationType, traversalDescription);
  }

  return value;
}

function copySerializableIsaacAPIClass(
  isaacAPIClassOrSerializedTable:
    | SerializableIsaacAPIClass
    | SerializedIsaacAPIClass,
  serializationType: SerializationType,
) {
  const isaacAPIClassType = getIsaacAPIClassType(
    isaacAPIClassOrSerializedTable,
  ) as SerializableIsaacAPIClassType;

  switch (isaacAPIClassType) {
    case SerializableIsaacAPIClassType.COLOR: {
      const color = isaacAPIClassOrSerializedTable as unknown as Color;
      return copyColor(color, serializationType);
    }

    case SerializableIsaacAPIClassType.KCOLOR: {
      const kColor = isaacAPIClassOrSerializedTable as unknown as KColor;
      return copyKColor(kColor, serializationType);
    }

    case SerializableIsaacAPIClassType.RNG: {
      const rng = isaacAPIClassOrSerializedTable as unknown as RNG;
      return copyRNG(rng);
    }

    case SerializableIsaacAPIClassType.VECTOR: {
      const vector = isaacAPIClassOrSerializedTable as unknown as Vector;
      return copyVector(vector);
    }

    default: {
      return ensureAllCases(isaacAPIClassType);
    }
  }
}

export function isSerializedIsaacAPIClass(
  object: unknown,
): object is SerializedIsaacAPIClass {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const serializableIsaacAPIClassTypes = getEnumValues(
    SerializableIsaacAPIClassType,
  );
  for (const serializableIsaacAPIClassType of serializableIsaacAPIClassTypes) {
    switch (serializableIsaacAPIClassType) {
      case SerializableIsaacAPIClassType.COLOR: {
        if (isSerializedColor(object)) {
          return true;
        }

        break;
      }

      case SerializableIsaacAPIClassType.KCOLOR: {
        if (isSerializedKColor(object)) {
          return true;
        }

        break;
      }

      case SerializableIsaacAPIClassType.RNG: {
        if (isSerializedRNG(object)) {
          return true;
        }

        break;
      }

      case SerializableIsaacAPIClassType.VECTOR: {
        if (isSerializedVector(object)) {
          return true;
        }

        break;
      }

      default: {
        ensureAllCases(serializableIsaacAPIClassType);
      }
    }
  }

  return false;
}
