declare interface GridEntityPit extends GridEntity {
  MakeBridge(bridgeSource: GridEntity | undefined): void;
  SetLadder(value: boolean): void;
  UpdateCollision(): void;

  HasLadder: boolean;
}
