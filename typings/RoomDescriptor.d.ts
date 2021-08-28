declare interface RoomDescriptor {
  // AllowedDoors: DoorSet; // DoorSet is not implemented
  AwardSeed: int;
  ChallengeDone: boolean;
  Clear: boolean;
  ClearCount: int;
  Data: RoomConfig | null;
  DecorationSeed: int;
  DeliriumDistance: int;
  /**
   * A composition of zero or more DisplayFlag. After modifying this value, you must call
   * `Level.UpdateVisibility()` for it to take effect.
   */
  DisplayFlags: int;
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
}
