import { AnyEntity } from "../types/AnyEntity";
import { getRandom, nextSeed } from "./random";

export function anyEntityCloserThan(
  entities: Entity[],
  position: Vector,
  distance: int,
): boolean {
  for (const entity of entities) {
    if (position.Distance(entity.Position) <= distance) {
      return true;
    }
  }

  return false;
}

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
  matchingVariant = -1,
  matchingSubType = -1,
): EntityBomb[] {
  const entities = Isaac.FindByType(
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
 * Given an array of entities, this helper function returns the closest one to a provided reference
 * entity.
 *
 * Example:
 * ```ts
 * const player = Isaac.GetPlayer();
 * const gapers = Isaac.FindByType(EntityType.ENTITY_GAPER);
 * const closestGaper = getClosestEntityTo(player, gapers);
 * ```
 */
export function getClosestEntityTo(
  referenceEntity: Entity,
  entities: Entity[],
): Entity {
  let closestEntity: Entity | null = null;
  let closestDistance = math.huge;
  for (const entity of entities) {
    const distance = referenceEntity.Position.Distance(entity.Position);

    if (distance < closestDistance) {
      closestEntity = entity;
      closestDistance = distance;
    }
  }

  if (closestEntity === null) {
    error("Failed to find the closest entity.");
  }

  return closestEntity;
}

/**
 * Helper function to compare two different arrays of entities. Returns the entities that are in the
 * second array but not in the first array.
 */
export function getFilteredNewEntities<T extends AnyEntity>(
  oldEntities: T[],
  newEntities: T[],
): T[] {
  const oldEntitiesSet = new Set<PtrHash>();
  for (const entity of oldEntities) {
    const ptrHash = GetPtrHash(entity);
    oldEntitiesSet.add(ptrHash);
  }

  return newEntities.filter((entity) => {
    const ptrHash = GetPtrHash(entity);
    return !oldEntitiesSet.has(ptrHash);
  });
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
  matchingVariant = -1,
  matchingSubType = -1,
): EntityEffect[] {
  const entities = Isaac.FindByType(
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
 * Helper function to get all of the entities in the room or all of the entities that match a
 * specific entity type / variant / sub-type.
 *
 * Due to bugs with `Isaac.FindInRadius()`, this function uses `Isaac.GetRoomEntities()`,
 * which is more expensive but also more robust. (If a matching entity type is provided, then
 * `Isaac.FindByType()` will be used instead.)
 *
 * Example:
 * ```
 * // Make all of the entities in the room invisible
 * for (const entity of getEntities()) {
 *   entity.Visible = false;
 * }
 * ```
 *
 * @param matchingEntityType Optional. If specified, will only return NPCs that match this entity
 * type.
 * @param matchingVariant Optional. If specified, will only return NPCs that match this variant.
 * @param matchingSubType Optional. If specified, will only return NPCs that match this sub-type.
 * @param ignoreFriendly Optional. If set to true, it will exclude friendly NPCs from being
 * returned. False by default. Will only be taken into account if `matchingEntityType` is specified.
 */
export function getEntities(
  matchingEntityType?: EntityType | int,
  matchingVariant = -1,
  matchingSubType = -1,
  ignoreFriendly = false,
): Entity[] {
  if (matchingEntityType === undefined) {
    return Isaac.GetRoomEntities();
  }

  return Isaac.FindByType(
    matchingEntityType,
    matchingVariant,
    matchingSubType,
    ignoreFriendly,
  );
}

/**
 * Helper function to get a map containing the positions of every entity in the current room.
 *
 * This is useful for rewinding entity positions at a later time. Also see `setEntityPositions()`.
 *
 * @param entities Optional. If provided, will only get the positions of the provided entities. This
 * can be used to cache the entities to avoid invoking `Isaac.GetRoomEntities()` multiple times.
 */
export function getEntityPositions(entities?: Entity[]): Map<PtrHash, Vector> {
  if (entities === undefined) {
    entities = getEntities();
  }

  const entityPositions = new Map<PtrHash, Vector>();
  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    entityPositions.set(ptrHash, entity.Position);
  }

  return entityPositions;
}

/**
 * Helper function to get a map containing the velocities of every entity in the current room.
 *
 * This is useful for rewinding entity velocities at a later time. Also see `setEntityVelocities()`.
 *
 * @param entities Optional. If provided, will only get the velocities of the provided entities.
 * This can be used to cache the entities to avoid invoking `Isaac.GetRoomEntities()` multiple
 * times.
 */
export function getEntityVelocities(entities?: Entity[]): Map<PtrHash, Vector> {
  if (entities === undefined) {
    entities = getEntities();
  }

  const entityVelocities = new Map<PtrHash, Vector>();
  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    entityVelocities.set(ptrHash, entity.Velocity);
  }

  return entityVelocities;
}

/**
 * Helper function to get all of the familiars in the room.
 *
 * Example:
 * ```
 * // Make all of the familiars in the room invisible
 * for (const familiar of getFamiliars()) {
 *   familiar.Visible = false;
 * }
 * ```
 */
export function getFamiliars(
  matchingVariant = -1,
  matchingSubType = -1,
): EntityFamiliar[] {
  const entities = Isaac.FindByType(
    EntityType.ENTITY_FAMILIAR,
    matchingVariant,
    matchingSubType,
  );

  const familiars: EntityFamiliar[] = [];
  for (const entity of entities) {
    const familiar = entity.ToFamiliar();
    if (familiar !== undefined) {
      familiars.push(familiar);
    }
  }

  return familiars;
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
  matchingVariant = -1,
  matchingSubType = -1,
): EntityKnife[] {
  const entities = Isaac.FindByType(
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
  matchingVariant = -1,
  matchingSubType = -1,
): EntityLaser[] {
  const entities = Isaac.FindByType(
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
 * Helper function to get all of the pickups in the room.
 *
 * Example:
 * ```
 * // Make all of the pickups in the room invisible
 * for (const pickup of getPickups()) {
 *   pickup.Visible = false;
 * }
 * ```
 */
export function getPickups(
  matchingVariant = -1,
  matchingSubType = -1,
): EntityPickup[] {
  const entities = Isaac.FindByType(
    EntityType.ENTITY_PICKUP,
    matchingVariant,
    matchingSubType,
  );

  const pickups: EntityPickup[] = [];
  for (const entity of entities) {
    const pickup = entity.ToPickup();
    if (pickup !== undefined) {
      pickups.push(pickup);
    }
  }

  return pickups;
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
  matchingVariant = -1,
  matchingSubType = -1,
): EntityProjectile[] {
  const entities = Isaac.FindByType(
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

export function getSlots(matchingVariant = -1, matchingSubType = -1): Entity[] {
  const slots = Isaac.FindByType(
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
  matchingVariant = -1,
  matchingSubType = -1,
): EntityTear[] {
  const entities = Isaac.FindByType(
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
 * Helper function to measure an entity's velocity to see if it is moving.
 *
 * @param entity The entity whose velocity to measure.
 * @param threshold Optional. The threshold from 0 to consider to be moving. 0.01 by default.
 */
export function isEntityMoving(entity: Entity, threshold = 0.01): boolean {
  return entity.Velocity.Length() >= threshold;
}

/**
 * Helper function to remove all of the entities in the supplied array.
 *
 * @param entities The array of entities to remove.
 * @param cap Optional. If specified, will only remove the given amount of entities.
 * @returns True if one or more entities was removed, false otherwise.
 */
export function removeEntities(entities: Entity[], cap?: int): boolean {
  if (entities.length === 0) {
    return false;
  }

  let numEntitiesRemoved = 0;
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    entity.Remove();

    numEntitiesRemoved += 1;
    if (cap !== undefined && numEntitiesRemoved >= cap) {
      return true;
    }
  }

  return true;
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
 * Helper function to remove all of the familiars in the room.
 *
 * @param variant Optional. If specified, will only remove familiars that match this variant.
 * @param subType Optional. If specified, will only remove familiars that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of familiars.
 * @returns True if one or more familiars was removed, false otherwise.
 */
export function removeAllFamiliars(
  variant?: FamiliarVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const familiars = getFamiliars(variant, subType);
  return removeEntities(familiars, cap);
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
 * Helper function to remove all of the matching entities in the room.
 *
 * @param entityType The entity type to match.
 * @param entityVariant Optional. The variant to match. -1 by default (which will match every
 * variant).
 * @param entitySubType Optional. The sub-type to match. -1 by default (which will match every
 * sub-type).
 * @param cap Optional. If specified, will only remove the given amount of collectibles.
 * @returns True if one or more entities was removed, false otherwise.
 */
export function removeAllMatchingEntities(
  entityType: int,
  entityVariant = -1,
  entitySubType = -1,
  cap: int | undefined = undefined,
): boolean {
  const entities = Isaac.FindByType(entityType, entityVariant, entitySubType);
  return removeEntities(entities, cap);
}

/**
 * Helper function to remove all of the pickups in the room.
 *
 * @param variant Optional. If specified, will only remove pickups that match this variant.
 * @param subType Optional. If specified, will only remove pickups that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of pickups.
 * @returns True if one or more pickups was removed, false otherwise.
 */
export function removeAllPickups(
  variant?: PickupVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const pickups = getPickups(variant, subType);
  return removeEntities(pickups, cap);
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

/**
 * Game().RerollEnemy rerolls a boolean of whether or not the enemy was rerolled. However, you
 * cannot use the same entity object after a reroll. This function calls game.RerollEnemy and
 * returns the new entity object.
 *
 * @param entity The entity to reroll
 * @returns If the entity was not rerolled, returns the original entity. otherwise, returns the resulting entity from the reroll
 */
export function rerollEnemy(entity: Entity): Entity {
  const game = Game();

  const oldEntities = getEntities();
  const wasRerolled = game.RerollEnemy(entity);
  if (!wasRerolled) {
    return entity;
  }

  const newEntities = getEntities();
  const filteredNewEntities = getFilteredNewEntities(oldEntities, newEntities);
  if (filteredNewEntities.length !== 0) {
    error(
      'Failed to find the new entity generated by the "RerollEnemy" method.',
    );
  }

  return filteredNewEntities[0];
}

/**
 * Helper function to set the position of every entity in the room based on a map of positions. If
 * an entity is found that does not have matching element in the provided map, then that entity will
 * be skipped.
 *
 * This function is useful for rewinding entity positions at a later time. Also see
 * `getEntityPositions()`.
 *
 * @param entityPositions The map providing the positions for every entity.
 * @param entities Optional. If provided, will only set the positions of the provided entities. This
 * can be used to cache the entities to avoid invoking `Isaac.GetRoomEntities()` multiple times.
 */
export function setEntityPositions(
  entityPositions: Map<PtrHash, Vector>,
  entities?: Entity[],
): void {
  if (entities === undefined) {
    entities = getEntities();
  }

  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    const entityPosition = entityPositions.get(ptrHash);
    if (entityPosition !== undefined) {
      entity.Position = entityPosition;
    }
  }
}

export function setEntityRandomColor(entity: Entity): void {
  const colorValues: int[] = [];
  let seed = entity.InitSeed;
  for (let i = 0; i < 3; i++) {
    seed = nextSeed(seed);
    const randomColorValue = getRandom(seed);
    colorValues.push(randomColorValue);
  }
  const color = Color(colorValues[0], colorValues[1], colorValues[2]);
  entity.SetColor(color, 100000, 100000, false, false);
}

/**
 * Helper function to set the velocity of every entity in the room based on a map of velocities. If
 * an entity is found that does not have matching element in the provided map, then that entity will
 * be skipped.
 *
 * This function is useful for rewinding entity velocities at a later time. Also see
 * `getEntityVelocities()`.
 *
 * @param entityVelocities The map providing the velocities for every entity.
 * @param entities Optional. If provided, will only set the velocities of the provided entities.
 * This can be used to cache the entities to avoid invoking `Isaac.GetRoomEntities()` multiple
 * times.
 */
export function setEntityVelocities(
  entityVelocities: Map<PtrHash, Vector>,
  entities?: Entity[],
): void {
  if (entities === undefined) {
    entities = getEntities();
  }

  for (const entity of entities) {
    const ptrHash = GetPtrHash(entity);
    const entityVelocity = entityVelocities.get(ptrHash);
    if (entityVelocity !== undefined) {
      entity.Velocity = entityVelocity;
    }
  }
}
