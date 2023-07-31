// We want the enum names to match the Isaac format of having upper case letters.
/* eslint-disable isaacscript/consistent-enum-values */

/**
 * These are the types of keys that you can put on the local variables that you feed to the save
 * data manager.
 */
export enum SaveDataKey {
  PERSISTENT = "persistent",
  RUN = "run",
  LEVEL = "level",
  ROOM = "room",
}
