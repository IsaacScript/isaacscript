declare interface EntityLaser extends Entity {
  GetDamageMultiplier: () => number;
  GetDisableFollowParent: () => boolean;
  GetHitList: () => int[];
  GetOneHit: () => int;

  /** Returns whether the laser timed out. */
  GetTimeout: () => boolean;

  /** Returns whether the laser was created through the Multidimensional Baby effect. */
  IsMultidimensionalTouched: () => boolean;

  /** Returns whether the laser was created through the Angelic Prism effect. */
  IsPrismTouched: () => boolean;

  /**
   * Causes the laser's shape to be fully recalculated on its next update. This can be used to force
   * the laser to instantly change to its `MaxDistance`/`Radius` properties without transitioning to
   * it.
   *
   * This method does not work for lasers with the `OneHit` property set to true or non-sample
   * lasers.
   */
  RecalculateSamplesNextUpdate: () => void;

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
  SetDisableFollowParent: (followParent: boolean) => void;

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
