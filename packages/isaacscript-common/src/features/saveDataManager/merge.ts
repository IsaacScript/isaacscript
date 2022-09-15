import { SerializationBrand } from "../../enums/private/SerializationBrand";
import { SerializationType } from "../../enums/SerializationType";
import { isArray } from "../../functions/array";
import { deepCopy } from "../../functions/deepCopy";
import { log } from "../../functions/log";
import {
  deserializeIsaacAPIClass,
  isSerializedIsaacAPIClass,
} from "../../functions/serialization";
import { clearTable, iterateTableInOrder } from "../../functions/table";
import { isDefaultMap, isTSTLMap, isTSTLSet } from "../../functions/tstlClass";
import { isTable } from "../../functions/types";
import { getTraversalDescription } from "../../functions/utils";
import { SAVE_DATA_MANAGER_DEBUG } from "./constants";
import { isSerializationBrand } from "./serializationBrands";

/**
 * `merge` takes the values from a new table and recursively merges them into an old object (while
 * performing appropriate deserialization).
 *
 * It supports the following object types:
 *
 * - Basic TSTL objects / tables
 * - TSTL `Map`
 * - TSTL `Set`
 * - TSTL classes
 * - `DefaultMap`
 * - Isaac `BitSet128` objects
 * - Isaac `Color` objects
 * - Isaac `KColor` objects
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
  oldObject:
    | LuaMap<AnyNotNil, unknown>
    | Map<AnyNotNil, unknown>
    | Set<AnyNotNil>,
  newTable: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
): void {
  if (SAVE_DATA_MANAGER_DEBUG) {
    log(`merge is traversing: ${traversalDescription}`);
  }

  if (!isTable(oldObject)) {
    error("The first argument given to the merge function is not a table.");
  }

  if (!isTable(newTable)) {
    error("The second argument given to the merge function is not a table.");
  }

  // First, handle the special case of an array with a shallow copy.
  if (isArray(oldObject) && isArray(newTable)) {
    mergeSerializedArray(oldObject, newTable, traversalDescription);
    return;
  }

  // Depending on whether we are working on a Lua table or a TypeScriptToLua object, we need to
  // iterate in a specific way.
  if (isTSTLMap(oldObject) || isTSTLSet(oldObject) || isDefaultMap(oldObject)) {
    mergeSerializedTSTLObject(oldObject, newTable, traversalDescription);
  } else {
    mergeSerializedTable(oldObject, newTable, traversalDescription);
  }
}

function mergeSerializedArray(
  oldArray: LuaMap<AnyNotNil, unknown>,
  newArray: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
) {
  if (SAVE_DATA_MANAGER_DEBUG) {
    log(`merge encountered an array: ${traversalDescription}`);
  }

  // Assume that we should blow away all array values with whatever is present in the incoming
  // array.
  clearTable(oldArray);
  iterateTableInOrder(
    newArray,
    (key, value) => {
      oldArray.set(key, value);
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

function mergeSerializedTSTLObject(
  oldObject: Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newTable: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
) {
  if (SAVE_DATA_MANAGER_DEBUG) {
    log(`merge encountered a TSTL object: ${traversalDescription}`);
  }

  // We blow away the old object and recursively copy over all of the incoming values.
  oldObject.clear();

  // During serialization, we brand some Lua tables with a special identifier to signify that it has
  // keys that should be deserialized to numbers.
  const convertStringKeysToNumbers = newTable.has(
    SerializationBrand.OBJECT_WITH_NUMBER_KEYS,
  );

  iterateTableInOrder(
    newTable,
    (key, value) => {
      if (isSerializationBrand(key)) {
        return;
      }

      let keyToUse = key;
      if (convertStringKeysToNumbers) {
        const numberKey = tonumber(key);
        if (numberKey === undefined) {
          return;
        }
        keyToUse = numberKey;
      }

      if (isTSTLMap(oldObject) || isDefaultMap(oldObject)) {
        let valueCopy: unknown;
        if (isTable(value)) {
          valueCopy = deepCopy(
            value,
            SerializationType.DESERIALIZE,
            traversalDescription,
          );
        } else {
          valueCopy = value;
        }

        oldObject.set(keyToUse, valueCopy);
      } else if (isTSTLSet(oldObject)) {
        oldObject.add(keyToUse);
      }
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

function mergeSerializedTable(
  oldTable: LuaMap<AnyNotNil, unknown>,
  newTable: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
) {
  if (SAVE_DATA_MANAGER_DEBUG) {
    log(`merge encountered a Lua table: ${traversalDescription}`);
  }

  iterateTableInOrder(
    newTable,
    (key, value) => {
      if (SAVE_DATA_MANAGER_DEBUG) {
        const valueToPrint = value === "" ? "(empty string)" : `${value}`;
        log(`merge is merging: ${traversalDescription} --> ${valueToPrint}`);
      }

      if (isSerializationBrand(key)) {
        return;
      }

      // Handle the special case of serialized Isaac API classes.
      if (isSerializedIsaacAPIClass(value)) {
        if (SAVE_DATA_MANAGER_DEBUG) {
          log("merge found a serialized Isaac API class.");
        }

        const deserializedObject = deserializeIsaacAPIClass(value);
        oldTable.set(key, deserializedObject);
        return;
      }

      if (isTable(value)) {
        let oldValue = oldTable.get(key) as LuaMap<AnyNotNil, unknown>;
        if (!isTable(oldValue)) {
          // The child table does not exist on the old table. However, we still need to copy over
          // the new table, because we need to handle data types like "Foo | null". Thus, set up a
          // blank sub-table on the old table, and continue to recursively merge..
          oldValue = new LuaMap();
          oldTable.set(key, oldValue);
        }

        traversalDescription = getTraversalDescription(
          key,
          traversalDescription,
        );
        merge(oldValue, value, traversalDescription);
      } else {
        // Base case: copy the value
        oldTable.set(key, value);
      }
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}
