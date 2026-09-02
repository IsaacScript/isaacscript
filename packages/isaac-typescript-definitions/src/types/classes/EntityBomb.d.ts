import type { BombVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityBomb extends Entity {
    readonly AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    readonly ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    readonly HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;

    readonly SetExplosionCountdown: (countdown: int) => void;

    ExplosionDamage: float;

    /** There is no separate `BombFlag` enum, so bombs use `TearFlag`. */
    Flags: BitFlags<TearFlag>;

    IsFetus: boolean;
    RadiusMultiplier: float;
    Variant: BombVariant;
  }
}
