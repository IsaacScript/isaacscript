declare interface EntityProjectile extends Entity {
  /** Deflects the projectile to the provided direction. */
  Deflect: (newVelocity: Vector) => void;
}
