// The save data manager has a feature where certain variables are automatically restored to default
// values at certain times.

import { SaveDataKey } from "../../../../enums/SaveDataKey";
import { SerializationType } from "../../../../enums/SerializationType";
import { deepCopy } from "../../../../functions/deepCopy";
import { logError } from "../../../../functions/log";
import { clearTable, iterateTableInOrder } from "../../../../functions/table";
import type { SaveData } from "../../../../interfaces/SaveData";
import { ReadonlySet } from "../../../../types/ReadonlySet";
import { SAVE_DATA_MANAGER_DEBUG } from "./constants";

const RESETTABLE_SAVE_DATA_KEYS = new ReadonlySet<SaveDataKey>([
  SaveDataKey.RUN,
  SaveDataKey.LEVEL,
  SaveDataKey.ROOM,
]);

export function restoreDefaultsForAllFeaturesAndKeys(
  saveDataMap: LuaMap<string, SaveData>,
  saveDataDefaultsMap: LuaMap<string, SaveData>,
): void {
  for (const saveDataKey of RESETTABLE_SAVE_DATA_KEYS) {
    restoreDefaultsForAllFeaturesKey(
      saveDataMap,
      saveDataDefaultsMap,
      saveDataKey,
    );
  }
}

export function restoreDefaultsForAllFeaturesKey(
  saveDataMap: LuaMap<string, SaveData>,
  saveDataDefaultsMap: LuaMap<string, SaveData>,
  saveDataKey: SaveDataKey,
): void {
  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      restoreDefaultForFeatureKey(
        saveDataDefaultsMap,
        subscriberName,
        saveData,
        saveDataKey,
      );
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

export function restoreDefaultForFeatureKey(
  saveDataDefaultsMap: LuaMap<string, SaveData>,
  subscriberName: string,
  saveData: SaveData,
  saveDataKey: SaveDataKey,
): void {
  // Only allow certain save data keys to be reset.
  if (!RESETTABLE_SAVE_DATA_KEYS.has(saveDataKey)) {
    error(
      `Failed to restore default values for a save data key of "${saveDataKey}", since it is not on the allowed list of resettable save data keys.`,
    );
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
      String.raw`Failed to find the default copy of the child table "${saveDataKey}" for subscriber "${subscriberName}". This error usually means that your mod-specific save data is out of date. You can try purging all of your mod-specific save data by deleting the following directory: C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\data`,
    );
    return;
  }

  // Make a new copy of the default child table.
  const childTableDefaultsCopy = deepCopy(
    childTableDefaults,
    SerializationType.NONE,
    `${subscriberName} --> ${saveDataKey}`,
  ) as LuaMap<AnyNotNil, unknown>;

  // We do not want to blow away the existing child table because we do not want to break any
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
