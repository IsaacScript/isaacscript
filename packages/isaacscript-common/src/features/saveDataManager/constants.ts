import { SaveDataKey } from "../../enums/SaveDataKey";

/** Set this to true to enable more verbosity in the save data manger. */
export const SAVE_DATA_MANAGER_DEBUG = false as boolean;

export const SAVE_DATA_MANAGER_FEATURE_NAME = "save data manager";

/**
 * When the Glowing Hour Glass is used, certain save data keys will automatically be restored to a
 * backup.
 */
export const SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_BACKUP_KEYS = [
  SaveDataKey.RUN,
  SaveDataKey.LEVEL,
];

export const SAVE_DATA_MANAGER_GLOWING_HOUR_GLASS_IGNORE_KEY =
  "__ignoreGlowingHourGlass";
