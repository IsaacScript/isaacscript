declare class GridEntityDoor extends GridEntity {
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
  TryBlowOpen(fromExplosion: boolean): boolean;
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
  // PreviousState: State; // State is not implemented (it is userdata and not an int)
  PreviousVariant: DoorVariant;
  Slot: DoorSlot;
  TargetRoomIndex: int;
  TargetRoomType: RoomType;
}
