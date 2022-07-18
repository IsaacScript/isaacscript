import { PoopState } from "../../enums/collections/gridEntityState";
import { PoopGridEntityVariant } from "../../enums/collections/gridEntityVariants";

declare global {
  interface GridEntityPoop extends GridEntity {
    GetVariant(): PoopGridEntityVariant;
    ReduceSpawnRate(): void;
    RespawnRedPoop(): void;

    ReducedSpawnRate: boolean;
    ReviveTimer: int;
    State: PoopState;
    StateAnimation: string;
    UnderPlayer: boolean;
  }
}
