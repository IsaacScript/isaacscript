import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { SaveDataKey } from "../../enums/SaveDataKey";
import { SerializationType } from "../../enums/SerializationType";
import { deepCopy } from "../../functions/deepCopy";
import { logError } from "../../functions/logMisc";
import { merge } from "../../functions/merge";
import { onFirstFloor } from "../../functions/stage";
import { clearTable, iterateTableInOrder } from "../../functions/table";
import { SaveData } from "../../interfaces/SaveData";
import { CallbackTuple } from "../../types/private/CallbackTuple";
import {
  SAVE_DATA_MANAGER_DEBUG,
  SAVE_DATA_MANAGER_FEATURE_NAME,
  SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_BACKUP_KEYS,
  SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_IGNORE_KEY,
} from "./constants";
import { loadFromDisk } from "./load";
import {
  saveDataConditionalFuncMap,
  saveDataDefaultsMap,
  saveDataGlowingHourGlassMap,
  saveDataMap,
} from "./maps";
import { saveToDisk } from "./save";

const RESETTABLE_SAVE_DATA_KEYS: ReadonlySet<SaveDataKey> = new Set([
  SaveDataKey.RUN,
  SaveDataKey.LEVEL,
  SaveDataKey.ROOM,
]);

let mod: Mod | null = null;
let loadedDataOnThisRun = false;
let restoreGlowingHourGlassDataOnNextRoom = false;

export const SAVE_DATA_MANAGER_CALLBACKS: CallbackTuple[] = [
  [
    ModCallback.POST_USE_ITEM,
    [postUseItemGlowingHourGlass, CollectibleType.GLOWING_HOUR_GLASS],
  ], // 3
  [ModCallback.POST_PLAYER_INIT, [postPlayerInit]], // 9
  [ModCallback.PRE_GAME_EXIT, [preGameExit]], // 17
  [ModCallback.POST_NEW_LEVEL, [postNewLevel]], // 18
];

// TODO: add tuple type annotation
export const SAVE_DATA_MANAGER_CUSTOM_CALLBACKS = [
  [ModCallbackCustom.POST_NEW_ROOM_EARLY, [postNewRoomEarly]],
] as const;

export function saveDataManagerInit(incomingMod: Mod): void {
  mod = incomingMod;
}

// ModCallback.POST_USE_ITEM (3)
// CollectibleType.GLOWING_HOUR_GLASS (422)
function postUseItemGlowingHourGlass(): boolean | undefined {
  restoreGlowingHourGlassDataOnNextRoom = true;
  return undefined;
}

// ModCallback.POST_PLAYER_INIT (9)
// eslint-disable-next-line isaacscript/no-void-return-type
function postPlayerInit(): void {
  if (mod === null) {
    error(
      `The mod for the ${SAVE_DATA_MANAGER_FEATURE_NAME} was not initialized.`,
    );
  }

  // We want to only load data once per run to handle the case of a player using Genesis, a second
  // player joining the run, and so on.
  if (loadedDataOnThisRun) {
    return;
  }
  loadedDataOnThisRun = true;

  // Handle the race-condition of using the Glowing Hour Glass and then resetting the run.
  restoreGlowingHourGlassDataOnNextRoom = false;

  // We want to unconditionally load save data on every new run since there might be persistent data
  // that is not tied to an individual run.
  loadFromDisk(mod, saveDataMap);

  const gameFrameCount = game.GetFrameCount();
  const isContinued = gameFrameCount !== 0;
  if (!isContinued) {
    restoreDefaultsAll();
  }

  // On continued runs, the `POST_NEW_LEVEL` callback will not fire, so we do not have to worry
  // about saved data based on level getting overwritten.
}

// ModCallback.PRE_GAME_EXIT (17)
// eslint-disable-next-line isaacscript/no-void-return-type
function preGameExit(): void {
  if (mod === null) {
    error(
      `The mod for the ${SAVE_DATA_MANAGER_FEATURE_NAME} was not initialized.`,
    );
  }

  // We unconditionally save variables to disk (because regardless of a save & quit or a death,
  // persistent variables should be recorded).
  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);

  restoreDefaultsAll();
  loadedDataOnThisRun = false;
}

// ModCallback.POST_NEW_LEVEL (18)
// eslint-disable-next-line isaacscript/no-void-return-type
function postNewLevel(): void {
  if (mod === null) {
    error(
      `The mod for the ${SAVE_DATA_MANAGER_FEATURE_NAME} was not initialized.`,
    );
  }

  restoreDefaults(SaveDataKey.LEVEL);

  // We save data to disk at the beginning of every floor (for the 2nd floor and beyond) to emulate
  // what the game does internally. (This mitigates data loss in the event of a crash).
  if (!onFirstFloor()) {
    saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
  }
}

// ModCallbackCustom.POST_NEW_ROOM_EARLY
// eslint-disable-next-line isaacscript/no-void-return-type
function postNewRoomEarly(): void {
  restoreDefaults(SaveDataKey.ROOM);

  // Handle the Glowing Hour Glass.
  if (restoreGlowingHourGlassDataOnNextRoom) {
    restoreGlowingHourGlassDataOnNextRoom = false;
    restoreGlowingHourGlassBackup();
  } else {
    makeGlowingHourGlassBackup();
  }
}

