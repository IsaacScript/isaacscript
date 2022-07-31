import { DefaultMap } from "../classes/DefaultMap";
import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { SAVE_DATA_MANAGER_DEBUG } from "../features/saveDataManager/saveDataManagerConstants";
import { isSerializationBrand } from "../features/saveDataManager/serializationBrands";
import { TSTLClass } from "../types/TSTLClass";
import { isArray } from "./array";
import { getEnumValues } from "./enums";
import { getIsaacAPIClassName } from "./isaacAPIClass";
import { log } from "./log";
import {
  copyIsaacAPIClass,
  deserializeIsaacAPIClass,
  isSerializedIsaacAPIClass,
  serializeIsaacAPIClass,
} from "./serialization";
import {
  getTSTLClassName,
  isDefaultMap,
  isTSTLMap,
  isTSTLSet,
  isUserDefinedTSTLClass,
  newTSTLClass,
} from "./tstlClass";
import { isNumber, isPrimitive } from "./types";
import { getTraversalDescription, twoDimensionalSort } from "./utils";

const COPYABLE_ISAAC_API_CLASS_TYPES_SET = new Set<string>(
  getEnumValues(CopyableIsaacAPIClassType),
);

/**
 * `deepCopy` is a semi-generic deep cloner. It will recursively copy all of the values so that none
 * of the nested references remain.
 *
 * It supports the following object types:
 *
 * - Primitives (i.e. strings, numbers, and booleans)
 * - Basic TSTL objects / tables
 * - TSTL `Map`
 * - TSTL `Set`
 * - TSTL classes
 * - `DefaultMap`
 * - Isaac `Color` objects
 * - Isaac `KColor` objects
 * - Isaac `RNG` objects
 * - Isaac `Vector` objects
 *
 * It does not support:
 * - objects with values of `null` (since that transpiles to `nil`)
 * - other Isaac API objects such as `EntityPtr` (that have a type of "userdata")
 *
 * @param value The primitive or object to copy.
 * @param serializationType Optional. Has 3 possible values. Can copy objects as-is, or can
 *                          serialize objects to Lua tables, or can deserialize Lua tables to
 *                          objects. Default is `SerializationType.NONE`.
 * @param traversalDescription Optional. Used to track the current key that we are operating on.
 *                             Default is an empty string.
 * @param insideMap Optional. Tracks whether or not the deep copy function is in the process of
 *                  recursively copying a TSTL Map. Default is false.
 */
export function deepCopy(
  value: unknown,
  serializationType = SerializationType.NONE,
  traversalDescription = "",
  insideMap = false,
): unknown {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    let logString = `deepCopy is operating on: ${traversalDescription}`;
    if (serializationType === SerializationType.SERIALIZE) {
      logString += " (serializing)";
    } else if (serializationType === SerializationType.DESERIALIZE) {
      logString += " (deserializing)";
    }
    logString += `: ${value}`;
    log(logString);
  }

  const valueType = type(value);
  switch (valueType) {
    // First, handling the trivial case of primitives.
    case "nil":
    case "boolean":
    case "number":
    case "string": {
      return value;
    }

    // Second, handle values that cannot be serialized.
    case "function":
    case "thread": {
      if (serializationType === SerializationType.SERIALIZE) {
        error(
          `The deep copy function does not support serialization of "${traversalDescription}", since it is type: ${valueType}`,
        );
      }

      // We cannot copy this, so simply return the reference.
      return value;
    }

    case "table": {
      const luaMap = value as LuaMap<AnyNotNil, unknown>;
      return deepCopyTable(
        luaMap,
        serializationType,
        traversalDescription,
        insideMap,
      );
    }

    case "userdata": {
      return deepCopyUserdata(value, serializationType, traversalDescription);
    }
  }
}

