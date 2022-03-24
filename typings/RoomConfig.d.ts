// This is "RoomConfig::Room" in the docs

declare interface RoomConfig {
  /**
   * This is not the same thing as the Difficulty enum. Each room has an arbitrarily set difficulty
   * of 0, 1, 2, 5, or 10. The floor generation algorithm attempts to generates floors with a
   * combined difficulty of a certain value. If the difficulty is 0, that means that the room will
   * never be chosen and is effectively removed from the game.
   */
  Difficulty: int;

  /** A combination of `DoorSlotFlag`. */
  Doors: int;

  Height: int;
  InitialWeight: float;
  Name: string;
  Shape: RoomShape;
  SpawnCount: int;
  Spawns: SpawnList;
  StageID: StageID;
  Subtype: int;
  Type: RoomType;
  Variant: int;
  Weight: float;
  Width: int;
}
