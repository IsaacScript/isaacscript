import type { TearVariant } from "isaac-typescript-definitions";
import type { SplitTearType } from "../../../enums/SplitTearType";

declare interface EntityLaser extends Entity {
  /** Adds an entity to the laser's hit list. */
  AddToHitList: (entity: Entity) => void;

  /**
   * Fires a split tear.
   *
   * @param position
   * @param velocity
   * @param damageMultiplier Optional. Default is 0.5.
   * @param sizeMultiplier Optional. Default is 0.6.
   * @param variant Optional. Default is `TearVariant.BLUE`.
   * @param splitTearType Optional. Default is `SplitTearType.GENERIC`.
   */
  FireSplitTear: (
    position: Vector,
    velocity: Vector,
    damageMultiplier?: number,
    sizeMultiplier?: number,
    variant?: TearVariant,
    splitTearType?: SplitTearType,
  ) => EntityTear;

  /** Returns the laser's damage multiplier. */
  GetDamageMultiplier: () => number;

  /** Returns whether the laser's origin point doesn't follow its parent's position. */
  GetDisableFollowParent: () => boolean;

  /** Returns an array of entity indexes that the laser is hitting. */
  GetHitList: () => int[];

  GetHomingType: () => int;

  /** Returns whether entities can only take damage once from the laser during its lifetime. */
  GetOneHit: () => boolean;

  /** Returns the laser's scale. */
  GetScale: () => number;

  /** Returns whether the laser has shrunk. */
  GetShrink: () => boolean;

  /** Returns how many frames until the laser times out and is removed. */
  GetTimeout: () => int;

  /** Returns whether the entity is in the laser's hit list. */
  InHitList: (entity: Entity) => boolean;

  /** Returns whether the laser was created through the Multidimensional Baby effect. */
  IsMultidimensionalTouched: () => boolean;

  /** Returns whether the laser was created through the Angelic Prism effect. */
  IsPrismTouched: () => boolean;

  SetHomingType: (homingType: int) => void;

  /**
   * Causes the laser's shape to be fully recalculated on its next update. This can be used to force
   * the laser to instantly change to its `MaxDistance`/`Radius` properties without transitioning to
   * it.
   *
   * This method does not work for lasers with the `OneHit` property set to true or non-sample
   * lasers.
   */
  RecalculateSamplesNextUpdate: () => void;

  /** Removes an entity from the laser's hit list. */
  RemoveFromHitList: (entity: Entity) => void;

  /** Resets the laser's sprite scale. */
  ResetSpriteScale: () => void;

  /**
   * Rotates the laser to the specified `angle`.
   *
   * @param angle
   * @param speed Optional. Default is 8.
   */
  RotateToAngle: (angle: number, speed: number) => void;

  SetDamageMultiplier: (multiplier: number) => void;

  /** Sets whether the laser should not follow its parent. */
  SetDisableFollowParent: (disabled: boolean) => void;

  /** Sets whether the laser was created through the Angelic Prism effect. */
  SetPrismTouched: (touched: boolean) => void;

  /** Sets the laser's scale. */
  SetScale: (scale: number) => void;

  /** Sets whether the laser has shrunk. */
  SetShrink: (shrunk: boolean) => void;

  /** Sets the laser's timeout. */
  SetTimeout: (value: int) => void;

  HomingType: int;
}
