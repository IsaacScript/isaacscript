import { DefaultMap } from "../classes/DefaultMap";
import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { SAVE_DATA_MANAGER_DEBUG } from "../features/saveDataManager/constants";
import { isSerializationBrand } from "../features/saveDataManager/serializationBrand";
import { TSTLClass } from "../types/private/TSTLClass";
import { isArray } from "./array";
import { getEnumValues } from "./enums";
import { getIsaacAPIClassName } from "./isaacAPIClass";
import { log, logTable } from "./log";
import {
  copyIsaacAPIClass,
  deserializeIsaacAPIClass,
  isSerializedIsaacAPIClass,
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
import {
  ensureAllCases,
  getTraversalDescription,
  twoDimensionalSort,
} from "./utils";

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
 * It does not support:
 * - objects with values of `null` (since that transpiles to `nil`)
 * - other Isaac API objects such as `EntityPtr` (that have a type of "userdata")
 *
 * @param value The primitive or object to copy.
 * @param serializationType Has 3 possible values. Can leave objects as-is, or can serialize objects
 *                          to Lua tables, or can deserialize Lua tables to objects. Default is
 *                          `SerializationType.NONE`.
 * @param traversalDescription Used to track the current key that we are operating on.
 */
export function deepCopy(
  value: unknown,
  serializationType = SerializationType.NONE,
  traversalDescription = "",
): unknown {
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
      const valueTable = value as LuaTable<AnyNotNil, unknown>;
      return deepCopyTable(valueTable, serializationType, traversalDescription);
    }

    case "userdata": {
      return deepCopyUserdata(value, serializationType, traversalDescription);
    }

    default: {
      return ensureAllCases(valueType);
    }
  }
}

function deepCopyTable(
  luaTable: LuaTable<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
) {
  // First, handle the cases of TSTL classes or serialized TSTL classes.
  if (isDefaultMap(luaTable) || luaTable.has(SerializationBrand.DEFAULT_MAP)) {
    return deepCopyDefaultMap(
      luaTable,
      serializationType,
      traversalDescription,
    );
  }

  if (isTSTLMap(luaTable) || luaTable.has(SerializationBrand.MAP)) {
    return deepCopyMap(luaTable, serializationType, traversalDescription);
  }

  if (isTSTLSet(luaTable) || luaTable.has(SerializationBrand.SET)) {
    return deepCopySet(luaTable, serializationType, traversalDescription);
  }

  const className = getTSTLClassName(luaTable);

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

  if (isUserDefinedTSTLClass(luaTable)) {
    return deepCopyTSTLClass(luaTable, serializationType, traversalDescription);
  }

  // This is not a TSTL Map/Set/class. If it has a metatable, abort.
  checkMetatable(luaTable, traversalDescription);

  // Handle the special case of serialized Isaac API classes.
  if (
    isSerializedIsaacAPIClass(luaTable) &&
    serializationType === SerializationType.DESERIALIZE
  ) {
    return deserializeIsaacAPIClass(luaTable);
  }

  // Handle the special case of an array.
  if (isArray(luaTable)) {
    return deepCopyArray(luaTable, serializationType, traversalDescription);
  }

  // Base case: copy a normal Lua table
  return deepCopyNormalLuaTable(
    luaTable,
    serializationType,
    traversalDescription,
  );
}

