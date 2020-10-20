declare class RoomConfig {
  StageID: int;
  Type: RoomType;
  Variant: int;
  Subtype: int;
  Name: string;
  Difficulty: Difficulty;
  InitialWeight: float;
  Weight: float;
  // Doors: IntList; // IntList is not implemented
  // Spawns: SpawnList; // SpawnList is not implemented
  SpawnCount: int;
  Width: int;
  Height: int;
  Shape: RoomShape;
}
