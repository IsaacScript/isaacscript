export default interface SaveData {
  persistent?: Record<string, unknown>;
  run?: Record<string, unknown>;
  level?: Record<string, unknown>;
  room?: Record<string, unknown>;
}
