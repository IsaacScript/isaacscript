declare interface EntityLaser extends Entity {
  /** Returns the laser's damage multiplier. */
  GetDamageMultiplier: () => number;

  /** Returns whether the laser's origin point doesn't follow its parent's position. */
  GetDisableFollowParent: () => boolean;

  /** Returns an array of entity indexes that the laser is hitting. */
  GetHitList: () => int[];

  /** Returns whether entities can only take damage once from the laser during its lifetime. */
  GetOneHit: () => boolean;

  /** Returns the laser's scale. */
  GetScale: () => number;

  /** Returns whether the laser has shrunk. */
  GetShrink: () => boolean;

  /** Returns how many frames until the laser times out and is removed. */
  GetTimeout: () => int;

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
