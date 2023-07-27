import type { BombVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityBomb extends Entity {
    AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;

    SetExplosionCountdown: (countdown: int) => void;

    ExplosionDamage: float;

    /** There is no separate `BombFlag` enum, so bombs use `TearFlag`. */
    Flags: BitFlags<TearFlag>;

    IsFetus: boolean;
    RadiusMultiplier: float;
    Variant: BombVariant;
  }
}