function deepCopyTable(
  luaMap: LuaMap<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // First, handle the cases of TSTL classes or serialized TSTL classes.
  if (isDefaultMap(luaMap) || luaMap.has(SerializationBrand.DEFAULT_MAP)) {
    return deepCopyDefaultMap(
      luaMap,
      serializationType,
      traversalDescription,
      insideMap,
    );
  }

  if (isTSTLMap(luaMap) || luaMap.has(SerializationBrand.MAP)) {
    return deepCopyMap(
      luaMap,
      serializationType,
      traversalDescription,
      insideMap,
    );
  }

  if (isTSTLSet(luaMap) || luaMap.has(SerializationBrand.SET)) {
    return deepCopySet(
      luaMap,
      serializationType,
      traversalDescription,
      insideMap,
    );
  }

  const className = getTSTLClassName(luaMap);

  if (className === "WeakMap") {
    error(
      `The deep copy function does not support copying the "WeakMap" class for: ${traversalDescription}`,
    );
  }

  if (className === "WeakSet") {
    error(
      `The deep copy function does not support copying the "WeakSet" class for: ${traversalDescription}`,
    );
  }

  if (isUserDefinedTSTLClass(luaMap)) {
    return deepCopyTSTLClass(
      luaMap,
      serializationType,
      traversalDescription,
      insideMap,
    );
  }

  // This is not a TSTL Map/Set/class. If it has a metatable, abort.
  checkMetatable(luaMap, traversalDescription);

  // Handle the special case of serialized Isaac API classes.
  if (
    isSerializedIsaacAPIClass(luaMap) &&
    serializationType === SerializationType.DESERIALIZE
  ) {
    return deserializeIsaacAPIClass(luaMap);
  }

  // Handle the special case of an array.
  if (isArray(luaMap)) {
    return deepCopyArray(
      luaMap,
      serializationType,
      traversalDescription,
      insideMap,
    );
  }

  // Base case: copy a normal Lua table
  return deepCopyNormalLuaTable(
    luaMap,
    serializationType,
    traversalDescription,
    insideMap,
  );
}

function deepCopyDefaultMap(
  defaultMap: DefaultMap<AnyNotNil, unknown> | LuaMap<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying a DefaultMap.");
  }

  const constructorArg = isDefaultMap(defaultMap)
    ? defaultMap.getConstructorArg()
    : undefined; // The undefined case is handled explicitly in the "getNewDefaultMap" function.

  // First, handle the special case of serializing a DefaultMap instantiated with a factory
  // function. If this is the case, then we cannot serialize it (because there is no way to
  // serialize a function).
  if (
    serializationType === SerializationType.SERIALIZE &&
    !isPrimitive(constructorArg)
  ) {
    if (insideMap) {
      // The case of a DefaultMap within another map is complicated. Unlike a DefaultMap attached to
      // a "normal" object, the `merge` function will have no reference to the factory function that
      // was used to instantiate it. Thus, there is no way to copy this object. In this case, we
      // throw a run-time error to immediately alert the end-user that their data structure is
      // invalid.
      error(
        "Failed to deep copy a DefaultMap because it was instantiated with a factory function and was also inside of an array, map, or set. For more information, see: https://isaacscript.github.io/main/gotchas#failed-to-deep-copy-a-defaultmap",
      );
    } else {
      // In most cases, the DefaultMap will be attached to a normal table element. In this case, if
      // we serialize it as a normal `Map`, then everything will work out fine, because the `merge`
      // function only needs to copy the values (and not instantiate the object itself).
      return deepCopyMap(
        defaultMap,
        serializationType,
        traversalDescription,
        insideMap,
      );
    }
  }

  const newDefaultMap = getNewDefaultMap(
    defaultMap,
    serializationType,
    traversalDescription,
    constructorArg,
  );
  insideMap = true;

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    defaultMap,
    serializationType,
    traversalDescription,
    insideMap,
  );

  if (convertedNumberKeysToStrings) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isDefaultMap(newDefaultMap)) {
      newDefaultMap.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
    } else {
      newDefaultMap.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
    }
  }

  for (const [key, value] of entries) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isDefaultMap(newDefaultMap)) {
      newDefaultMap.set(key, value);
    } else {
      newDefaultMap.set(key, value);
    }
  }

  insideMap = false;

  return newDefaultMap;
}

/**
 * The new copied default map with either be a TSTL `DefaultMap` class or a Lua table, depending on
 * whether we are serializing or not.
 */
