import { isArray } from "../../functions/array";
import { addTraversalDescription } from "../../functions/deepCopy";
import { jsonDecode } from "../../functions/json";
import { log } from "../../functions/log";
import { tableClear } from "../../functions/util";
import { SaveData } from "../../types/SaveData";

const DEBUG = false;
const DEFAULT_MOD_DATA = "{}";

export function loadFromDisk(
  mod: Mod,
  oldSaveData: LuaTable<string, SaveData>,
): void {
  if (!mod.HasData()) {
    // There is no "save#.dat" file for this save slot
    return;
  }

  // First, read the "save#.dat" file into a Lua table
  const jsonString = readSaveDatFile(mod);
  if (jsonString === null) {
    return;
  }
  const newSaveData = jsonDecode(jsonString);

  if (DEBUG) {
    log('Converted data from the "save#.dat" to a Lua table.');
  }

  // Second, iterate over all the fields of the new table
  for (const [key, value] of pairs(newSaveData)) {
    // All elements of loaded save data should have keys that are strings equal to the name of the
    // subscriber/feature
    // Ignore elements with other types of keys
    const keyType = type(key);
    if (keyType !== "string") {
      continue;
    }

    // All elements of loaded save data should be tables that contain fields corresponding to the
    // SaveData interface
    // Ignore elements that are not tables
    const valueType = type(value);
    if (valueType !== "table") {
      continue;
    }

    // Ignore elements that represent subscriptions that no longer exist in the current save data
    const oldSaveDataForSubscriber = oldSaveData.get(key as string);
    if (oldSaveDataForSubscriber === undefined) {
      continue;
    }

    if (DEBUG) {
      log(`Merging in stored data for feature: ${key}`);
    }

    // We do not want to blow away the child tables of the existing map,
    // because save data could contain out-of-date fields
    // Instead, merge it one field at a time in a recursive way
    // (and convert Lua tables back to TypeScriptToLua Maps, if necessary)
    merge(oldSaveDataForSubscriber as LuaTable, value, key as string);
  }

  log('The save data manager loaded data from the "save#.dat" file.');
}

function readSaveDatFile(mod: Mod) {
  const isaacFrameCount = Isaac.GetFrameCount();

  const [ok, jsonStringOrErrMsg] = pcall(tryLoadModData, mod);
  if (!ok) {
    log(
      `Failed to read from the "save#.dat" file on Isaac frame ${isaacFrameCount}: ${jsonStringOrErrMsg}`,
    );
    return DEFAULT_MOD_DATA;
  }

  const jsonStringTrimmed = jsonStringOrErrMsg.trim();
  if (jsonStringTrimmed === "") {
    return DEFAULT_MOD_DATA;
  }

  return jsonStringTrimmed;
}

function tryLoadModData(this: void, mod: Mod) {
  return mod.LoadData();
}

/**
 * merge takes the values from a new table and merges them into an old table.
 * It will only copy over values that are present in the old table.
 * In other words, it will ignore extraneous values in the new table.
 * (This is useful when loading out-of-date save data from the "save#.dat" file.)
 * It will also fill any TypeScriptToLua Maps with appropriate values from a corresponding Lua
 * table.
 */
function merge(
  oldTable: LuaTable,
  newTable: LuaTable,
  traversalDescription: string,
): void {
  if (type(oldTable) !== "table") {
    error("The first argument given to the merge function is not a table.");
  }

  if (type(newTable) !== "table") {
    error("The second argument given to the merge function is not a table.");
  }

  // First, handle the case of a TypeScriptToLua Map
  if (oldTable instanceof Map) {
    const oldMap = oldTable as Map<AnyNotNil, unknown>;

    if (DEBUG) {
      log(
        `Converting the "${traversalDescription}" table to a TypeScriptToLua Map.`,
      );
    }

    // Assume that we should blow away all Map values with whatever is present in the incoming table
    oldMap.clear();
    for (const [key, value] of pairs(newTable)) {
      if (DEBUG) {
        log(`Setting ${key} --> ${value}`);
      }
      oldMap.set(key, value);
    }

    if (DEBUG) {
      log(`Size of merged Map "${traversalDescription}": ${oldMap.size}`);
    }

    return;
  }

  // Second, handle the case of an array
  if (isArray(oldTable) && isArray(newTable)) {
    // Assume that we should blow away all array values with whatever is present in the incoming
    // array
    tableClear(oldTable);
    for (const [key, value] of pairs(newTable)) {
      oldTable.set(key, value);
    }

    return;
  }

  // Go through the old table, merging every found value
  for (const [key, oldValue] of pairs(oldTable)) {
    const newValue = newTable.get(key) as unknown;
    const oldType = type(oldValue);
    const newType = type(newValue);

    // Do nothing if a property on the incoming table either does not exist or is a mismatched type
    if (oldType !== newType) {
      continue;
    }

    if (oldType === "table") {
      // Recursively handle sub-tables
      traversalDescription = addTraversalDescription(key, traversalDescription);
      merge(oldValue, newValue as LuaTable, traversalDescription);
    } else {
      // Base case: copy the value
      oldTable.set(key, newValue);
    }
  }
}
