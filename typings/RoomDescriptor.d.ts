declare class RoomDescriptor {
  GridIndex: int;
  SafeGridIndex: int;
  ListIndex: int;
  Data: RoomDescriptorData;
  OverrideData: RoomDescriptorData;
  // AllowedDoors: DoorSet; // DoorSet is not implemented
  DisplayFlags: int;
  VisitedCount: int;
  Clear: boolean;
  ClearCount: int;
  PressurePlatesTriggered: boolean;
  SacrificeDone: boolean;
  ChallengeDone: boolean;
  SurpriseMiniboss: boolean;
  HasWater: boolean;
  NoReward: boolean;
  PoopCount: int;
  PitsCount: int;
  DecorationSeed: int;
  SpawnSeed: int;
  AwardSeed: int;
  ShopItemIdx: int;
  ShopItemDiscountIdx: int;
  DeliriumDistance: int;
}
