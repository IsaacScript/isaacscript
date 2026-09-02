declare interface EntityProjectile extends Entity {
  /** Deflects the projectile to the provided direction. */
  readonly Deflect: (newVelocity: Vector) => void;
}
