declare const enum ProjectilesMode {
  ONE_PROJECTILE = 0,

  /** Uses params.Spread. */
  TWO_PROJECTILES = 1,

  /** Uses params.Spread. */
  THREE_PROJECTILES = 2,

  /** Uses params.Spread. */
  THREE_PROJECTILES_SPREAD = 3,

  /** Uses params.Spread. */
  FOUR_PROJECTILES = 4,

  /** Uses params.Spread. */
  FIVE_PROJECTILES = 5,

  /** Uses velocity.X as speed. */
  FOUR_PROJECTILES_PLUS_PATTERN = 6,

  /** Uses velocity.X as speed. */
  FOUR_PROJECTILES_X_PATTERN = 7,

  /** Uses velocity.X as speed. */
  EIGHT_PROJECTILES_STAR_PATTERN = 8,

  /**
   * Uses velocity.X as speed.
   * Uses velocity.y as N.
   * To fire in an arc, use params.FireDirectionLimit and params.DotProductLimit.
   */
  N_PROJECTILES_IN_CIRCLE = 9,
}
