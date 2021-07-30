import * as tableUtils from "./tableUtils";
import SaveData from "./types/SaveData";

/** Indexed by subscriber name. */
const saveDataMap = new Map<string, SaveData>();

/** Indexed by subscriber name. */
const saveDataDefaultsMap = new Map<string, SaveData>();

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
}

/**
 * This is the entry point to the save data manager, a system which provides two major features:
 *
 * 1. automatic resetting of data on a new run, on a new level, or on a new room (as desired)
 * 2. automatic saving and loading of all data to the "save#.dat" file
 *
 * The save data manager never exposes any data, ensuring that all of the files in your mod have
 * variables that are properly scoped.
 *
 * To use it, simply define an object that roughly matches the format of `SaveData`, and feed it to
 * the `saveDataManager.init()` function.
 *
 * Example:
 * ```
 * // in file: feature1.ts
 * import { saveDataManager } from "isaacscript-common";
 *
 * // Declare local variables to this file or feature
 * const v = {
 *   // These are never reset
 *   persistent: {
 *     foo1: 0,
 *   },
 *
 *   // These are reset at the beginning of every run
 *   run: {
 *     foo2: 0,
 *   },
 *
 *   // These are reset at the beginning of every level
 *   level: {
 *     foo3: 0,
 *   },
 *
 *   // These are reset at the beginning of every room
 *   room: {
 *     foo2: 0,
 *   },
 * };
 * // (every child object is optional; only create the ones that you need)
 *
 * // Register the variables with the save data manager
 * // We need to provide a string key to the resetter so that it can save the variables properly in
 * // the "save#.dat" file
 * saveDataManager.register("feature1", v);
 *
 * // Elsewhere in the file...
 * function feature1Function() {
 *   if (v.run.foo1 > 0) {
 *     // Do stuff
 *   }
 * }
 * ```
 *
 * @param key The name of the file or feature that is submitting data to be managed by the save data
 * manager. The save data manager will throw an error if it receives a second registration request
 * using the same key as a previous subscriber.
 * @param saveData An object with one or more child-objects of "persistent", "run", "level", or
 * "room".
 */
export function register(key: string, saveData: SaveData): void {
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
  const saveDataTableCopy = tableUtils.copy(saveDataTable);
  const saveDataCopy = saveDataTableCopy as unknown as SaveData;
  saveDataDefaultsMap.set(key, saveDataCopy);
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  restoreDefaults("run");
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevel() {
  restoreDefaults("level");
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  restoreDefaults("room");
}

function restoreDefaults(childTableName: keyof SaveData) {
  for (const [key, saveData] of saveDataMap.entries()) {
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
    const childTableDefaultsTableCopy = tableUtils.copy(
      childTableDefaultsTable,
    );
    const childTableDefaultsCopy =
      childTableDefaultsTableCopy as unknown as Record<string, unknown>;

    // Blow away the existing child table with all default values
    saveData[childTableName] = childTableDefaultsCopy;
  }
}

// TODO interaction with "save#.dat"
// TODO convert Maps to LuaTables
