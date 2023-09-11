import { SerializationType } from "../../../../enums/SerializationType";
import { deepCopy } from "../../../../functions/deepCopy";
import { jsonEncode } from "../../../../functions/jsonHelpers";
import { log } from "../../../../functions/log";
import { isTableEmpty, iterateTableInOrder } from "../../../../functions/table";
import type { SaveData } from "../../../../interfaces/SaveData";
import { SAVE_DATA_MANAGER_DEBUG } from "./constants";

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
  mod.SaveData(jsonString);
  log(
    `The save data manager wrote data to the "save#.dat" file for mod: ${mod.Name}`,
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
      if (isTableEmpty(saveDataWithoutRoom as LuaMap<AnyNotNil, unknown>)) {
        return;
      }

      // We need to serialize TypeScriptToLua maps and Isaac API objects such as `Color`.
      // Recursively convert all such objects to Lua tables.
      const saveDataCopy = deepCopy(
        saveDataWithoutRoom,
        SerializationType.SERIALIZE,
        subscriberName,
      );

      allSaveData.set(subscriberName, saveDataCopy);
    },
    SAVE_DATA_MANAGER_DEBUG,
  );

  return allSaveData;
}
