import {
  isSerializationBrand,
  SerializationBrand,
} from "../../enums/private/SerializationBrand";
import { SerializationType } from "../../enums/SerializationType";
import { isArray } from "../../functions/array";
import { deepCopy } from "../../functions/deepCopy";
import { log } from "../../functions/log";
import { copyRNG, isSerializedRNG } from "../../functions/rng";
import { clearTable } from "../../functions/table";
import { getTraversalDescription } from "../../functions/utils";
import { copyVector, isSerializedVector } from "../../functions/vector";
import { SAVE_DATA_MANAGER_DEBUG } from "./constants";

/**
 * merge takes the values from a new table and recursively merges them into an old object (while
 * performing appropriate deserialization).
 *
 * It supports the following object types:
 *
 * - `LuaTable` / basic TSTL objects
 * - TSTL `Map`
 * - TSTL `Set`
 * - TSTL classes
 * - `DefaultMap`
 * - Isaac `Color` objects
 * - Isaac `RNG` objects
 * - Isaac `Vector` objects
 *
 * Since it is common for a variable to have a type of `something | null`, we must iterate over the
 * new object and copy over all of the values. (A value of null transpiles to nil, which means the
 * table key does not exist.) The consequence of this is that it can copy over old variables that
 * are no longer used in the code, or copy over old variables of a different type, which can cause
 * run-time errors. In such cases, users will have to manually delete their save data.
 */
export function merge(
  oldObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newTable: LuaTable,
  traversalDescription: string,
): void {
  if (SAVE_DATA_MANAGER_DEBUG) {
    log(`merge is operating on: ${traversalDescription}`);
  }

  const oldObjectType = type(oldObject);
  if (oldObjectType !== "table") {
    error("The first argument given to the merge function is not a table.");
  }

  const newTableType = type(newTable);
  if (newTableType !== "table") {
    error("The second argument given to the merge function is not a table.");
  }

  // First, handle the special case of an array with a shallow copy
  if (mergeArray(oldObject, newTable)) {
    return;
  }

  // Depending on whether we are working on a Lua table or a TypeScriptToLua object,
  // we need to iterate in a specific way
  if (oldObject instanceof Map || oldObject instanceof Set) {
    mergeTSTLObject(oldObject, newTable, traversalDescription);
  } else {
    mergeTable(oldObject, newTable, traversalDescription);
  }
}

function mergeArray(
  oldObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newTable: LuaTable,
) {
  const oldArray = oldObject as LuaTable;
  if (!isArray(oldArray) || !isArray(newTable)) {
    return false;
  }

  // Assume that we should blow away all array values with whatever is present in the incoming array
  clearTable(oldArray);
  for (const [key, value] of pairs(newTable)) {
    oldArray.set(key, value);
  }

  return true;
}

function mergeTSTLObject(
  oldObject: Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newTable: LuaTable,
  traversalDescription: string,
) {
  // We blow away the old object and recursively copy over all of the incoming values
  oldObject.clear();

  // During serialization, we brand some Lua tables with a special identifier to signify that it has
  // keys that should be deserialized to numbers
  const convertStringKeysToNumbers = newTable.has(
    SerializationBrand.OBJECT_WITH_NUMBER_KEYS,
  );

  for (const [key, value] of pairs(newTable)) {
    if (isSerializationBrand(key)) {
      continue;
    }

    let keyToUse = key;
    if (convertStringKeysToNumbers) {
      const numberKey = tonumber(key);
      if (numberKey === undefined) {
        continue;
      }
      keyToUse = numberKey;
    }

    if (oldObject instanceof Map) {
      const valueType = type(value);

      let valueCopy: unknown;
      if (valueType === "table") {
        valueCopy = deepCopy(
          value as LuaTable,
          SerializationType.DESERIALIZE,
          traversalDescription,
        );
      } else {
        valueCopy = value;
      }

      oldObject.set(keyToUse, valueCopy);
    } else if (oldObject instanceof Set) {
      oldObject.add(keyToUse);
    }
  }
}

function mergeTable(
  oldTable: LuaTable,
  newTable: LuaTable,
  traversalDescription: string,
) {
  if (SAVE_DATA_MANAGER_DEBUG) {
    log("merge is operating on a table. Iterating through the keys...");
  }

  for (const [key, value] of pairs(newTable)) {
    if (SAVE_DATA_MANAGER_DEBUG) {
      log(`merge is operating on: ${key} --> ${value}`);
    }

    if (isSerializationBrand(key)) {
      continue;
    }

    // Handle the special case of supported Isaac classes
    const deserializedIsaacClass = tryDeserializeIsaacClass(value);
    if (deserializedIsaacClass !== undefined) {
      oldTable.set(key, deserializedIsaacClass);
      continue;
    }

    const valueType = type(value);
    if (valueType === "table") {
      let oldValue = oldTable.get(key) as LuaTable;
      const oldValueType = type(oldValue);

      if (oldValueType !== "table") {
        // The child table does not exist on the old table
        // However, we still need to copy over the new table, because we need to handle data types
        // like "Foo | null"
        // Thus, set up a blank sub-table on the old table, and continue to recursively merge
        oldValue = new LuaTable();
        oldTable.set(key, oldValue);
      }

      traversalDescription = getTraversalDescription(key, traversalDescription);
      merge(oldValue, value as LuaTable, traversalDescription);
    } else {
      // Base case: copy the value
      if (SAVE_DATA_MANAGER_DEBUG) {
        log(`Merging key "${key}" with value: ${value}`);
      }
      oldTable.set(key, value);
    }
  }
}

function tryDeserializeIsaacClass(value: unknown) {
  if (isSerializedVector(value)) {
    return copyVector(value, SerializationType.DESERIALIZE);
  }

  if (isSerializedRNG(value)) {
    return copyRNG(value, SerializationType.DESERIALIZE);
  }

  return undefined;
}
