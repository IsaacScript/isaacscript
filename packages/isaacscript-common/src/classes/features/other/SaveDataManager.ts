import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { SaveDataKey } from "../../../enums/SaveDataKey";
import { SerializationType } from "../../../enums/SerializationType";
import { deepCopy } from "../../../functions/deepCopy";
import { onFirstFloor } from "../../../functions/stage";
import { getTSTLClassName } from "../../../functions/tstlClass";
import { isString, isTable } from "../../../functions/types";
import { SaveData } from "../../../interfaces/SaveData";
import { AnyClass } from "../../../types/AnyClass";
import { Feature } from "../../private/Feature";
import {
  makeGlowingHourGlassBackup,
  restoreGlowingHourGlassBackup,
} from "./saveDataManager/glowingHourGlass";
import { loadFromDisk } from "./saveDataManager/loadFromDisk";
import {
  restoreDefaultForFeatureKey,
  restoreDefaultsForAllFeaturesAndKeys,
  restoreDefaultsForAllFeaturesKey,
} from "./saveDataManager/restoreDefaults";
import { saveToDisk } from "./saveDataManager/saveToDisk";

/** "g" stands for "globals". */
declare let g: LuaMap<string, SaveData>; // eslint-disable-line @typescript-eslint/no-unused-vars

const NON_USER_DEFINED_CLASS_NAMES: ReadonlySet<string> = new Set([
  "Map",
  "Set",
  "DefaultMap",
]);

export class SaveDataManager extends Feature {
  /**
   * We store a local reference to the mod object so that we can access the corresponding methods
   * that read and write to the "save#.dat" file.
   */
  private mod: Mod;

  /**
   * The save data map is indexed by subscriber name. We use Lua tables instead of TypeScriptToLua
   * Maps for the master map so that we can access the variables via the in-game console when
   * debugging. (TSTL Maps don't expose the map keys as normal keys.)
   */
  private saveDataMap = new LuaMap<string, SaveData>();

  /**
   * When mod feature data is initialized, we copy the initial values into a separate map so that we
   * can restore them later on.
   */
  private saveDataDefaultsMap = new LuaMap<string, SaveData>();

  /**
   * Each mod feature can optionally provide a function that can control whether or not the save
   * data is written to disk.
   */
  private saveDataConditionalFuncMap = new LuaMap<string, () => boolean>();

  /**
   * We backup some save data keys on every new room for the purposes of restoring it when Glowing
   * Hour Glass is used.
   *
   * Note that the save data is backed up in serialized form so that we can use the `merge` function
   * to restore it.
   */
  private saveDataGlowingHourGlassMap = new LuaMap<string, SaveData>();

  /**
   * End-users can register their classes with the save data manager for proper serialization when
   * contained in nested maps, sets, and arrays.
   */
  private classConstructors = new LuaMap<string, AnyClass>();

  // Other variables
  private loadedDataOnThisRun = false;
  private restoreGlowingHourGlassDataOnNextRoom = false;

  constructor(mod: Mod) {
    super();

    this.callbacksUsed = [
      [
        ModCallback.POST_USE_ITEM,
        [this.postUseItemGlowingHourGlass, CollectibleType.GLOWING_HOUR_GLASS],
      ], // 3
      [ModCallback.POST_PLAYER_INIT, [this.postPlayerInit]], // 9
      [ModCallback.PRE_GAME_EXIT, [this.preGameExit]], // 17
      [ModCallback.POST_NEW_LEVEL, [this.postNewLevel]], // 18
    ];

    this.mod = mod;
  }

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.GLOWING_HOUR_GLASS (422)
  private postUseItemGlowingHourGlass = (): boolean | undefined => {
    this.restoreGlowingHourGlassDataOnNextRoom = true;
    return undefined;
  };

  // ModCallback.POST_PLAYER_INIT (9)

