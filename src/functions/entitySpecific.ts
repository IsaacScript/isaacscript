import { getEntities, removeEntities } from "./entity";

/**
 * Helper function to get all of the bombs in the room.
 *
 * Example:
 * ```
 * // Make all of the bombs in the room invisible
 * for (const bomb of getBombs()) {
 *   bomb.Visible = false;
 * }
 * ```
 */
export function getBombs(
  matchingVariant: BombVariant | int = -1,
  matchingSubType = -1,
): EntityBomb[] {
  const entities = getEntities(
    EntityType.ENTITY_BOMB,
    matchingVariant,
    matchingSubType,
  );

  const bombs: EntityBomb[] = [];
  for (const entity of entities) {
    const bomb = entity.ToBomb();
    if (bomb !== undefined) {
      bombs.push(bomb);
    }
  }

  return bombs;
}

/**
 * Helper function to get all of the effects in the room.
 *
 * Example:
 * ```
 * // Make all of the effects in the room invisible
 * for (const effect of getEffects()) {
 *   effect.Visible = false;
 * }
 * ```
 */
export function getEffects(
  matchingVariant: EffectVariant | int = -1,
  matchingSubType = -1,
): EntityEffect[] {
  const entities = getEntities(
    EntityType.ENTITY_EFFECT,
    matchingVariant,
    matchingSubType,
  );

  const effects: EntityEffect[] = [];
  for (const entity of entities) {
    const effect = entity.ToEffect();
    if (effect !== undefined) {
      effects.push(effect);
    }
  }

  return effects;
}

/**
 * Helper function to get all of the knives in the room.
 *
 * Example:
 * ```
 * // Make all of the knives in the room invisible
 * for (const knife of getKnives()) {
 *   knife.Visible = false;
 * }
 * ```
 */
export function getKnives(
  matchingVariant: KnifeVariant | int = -1,
  matchingSubType = -1,
): EntityKnife[] {
  const entities = getEntities(
    EntityType.ENTITY_KNIFE,
    matchingVariant,
    matchingSubType,
  );

  const knives: EntityKnife[] = [];
  for (const entity of entities) {
    const knife = entity.ToKnife();
    if (knife !== undefined) {
      knives.push(knife);
    }
  }

  return knives;
}

/**
 * Helper function to get all of the lasers in the room.
 *
 * Example:
 * ```
 * // Make all of the lasers in the room invisible
 * for (const laser of getLasers()) {
 *   laser.Visible = false;
 * }
 * ```
 */
export function getLasers(
  matchingVariant: LaserVariant | int = -1,
  matchingSubType = -1,
): EntityLaser[] {
  const entities = getEntities(
    EntityType.ENTITY_LASER,
    matchingVariant,
    matchingSubType,
  );

  const lasers: EntityLaser[] = [];
  for (const entity of entities) {
    const laser = entity.ToLaser();
    if (laser !== undefined) {
      lasers.push(laser);
    }
  }

  return lasers;
}

/**
 * Helper function to get all of the projectiles in the room.
 *
 * Example:
 * ```
 * // Make all of the projectiles in the room invisible
 * for (const projectile of getProjectiles()) {
 *   projectile.Visible = false;
 * }
 * ```
 */
export function getProjectiles(
  matchingVariant: ProjectileVariant | int = -1,
  matchingSubType = -1,
): EntityProjectile[] {
  const entities = getEntities(
    EntityType.ENTITY_PROJECTILE,
    matchingVariant,
    matchingSubType,
  );

  const projectiles: EntityProjectile[] = [];
  for (const entity of entities) {
    const projectile = entity.ToProjectile();
    if (projectile !== undefined) {
      projectiles.push(projectile);
    }
  }

  return projectiles;
}

/**
 * Helper function to get all of the slots in the room.
 *
 * Example:
 * ```
 * // Make all of the slots in the room invisible
 * for (const slot of getSlots()) {
 *   slot.Visible = false;
 * }
 * ```
 */