function getNewDefaultMap(
  defaultMap: DefaultMap<AnyNotNil, unknown> | LuaMap<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
  constructorArg: unknown,
): DefaultMap<AnyNotNil, unknown> | LuaMap<AnyNotNil, unknown> {
  switch (serializationType) {
    case SerializationType.NONE: {
      // eslint-disable-next-line isaacscript/no-invalid-default-map
      return new DefaultMap(constructorArg);
    }

    case SerializationType.SERIALIZE: {
      // Since we are serializing, the new object will be a Lua table. (At this point, we already
      // handled the special case of a DefaultMap instantiated with a factory function.)
      const newDefaultMap = new LuaMap<AnyNotNil, unknown>();
      newDefaultMap.set(SerializationBrand.DEFAULT_MAP, "");
      newDefaultMap.set(SerializationBrand.DEFAULT_MAP_VALUE, constructorArg);

      return newDefaultMap;
    }

    case SerializationType.DESERIALIZE: {
      if (isDefaultMap(defaultMap)) {
        error(
          `The deep copy function failed to deserialize a default map of "${traversalDescription}", since it was not a Lua table.`,
        );
      }

      const defaultMapValue = defaultMap.get(
        SerializationBrand.DEFAULT_MAP_VALUE,
      );
      if (defaultMapValue === undefined) {
        error(
          `The deep copy function failed to deserialize a default map of "${traversalDescription}", since there was no serialization brand of: ${SerializationBrand.DEFAULT_MAP_VALUE}`,
        );
      }

      // eslint-disable-next-line isaacscript/no-invalid-default-map
      return new DefaultMap(defaultMapValue);
    }
  }
}

function deepCopyMap(
  map: Map<AnyNotNil, unknown> | LuaMap<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying a Map.");
  }

  let newMap: Map<AnyNotNil, unknown> | LuaMap<AnyNotNil, unknown>;
  if (serializationType === SerializationType.SERIALIZE) {
    // Since we are serializing, the new object will be a Lua table.
    newMap = new LuaMap<AnyNotNil, unknown>();
    newMap.set(SerializationBrand.MAP, "");
  } else {
    newMap = new Map();
  }
  insideMap = true;

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    map,
    serializationType,
    traversalDescription,
    insideMap,
  );

  if (convertedNumberKeysToStrings) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isTSTLMap(newMap)) {
      newMap.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
    } else {
      newMap.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
    }
  }

  for (const [key, value] of entries) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isTSTLMap(newMap)) {
      newMap.set(key, value);
    } else {
      newMap.set(key, value);
    }
  }

  insideMap = false;

  return newMap;
}

function deepCopySet(
  set: Set<AnyNotNil> | LuaMap<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying a Set.");
  }

  let newSet: Set<AnyNotNil> | LuaMap<AnyNotNil, string>;
  if (serializationType === SerializationType.SERIALIZE) {
    // For serialization purposes, we represent a `Set` as a table with keys that match the
    // keys/values in the Set and values of an empty string.
    newSet = new LuaMap<AnyNotNil, string>();
    newSet.set(SerializationBrand.SET, "");
  } else {
    newSet = new Set();
  }

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    set,
    serializationType,
    traversalDescription,
    insideMap,
  );

  if (convertedNumberKeysToStrings) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isTSTLSet(newSet)) {
      // We should never be serializing an object of type `Set`.
      error(
        "The deep copy function cannot convert number keys to strings for a Set.",
      );
    } else {
      newSet.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
    }
  }

  for (const [key] of entries) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isTSTLSet(newSet)) {
      newSet.add(key);
    } else {
      newSet.set(key, "");
    }
  }

  return newSet;
}

function deepCopyTSTLClass(
  tstlClass: TSTLClass,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying a TSTL class.");
  }

  let newClass: TSTLClass | LuaMap<AnyNotNil, unknown>;
  if (serializationType === SerializationType.SERIALIZE) {
    // Since we are serializing, the new object will be a Lua table.
    newClass = new LuaMap<AnyNotNil, unknown>();
    // (We do not brand it with the class type because we will not have the associated class
    // constructor during deserialization, so knowing what type of class it is is pointless.)
  } else {
    newClass = newTSTLClass(tstlClass);
  }

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    tstlClass,
    serializationType,
    traversalDescription,
    insideMap,
  );

  if (convertedNumberKeysToStrings) {
    newClass.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
  }

  for (const [key, value] of entries) {
    newClass.set(key, value);
  }

  return newClass;
}

function deepCopyArray(
  array: unknown[],
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying an array.");
  }

  const newArray: unknown[] = [];

  for (const value of array) {
    const newValue = deepCopy(
      value,
      serializationType,
      traversalDescription,
      insideMap,
    );
    newArray.push(newValue);
  }

  return newArray;
}

