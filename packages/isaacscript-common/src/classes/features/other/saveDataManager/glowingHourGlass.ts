// The save data manager has a feature where certain variables will automatically be rolled back
// when the Glowing Hourglass is used.

import { SaveDataKey } from "../../../../enums/SaveDataKey";
import { SerializationType } from "../../../../enums/SerializationType";
import { deepCopy } from "../../../../functions/deepCopy";
import { merge } from "../../../../functions/merge";
import { iterateTableInOrder } from "../../../../functions/table";
import type { SaveData } from "../../../../interfaces/SaveData";
import type { AnyClass } from "../../../../types/AnyClass";
import { SAVE_DATA_MANAGER_DEBUG } from "./constants";

/**
 * When the Glowing Hourglass is used, certain save data keys will automatically be restored to a
 * backup.
 */
const GLOWING_HOUR_GLASS_BACKUP_KEYS = [
  SaveDataKey.RUN,
  SaveDataKey.LEVEL,
] as const;

const IGNORE_GLOWING_HOUR_GLASS_KEY = "__ignoreGlowingHourGlass";
const REWIND_WITH_GLOWING_HOUR_GLASS_KEY = "__rewindWithGlowingHourGlass";

export function makeGlowingHourGlassBackup(
  saveDataMap: LuaMap<string, SaveData>,
  saveDataConditionalFuncMap: LuaMap<string, () => boolean>,
  saveDataGlowingHourGlassMap: LuaMap<string, SaveData>,
): void {
  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      // We make the Glowing Hourglass backup using `SerializationType.SERIALIZE`, which means that
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

      for (const saveDataKey of getKeysToBackup(saveData)) {
        const childTable = saveData[saveDataKey];
        if (childTable === undefined) {
          // This feature does not happen to store any variables on this particular child table.
          continue;
        }

        // Ignore child tables that the end-user has explicitly annotated.
        const childTableLuaMap = childTable as LuaMap<AnyNotNil, unknown>;
        if (childTableLuaMap.has(IGNORE_GLOWING_HOUR_GLASS_KEY)) {
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

export function restoreGlowingHourGlassBackup(
  saveDataMap: LuaMap<string, SaveData>,
  saveDataConditionalFuncMap: LuaMap<string, () => boolean>,
  saveDataGlowingHourGlassMap: LuaMap<string, SaveData>,
  classConstructors: LuaMap<string, AnyClass>,
): void {
  iterateTableInOrder(
    saveDataMap,
    (subscriberName, saveData) => {
      // We make the Glowing Hourglass backup using `SerializationType.SERIALIZE`, which means that
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

      for (const saveDataKey of getKeysToBackup(saveData)) {
        const childTable = saveData[saveDataKey];
        if (childTable === undefined) {
          // This feature does not happen to store any variables on this particular child table.
          continue;
        }

        // Ignore child tables that the end-user has explicitly annotated.
        const childTableLuaMap = childTable as LuaMap<AnyNotNil, unknown>;
        if (childTableLuaMap.has(IGNORE_GLOWING_HOUR_GLASS_KEY)) {
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
          classConstructors,
        );
      }
    },
    SAVE_DATA_MANAGER_DEBUG,
  );
}

function getKeysToBackup(saveData: SaveData) {
  const shouldBackupPersistentObject =
    saveData.persistent !== undefined
    && (saveData.persistent as LuaTable).has(
      REWIND_WITH_GLOWING_HOUR_GLASS_KEY,
    );

  return shouldBackupPersistentObject
    ? ([...GLOWING_HOUR_GLASS_BACKUP_KEYS, SaveDataKey.PERSISTENT] as const)
    : GLOWING_HOUR_GLASS_BACKUP_KEYS;
}
