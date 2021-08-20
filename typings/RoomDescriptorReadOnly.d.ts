// This is the same thing as the RoomDescriptor class, but every value is marked as being read only

declare class RoomDescriptorReadOnly {
  // AllowedDoors: DoorSet; // DoorSet is not implemented
  AwardSeed: Readonly<int>;
  ChallengeDone: Readonly<boolean>;
  Clear: Readonly<boolean>;
  ClearCount: Readonly<int>;
  Data: Readonly<RoomConfig>;
  DecorationSeed: Readonly<int>;
  DeliriumDistance: Readonly<int>;
  DisplayFlags: Readonly<int>;
  GridIndex: Readonly<int>;
  HasWater: Readonly<boolean>;
  ListIndex: Readonly<int>;
  NoReward: Readonly<boolean>;
  OverrideData: Readonly<RoomConfig>;
  PitsCount: Readonly<int>;
  PoopCount: Readonly<int>;
  PressurePlatesTriggered: Readonly<boolean>;
  SacrificeDone: Readonly<boolean>;
  SafeGridIndex: Readonly<int>;
  ShopItemDiscountIdx: Readonly<int>;
  ShopItemIdx: Readonly<int>;
  SpawnSeed: Readonly<int>;
  SurpriseMiniboss: Readonly<boolean>;
  VisitedCount: Readonly<int>;
}
