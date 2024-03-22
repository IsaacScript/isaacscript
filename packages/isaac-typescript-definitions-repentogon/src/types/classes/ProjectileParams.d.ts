declare interface ProjectileParams extends IsaacAPIClass {
  /**
   * The number of half hearts of damage dealt by the projectile.
   *
   * This value ignores the full heart damage modifier applied to projectiles with a scale above
   * 1.15, but non-boss champions will still double it with a damage cap of 2.
   */
  Damage: int;
}
