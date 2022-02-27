import { jsonDecode } from "../../functions/jsonHelpers";
import { log } from "../../functions/log";
import { SaveData } from "../../types/SaveData";
import { SAVE_DATA_MANAGER_DEBUG } from "./debug";
import { merge } from "./merge";

const DEFAULT_MOD_DATA = "{}";

export function loadFromDisk(
  mod: Mod,
  oldSaveData: LuaTable<string, SaveData>,
): void {
  if (!mod.HasData()) {
    // There is no "save#.dat" file for this save slot
    return;
  }

  // First, read the "save#.dat" file into a Lua table
  const jsonString = readSaveDatFile(mod);
  const newSaveData = jsonDecode(jsonString);

  if (SAVE_DATA_MANAGER_DEBUG) {
    log('Converted data from the "save#.dat" to a Lua table.');
  }

  // Second, iterate over all the fields of the new table
  for (const [key, value] of pairs(newSaveData)) {
    // All elements of loaded save data should have keys that are strings equal to the name of the
    // subscriber/feature
    // Ignore elements with other types of keys
    if (typeof key !== "string") {
      continue;
    }

    // All elements of loaded save data should be tables that contain fields corresponding to the
    // SaveData interface
    // Ignore elements that are not tables
    const valueType = type(value);
    if (valueType !== "table") {
      continue;
    }

    // Ignore elements that represent subscriptions that no longer exist in the current save data
    const oldSaveDataForSubscriber = oldSaveData.get(key);
    if (oldSaveDataForSubscriber === undefined) {
      continue;
    }

    if (SAVE_DATA_MANAGER_DEBUG) {
      log(`Merging in stored data for feature: ${key}`);
    }

    // We do not want to blow away the child tables of the existing map,
    // because save data could contain out-of-date fields
    // Instead, merge it one field at a time in a recursive way
    // (and convert Lua tables back to TypeScriptToLua Maps, if necessary)
    merge(oldSaveDataForSubscriber as LuaTable, value as LuaTable, key);
  }

  log('The save data manager loaded data from the "save#.dat" file.');
}

function readSaveDatFile(mod: Mod) {
  const isaacFrameCount = Isaac.GetFrameCount();

  const [ok, jsonStringOrErrMsg] = pcall(tryLoadModData, mod);
  if (!ok) {
    log(
      `Failed to read from the "save#.dat" file on Isaac frame ${isaacFrameCount}: ${jsonStringOrErrMsg}`,
    );
    return DEFAULT_MOD_DATA;
  }

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
