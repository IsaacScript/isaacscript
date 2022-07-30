import { SaveDataKey } from "../../enums/private/SaveDataKey";
import { SerializationType } from "../../enums/SerializationType";
import { errorIfFeaturesNotInitialized } from "../../featuresInitialized";
import { deepCopy } from "../../functions/deepCopy";
import { isString } from "../../functions/types";
import { SaveData } from "../../interfaces/SaveData";
import {
  forceSaveDataManagerLoad,
  forceSaveDataManagerSave,
  restoreDefaultSaveData,
} from "./main";
import {
  saveDataConditionalFuncMap,
  saveDataDefaultsMap,
  saveDataMap,
} from "./maps";
import { SAVE_DATA_MANAGER_FEATURE_NAME } from "./saveDataManagerConstants";

/**
 * This is the entry point to the save data manager, a system which provides two major features:
 *
 * 1. automatic resetting of variables on a new run, on a new level, or on a new room (as desired)
 * 2. automatic saving and loading of all tracked data to the "save#.dat" file
 *
 * You feed this function with an anonymous object containing your variables, and then it will
 * automatically manage them for you. (See below for an example.)
 *
 * The save data manager is meant to be called once for each feature of your mod. In other words,
 * you should not put all of the data for your mod on the same object. Instead, scope your variables
 * locally to a single file that contains a mod feature, and then call this function to register
 * them. For example:
 *
 * ```ts
 * // in file: feature1.ts
 * import { saveDataManager } from "isaacscript-common";
 *
 * // Declare local variables for this file or feature.
 * const v = {
 *   // These variables are never reset; manage them yourself at will.
 *   persistent: {
 *     foo1: 0,
 *   },
 *
 *   // These variables are reset at the beginning of every run.
 *   run: {
 *     foo2: 0,
 *   },
 *
 *   // These variables are reset at the beginning of every level.
 *   level: {
 *     foo3: 0,
 *   },
 *
 *   // These variables are reset at the beginning of every room.
 *   room: {
 *     foo4: 0,
 *   },
 * };
 * // Every child object is optional; only create the ones that you need.
 *
 * // Register the variables with the save data manager. (We need to provide a string key that
 * // matches the name of this file.)
 * function feature1Init() {
 *   saveDataManager("feature1", v);
 * }
 *
 * // Elsewhere in the file, use your variables.
 * function feature1Function() {
 *   if (v.run.foo1 > 0) {
 *     // Insert code here.
 *   }
 * }
 * ```
 *
 * - Save data is loaded from disk in the `POST_PLAYER_INIT` callback (i.e. the first callback that
 *   can possibly run).
 * - Save data is recorded to disk in the `PRE_GAME_EXIT` callback.
 *
 * You can put lots of data types on your variable objects, but not everything is supported. For the
 * specific things that are supported, see the documentation for the `deepCopy` helper function.
 *
 * Note that before using the save data manager, you must call the `upgradeMod` function. (Upgrade
 * your mod before registering any of your own callbacks so that the save data manager will run
 * before any of your code does.)
 *
 * If you want the save data manager to load data before the `POST_PLAYER_INIT` callback (i.e. in
 * the main menu), then you should explicitly call the `saveDataManagerLoad` function. (The save
 * data manager cannot do this on its own because it cannot know when your mod features are finished
 * initializing.)
 *
 * Finally, some features may have variables that need to be automatically reset per run/level, but
 * not saved to disk on game exit. (For example, if they contain functions or other non-serializable
 * data.) For these cases, set the second argument to `() => false`.
 *
 * @param key The name of the file or feature that is submitting data to be managed by the save data
 *            manager. The save data manager will throw an error if the key is already registered.
 * @param v An object that corresponds to the `SaveData` interface. The object is conventionally
 *          called "v" for brevity. ("v" is short for "local variables").
 * @param conditionalFunc Optional. A function to run to check if this save data should be written
 *                        to disk. Default is `() => true`, meaning that this save data will always
 *                        be written to disk. Use a conditional function for the situations when the
 *                        local variables are for a feature that the end-user can disable. (If the
 *                        feature is disabled, then there would be no point in writing any of the
 *                        variables to the "save#.dat" file.) You can also specify `false` to this
 *                        argument in order to completely disable saving data. (Specifying `false`
 *                        will allow you to use non-serializable objects in your save data, such as
 *                        `EntityPtr`.
 */
