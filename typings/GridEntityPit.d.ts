declare class GridEntityPit extends GridEntity {
  MakeBridge(): void;
  SetLadder(value: boolean): void;
  UpdateCollision(): void;

  HasLadder: boolean;
}
