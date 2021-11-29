declare interface RoomDescriptor {
  // AllowedDoors: DoorSet; // DoorSet is not implemented

  AwardSeed: int;
  ChallengeDone: boolean;
  Clear: boolean;
  ClearCount: int;
  Data: RoomConfig | undefined;
  DecorationSeed: int;
  DeliriumDistance: int;

  /**
   * A composition of zero or more DisplayFlag. After modifying this value, you must call
   * `Level.UpdateVisibility()` for it to take effect.
   */
  DisplayFlags: int;

  /** * A composition of zero or more `RoomDescriptorFlag`. */
  Flags: int;

  GridIndex: int;
  HasWater: boolean;

  /**
   * The index for this room corresponding to the `Level.GetRooms().Get()` method. This is equal to
   * the order that the room was created by the floor generation algorithm.
   *
   * Use this as an index for data structures that store data per room, since it is unique across
   * different dimensions.
   */
  ListIndex: int;

  NoReward: boolean;
  OverrideData: RoomConfig;
  PitsCount: int;
  PoopCount: int;
  PressurePlatesTriggered: boolean;
  SacrificeDone: boolean;

  /**
   * `GridIndex` is equal to the the specific 1x1 quadrant that the player entered the room at.
   * Thus, it will return different values for the same big room. `SafeGridIndex` is always equal to
   * the the top-left index of the room. Thus, it will always return consistent values.
   *
   * With that said, data structures that store data per room should use the `ListIndex` as a key
   * instead, since it is unique across different dimensions.
   */
  SafeGridIndex: int;

  ShopItemDiscountIdx: int;
  ShopItemIdx: int;
  SpawnSeed: int;
  SurpriseMiniboss: boolean;
  VisitedCount: int;

  // In the "enums.lua" file, the RoomDescriptor class is extended with many members:
  // - RoomDescriptor.DISPLAY_*
  // - RoomDescriptor.FLAG_*
  // In IsaacScript, these are instead implemented as enums, since it is cleaner
  // See the "RoomDescriptorDisplayType" and "RoomDescriptorFlag" enums respectively
}
