/* eslint-disable sort-exports/sort-exports */

export enum SaveDataKey {
  PERSISTENT = "persistent",
  RUN = "run",
  LEVEL = "level",
  ROOM = "room",
}

export const RESETTABLE_SAVE_DATA_KEYS: ReadonlySet<SaveDataKey> = new Set([
  SaveDataKey.RUN,
  SaveDataKey.LEVEL,
  SaveDataKey.ROOM,
]);
