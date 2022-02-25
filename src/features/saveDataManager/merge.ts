import { isArray } from "../../functions/array";
import {
  addTraversalDescription,
  deepCopy,
  deserializeVector,
  isSerializedVector,
  SerializationType,
} from "../../functions/deepCopy";
import { log } from "../../functions/log";
import { clearTable } from "../../functions/table";
import {
  isSerializationBrand,
  SerializationBrand,
} from "../../types/SerializationBrand";
import { SAVE_DATA_MANAGER_DEBUG } from "./debug";

/**
 * merge takes the values from a new table and recursively merges them into an old object
 * (while performing appropriate deserialization).
 * This function handles Lua tables and TypeScriptToLua Maps/Sets/Classes.
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
  const oldObjectType = type(oldObject);
  if (oldObjectType !== "table") {
    error("The first argument given to the merge function is not a table.");
  }

  const newTableType = type(newTable);
  if (newTableType !== "table") {
    error("The second argument given to the merge function is not a table.");
  }

  if (SAVE_DATA_MANAGER_DEBUG) {
    log(`merge is operating on: ${traversalDescription}`);
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
  for (const [key, value] of pairs(newTable)) {
    if (isSerializationBrand(key)) {
      continue;
    }

    // Handle the special case of a Vector
    if (mergeVector(oldTable, key, value)) {
      continue;
    }

    const valueType = type(value);
    if (valueType === "table") {
      // Recursively merge sub-tables, but only if the child table exists on the old table too
      const oldValue = oldTable.get(key) as LuaTable;
      const oldValueType = type(oldValue);
      if (oldValueType === "table") {
        traversalDescription = addTraversalDescription(
          key,
          traversalDescription,
        );
        merge(oldValue, value as LuaTable, traversalDescription);
      }
    } else {
      // Base case: copy the value
      if (SAVE_DATA_MANAGER_DEBUG) {
        log(`Merging key "${key}" with value: ${value}`);
      }
      oldTable.set(key, value);
    }
  }
}

function mergeVector(oldTable: LuaTable, key: AnyNotNil, value: unknown) {
  if (!isSerializedVector(value)) {
    return false;
  }

  const serializedVector = value as LuaTable;
  const vector = deserializeVector(serializedVector);
  oldTable.set(key, vector);

  return true;
}