export function getSlots(
  matchingVariant: SlotVariant | int = -1,
  matchingSubType = -1,
): Entity[] {
  const slots = getEntities(
    EntityType.ENTITY_SLOT,
    matchingVariant,
    matchingSubType,
  );

  return slots;
}

/**
 * Helper function to get all of the tears in the room.
 *
 * Example:
 * ```
 * // Make all of the tears in the room invisible
 * for (const tear of getTears()) {
 *   tear.Visible = false;
 * }
 * ```
 */
export function getTears(
  matchingVariant: TearVariant | int = -1,
  matchingSubType = -1,
): EntityTear[] {
  const entities = getEntities(
    EntityType.ENTITY_TEAR,
    matchingVariant,
    matchingSubType,
  );

  const tears: EntityTear[] = [];
  for (const entity of entities) {
    const tear = entity.ToTear();
    if (tear !== undefined) {
      tears.push(tear);
    }
  }

  return tears;
}

/**
 * Helper function to remove all of the bombs in the room.
 *
 * @param variant Optional. If specified, will only remove bombs that match this variant.
 * @param subType Optional. If specified, will only remove bombs that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of bombs.
 * @returns True if one or more bombs was removed, false otherwise.
 */
export function removeAllBombs(
  variant?: BombVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const bombs = getBombs(variant, subType);
  return removeEntities(bombs, cap);
}

/**
 * Helper function to remove all of the effects in the room.
 *
 * @param variant Optional. If specified, will only remove effects that match this variant.
 * @param subType Optional. If specified, will only remove effects that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of effects.
 * @returns True if one or more effects was removed, false otherwise.
 */
export function removeAllEffects(
  variant?: EffectVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const effects = getEffects(variant, subType);
  return removeEntities(effects, cap);
}

/**
 * Helper function to remove all of the knives in the room.
 *
 * @param variant Optional. If specified, will only remove knives that match this variant.
 * @param subType Optional. If specified, will only remove knives that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of knives.
 * @returns True if one or more knives was removed, false otherwise.
 */
export function removeAllKnives(
  variant?: KnifeVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const knives = getKnives(variant, subType);
  return removeEntities(knives, cap);
}

/**
 * Helper function to remove all of the lasers in the room.
 *
 * @param variant Optional. If specified, will only remove lasers that match this variant.
 * @param subType Optional. If specified, will only remove lasers that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of lasers.
 * @returns True if one or more lasers was removed, false otherwise.
 */
export function removeAllLasers(
  variant?: LaserVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const lasers = getLasers(variant, subType);
  return removeEntities(lasers, cap);
}

/**
 * Helper function to remove all of the projectiles in the room.
 *
 * @param variant Optional. If specified, will only remove projectiles that match this variant.
 * @param subType Optional. If specified, will only remove projectiles that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of projectiles.
 * @returns True if one or more projectiles was removed, false otherwise.
 */
export function removeAllProjectiles(
  variant?: ProjectileVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const projectiles = getProjectiles(variant, subType);
  return removeEntities(projectiles, cap);
}

/**
 * Helper function to remove all of the slots in the room.
 *
 * @param variant Optional. If specified, will only remove slots that match this variant.
 * @param subType Optional. If specified, will only remove slots that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of slots.
 * @returns True if one or more slots was removed, false otherwise.
 */
export function removeAllSlots(
  variant?: SlotVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const slots = getSlots(variant, subType);
  return removeEntities(slots, cap);
}

/**
 * Helper function to remove all of the tears in the room.
 *
 * @param variant Optional. If specified, will only remove tears that match this variant.
 * @param subType Optional. If specified, will only remove tears that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of tears.
 * @returns True if one or more tears was removed, false otherwise.
 */
export function removeAllTears(
  variant?: TearVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const tears = getTears(variant, subType);
  return removeEntities(tears, cap);
}
