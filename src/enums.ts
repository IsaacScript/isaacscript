export enum MaxFlagShift {
  /** For the EntityFlag enum. */
  ENTITY = 59,
  /**
   * For the EntityTear enum.
   * Beware: it is not possible to work with the higher TearFlags without using the BitSet128 class.
   */
  TEAR = 127,
  /** For the ProjectileFlags enum. */
  PROJECTILE = 57,
  /** For the DamageFlag enum. */
  DAMAGE = 32,
  /** For the UseFlag enum. */
  USE = 10,
}
