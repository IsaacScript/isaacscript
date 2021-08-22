// This is the same thing as the RoomDescriptor class, but every value is marked as being read only

declare class RoomDescriptorReadOnly {
  // AllowedDoors: DoorSet; // DoorSet is not implemented
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  AwardSeed: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  ChallengeDone: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  Clear: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  ClearCount: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  Data: Readonly<RoomConfig> | Readonly<null>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  DecorationSeed: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  DeliriumDistance: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  DisplayFlags: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  GridIndex: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  HasWater: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  ListIndex: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  NoReward: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  OverrideData: Readonly<RoomConfig>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  PitsCount: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  PoopCount: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  PressurePlatesTriggered: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  SacrificeDone: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  SafeGridIndex: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  ShopItemDiscountIdx: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  ShopItemIdx: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  SpawnSeed: Readonly<int>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  SurpriseMiniboss: Readonly<boolean>;
  /**
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  VisitedCount: Readonly<int>;
}
