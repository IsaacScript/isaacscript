declare class RoomConfig {
  /**
   * This is not the same thing as the Difficulty enum.
   * Each room has an arbitrarily set difficulty of 0, 1, 2, 5, or 10.
   */
  Difficulty: int;
  Doors: int;
  Height: int;
  InitialWeight: float;
  Name: string;
  Shape: RoomShape;
  SpawnCount: int;
  Spawns: SpawnList;
  StageID: int;
  Subtype: int;
  Type: RoomType;
  Variant: int;
  Weight: float;
  Width: int;
}
