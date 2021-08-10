import { jsonDecode, jsonEncode } from "../functions/json";
import { log } from "../functions/log";
import { deepCopy } from "../functions/util";
import ModUpgraded from "../types/ModUpgraded";
import { SaveData, SaveDataWithoutRoom } from "../types/SaveData";

let mod: Mod | null = null;

// Indexed by subscriber name
const saveDataMap = new LuaTable<string, SaveData>();
const saveDataDefaultsMap = new LuaTable<string, SaveData>();
const saveDataConditionalFuncMap = new LuaTable<string, () => boolean>();

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
 * // (we need to provide a string key so that it can save the variables properly in the
 * // "save#.dat" file)
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
 * Save data is recorded to disk in the MC_PRE_GAME_EXIT callback.
 *
 * Note that before using the save data manager, you must call the [[`upgradeMod`]] function.
 *
 * @param key The name of the file or feature that is submitting data to be managed by the save data
 * manager. The save data manager will throw an error if it receives a second registration request
 * using the same key as a previous subscriber.
 * @param saveData An object with one or more child-objects of "persistent", "run", "level", or
 * "room".
 * @param conditionalFunc An optional function to run upon saving this key to disk. If the function
 * is false, the key will not be written to disk. This allows mod features to avoid cluttering the
 * "save#.dat" file with unnecessary keys.
 */
export function saveDataManager(
  key: string,
  saveData: SaveData,
  conditionalFunc?: () => boolean,
): void {
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

  // Make a copy of the initial save data so that we can use it to restore the default values later
  // on
  const saveDataTable = saveData as LuaTable;
  const saveDataTableCopy = deepCopy(saveDataTable);
  const saveDataCopy = saveDataTableCopy as unknown as SaveData;
  saveDataDefaultsMap.set(key, saveDataCopy);

  // Store the conditional function for later, if present
  if (conditionalFunc !== undefined) {
    saveDataConditionalFuncMap.set(key, conditionalFunc);
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted(isContinued: boolean) {
  if (isContinued) {
    // Since the PostGameStarted callback fires after the PostNewLevel and the PostNewRoom
    // callbacks, we do not have to worry about our loaded data being overwritten
    loadFromDisk();
  }

  // If the game is a run that is not continued, we do not need to reset any variables because:
  // 1) they were already reset in the PreGameExit callback, or
  // 2) this is the first run after opening the game
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

    // We do not want to blow away the existing child table because we don't want to break any
    // existing references
    // Instead, merge in the values
    // (but only one level deep, or else arrays and maps would be merged)
    merge(childTable as unknown as LuaTable, childTableDefaultsTableCopy, true);
  }
}

function saveToDisk() {
  if (mod === null) {
    error('"saveDat.save()" was called without the mod being initialized.');
  }

  const allSaveData = getAllSaveDataWithoutRoom(true);
  const jsonString = jsonEncode(allSaveData);
  mod.SaveData(jsonString); // Write it to the "save#.dat" file
}

function loadFromDisk() {
  if (mod === null) {
    error("The save data manager is not initialized.");
  }

  if (!mod.HasData()) {
    // There is no "save#.dat" file for this save slot
    return;
  }

  const oldSaveData = getAllSaveDataWithoutRoom(false);

  const jsonString = readSaveDatFile();
  if (jsonString === null) {
    return;
  }
  const newSaveData = jsonDecode(jsonString);

  // We don't want to directly copy the old data into the map,
  // because save data could contain out-of-date values
  // Instead, merge it one field at a time in a recursive way
  merge(oldSaveData, newSaveData);
}

function readSaveDatFile() {
  const isaacFrameCount = Isaac.GetFrameCount();
  const defaultModData = "{}";

  const [ok, jsonStringOrErrMsg] = pcall(tryLoadModData);
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

function tryLoadModData(this: void) {
  if (mod === null) {
    error("The save data manager is not initialized.");
  }

  return mod.LoadData();
}

function getAllSaveDataWithoutRoom(pruneKeys: boolean) {
  const allSaveData = new LuaTable();
  for (const [key, saveData] of pairs(saveDataMap)) {
    // Handle the feature of the save data manager where certain mod features can conditionally
    // write their data to disk
    if (pruneKeys) {
      const conditionalFunc = saveDataConditionalFuncMap.get(key);
      if (conditionalFunc !== undefined) {
        const shouldSave = conditionalFunc();
        if (!shouldSave) {
          continue;
        }
      }
    }

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
 */
function merge(oldTable: LuaTable, newTable: LuaTable, shallow = false): void {
  if (type(oldTable) !== "table") {
    error("The first argument given to the merge function is not a table.");
  }

  if (type(newTable) !== "table") {
    error("The second argument given to the merge function is not a table.");
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

    if (oldType === "table" && !shallow) {
      // Recursively handle sub-tables
      merge(oldValue, newValue as LuaTable);
    } else {
      // Base case: copy the value
      oldTable.set(key, newValue);
    }
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

export function saveDataManagerSave(): void {
  saveToDisk();
}

declare let g: LuaTable<string, SaveData>; // Globals
declare let gd: LuaTable<string, SaveData>; // Globals defaults

/**
 * Sets the global variable of "g" equal to all of the save data variables for this mod.
 * Sets the global variable of "gd" equal to all of the save data default variables for this mod.
 * This can make debugging easier, as you can access the variables from the game's debug console.
 * e.g. `l print(g.feature1.foo)`
 */
export function saveDataManagerSetGlobal(): void {
  g = saveDataMap; // eslint-disable-line @typescript-eslint/no-unused-vars
  gd = saveDataDefaultsMap; // eslint-disable-line @typescript-eslint/no-unused-vars
}
