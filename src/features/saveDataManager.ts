// TODO convert Maps to LuaTables

import { log } from "../functions/log";
import { deepCopy } from "../functions/util";
import ModUpgraded from "../types/ModUpgraded";
import { SaveData, SaveDataWithoutRoom } from "../types/SaveData";
import * as jsonHelper from "./jsonHelper";

let mod: Mod | null = null;

/** Indexed by subscriber name. */
const saveDataMap = new LuaTable<string, SaveData>();

/** Indexed by subscriber name. */
const saveDataDefaultsMap = new LuaTable<string, SaveData>();

/** @hidden */
export function init(incomingMod: ModUpgraded): void {
  mod = incomingMod;

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit); // 17
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
}

/**
 * This is the entry point to the save data manager, a system which provides two major features:
 *
 * 1. automatic resetting of variables on a new run, on a new level, or on a new room (as desired)
 * 2. automatic saving and loading of all tracked data to the "save#.dat" file
 *
 * The save data manager never exposes any data, ensuring that all of the files in your mod have
 * variables that are properly scoped.
 *
 * Example:
 * ```
 * // in file: feature1.ts
 * import { saveDataManager } from "isaacscript-common";
 *
 * // Declare local variables for this file or feature
 * const v = {
 *   // These variables are never reset; manage them yourself at will
 *   persistent: {
 *     foo1: 0,
 *   },
 *
 *   // These variables are reset at the beginning of every run
 *   run: {
 *     foo2: 0,
 *   },
 *
 *   // These variables are reset at the beginning of every level
 *   level: {
 *     foo3: 0,
 *   },
 *
 *   // These variables are reset at the beginning of every room
 *   room: {
 *     foo2: 0,
 *   },
 * };
 * // (every child object is optional; only create the ones that you need)
 *
 * // Register the variables with the save data manager
 * // (we need to provide a string key so that it can save the variables properly in the "save#.dat"
 * // file)
 * saveDataManager("feature1", v);
 *
 * // Elsewhere in the file, use your variables
 * function feature1Function() {
 *   if (v.run.foo1 > 0) {
 *     // Do stuff
 *   }
 * }
 * ```
 *
 * Note that before using the save data manager, you must call the `[[upgradeMod]]` function.
 *
 * @param key The name of the file or feature that is submitting data to be managed by the save data
 * manager. The save data manager will throw an error if it receives a second registration request
 * using the same key as a previous subscriber.
 * @param saveData An object with one or more child-objects of "persistent", "run", "level", or
 * "room".
 */
