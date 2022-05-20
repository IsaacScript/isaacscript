import { PoopState } from "../enums/collections/gridEntityState";

declare global {
  interface GridEntityPoop extends GridEntity {
    ReduceSpawnRate(): void;
    RespawnRedPoop(): void;

    ReducedSpawnRate: boolean;
    ReviveTimer: int;
    State: PoopState;
    StateAnimation: string;
    UnderPlayer: boolean;
  }
}