export function saveDataManager<Persistent, Run, Level>(
  key: string, // This is the overload for the standard case with serializable data.
  v: SaveData<Persistent, Run, Level>,
  conditionalFunc?: () => boolean,
): void;
export function saveDataManager(
  key: string, // This is the overload for the case when saving data is disabled.
  v: SaveData<unknown, unknown, unknown>,
  conditionalFunc: false,
): void;
export function saveDataManager<Persistent, Run, Level>(
  key: string,
  v: SaveData<Persistent, Run, Level>,
  conditionalFunc?: (() => boolean) | false,
): void {
  errorIfFeaturesNotInitialized(SAVE_DATA_MANAGER_FEATURE_NAME);

  if (!isString(key)) {
    error(
      `The ${SAVE_DATA_MANAGER_FEATURE_NAME} requires that keys are strings. You tried to use a key of type: ${typeof key}`,
    );
  }

  if (saveDataMap.has(key)) {
    error(
      `The ${SAVE_DATA_MANAGER_FEATURE_NAME} is already managing save data for a key of: ${key}`,
    );
  }

  // Add the new save data to the map.
  saveDataMap.set(key, v);

  // Convert the boolean to a function, if necessary. (Having the argument be a boolean is necessary
  // in order for the overloads to work properly.)
  if (conditionalFunc === false) {
    conditionalFunc = () => false;
  }

  // If the only key in the save data is "room", then we don't have to worry about saving this data
  // to disk (because the room would be reloaded upon resuming a continued run).
  const saveDataKeys = Object.keys(v);
  if (saveDataKeys.length === 1 && saveDataKeys[0] === "room") {
    conditionalFunc = () => false;
  }

  // Make a copy of the initial save data so that we can use it to restore the default values later
  // on.
  const saveDataCopy = deepCopy(v, SerializationType.NONE, key) as typeof v;
  saveDataDefaultsMap.set(key, saveDataCopy);

  // Store the conditional function for later, if present.
  if (conditionalFunc !== undefined) {
    saveDataConditionalFuncMap.set(key, conditionalFunc);
  }
}

/**
 * The save data manager will automatically load variables from disk at the appropriate times (i.e.
 * when a new run is started). Use this function to explicitly force the save data manager to load
 * all of its variables from disk immediately.
 *
 * Obviously, doing this will overwrite the current data, so using this function can potentially
 * result in lost state.
 */
export function saveDataManagerLoad(): void {
  errorIfFeaturesNotInitialized(SAVE_DATA_MANAGER_FEATURE_NAME);
  forceSaveDataManagerLoad();
}

/**
 * The save data manager will automatically save variables to disk at the appropriate times (i.e.
 * when the run is exited). Use this function to explicitly force the save data manager to write all
 * of its variables to disk immediately.
 */
export function saveDataManagerSave(): void {
  errorIfFeaturesNotInitialized(SAVE_DATA_MANAGER_FEATURE_NAME);
  forceSaveDataManagerSave();
}

/** "g" stands for "globals". */
declare let g: LuaMap<string, SaveData>; // eslint-disable-line @typescript-eslint/no-unused-vars

/** "gd" stands for "globals defaults". */
declare let gd: LuaMap<string, SaveData>; // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * - Sets the global variable of "g" equal to all of the save data variables for this mod.
 * - Sets the global variable of "gd" equal to all of the save data default variables for this mod.
 *
 * This can make debugging easier, as you can access the variables from the game's debug console.
 * e.g. `l print(g.feature1.foo)`
 */
export function saveDataManagerSetGlobal(): void {
  errorIfFeaturesNotInitialized(SAVE_DATA_MANAGER_FEATURE_NAME);

  g = saveDataMap;
  gd = saveDataDefaultsMap;
}

/**
 * The save data manager will automatically reset variables at the appropriate times (i.e. when a
 * player enters a new room). Use this function to explicitly force the save data manager to reset a
 * specific variable group.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   room: {
 *     foo: 123,
 *   },
 * };
 *
 * saveDataManager("file1", v);
 *
 * // Then, later on, to explicit reset all of the "room" variables:
 * saveDataManagerReset("file1", "room");
 * ```
 */
export function saveDataManagerReset(
  key: string,
  childObjectKey: string,
): void {
  errorIfFeaturesNotInitialized(SAVE_DATA_MANAGER_FEATURE_NAME);

  if (!isString(key)) {
    error(
      `The ${SAVE_DATA_MANAGER_FEATURE_NAME} requires that keys are strings. You tried to use a key of type: ${typeof key}`,
    );
  }

  const saveData = saveDataMap.get(key) as Record<string, unknown> | undefined;
  if (saveData === undefined) {
    error(
      `The ${SAVE_DATA_MANAGER_FEATURE_NAME} is not managing save data for a key of: ${key}`,
    );
  }

  restoreDefaultSaveData(key, saveData, childObjectKey as SaveDataKey);
}