export function saveDataManager(key: string, saveData: SaveData): void {
  if (mod === null) {
    error(
      'The save data manager is not initialized. You must first upgrade your mod object by calling the "upgradeMod()" function.',
    );
  }

  const keyType = type(key);
  if (keyType !== "string") {
    error(
      `The save data manager requires that keys are strings. You tried to use a key of type: ${keyType}`,
    );
  }

  if (saveDataMap.has(key)) {
    error(
      `The save data manager is already managing save data for a key of: ${key}`,
    );
  }

  // Add the new save data to the map
  saveDataMap.set(key, saveData);

  // Also, make a copy of the initial save data so that we can use it to restore the default values
  // later on
  const saveDataTable = saveData as LuaTable;
  const saveDataTableCopy = deepCopy(saveDataTable);
  const saveDataCopy = saveDataTableCopy as unknown as SaveData;
  saveDataDefaultsMap.set(key, saveDataCopy);
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted(isContinued: boolean) {
  if (isContinued) {
    loadFromDisk();
  } else {
    restoreDefaults("run");
  }
}

// ModCallbacks.MC_PRE_GAME_EXIT (17)
function preGameExit(shouldSave: boolean) {
  if (shouldSave) {
    saveToDisk();
  }

  restoreDefaultsAll();
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevel() {
  restoreDefaults("level");
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  restoreDefaults("room");
}

function restoreDefaultsAll() {
  restoreDefaults("run");
  restoreDefaults("level");
  restoreDefaults("room");
}

function restoreDefaults(childTableName: keyof SaveData) {
  for (const [key, saveData] of pairs(saveDataMap)) {
    const childTable = saveData[childTableName];
    if (childTable === undefined) {
      // This feature does not happen to store any variables on this particular child table
      continue;
    }

    // Get the default values for this feature
    const saveDataDefaults = saveDataDefaultsMap.get(key);
    if (saveDataDefaults === undefined) {
      error(`Failed to find the default copy of the save data for key: ${key}`);
    }

    // Get the default values for the specific sub-table of this feature
    const childTableDefaults = saveDataDefaults[childTableName];
    if (childTableDefaults === undefined) {
      error(
        `Failed to find the default copy of the child table "${childTableName}" for key: ${key}`,
      );
    }

    // Make a new copy of the default child table
    const childTableDefaultsTable = childTableDefaults as unknown as LuaTable;
    const childTableDefaultsTableCopy = deepCopy(childTableDefaultsTable);
    const childTableDefaultsCopy =
      childTableDefaultsTableCopy as unknown as Record<string, unknown>;

    // Blow away the existing child table with all default values
    saveData[childTableName] = childTableDefaultsCopy;
  }
}

function saveToDisk() {
  if (mod === null) {
    error('"saveDat.save()" was called without the mod being initialized.');
  }

  const allSaveData = getAllSaveDataWithoutRoom();
  const jsonString = jsonHelper.encode(allSaveData);
  Isaac.SaveModData(mod, jsonString); // Write it to the "save#.dat" file
}

function loadFromDisk() {
  if (mod === null) {
    error("The save data manager is not initialized.");
  }

  if (!Isaac.HasModData(mod)) {
    // There is no "save#.dat" file for this save slot
    return;
  }

  const oldSaveData = getAllSaveDataWithoutRoom();

  const jsonString = readSaveDatFile(mod);
  if (jsonString === null) {
    return;
  }
  const newSaveData = jsonHelper.decode(jsonString);

  // We don't want to directly copy the old data into the map,
  // because save data could contain out-of-date values
  // Instead, merge it one field at a time in a recursive way
  merge(oldSaveData, newSaveData);

  log('Loaded the "save#.dat" file.');
}

function readSaveDatFile(modObject: Mod) {
  const isaacFrameCount = Isaac.GetFrameCount();
  const defaultModData = "{}";

  const [ok, jsonStringOrErrMsg] = pcall(tryLoadModData, modObject);
  if (!ok) {
    log(
      `Failed to read from the "save#.dat" file on Isaac frame ${isaacFrameCount}: ${jsonStringOrErrMsg}`,
    );
    return defaultModData;
  }

  const jsonStringTrimmed = jsonStringOrErrMsg.trim();
  if (jsonStringTrimmed === "") {
    return defaultModData;
  }

  return jsonStringTrimmed;
}

function tryLoadModData(this: void, modObject: Mod) {
  return Isaac.LoadModData(modObject);
}

function getAllSaveDataWithoutRoom() {
  const allSaveData = new LuaTable();
  for (const [key, saveData] of pairs(saveDataMap)) {
    const saveDataWithoutRoom: SaveDataWithoutRoom = {
      persistent: saveData.persistent,
      run: saveData.run,
      level: saveData.level,
    };

    allSaveData.set(key, saveDataWithoutRoom);
  }

  return allSaveData;
}

/**
 * merge takes the values from a new table and merges them into an old table.
 * It will only copy over values that are present in the old table.
 * In other words, it will ignore extraneous values in the new table.
 * (This is useful when loading out-of-date save data from the "save#.dat" file.)
 *
 * @hidden
 */
export function merge(oldTable: LuaTable, newTable: LuaTable): void {
  if (type(oldTable) !== "table" || type(newTable) !== "table") {
    error("merge is comparing a value that is not a table.");
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

    // Recursively handle sub-tables
    if (oldType === "table") {
      merge(oldValue, newValue as LuaTable);
      continue;
    }

    // Base case - copy the value
    oldTable.set(key, newValue);
  }

  // We also need to iterate through the new table in case it is:
  // 1) an "array" (i.e. indexed by "1", "2", and so on)
  // 2) a key-value object indexed by a number coerced to a string (i.e. indexed by "2182363682")
  // In both of these cases, we always want to copy the values,
  // since they indicate state data that will be independent of mod version
  for (const [key, newValue] of pairs(newTable)) {
    const num = tonumber(key);
    if (num !== undefined) {
      oldTable.set(key, newValue);
    }
  }
}
