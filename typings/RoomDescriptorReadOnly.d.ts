// This is the same thing as the RoomDescriptor class, but every value is marked as being read only

declare interface RoomDescriptorReadOnly {
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
  Data: Readonly<RoomConfig> | Readonly<undefined>;

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
   * A composition of zero or more `DisplayFlag`.
   *
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  DisplayFlags: Readonly<int>;

  /**
   * A composition of zero or more `RoomDescriptorFlag`.
   *
   * To set this property, get a writable copy of the RoomDescriptor by using the
   * `Level.GetRoomByIdx()` method.
   */
  Flags: int;

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
   * `GridIndex` is equal to the the specific 1x1 quadrant that the player entered the room at.
   * Thus, it will return different values for the same big room. `SafeGridIndex` is always equal to
   * the the top-left index of the room. Thus, it will always return consistent values. Use
   * `SafeGridIndex` over `GridIndex` as the key for data structures that use the room index as an
   * index.
   *
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
