declare interface GridEntityPit extends GridEntity {
  MakeBridge(bridgeSource: GridEntity | null): void;
  SetLadder(value: boolean): void;
  UpdateCollision(): void;

  HasLadder: boolean;
}
