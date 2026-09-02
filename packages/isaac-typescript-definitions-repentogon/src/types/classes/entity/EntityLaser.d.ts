import type { TearVariant } from "isaac-typescript-definitions";
import type { SplitTearType } from "../../../enums/SplitTearType";

declare interface EntityLaser extends Entity {
  /** Adds an entity to the laser's hit list. */
  readonly AddToHitList: (entity: Entity) => void;

  /**
   * Fires a split tear.
   *
   * @param position
   * @param velocity
   * @param damageMultiplier Optional. Default is 0.5.
   * @param sizeMultiplier Optional. Default is 0.6.
   * @param variant Optional. Default is `TearVariant.BLUE`.
   * @param splitTearType Optional. Default is `SplitTearType.GENERIC`. Custom split tear effects
   *                      can be implemented by passing in a string instead.
   */
  readonly FireSplitTear: (
    position: Vector,
    velocity: Vector,
    damageMultiplier?: number,
    sizeMultiplier?: number,
    variant?: TearVariant,
    splitTearType?: SplitTearType | string,
  ) => EntityTear;

  /** Returns the laser's damage multiplier. */
  readonly GetDamageMultiplier: () => number;

  /** Returns whether the laser's origin point doesn't follow its parent's position. */
  readonly GetDisableFollowParent: () => boolean;

  /** Returns an array of entity indexes that the laser is hitting. */
  readonly GetHitList: () => int[];

  readonly GetHomingType: () => int;

  /** Returns whether entities can only take damage once from the laser during its lifetime. */
  readonly GetOneHit: () => boolean;

  /** Returns the laser's scale. */
  readonly GetScale: () => number;

  /** Returns whether the laser has shrunk. */
  readonly GetShrink: () => boolean;

  /** Returns how many frames until the laser times out and is removed. */
  readonly GetTimeout: () => int;

  /** Returns whether the entity is in the laser's hit list. */
  readonly InHitList: (entity: Entity) => boolean;

  /** Returns whether the laser was created through the Multidimensional Baby effect. */
  readonly IsMultidimensionalTouched: () => boolean;

  /** Returns whether the laser was created through the Angelic Prism effect. */
  readonly IsPrismTouched: () => boolean;

  readonly SetHomingType: (homingType: int) => void;

  /**
   * Causes the laser's shape to be fully recalculated on its next update. This can be used to force
   * the laser to instantly change to its `MaxDistance`/`Radius` properties without transitioning to
   * it.
   *
   * This method does not work for lasers with the `OneHit` property set to true or non-sample
   * lasers.
   */
  readonly RecalculateSamplesNextUpdate: () => void;

  /** Removes an entity from the laser's hit list. */
  readonly RemoveFromHitList: (entity: Entity) => void;

  /** Resets the laser's sprite scale. */
  readonly ResetSpriteScale: () => void;

  /**
   * Rotates the laser to the specified `angle`.
   *
   * @param angle
   * @param speed Optional. Default is 8.
   */
  readonly RotateToAngle: (angle: number, speed: number) => void;

  readonly SetDamageMultiplier: (multiplier: number) => void;

  /** Sets whether the laser should not follow its parent. */
  readonly SetDisableFollowParent: (disabled: boolean) => void;

  /** Sets whether the laser was created through the Angelic Prism effect. */
  readonly SetPrismTouched: (touched: boolean) => void;

  /** Sets the laser's scale. */
  readonly SetScale: (scale: number) => void;

  /** Sets whether the laser has shrunk. */
  readonly SetShrink: (shrunk: boolean) => void;

  /** Sets the laser's timeout. */
  readonly SetTimeout: (value: int) => void;

  HomingType: int;
}
