import { getUpgradeErrorMsg } from "../../errors";
import { deepCopy, SerializationType } from "../../functions/deepCopy";
import { tableClear } from "../../functions/util";
import { ModUpgraded } from "../../types/ModUpgraded";
import { SaveDataKeys } from "../../types/SaveData";
import { loadFromDisk } from "./load";
import {
  saveDataConditionalFuncMap,
  saveDataDefaultsMap,
  saveDataMap,
} from "./maps";
import { saveToDisk } from "./save";

export const FEATURE_NAME = "save data manager";

let mod: Mod | null = null;
let loadedDataOnThisRun = false;

export function saveDataManagerInit(incomingMod: ModUpgraded): void {
  mod = incomingMod;

  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallbacks.MC_PRE_GAME_EXIT, preGameExit); // 17
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit() {
  if (mod === null) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  if (loadedDataOnThisRun) {
    return;
  }
  loadedDataOnThisRun = true;

  // We want to unconditionally load save data on every new run since there might be persistent data
  // that is not tied to an individual run
  loadFromDisk(mod, saveDataMap);

  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const isContinued = gameFrameCount !== 0;
  if (!isContinued) {
    restoreDefaultsAll();
  }

  // On continued runs, the PostNewLevel callback will not fire, so we do not have to worry about
  // saved data based on level getting overwritten
}

// ModCallbacks.MC_PRE_GAME_EXIT (17)
function preGameExit() {
  if (mod === null) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  // We unconditionally save variables to disk
  // (because regardless of a save & quit or a death, persistent variables should be recorded)
  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);

  restoreDefaultsAll();
  loadedDataOnThisRun = false;
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevel() {
  restoreDefaults(SaveDataKeys.Level);
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  restoreDefaults(SaveDataKeys.Room);
}

function restoreDefaultsAll() {
  restoreDefaults(SaveDataKeys.Run);
  restoreDefaults(SaveDataKeys.Level);
  restoreDefaults(SaveDataKeys.Room);
}

function restoreDefaults(childTableName: SaveDataKeys) {
  if (
    childTableName !== SaveDataKeys.Run &&
    childTableName !== SaveDataKeys.Level &&
    childTableName !== SaveDataKeys.Room
  ) {
    error(`Unknown child table name of: ${childTableName}`);
  }

  for (const [subscriberName, saveData] of pairs(saveDataMap)) {
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
    const childTableDefaultsTableCopy = deepCopy(
      childTableDefaultsTable,
      SerializationType.NONE,
      `${subscriberName} --> ${childTableName}`,
    ) as LuaTable;

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

export function isSaveDataManagerInitialized(): boolean {
  return mod !== null;
}

export function forceSaveDataManagerSave(): void {
  if (mod === null) {
    return;
  }

  saveToDisk(mod, saveDataMap, saveDataConditionalFuncMap);
}
