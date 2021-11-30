declare interface GridEntityDoor extends GridEntity {
  Bar(): void;
  CanBlowOpen(): boolean;
  Close(force: boolean): void;
  GetSpriteOffset(): Readonly<Vector>;
  IsBusted(): boolean;
  IsKeyFamiliarTarget(): boolean;
  IsLocked(): boolean;
  IsOpen(): boolean;
  IsRoomType(roomType: RoomType): boolean;
  IsTargetRoomArcade(): boolean;
  Open(): void;
  SetLocked(locked: boolean): void;
  SetRoomTypes(currentRoomType: RoomType, targetRoomType: RoomType): void;
  SpawnDust(): void;
  TryBlowOpen(fromExplosion: boolean, source: Entity): boolean;
  TryUnlock(player: EntityPlayer, force: boolean): boolean;

  Busted: boolean;
  CloseAnimation: string;
  CurrentRoomType: RoomType;
  Direction: Direction;
  ExtraSprite: Sprite;
  ExtraVisible: boolean;
  LockedAnimation: string;
  OpenAnimation: string;
  OpenLockedAnimation: string;
  // PreviousState: never; // Instead of returning DoorState, it returns userdata
  PreviousVariant: DoorVariant;
  Slot: DoorSlot;

  /** This corresponds to the room grid index. */
  TargetRoomIndex: int;

  TargetRoomType: RoomType;
}