  private postPlayerInit = (): void => {
    // We want to only load data once per run to handle the case of a player using Genesis, a second
    // player joining the run, and so on.
    if (this.loadedDataOnThisRun) {
      return;
    }
    this.loadedDataOnThisRun = true;

    // Handle the race-condition of using the Glowing Hour Glass and then resetting the run.
    this.restoreGlowingHourGlassDataOnNextRoom = false;

    // We want to unconditionally load save data on every new run since there might be persistent
    // data that is not tied to an individual run.
    loadFromDisk(this.mod, this.saveDataMap, this.classConstructors);

    const gameFrameCount = game.GetFrameCount();
    const isContinued = gameFrameCount !== 0;
    if (!isContinued) {
      restoreDefaultsForAllFeaturesAndKeys(
        this.saveDataMap,
        this.saveDataDefaultsMap,
      );
    }

    // On continued runs, the `POST_NEW_LEVEL` callback will not fire, so we do not have to worry
    // about saved data based on level getting overwritten.
  };

  // ModCallback.PRE_GAME_EXIT (17)
  private preGameExit = (): void => {
    // We unconditionally save variables to disk (because regardless of a save & quit or a death,
    // persistent variables should be recorded).
    saveToDisk(this.mod, this.saveDataMap, this.saveDataConditionalFuncMap);

    restoreDefaultsForAllFeaturesAndKeys(
      this.saveDataMap,
      this.saveDataDefaultsMap,
    );
    this.loadedDataOnThisRun = false;
  };

  // ModCallback.POST_NEW_LEVEL (18)
  private postNewLevel = (): void => {
    restoreDefaultsForAllFeaturesKey(
      this.saveDataMap,
      this.saveDataDefaultsMap,
      SaveDataKey.LEVEL,
    );

    // We save data to disk at the beginning of every floor (for the 2nd floor and beyond) to
    // emulate what the game does internally. (This mitigates data loss in the event of a crash).
    if (!onFirstFloor()) {
      saveToDisk(this.mod, this.saveDataMap, this.saveDataConditionalFuncMap);
    }
  };

  // ModCallbackCustom.POST_NEW_ROOM_EARLY
  private postNewRoomEarly = (): void => {
    restoreDefaultsForAllFeaturesKey(
      this.saveDataMap,
      this.saveDataDefaultsMap,
      SaveDataKey.ROOM,
    );

    // Handle the Glowing Hour Glass.
    if (this.restoreGlowingHourGlassDataOnNextRoom) {
      this.restoreGlowingHourGlassDataOnNextRoom = false;
      restoreGlowingHourGlassBackup(
        this.saveDataMap,
        this.saveDataConditionalFuncMap,
        this.saveDataGlowingHourGlassMap,
        this.classConstructors,
      );
    } else {
      makeGlowingHourGlassBackup(
        this.saveDataMap,
        this.saveDataConditionalFuncMap,
        this.saveDataGlowingHourGlassMap,
      );
    }
  };

  // --------------
  // Public methods
  // --------------

