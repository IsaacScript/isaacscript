declare class GridEntityDoor extends GridEntity {
  SetRoomTypes(currentRoomType: RoomType, targetRoomType: RoomType): void;
  Open(): void;
  Close(force: boolean): void;
  Bar(): void;
  SpawnDust(): void;
  CanBlowOpen(): boolean;
  TryBlowOpen(fromExplosion: boolean): boolean;
  TryUnlock(force: boolean): boolean;
  IsOpen(): boolean;
  IsKeyFamiliarTarget(): boolean;
  SetLocked(locked: boolean): void;
  IsLocked(): boolean;
  IsBusted(): boolean;
  IsRoomType(roomType: RoomType): boolean;
  IsTargetRoomArcade(): boolean;
  GetSpriteOffset(): Readonly<Vector>;

  Direction: Direction;
  TargetRoomIndex: int;
  Slot: DoorSlot;
  CurrentRoomType: RoomType;
  TargetRoomType: RoomType;
  ExtraSprite: Sprite;
  ExtraVisible: boolean;
  Busted: boolean;
  // PreviousState: State; // State is not implemented
  PreviousVariant: DoorVariant;
  OpenAnimation: string;
  CloseAnimation: string;
  LockedAnimation: string;
  OpenLockedAnimation: string;
}
