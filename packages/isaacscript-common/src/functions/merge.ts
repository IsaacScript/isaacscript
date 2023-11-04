import { SAVE_DATA_MANAGER_DEBUG } from "../classes/features/other/saveDataManager/constants";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { isSerializationBrand } from "../serialization";
import type { AnyClass } from "../types/AnyClass";
import { isArray } from "./array";
import { deepCopy } from "./deepCopy";
import { log } from "./log";
import {
  deserializeIsaacAPIClass,
  isSerializedIsaacAPIClass,
} from "./serialization";
import { clearTable, iterateTableInOrder } from "./table";
import { isDefaultMap, isTSTLMap, isTSTLSet } from "./tstlClass";
import { isTable } from "./types";
import { getTraversalDescription } from "./utils";

/**
 * `merge` takes the values from a new table and recursively merges them into an old object (while
 * performing appropriate deserialization).
 *
 * This function is used to merge incoming data from the "save#.dat" file into a mod's variables.
 * Merging is useful instead of blowing away a table entirely because mod code often relies on the
 * local table/object references.
 *
 * This function always assumes that the new table is serialized data and will attempt to perform
 * deserialization on the objects within. In other words, unlike the `deepCopy` function, the
 * `merge` function will always operates in the mode of `SerializationType.DESERIALIZE`. For the
 * types of objects that will be deserialized, see the documentation for the `deepCopy` function.
 *
 * This function does not iterate over the old object, like you would naively expect. This is
 * because it is common for a variable to have a type of `something | null`. If this is the case,
 * the key would not appear when iterating over the old object (because a value of null transpiles
 * to nil, which means the table key does not exist). Thus, we must instead iterate over the new
 * object and copy the values backwards. The consequence of this is that `merge` can copy over old
 * variables that are no longer used in the code, or copy over old variables of a different type,
 * which can cause run-time errors. In such cases, users will have to manually delete their save
 * data.
 *
 * @param oldObject The old object to merge the values into. This can be either a Lua table, a TSTL
 *                  map, or a TSTL set.
 * @param newTable The new table to merge the values from. This must be a Lua table that represents
 *                 serialized data. In other words, it should be created with the `deepCopy`
 *                 function using `SerializationType.SERIALIZE`.
 * @param traversalDescription Used to track the current key that we are operating on for debugging
 *                             purposes. Use a name that corresponds to the name of the merging
 *                             table.
 * @param classConstructors Optional. A Lua table that maps the name of a user-defined TSTL class to
 *                          its corresponding constructor. If the `deepCopy` function finds any
 *                          user-defined TSTL classes when recursively iterating through the given
 *                          object, it will use this map to instantiate a new class. Default is an
 *                          empty Lua table.
 */
export function merge(
  oldObject:
    | LuaMap<AnyNotNil, unknown>
    | Map<AnyNotNil, unknown>
    | Set<AnyNotNil>,
  newTable: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
  classConstructors = new LuaMap<string, AnyClass>(),
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
    mergeSerializedArray(
      oldObject,
      newTable,
      traversalDescription,
      classConstructors,
    );
    return;
  }

  // Depending on whether we are working on a Lua table or a TypeScriptToLua object, we need to
  // iterate in a specific way.
  if (isTSTLMap(oldObject) || isTSTLSet(oldObject) || isDefaultMap(oldObject)) {
    mergeSerializedTSTLObject(
      oldObject,
      newTable,
      traversalDescription,
      classConstructors,
    );
  } else {
    mergeSerializedTable(
      oldObject,
      newTable,
      traversalDescription,
      classConstructors,
    );
  }
}

function mergeSerializedArray(
  oldArray: LuaMap<AnyNotNil, unknown>,
  newArray: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
  classConstructors: LuaMap<string, AnyClass>,
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
      const deserializedValue = deepCopy(
        value,
        SerializationType.DESERIALIZE,
        traversalDescription,
        classConstructors,
      );
      oldArray.set(key, deserializedValue);
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

function mergeSerializedTSTLObject(
  oldObject: Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newTable: LuaMap<AnyNotNil, unknown>,
  traversalDescription: string,
  classConstructors: LuaMap<string, AnyClass>,
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
        const deserializedValue = deepCopy(
          value,
          SerializationType.DESERIALIZE,
          traversalDescription,
          classConstructors,
        );
        oldObject.set(keyToUse, deserializedValue);
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
  classConstructors: LuaMap<string, AnyClass>,
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
          // the new table, because we need to handle data types like `Foo | null`. Thus, set up a
          // blank sub-table on the old table, and continue to recursively merge.
          oldValue = new LuaMap();
          oldTable.set(key, oldValue);
        }

        traversalDescription = getTraversalDescription(
          key,
          traversalDescription,
        );
        merge(oldValue, value, traversalDescription, classConstructors);
      } else {
        // Base case: copy the value
        oldTable.set(key, value);
      }
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}
