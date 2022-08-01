/**
 * A type union that matches `Entity`, `EntityBomb`, `EntityEffect`, and so on.
 *
 * This is useful for building generic functions that should accept any kind of entity.
 */
export type AnyEntity =
  | Entity
  | EntityBomb
  | EntityEffect
  | EntityFamiliar
  | EntityKnife
  | EntityLaser
  | EntityNPC
  | EntityPickup
  | EntityPlayer
  | EntityProjectile
  | EntityTear;