  /**
   * This is the entry point to the save data manager, a system which provides two major features:
   *
   * 1. automatic resetting of variables on a new run, on a new level, or on a new room (as desired)
   * 2. automatic saving and loading of all tracked data to the "save#.dat" file
   *
   * You feed this function with an object containing your variables, and then it will automatically
   * manage them for you. (See below for an example.)
   *
   * The save data manager is meant to be called once for each feature of your mod. In other words,
   * you should not put all of the data for your mod on the same object. Instead, scope your
   * variables locally to a single file that contains a mod feature, and then call this function to
   * register them. For example:
   *
   * ```ts
   * // In file: feature1.ts
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
   * - Save data is loaded from disk in the `POST_PLAYER_INIT` callback (i.e. the first callback
   *   that can possibly run).
   * - Save data is recorded to disk in the `PRE_GAME_EXIT` callback.
   *
   * You can use many different variable types on your variable object, but not everything is
   * supported. For the specific things that are supported, see the documentation for the `deepCopy`
   * helper function.
   *
   * Note that before using the save data manager, you must call the `upgradeMod` function. (Upgrade
   * your mod before registering any of your own callbacks so that the save data manager will run
   * before any of your code does.)
   *
   * If you want the save data manager to load data before the `POST_PLAYER_INIT` callback (i.e. in
   * the main menu), then you should explicitly call the `saveDataManagerLoad` function. (The save
   * data manager cannot do this on its own because it cannot know when your mod features are
   * finished initializing.)
   *
   * Some features may have variables that need to be automatically reset per run/level, but not
   * saved to disk on game exit. (For example, if they contain functions or other non-serializable
   * data.) For these cases, set the second argument to `false`.
   *
   * Note that when the player uses Glowing Hour Glass, the save data manager will automatically
   * restore any variables on a "run" or "level" object with a backup that was created when the room
   * was entered. Thus, you should not have to explicitly program support for Glowing Hour Glass
   * into your mod features that use the save data manager. If this is undesired for your specific
   * use-case, then add a key of `__ignoreGlowingHourGlass: true` to your "run" or "level" object.
   *
   * @param key The name of the file or feature that is submitting data to be managed by the save
   *            data manager. The save data manager will throw an error if the key is already
   *            registered.
   * @param v An object that corresponds to the `SaveData` interface. The object is conventionally
   *          called "v" for brevity. ("v" is short for "local variables").
   * @param conditionalFunc Optional. A function to run to check if this save data should be written
   *                        to disk. Default is `() => true`, meaning that this save data will
   *                        always be written to disk. Use a conditional function for the situations
   *                        when the local variables are for a feature that the end-user can
   *                        disable. (If the feature is disabled, then there would be no point in
   *                        writing any of the variables to the "save#.dat" file.) You can also
   *                        specify `false` to this argument in order to completely disable saving
   *                        data. (Specifying `false` will allow you to use non-serializable objects
   *                        in your save data, such as `EntityPtr`.
   */
  public saveDataManager<Persistent, Run, Level>(
    key: string, // This is the overload for the standard case with serializable data.
    v: SaveData<Persistent, Run, Level>,
    conditionalFunc?: () => boolean,
  ): void;
  public saveDataManager(
    key: string, // This is the overload for the case when saving data is disabled.
    v: SaveData,
    conditionalFunc: false,
  ): void;
  @Exported
  public saveDataManager<Persistent, Run, Level>(
    key: string,
    v: SaveData<Persistent, Run, Level>,
    conditionalFunc?: (() => boolean) | false,
  ): void {
    if (!isString(key)) {
      error(
        `The save data manager requires that keys are strings. You tried to use a key of type: ${typeof key}`,
      );
    }

    if (this.saveDataMap.has(key)) {
      error(
        `The save data manager is already managing save data for a key of: ${key}`,
      );
    }

    // First, recursively look through the new save data for any classes, so we can register them
    // with the save data manager.
    this.storeClassConstructorsFromObject(v as LuaMap);

    // Add the new save data to the map.
    this.saveDataMap.set(key, v);

    // Convert the boolean to a function, if necessary. (Having the argument be a boolean is
    // necessary in order for the overloads to work properly.)
    if (conditionalFunc === false) {
      conditionalFunc = () => false;
    }

    // If the only key in the save data is "room", then we don't have to worry about saving this
    // data to disk (because the room would be reloaded upon resuming a continued run).
    const saveDataKeys = Object.keys(v);
    if (saveDataKeys.length === 1 && saveDataKeys[0] === "room") {
      conditionalFunc = () => false;
    }

    // Make a copy of the initial save data so that we can use it to restore the default values
    // later on.
    const saveDataCopy = deepCopy(v, SerializationType.NONE, key);
    this.saveDataDefaultsMap.set(key, saveDataCopy);

    // Store the conditional function for later, if present.
    if (conditionalFunc !== undefined) {
      this.saveDataConditionalFuncMap.set(key, conditionalFunc);
    }
  }

