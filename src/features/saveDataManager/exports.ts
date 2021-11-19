import { getUpgradeErrorMsg } from "../../errors";
import { deepCopy, SerializationType } from "../../functions/deepCopy";
import { SaveData } from "../../types/SaveData";
import {
  FEATURE_NAME,
  forceSaveDataManagerSave,
  isSaveDataManagerInitialized,
} from "./main";
import {
  saveDataConditionalFuncMap,
  saveDataDefaultsMap,
  saveDataMap,
} from "./maps";

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
 * - Save data is loaded from disk in the MC_POST_PLAYER_INIT callback
 * (i.e. the first callback that can possibly run).
 * - Save data is recorded to disk in the MC_PRE_GAME_EXIT callback.
 *
 * Note that before using the save data manager, you must call the [[`upgradeMod`]] function.
 *
 * Finally, some features may have variables that need to be automatically reset per run/level, but
 * not saved to disk on game exit. (For example, if they contain functions or other non-serializable
 * data.) For these cases, set a special key of "dontSave" alongside "run", "level", and so forth.
 *
 * @param key The name of the file or feature that is submitting data to be managed by the save data
 * manager. The save data manager will throw an error if the key is already registered.
 * @param saveData An object that corresponds to the `SaveData` interface.
 * @param conditionalFunc An optional function to run upon saving this key to disk. If the function
 * is false, the key will not be written to disk. This allows mod features to avoid cluttering the
 * "save#.dat" file with unnecessary keys.
 */
export function saveDataManager(
  key: string,
  saveData: SaveData,
  conditionalFunc?: () => boolean,
): void {
  if (!isSaveDataManagerInitialized()) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
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
  const saveDataTableCopy = deepCopy(
    saveDataTable,
    SerializationType.NONE,
    key,
  );
  const saveDataCopy = saveDataTableCopy as unknown as SaveData;
  saveDataDefaultsMap.set(key, saveDataCopy);

  // Store the conditional function for later, if present
  if (conditionalFunc !== undefined) {
    saveDataConditionalFuncMap.set(key, conditionalFunc);
  }
}

/**
 * The save data manager will automatically save variables to disk at the appropriate times (i.e.
 * when the run is exited). Use this function to explicitly force the save data manager to write all
 * of its variables to disk immediately.
 */
export function saveDataManagerSave(): void {
  if (!isSaveDataManagerInitialized()) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  forceSaveDataManagerSave();
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
