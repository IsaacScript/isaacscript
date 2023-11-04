import type { KnifeVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityKnife extends Entity {
    AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    GetKnifeDistance: () => float;
    GetKnifeVelocity: () => float;
    GetRenderZ: () => int;
    HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;
    IsFlying: () => boolean;
    Reset: () => void;
    SetPathFollowSpeed: (speed: float) => void;
    Shoot: (charge: float, range: float) => void;

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