  /**
   * Recursively traverses an object, collecting all of the class constructors that it encounters.
   */
  private storeClassConstructorsFromObject(luaMap: LuaMap<AnyNotNil, unknown>) {
    const tstlClassName = getTSTLClassName(luaMap);
    if (
      tstlClassName !== undefined &&
      !NON_USER_DEFINED_CLASS_NAMES.has(tstlClassName)
    ) {
      this.classConstructors.set(tstlClassName, luaMap as unknown as AnyClass);
    }

    for (const [_key, value] of luaMap) {
      if (isTable(value)) {
        this.storeClassConstructorsFromObject(value);
      }
    }
  }

  /**
   * The save data manager will automatically load variables from disk at the appropriate times
   * (i.e. when a new run is started). Use this function to explicitly force the save data manager
   * to load all of its variables from disk immediately.
   *
   * Obviously, doing this will overwrite the current data, so using this function can potentially
   * result in lost state.
   */
  @Exported
  public saveDataManagerLoad(): void {
    loadFromDisk(this.mod, this.saveDataMap, this.classConstructors);
  }

  /**
   * The save data manager will automatically save variables to disk at the appropriate times (i.e.
   * when the run is exited). Use this function to explicitly force the save data manager to write
   * all of its variables to disk immediately.
   */
  @Exported
  public saveDataManagerSave(): void {
    saveToDisk(this.mod, this.saveDataMap, this.saveDataConditionalFuncMap);
  }

  /**
   * Sets the global variable of "g" equal to all of the save data variables for this mod.
   *
   * This can make debugging easier, as you can access the variables from the game's debug console.
   * e.g. `l print(g.feature1.run.foo)`
   */
  @Exported
  public saveDataManagerSetGlobal(): void {
    g = this.saveDataMap;
  }

  /**
   * By default, the save data manager will not be able to serialize/deserialize classes that are
   * nested inside of maps, sets, and arrays, because it does not have access to the corresponding
   * class constructor. If you want to use nested classes in this way, then use this function to
   * register the class constructor with the save data manager. Once registered, the save data
   * manager will automatically run the constructor when deserializing (in addition to copying over
   * the data fields).
   *
   * This function is variadic, which means you can pass as many classes as you want to register.
   */
  @Exported
  public saveDataManagerRegisterClass(...tstlClasses: AnyClass[]): void {
    for (const tstlClass of tstlClasses) {
      const { name } = tstlClass;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (name === undefined) {
        error(
          "Failed to register a class with the save data manager due to not being able to derive the name of the class.",
        );
      }

      this.classConstructors.set(name, tstlClass);
    }
  }

  /**
   * Removes a previously registered key from the save data manager. This is the opposite of the
   * "saveDataManager" method.
   */
  @Exported
  public saveDataManagerRemove(key: string): void {
    if (!isString(key)) {
      error(
        `The save data manager requires that keys are strings. You tried to use a key of type: ${typeof key}`,
      );
    }

    if (!this.saveDataMap.has(key)) {
      error(
        `The save data manager is not managing save data for a key of: ${key}`,
      );
    }

    // Delete the save data from the map.
    this.saveDataMap.delete(key);
    this.saveDataDefaultsMap.delete(key);
    this.saveDataConditionalFuncMap.delete(key);
    this.saveDataGlowingHourGlassMap.delete(key);
  }

  /**
   * The save data manager will automatically reset variables at the appropriate times, like when a
   * player enters a new room. Use this function to explicitly force the save data manager to reset
   * a specific variable group.
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
   * mod.saveDataManager("file1", v);
   *
   * // Then, later on, to explicit reset all of the "room" variables:
   * mod.saveDataManagerReset("file1", "room");
   * ```
   */
  @Exported
  public saveDataManagerReset(key: string, childObjectKey: SaveDataKey): void {
    if (!isString(key)) {
      error(
        `The save data manager requires that keys are strings. You tried to use a key of type: ${typeof key}`,
      );
    }

    const saveData = this.saveDataMap.get(key);
    if (saveData === undefined) {
      error(
        `The save data manager is not managing save data for a key of: ${key}`,
      );
    }

    restoreDefaultForFeatureKey(
      this.saveDataDefaultsMap,
      key,
      saveData,
      childObjectKey,
    );
  }
}
