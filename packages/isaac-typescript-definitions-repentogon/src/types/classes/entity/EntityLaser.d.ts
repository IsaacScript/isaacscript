declare interface EntityLaser extends Entity {
  GetDisableFollowParent: () => boolean;
  GetHitList: () => int[];
  GetOneHit: () => int;

  /** Returns whether the laser timed out. */
  GetTimeout: () => boolean;

  /** Resets the laser's sprite scale. */
  ResetSpriteScale: () => void;

  /**
   * Rotates the laser to the specified `angle`.
   *
   * @param angle
   * @param speed Optional. Default is 8.
   */
  RotateToAngle: (angle: number, speed: number) => void;

  /** Sets whether the laser should not follow its parent. */
  SetDisableFollowParent: (followParent: boolean) => void;

  /** Sets the laser's scale. */
  SetScale: (scale: number) => void;

  /** Sets whether the laser has shrunk. */
  SetShrink: (shrunk: boolean) => void;

  /** Sets the laser's timeout. */
  SetTimeout: (value: int) => void;

  HomingType: int;
}
