declare class GridEntityPoop extends GridEntity {
  RespawnRedPoop(): void;
  ReduceSpawnRate(): void;

  ReviveTimer: int;
  StateAnimation: string;
  UnderPlayer: boolean;
  ReducedSpawnRate: boolean;
}