function makeGlowingHourGlassBackup() {
  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      // We make the Glowing Hour Glass backup using `SerializationType.SERIALIZE`, which means that
      // we cannot operate on unserializable data, such as functions. Save data that utilizes
      // unserializable data will typically be marked using a conditional function that evaluates to
      // false, so we skip all save data that matches this criteria.
      const conditionalFunc = saveDataConditionalFuncMap.get(subscriberName);
      if (conditionalFunc !== undefined) {
        const shouldSave = conditionalFunc();
        if (!shouldSave) {
          return;
        }
      }

      for (const saveDataKey of SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_BACKUP_KEYS) {
        const childTable = saveData[saveDataKey];
        if (childTable === undefined) {
          // This feature does not happen to store any variables on this particular child table.
          continue;
        }

        // Ignore child tables that the end-user has explicitly annotated.
        const childTableLuaMap = childTable as LuaMap<AnyNotNil, unknown>;
        if (
          childTableLuaMap.has(SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_IGNORE_KEY)
        ) {
          continue;
        }

        let saveDataGlowingHourGlass =
          saveDataGlowingHourGlassMap.get(subscriberName);
        if (saveDataGlowingHourGlass === undefined) {
          saveDataGlowingHourGlass = new LuaMap<string, unknown>() as SaveData;
          saveDataGlowingHourGlassMap.set(
            subscriberName,
            saveDataGlowingHourGlass,
          );
        }

        // We serialize the table so that we can use the `merge` function later on with no other
        // modifications.
        const copiedChildTable = deepCopy(
          childTable,
          SerializationType.SERIALIZE,
        ) as Record<string, unknown>;
        saveDataGlowingHourGlass[saveDataKey] = copiedChildTable;
      }
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

function restoreGlowingHourGlassBackup() {
  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      // We make the Glowing Hour Glass backup using `SerializationType.SERIALIZE`, which means that
      // we cannot operate on unserializable data, such as functions. Save data that utilizes
      // unserializable data will typically be marked using a conditional function that evaluates to
      // false, so we skip all save data that matches this criteria.
      const conditionalFunc = saveDataConditionalFuncMap.get(subscriberName);
      if (conditionalFunc !== undefined) {
        const shouldSave = conditionalFunc();
        if (!shouldSave) {
          return;
        }
      }

      for (const saveDataKey of SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_BACKUP_KEYS) {
        const childTable = saveData[saveDataKey];
        if (childTable === undefined) {
          // This feature does not happen to store any variables on this particular child table.
          continue;
        }

        // Ignore child tables that the end-user has explicitly annotated.
        const childTableLuaMap = childTable as LuaMap<AnyNotNil, unknown>;
        if (
          childTableLuaMap.has(SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_IGNORE_KEY)
        ) {
          continue;
        }

        const saveDataGlowingHourGlass =
          saveDataGlowingHourGlassMap.get(subscriberName);
        if (saveDataGlowingHourGlass === undefined) {
          // This should never happen.
          continue;
        }

        const childTableBackup = saveDataGlowingHourGlass[saveDataKey];
        if (childTableBackup === undefined) {
          // This should never happen.
          continue;
        }

        merge(
          childTable as LuaMap<AnyNotNil, unknown>,
          childTableBackup as LuaMap<AnyNotNil, unknown>,
          // Append an arbitrary suffix for better error messages.
          `${subscriberName}__glowingHourGlass`,
        );
      }
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

function restoreDefaultsAll() {
  restoreDefaults(SaveDataKey.RUN);
  restoreDefaults(SaveDataKey.LEVEL);
  restoreDefaults(SaveDataKey.ROOM);
}

function restoreDefaults(saveDataKey: SaveDataKey) {
  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      restoreDefaultSaveData(subscriberName, saveData, saveDataKey);
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

export function restoreDefaultSaveData(
  subscriberName: string,
  saveData: SaveData,
  saveDataKey: SaveDataKey,
): void {
  // Only allow certain save data keys to be reset.
  if (!RESETTABLE_SAVE_DATA_KEYS.has(saveDataKey)) {
    error(`Unknown save data key name of: ${saveDataKey}`);
  }

  const childTable = saveData[saveDataKey];
  if (childTable === undefined) {
    // This feature does not happen to store any variables on this particular child table.
    return;
  }

  // Get the default values for this feature.
  const saveDataDefaults = saveDataDefaultsMap.get(subscriberName);
  if (saveDataDefaults === undefined) {
    logError(
      `Failed to find the default copy of the save data for subscriber: ${subscriberName}`,
    );
    return;
  }

  // Get the default values for the specific sub-table of this feature.
  const childTableDefaults = saveDataDefaults[saveDataKey];
  if (childTableDefaults === undefined) {
    logError(
      `Failed to find the default copy of the child table "${saveDataKey}" for subscriber "${subscriberName}". This error usually means that your save data is out of date. You can try purging all of your save data by deleting the following directory: C:\\Program Files (x86)\\Steam\\steamapps\\common\\The Binding of Isaac Rebirth\\data`,
    );
    return;
  }

  // Make a new copy of the default child table.
  const childTableDefaultsCopy = deepCopy(
    childTableDefaults,
    SerializationType.NONE,
    `${subscriberName} --> ${saveDataKey}`,
  ) as LuaMap<AnyNotNil, unknown>;

  // We do not want to blow away the existing child table because we don't want to break any
  // existing references. Instead, empty the table and copy all of the elements from the copy of the
  // defaults table.
  clearAndCopyAllElements(
    childTable as unknown as LuaMap<AnyNotNil, unknown>,
    childTableDefaultsCopy,
  );
}

/**
 * Will empty the old table of all elements, and then shallow copy all the elements from the new
 * table to the old table.
 */
function clearAndCopyAllElements(
  oldTable: LuaMap<AnyNotNil, unknown>,
  newTable: LuaMap<AnyNotNil, unknown>,
) {
  clearTable(oldTable);

  for (const [key, value] of newTable) {
    oldTable.set(key, value);
  }
}

export function forceSaveDataManagerSave(): void {
  if (mod === null) {
    return;
  }

  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
}

export function forceSaveDataManagerLoad(): void {
  if (mod === null) {
    return;
  }

  loadFromDisk(mod, saveDataMap);
}
