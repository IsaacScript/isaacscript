/** We cannot use EntityType values directly since it will break the exclusion hack. */
export type EntityTypeNonNPC =
  | 1 // EntityType.ENTITY_PLAYER
  | 2 // EntityType.ENTITY_TEAR
  | 3 // EntityType.ENTITY_FAMILIAR
  | 4 // EntityType.ENTITY_BOMB
  | 5 // EntityType.ENTITY_PICKUP
  | 7 // EntityType.ENTITY_LASER
  | 8 // EntityType.ENTITY_KNIFE
  | 9 // EntityType.ENTITY_PROJECTILE
  | 1000; // EntityType.ENTITY_EFFECT
