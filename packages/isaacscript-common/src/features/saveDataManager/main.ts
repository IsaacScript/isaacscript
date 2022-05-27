/* eslint-disable sort-exports/sort-exports */

import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  RESETTABLE_SAVE_DATA_KEYS,
  SaveDataKey,
} from "../../enums/private/SaveDataKey";
import { SerializationType } from "../../enums/SerializationType";
import { deepCopy } from "../../functions/deepCopy";
import { logError } from "../../functions/log";
import { clearTable } from "../../functions/table";
import { SaveData } from "../../interfaces/SaveData";
import { SAVE_DATA_MANAGER_FEATURE_NAME } from "./constants";
import { loadFromDisk } from "./load";
import {
  saveDataConditionalFuncMap,
  saveDataDefaultsMap,
  saveDataMap,
} from "./maps";
import { saveToDisk } from "./save";

let mod: ModUpgraded | null = null;
let loadedDataOnThisRun = false;

/** @internal */
export function saveDataManagerInit(incomingMod: ModUpgraded): void {
  mod = incomingMod;

  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit); // 17
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  ); // 19
}

// ModCallback.POST_PLAYER_INIT (9)
function postPlayerInit() {
  if (mod === null) {
    error(
      `The mod for the ${SAVE_DATA_MANAGER_FEATURE_NAME} was not initialized.`,
    );
  }

  if (loadedDataOnThisRun) {
    return;
  }
  loadedDataOnThisRun = true;

  // We want to unconditionally load save data on every new run since there might be persistent data
  // that is not tied to an individual run.
  loadFromDisk(mod, saveDataMap);

  const gameFrameCount = game.GetFrameCount();
  const isContinued = gameFrameCount !== 0;
  if (!isContinued) {
    restoreDefaultsAll();
  }

  // On continued runs, the PostNewLevel callback will not fire, so we do not have to worry about
  // saved data based on level getting overwritten.
}

// ModCallback.PRE_GAME_EXIT (17)
function preGameExit() {
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
function postNewLevel() {
  restoreDefaults(SaveDataKey.LEVEL);
}

// ModCallbackCustom.POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  restoreDefaults(SaveDataKey.ROOM);
}

function restoreDefaultsAll() {
  restoreDefaults(SaveDataKey.RUN);
  restoreDefaults(SaveDataKey.LEVEL);
  restoreDefaults(SaveDataKey.ROOM);
}

function restoreDefaults(saveDataKey: SaveDataKey) {
  for (const [subscriberName, saveData] of pairs(saveDataMap)) {
    restoreDefaultSaveData(subscriberName, saveData, saveDataKey);
  }
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
  ) as LuaTable<AnyNotNil, unknown>;

  // We do not want to blow away the existing child table because we don't want to break any
  // existing references. Instead, empty the table and copy all of the elements from the copy of the
  // defaults table.
  clearAndCopyAllElements(
    childTable as unknown as LuaTable,
    childTableDefaultsCopy,
  );
}

/**
 * Will empty the old table of all elements, and then shallow copy all the elements from the new
 * table to the old table.
 */
function clearAndCopyAllElements(
  oldTable: LuaTable<AnyNotNil, unknown>,
  newTable: LuaTable<AnyNotNil, unknown>,
) {
  clearTable(oldTable);

  for (const [key, value] of pairs(newTable)) {
    oldTable.set(key, value);
  }
}

/** @internal */
export function forceSaveDataManagerSave(): void {
  if (mod === null) {
    return;
  }

  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
}

/** @internal */
export function forceSaveDataManagerLoad(): void {
  if (mod === null) {
    return;
  }

  loadFromDisk(mod, saveDataMap);
}
