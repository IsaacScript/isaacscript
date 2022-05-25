import { SerializationType } from "../../enums/SerializationType";
import { deepCopy } from "../../functions/deepCopy";
import { jsonEncode } from "../../functions/jsonHelpers";
import { log } from "../../functions/log";
import { SaveData } from "../../types/private/SaveData";
import { SAVE_DATA_MANAGER_FEATURE_NAME } from "./constants";

export function saveToDisk(
  mod: Mod,
  saveDataMap: LuaTable<string, SaveData>,
  saveDataConditionalFuncMap: Map<string, () => boolean>,
): void {
  const allSaveData = getAllSaveDataToWriteToDisk(
    saveDataMap,
    saveDataConditionalFuncMap,
  );
  const jsonString = jsonEncode(allSaveData);
  mod.SaveData(jsonString); // Write it to the "save#.dat" file
  log(
    `The ${SAVE_DATA_MANAGER_FEATURE_NAME} wrote data to the "save#.dat" file.`,
  );
}

function getAllSaveDataToWriteToDisk(
  saveDataMap: LuaTable<string, SaveData>,
  saveDataConditionalFuncMap: Map<string, () => boolean>,
) {
  const allSaveData = new LuaTable<AnyNotNil, unknown>();

  for (const [subscriberName, saveData] of pairs(saveDataMap)) {
    // Handle the feature of the save data manager where certain mod features can conditionally
    // write their data to disk.
    const conditionalFunc = saveDataConditionalFuncMap.get(subscriberName);
    if (conditionalFunc !== undefined) {
      const shouldSave = conditionalFunc();
      if (!shouldSave) {
        continue;
      }
    }

    // Strip out the room part of the save data.
    const saveDataWithoutRoom: SaveData = {
      persistent: saveData.persistent,
      run: saveData.run,
      level: saveData.level,
    };

    // If there is no data, then we can move on to the next feature.
    if (Object.keys(saveDataWithoutRoom).length === 0) {
      continue;
    }

    // If we encode TypeScriptToLua Maps into JSON, it will result in a lot of extraneous data that
    // is unnecessary. Make a copy of the data and recursively convert all TypeScriptToLua Maps into
    // Lua tables.
    const saveDataCopy = deepCopy(
      saveDataWithoutRoom as LuaTable,
      SerializationType.SERIALIZE,
      subscriberName,
    );

    allSaveData.set(subscriberName, saveDataCopy);
  }

  return allSaveData;
}
