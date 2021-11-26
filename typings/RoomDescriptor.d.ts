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
  ListIndex: int;
  NoReward: boolean;
  OverrideData: RoomConfig;
  PitsCount: int;
  PoopCount: int;
  PressurePlatesTriggered: boolean;
  SacrificeDone: boolean;
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