function deepCopyDefaultMap(
  defaultMap: DefaultMap<AnyNotNil, unknown> | LuaTable<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
) {
  const constructorArg = isDefaultMap(defaultMap)
    ? defaultMap.getConstructorArg()
    : undefined;

  let newDefaultMap:
    | DefaultMap<AnyNotNil, unknown>
    | LuaTable<AnyNotNil, unknown>;
  switch (serializationType) {
    case SerializationType.NONE: {
      // eslint-disable-next-line isaacscript/no-invalid-default-map
      newDefaultMap = new DefaultMap(constructorArg);
      break;
    }

    case SerializationType.SERIALIZE: {
      // The DefaultMap can be instantiated with a factory function. If this is the case, then we
      // cannot serialize it, so we serialize it as a normal `Map` instead. We do not throw a
      // runtime error because the merge function does not need to instantiate the DefaultMap class
      // in most circumstances.
      if (!isPrimitive(constructorArg)) {
        return deepCopyMap(defaultMap, serializationType, traversalDescription);
      }

      // Since we are serializing, the new object will be a Lua table.
      newDefaultMap = new LuaTable<AnyNotNil, unknown>();
      newDefaultMap.set(SerializationBrand.DEFAULT_MAP, "");
      newDefaultMap.set(SerializationBrand.DEFAULT_MAP_VALUE, constructorArg);

      break;
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
      newDefaultMap = new DefaultMap(defaultMapValue);

      break;
    }

    default: {
      return ensureAllCases(serializationType);
    }
  }

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    defaultMap,
    serializationType,
    traversalDescription,
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

  return newDefaultMap;
}

function deepCopyMap(
  map: Map<AnyNotNil, unknown> | LuaTable<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
) {
  let newMap: Map<AnyNotNil, unknown> | LuaTable<AnyNotNil, unknown>;
  if (serializationType === SerializationType.SERIALIZE) {
    // Since we are serializing, the new object will be a Lua table.
    newMap = new LuaTable<AnyNotNil, unknown>();
    newMap.set(SerializationBrand.MAP, "");
  } else {
    newMap = new Map();
  }

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    map,
    serializationType,
    traversalDescription,
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

  return newMap;
}

function deepCopySet(
  set: Set<AnyNotNil> | LuaTable<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
) {
  let newSet: Set<AnyNotNil> | LuaTable<AnyNotNil, string>;
  if (serializationType === SerializationType.SERIALIZE) {
    // For serialization purposes, we represent a `Set` as a table with keys that match the
    // keys/values in the Set and values of an empty string.
    newSet = new LuaTable<AnyNotNil, string>();
    newSet.set(SerializationBrand.SET, "");
  } else {
    newSet = new Set();
  }

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    set,
    serializationType,
    traversalDescription,
  );

  if (convertedNumberKeysToStrings) {
    // Differentiating between the two types looks superfluous but is necessary for TSTL to produce
    // the proper set method call.
    if (isTSTLSet(newSet)) {
      // We should never be serializing an object of type Set.
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
) {
  let newClass: TSTLClass | LuaTable<AnyNotNil, unknown>;
  if (serializationType === SerializationType.SERIALIZE) {
    // Since we are serializing, the new object will be a Lua table.
    newClass = new LuaTable<AnyNotNil, unknown>();
    // (We do not brand it with the class type because we will not have the associated class
    // constructor during deserialization, so knowing what type of class it is is pointless.)
  } else {
    newClass = newTSTLClass(tstlClass);
  }

  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    tstlClass,
    serializationType,
    traversalDescription,
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
) {
  const newArray: unknown[] = [];

  for (const value of array) {
    const newValue = deepCopy(value, serializationType, traversalDescription);
    newArray.push(newValue);
  }

  return newArray;
}

function deepCopyNormalLuaTable(
  luaTable: LuaTable<AnyNotNil, unknown>,
  serializationType: SerializationType,
  traversalDescription: string,
) {
  const newTable = new LuaTable<AnyNotNil, unknown>();
  const { entries, convertedNumberKeysToStrings } = getCopiedEntries(
    luaTable,
    serializationType,
    traversalDescription,
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
): {
  entries: Array<[key: AnyNotNil, value: unknown]>;
  convertedNumberKeysToStrings: boolean;
} {
  // First, shallow copy the entries. We cannot use "pairs" to iterate over a Map or Set. We cannot
  // use "[...pairs(object)]", as it results in a run-time error.
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

  if (SAVE_DATA_MANAGER_DEBUG) {
    logTable(entries);
    entries.sort(twoDimensionalSort);
  }

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
    const newValue = deepCopy(value, serializationType, traversalDescription);

    const keyToUse = convertNumberKeysToStrings ? tostring(key) : key;
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
function checkMetatable(luaTable: LuaTable, traversalDescription: string) {
  const metatable = getmetatable(luaTable);
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

  return copyIsaacAPIClass(value, serializationType);
}