function deepCopyNormalLuaTable(
  luaMap: LuaMap<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying a normal Lua table.");
  }

  const newTable = new LuaMap<AnyNotNil, unknown>();
  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    luaMap,
    serializationType,
    traversalDescription,
    insideMap,
  );

  if (convertedNumberKeysToStrings) {
    newTable.set(SerializationBrand.OBJECT_WITH_NUMBER_KEYS, "");
  }

  for (const [key, value] of entries) {
    newTable.set(key, value);
  }

  return newTable;
}

/**
 * Recursively clones the object's entries, automatically converting number keys to strings, if
 * necessary.
 */
function getCopiedEntries(
  object: unknown,
  serializationType: SerializationType,
  traversalDescription: string,
  insideMap: boolean,
): {
  entries: Array<[key: AnyNotNil, value: unknown]>;
  convertedNumberKeysToStrings: boolean;
} {
  // First, shallow copy the entries. We cannot use "pairs" to iterate over a `Map` or `Set`. We
  // cannot use "[...pairs(object)]", as it results in a run-time error.
  const entries: Array<[key: AnyNotNil, value: unknown]> = [];
  if (isTSTLMap(object) || isTSTLSet(object) || isDefaultMap(object)) {
    for (const [key, value] of object.entries()) {
      entries.push([key, value]);
    }
  } else {
    for (const [key, value] of pairs(object)) {
      entries.push([key, value]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    entries.sort(twoDimensionalSort);
  }

  // During serialization, we brand some Lua tables with a special identifier to signify that it has
  // keys that should be deserialized to numbers.
  const convertStringKeysToNumbers =
    serializationType === SerializationType.DESERIALIZE &&
    entries.some(
      ([key]) => key === (SerializationBrand.OBJECT_WITH_NUMBER_KEYS as string),
    );

  const hasNumberKeys = entries.some(([key]) => isNumber(key));
  const convertNumberKeysToStrings =
    serializationType === SerializationType.SERIALIZE && hasNumberKeys;

  // Second, deep copy the entries.
  const copiedEntries: Array<[key: AnyNotNil, value: unknown]> = [];
  for (const [key, value] of entries) {
    // When deserializing, we do not need to copy the serialization brands that are used to denote
    // the object type.
    if (isSerializationBrand(key)) {
      continue;
    }

    traversalDescription = getTraversalDescription(key, traversalDescription);
    const newValue = deepCopy(
      value,
      serializationType,
      traversalDescription,
      insideMap,
    );

    let keyToUse = key;
    if (convertStringKeysToNumbers) {
      const numberKey = tonumber(key);
      if (numberKey !== undefined) {
        keyToUse = numberKey;
      }
    }
    if (convertNumberKeysToStrings) {
      keyToUse = tostring(key);
    }
    copiedEntries.push([keyToUse, newValue]);
  }

  return {
    entries: copiedEntries,
    convertedNumberKeysToStrings: convertNumberKeysToStrings,
  };
}

/**
 * Lua tables can have metatables, which make writing a generic deep cloner impossible. The deep
 * copy function will refuse to copy a table type that has a metatable, outside of specifically
 * supported TSTL objects.
 */
function checkMetatable(
  luaMap: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
) {
  const metatable = getmetatable(luaMap);
  if (metatable === undefined) {
    return;
  }

  const tableDescription =
    traversalDescription === ""
      ? "the table to copy"
      : `"${traversalDescription}"`;

  error(
    `The deepCopy function detected that ${tableDescription} has a metatable. Copying tables with metatables is not supported, unless they are explicitly handled by the save data manager. (e.g. TypeScriptToLua Maps, TypeScriptToLua Sets, etc.)`,
  );
}

/** Isaac API classes are of type "userdata". End-user code cannot create userdata. */
function deepCopyUserdata(
  value: unknown,
  serializationType: SerializationType,
  traversalDescription: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("deepCopy is copying userdata.");
  }

  const classType = getIsaacAPIClassName(value);
  if (classType === undefined) {
    error(
      `The deep copy function was not able to derive the Isaac API class type for: ${traversalDescription}`,
    );
  }

  if (!COPYABLE_ISAAC_API_CLASS_TYPES_SET.has(classType)) {
    error(
      `The deep copy function does not support copying "${traversalDescription}", since it is an Isaac API class of type: ${classType}`,
    );
  }

  switch (serializationType) {
    case SerializationType.NONE: {
      return copyIsaacAPIClass(value);
    }

    case SerializationType.SERIALIZE: {
      return serializeIsaacAPIClass(value);
    }

    case SerializationType.DESERIALIZE: {
      return deserializeIsaacAPIClass(value);
    }
  }
}
