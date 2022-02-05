export interface SaveData {
  persistent?: Record<string, unknown>;
  run?: Record<string, unknown>;
  level?: Record<string, unknown>;
  room?: Record<string, unknown>;
  // If set to true, the save data manager will not write this feature's variables to JSON
  dontSave?: boolean;
}

export interface SaveDataWithoutRoom {
  persistent?: Record<string, unknown>;
  run?: Record<string, unknown>;
  level?: Record<string, unknown>;
  // Room data does not need to be saved because the room will be reloaded as soon as they enter
  // into a new run anyway
}

export enum SaveDataKeys {
  Persistent = "persistent",
  Run = "run",
  Level = "level",
  Room = "room",
}
