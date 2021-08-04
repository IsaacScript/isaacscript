export interface SaveData {
  persistent?: Record<string, unknown>;
  run?: Record<string, unknown>;
  level?: Record<string, unknown>;
  room?: Record<string, unknown>;
}

export interface SaveDataWithoutRoom {
  persistent?: Record<string, unknown>;
  run?: Record<string, unknown>;
  level?: Record<string, unknown>;
  // Room data does not need to be saved because the room will be reloaded as soon as they enter
  // into a new run anyway
}
