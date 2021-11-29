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

  /**
   * - For a 1x1 room, this is equal to the 1x1 grid index of the room.
   * - For a room bigger than a 1x1 room, this is equal to the top left 1x1 quadrant.
   * - For `RoomType.ROOMSHAPE_LTL` rooms (i.e. rooms that look like a "J"), this is equal to the
   * 1x1 quadrant where the gap in the room is. In other words, it is a 1x1 quadrant that is not
   * actually contained within the room.
   * - Note that this value **is different** than the value returned by
   * `Level.GetCurrentRoomIndex()`. (That function returns the 1x1 quadrant that the room was
   * entered in.)
   * - Data structures that store data per room should use `ListIndex` as a key instead of
   * `GridIndex`, since the former is unique across different dimensions.
   */
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
   * - For a 1x1 room, this is equal to the 1x1 grid index of the room.
   * - For a room bigger than a 1x1 room, this is equal to the top left 1x1 quadrant.
   * - For `RoomType.ROOMSHAPE_LTL` rooms (i.e. rooms that look like a "J"), this is equal to the
   * top right 1x1 quadrant.
   * - Note that this value **is different** than the value returned by
   * `Level.GetCurrentRoomIndex()`. (That function returns the 1x1 quadrant that the room was
   * entered in.)
   * - Data structures that store data per room should use `ListIndex` as a key instead of
   * `SafeGridIndex`, since the former is unique across different dimensions.
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
