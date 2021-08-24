declare interface GridEntityPoop extends GridEntity {
  ReduceSpawnRate(): void;
  RespawnRedPoop(): void;

  ReducedSpawnRate: boolean;
  ReviveTimer: int;
  StateAnimation: string;
  UnderPlayer: boolean;
}
