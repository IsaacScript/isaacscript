import { SerializationType } from "../../enums/SerializationType";
import { deepCopy } from "../../functions/deepCopy";
import { jsonEncode } from "../../functions/jsonHelpers";
import { log } from "../../functions/log";
import { iterateTableInOrder } from "../../functions/table";
import { SaveData } from "../../interfaces/SaveData";
import {
  SAVE_DATA_MANAGER_DEBUG,
  SAVE_DATA_MANAGER_FEATURE_NAME,
} from "./saveDataManagerConstants";

export function saveToDisk(
  mod: Mod,
  saveDataMap: LuaMap<string, SaveData>,
  saveDataConditionalFuncMap: LuaMap<string, () => boolean>,
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
  saveDataMap: LuaMap<string, SaveData>,
  saveDataConditionalFuncMap: LuaMap<string, () => boolean>,
) {
  const allSaveData = new LuaMap<AnyNotNil, unknown>();

  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      // Handle the feature of the save data manager where certain mod features can conditionally
      // write their data to disk.
      const conditionalFunc = saveDataConditionalFuncMap.get(subscriberName);
      if (conditionalFunc !== undefined) {
        const shouldSave = conditionalFunc();
        if (!shouldSave) {
          return;
        }
      }

      // Strip out the room part of the save data (and any other arbitrary fields that they might
      // have added).
      const saveDataWithoutRoom: SaveData = {
        persistent: saveData.persistent,
        run: saveData.run,
        level: saveData.level,
      };

      // If there is no data, then we can move on to the next feature.
      if (Object.keys(saveDataWithoutRoom).length === 0) {
        return;
      }

      // If we encode TypeScriptToLua Maps into JSON, it will result in a lot of extraneous data
      // that is unnecessary. Make a copy of the data and recursively convert all TypeScriptToLua
      // Maps into Lua tables.
      const saveDataCopy = deepCopy(
        saveDataWithoutRoom as LuaMap,
        SerializationType.SERIALIZE,
        subscriberName,
      );

      allSaveData.set(subscriberName, saveDataCopy);
    },
    SAVE_DATA_MANAGER_DEBUG,
  );

  return allSaveData;
}
