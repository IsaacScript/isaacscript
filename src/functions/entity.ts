import { STORY_BOSSES } from "../constants";
import { AnyEntity } from "../types/AnyEntity";
import { getRandom, nextSeed } from "./random";
import { repeat } from "./utils";

export function anyEntityCloserThan(
  entities: Entity[],
  position: Vector,
  distance: int,
): boolean {
  return entities.some(
    (entity) => position.Distance(entity.Position) <= distance,
  );
}

/**
 * Helper function to count the number of entities in room. Use this over the vanilla
 * `Isaac.CountEntities` method to avoid having to specify a spawner and to handle ignoring charmed
 * enemies.
 *
 * @param entityType -1 by default.
 * @param variant -1 by default.
 * @param subType -1 by default.
 * @param ignoreFriendly False by default.
 */
export function countEntities(
  entityType: EntityType | int = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
) {
  if (!ignoreFriendly) {
    return Isaac.CountEntities(undefined, entityType, variant, subType);
  }

  const entities = Isaac.FindByType(
    entityType,
    variant,
    subType,
    false,
    ignoreFriendly,
  );

  return entities.length;
}

/**
 * Given an array of entities, this helper function returns the closest one to a provided reference
 * entity.
 *
 * Example:
 * ```ts
 * const player = Isaac.GetPlayer();
 * const gapers = getEntities(EntityType.ENTITY_GAPER);
 * const closestGaper = getClosestEntityTo(player, gapers);
 * ```
 */
export function getClosestEntityTo<T extends AnyEntity>(
  referenceEntity: Entity,
  entities: T[],
): T {
  let closestEntity: T | null = null;
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

/** Helper function to return a string containing an entity's type, variant, and sub-type. */
export function getEntityID(entity: Entity) {
  return `${entity.Type}.${entity.Variant}.${entity.SubType}`;
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
 * Helper function to determine if the current entity is an end-game story boss, like Isaac, Blue
 * Baby, Mega Satan, The Beast, and so on. This is useful because certain effects should only apply
 * to non-story bosses, like Vanishing Twin. Also see the `STORY_BOSSES` constant.
 */
export function isStoryBoss(entity: Entity): boolean {
  return STORY_BOSSES.has(entity.Type);
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
  for (const entity of entities) {
    entity.Remove();

    numEntitiesRemoved += 1;
    if (cap !== undefined && numEntitiesRemoved >= cap) {
      return true;
    }
  }

  return true;
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
  const entities = getEntities(entityType, entityVariant, entitySubType);
  return removeEntities(entities, cap);
}

/**
 * Helper function to reroll an enemy. Use this instead of the vanilla "Game.RerollEnemy" function
 * if you want the rerolled enemy to be returned.
 *
 * @param entity The entity to reroll.
 * @returns If the game failed to reroll the enemy, returns undefined. Otherwise, returns the
 * rerolled entity.
 */
export function rerollEnemy(entity: Entity): Entity | undefined {
  const game = Game();

  const oldEntities = getEntities();
  const wasRerolled = game.RerollEnemy(entity);
  if (!wasRerolled) {
    return undefined;
  }

  const newEntities = getEntities();
  const filteredNewEntities = getFilteredNewEntities(oldEntities, newEntities);
  if (filteredNewEntities.length === 0) {
    error(
      'Failed to find the new entity generated by the "RerollEnemy" method.',
    );
  }

  return filteredNewEntities[0];
}

export function setEntityRandomColor(entity: Entity): void {
  const colorValues: int[] = [];
  let seed = entity.InitSeed;
  repeat(3, () => {
    seed = nextSeed(seed);
    const randomColorValue = getRandom(seed);
    colorValues.push(randomColorValue);
  });
  const color = Color(colorValues[0], colorValues[1], colorValues[2]);
  entity.SetColor(color, 100000, 100000, false, false);
}
