import { deepCopy } from "../functions/deepCopy";
import { tableClear } from "../functions/util";
import ModUpgraded from "../types/ModUpgraded";
import { SaveData } from "../types/SaveData";
import { loadFromDisk } from "./load";
import { saveToDisk } from "./save";

const DEFAULT_ERROR_MESSAGE =
  'The save data manager is not initialized. You must first upgrade your mod object by calling the "upgradeMod()" function.';

let mod: Mod | null = null;

// Indexed by subscriber name
const saveDataMap = new Map<string, SaveData>();
const saveDataDefaultsMap = new Map<string, SaveData>();
const saveDataConditionalFuncMap = new Map<string, () => boolean>();

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
    error(DEFAULT_ERROR_MESSAGE);
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
  if (mod === null) {
    error("The save data manager is not initialized.");
  }

  // We want to unconditionally load save data on every new run since there might be persistent data
  // that is not tied to an individual run
  // Since the PostGameStarted callback fires after the PostNewLevel and the PostNewRoom callbacks,
  // we do not have to worry about our loaded data being overwritten in subsequent callbacks
  loadFromDisk(mod, saveDataMap);

  if (!isContinued) {
    restoreDefaultsAll();
  }
}

// ModCallbacks.MC_PRE_GAME_EXIT (17)
function preGameExit(shouldSave: boolean) {
  if (mod === null) {
    error(DEFAULT_ERROR_MESSAGE);
  }

  if (shouldSave) {
    saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
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
  if (
    childTableName !== "run" &&
    childTableName !== "level" &&
    childTableName !== "room"
  ) {
    error(`Unknown child table name of: ${childTableName}`);
  }

  for (const [subscriberName, saveData] of saveDataMap) {
    const childTable = saveData[childTableName];
    if (childTable === undefined) {
      // This feature does not happen to store any variables on this particular child table
      continue;
    }

    // Get the default values for this feature
    const saveDataDefaults = saveDataDefaultsMap.get(subscriberName);
    if (saveDataDefaults === undefined) {
      error(
        `Failed to find the default copy of the save data for subscriber: ${subscriberName}`,
      );
    }

    // Get the default values for the specific sub-table of this feature
    const childTableDefaults = saveDataDefaults[childTableName];
    if (childTableDefaults === undefined) {
      error(
        `Failed to find the default copy of the child table "${childTableName}" for subscriber: ${subscriberName}`,
      );
    }

    // Make a new copy of the default child table
    const childTableDefaultsTable = childTableDefaults as unknown as LuaTable;
    const childTableDefaultsTableCopy = deepCopy(childTableDefaultsTable);

    // We do not want to blow away the existing child table because we don't want to break any
    // existing references
    // Instead, empty the table and copy all of the elements from the copy of the defaults table
    clearAndCopyAllElements(
      childTable as unknown as LuaTable,
      childTableDefaultsTableCopy,
    );
  }
}

/**
 * Will empty the old table of all elements, and then shallow copy all the elements from the new
 * table to the old table.
 */
function clearAndCopyAllElements(oldTable: LuaTable, newTable: LuaTable) {
  tableClear(oldTable);

  for (const [key, value] of pairs(newTable)) {
    oldTable.set(key, value);
  }
}

/**
 * The save data manager will automatically save variables to disk at the appropriate times (i.e.
 * when the run is exited). Use this function to explicitly force the save data manager to write all
 * of its variables to disk immediately.
 */
export function saveDataManagerSave(): void {
  if (mod === null) {
    error(DEFAULT_ERROR_MESSAGE);
  }

  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
}

declare let g: Map<string, SaveData>; // Globals
declare let gd: Map<string, SaveData>; // Globals defaults

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
