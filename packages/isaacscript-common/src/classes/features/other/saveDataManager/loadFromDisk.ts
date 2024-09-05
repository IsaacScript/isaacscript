import { jsonDecode } from "../../../../functions/jsonHelpers";
import { log, logError } from "../../../../functions/log";
import { merge } from "../../../../functions/merge";
import { iterateTableInOrder } from "../../../../functions/table";
import { isString, isTable } from "../../../../functions/types";
import type { SaveData } from "../../../../interfaces/SaveData";
import type { AnyClass } from "../../../../types/AnyClass";
import { SAVE_DATA_MANAGER_DEBUG } from "./constants";

const DEFAULT_MOD_DATA = "{}";

export function loadFromDisk(
  mod: Mod,
  oldSaveData: LuaMap<string, SaveData>,
  classConstructors: LuaMap<string, AnyClass>,
): void {
  if (!mod.HasData()) {
    // There is no "save#.dat" file for this save slot.
    return;
  }

  // First, read the "save#.dat" file into a Lua table.
  const jsonString = readSaveDatFile(mod);
  const newSaveData = jsonDecode(jsonString);

  if (newSaveData === undefined) {
    // Reading the save data failed.
    return;
  }

  if (SAVE_DATA_MANAGER_DEBUG) {
    log('Converted data from the "save#.dat" to a Lua table.');
  }

  // Second, iterate over all the fields of the new table.)
  iterateTableInOrder(
    newSaveData,
    (subscriberName, saveData) => {
      // All elements of loaded save data should have keys that are strings equal to the name of the
      // subscriber/feature. Ignore elements with other types of keys.
      if (!isString(subscriberName)) {
        return;
      }

      // All elements of loaded save data should be tables that contain fields corresponding to the
      // `SaveData` interface. Ignore elements that are not tables.
      if (!isTable(saveData)) {
        return;
      }

      // Ignore elements that represent subscriptions that no longer exist in the current save data.
      const oldSaveDataForSubscriber = oldSaveData.get(subscriberName);
      if (oldSaveDataForSubscriber === undefined) {
        return;
      }

      if (SAVE_DATA_MANAGER_DEBUG) {
        log(`Merging in stored data for feature: ${subscriberName}`);
      }

      // We do not want to blow away the child tables of the existing map, because save data could
      // contain out-of-date fields. Instead, merge it one field at a time in a recursive way (and
      // convert Lua tables back to TypeScriptToLua Maps, if necessary).
      merge(
        oldSaveDataForSubscriber as LuaMap<AnyNotNil, unknown>,
        saveData,
        subscriberName,
        classConstructors,
      );
    },
    SAVE_DATA_MANAGER_DEBUG,
  );

  log(
    `The save data manager loaded data from the "save#.dat" file for mod: ${mod.Name}`,
  );
}

function readSaveDatFile(mod: Mod) {
  const renderFrameCount = Isaac.GetFrameCount();

  const [ok, jsonStringOrErrMsg] = pcall(tryLoadModData, mod);
  if (!ok) {
    logError(
      `Failed to read from the "save#.dat" file on render frame ${renderFrameCount}: ${jsonStringOrErrMsg}`,
    );
    return DEFAULT_MOD_DATA;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (jsonStringOrErrMsg === undefined) {
    return DEFAULT_MOD_DATA;
  }

  const jsonStringTrimmed = jsonStringOrErrMsg.trim();
  if (jsonStringTrimmed === "") {
    return DEFAULT_MOD_DATA;
  }

  return jsonStringTrimmed;
}

function tryLoadModData(this: void, mod: Mod) {
  return mod.LoadData();
}
