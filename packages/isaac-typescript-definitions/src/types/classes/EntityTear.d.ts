import type { TearVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityTear extends Entity {
    AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    ChangeVariant: (tearVariant: TearVariant) => void;
    ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;
    ResetSpriteScale: () => void;
    SetDeadEyeIntensity: (intensity: float) => void;
    SetKnockbackMultiplier: (multiplier: float) => void;
    SetParentOffset: (offset: Vector) => void;
    SetWaitFrames: (value: int) => void;

    readonly BaseDamage: float;
    readonly BaseScale: float;
    Bounced: boolean;
    CanTriggerStreakEnd: boolean;
    ContinueVelocity: Vector;
    FallingAcceleration: float;
    FallingSpeed: float;
    Height: float;
    HomingFriction: float;
    KnockbackMultiplier: float;
    ParentOffset: Vector;

    /**
     * Unlike other cases of read-only `Vector` in the API, this is read-only in both the field and
     * the attributes.
     */
    readonly PosDisplacement: Readonly<Vector>;

    Rotation: float;
    Scale: float;
    StickDiff: Vector;
    StickTarget?: Entity;
    StickTimer: int;
    TearFlags: BitFlags<TearFlag>;

    /**
     * - In each run, the game keeps track of how many tears have been fired by the player in total.
     * - TearIndex represents this tear counter.
     * - It is 0-indexed, meaning that the first tear fired by the player on a run will have a
     *   `TearIndex` of 0, the second tear fired by the player on a run will have a `TearIndex` of
     *   1, and so on.
     */
    readonly TearIndex: int;

    Variant: TearVariant;
    WaitFrames: int;
  }
}
