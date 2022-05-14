/** We cannot use EntityType values directly since it will break the exclusion hack. */
export type EntityTypeNonNPC =
  | 1 // EntityType.PLAYER
  | 2 // EntityType.TEAR
  | 3 // EntityType.FAMILIAR
  | 4 // EntityType.BOMB
  | 5 // EntityType.PICKUP
  | 7 // EntityType.LASER
  | 8 // EntityType.KNIFE
  | 9 // EntityType.PROJECTILE
  | 1000; // EntityType.EFFECT
