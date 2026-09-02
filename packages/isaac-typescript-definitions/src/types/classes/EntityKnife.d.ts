import type { KnifeVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityKnife extends Entity {
    readonly AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    readonly ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    readonly GetKnifeDistance: () => float;
    readonly GetKnifeVelocity: () => float;
    readonly GetRenderZ: () => int;
    readonly HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;
    readonly IsFlying: () => boolean;
    readonly Reset: () => void;
    readonly SetPathFollowSpeed: (speed: float) => void;
    readonly Shoot: (charge: float, range: float) => void;

    Charge: float;
    MaxDistance: float;
    PathFollowSpeed: float;
    PathOffset: float;
    Rotation: float;
    RotationOffset: float;
    Scale: float;
    TearFlags: BitFlags<TearFlag>;
    Variant: KnifeVariant;
  }
}
