import { EntityType } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { VectorZero } from "../constants";
import { STORY_BOSSES_SET } from "../sets/storyBossesSet";
import { AnyEntity } from "../types/AnyEntity";
import { getIsaacAPIClassName } from "./isaacAPIClass";
import { getRandom } from "./random";
import { isRNG, newRNG } from "./rng";
import { isPrimitive } from "./types";

/**
 * Helper function to count the number of entities in room. Use this over the vanilla
 * `Isaac.CountEntities` method to avoid having to specify a spawner and to handle ignoring charmed
 * enemies.
 *
 * @param entityType Default is -1. -1 matches every entity type.
 * @param variant Default is -1. -1 matches every variant.
 * @param subType Default is -1. -1 matches every sub-type.
 * @param ignoreFriendly Default is false.
 */
export function countEntities(
  entityType: EntityType = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): int {
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
 * Helper function to check if one or more of a specific kind of entity is present in the current
 * room. It uses the `countEntities` helper function to determine this.
 *
 * @param entityType Default is -1. -1 matches every entity type.
 * @param variant Default is -1. -1 matches every variant.
 * @param subType Default is -1. -1 matches every sub-type.
 * @param ignoreFriendly Default is false.
 */
export function doesEntityExist(
  entityType: EntityType = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): boolean {
  const count = countEntities(entityType, variant, subType, ignoreFriendly);
  return count > 0;
}

/**
 * Given an array of entities, this helper function returns the closest one to a provided reference
 * entity.
 *
 * For example:
 *
 * ```ts
 * const player = Isaac.GetPlayer();
 * const gapers = getEntities(EntityType.GAPER);
 * const closestGaper = getClosestEntityTo(player, gapers);
 * ```
 */
export function getClosestEntityTo<T extends AnyEntity>(
  referenceEntity: Entity,
  entities: T[],
): T | undefined {
  let closestEntity: T | undefined;
  let closestDistance = math.huge;
  for (const entity of entities) {
    const distance = referenceEntity.Position.Distance(entity.Position);

    if (distance < closestDistance) {
      closestEntity = entity;
      closestDistance = distance;
    }
  }

  return closestEntity;
}

/**
 * Helper function to get all of the entities in the room or all of the entities that match a
 * specific entity type / variant / sub-type.
 *
 * Due to bugs with `Isaac.FindInRadius`, this function uses `Isaac.GetRoomEntities`, which is more
 * expensive but also more robust. (If a matching entity type is provided, then `Isaac.FindByType`
 * will be used instead.)
 *
 * For example:
 *
 * ```ts
 * // Make all of the entities in the room invisible
 * for (const entity of getEntities()) {
 *   entity.Visible = false;
 * }
 * ```
 *
 * @param entityType Optional. If specified, will only return NPCs that match this entity type.
 * @param variant Optional. If specified, will only return NPCs that match this variant. Default is
 *                -1. -1 matches every variant.
 * @param subType Optional. If specified, will only return NPCs that match this sub-type. Default is
 *                -1. -1 matches every sub-type.
 * @param ignoreFriendly Optional. If set to true, it will exclude friendly NPCs from being
 *                       returned. Default is false. Will only be taken into account if
 *                       `matchingEntityType` is specified.
 */
export function getEntities(
  entityType?: EntityType,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): Entity[] {
  if (entityType === undefined) {
    return Isaac.GetRoomEntities();
  }

  return Isaac.FindByType(entityType, variant, subType, ignoreFriendly);
}

/**
 * Helper function to get all the fields on an entity. For example, this is useful for comparing it
 * to another entity later.
 *
 * This function will only get fields that are equal to booleans, numbers, or strings, as comparing
 * other types is non-trivial.
 */
export function getEntityFields(
  entity: Entity,
): LuaTable<string, boolean | number | string> {
  const entityFields = new LuaTable<string, boolean | number | string>();

  const metatable = getmetatable(entity) as
    | LuaTable<AnyNotNil, unknown>
    | undefined;
  if (metatable === undefined) {
    error("Failed to get the metatable for an entity.");
  }

  setPrimitiveEntityFields(entity, metatable, entityFields);

  // If this is a class that inherits from `Entity` (like `EntityPlayer`), the "__propget" table
  // will not contain the attributes for `Entity`. Thus, if this is not an `Entity`, we have
  // additional fields to add.
  const className = getIsaacAPIClassName(entity);
  if (className === "Entity") {
    return entityFields;
  }

  const parentTable = metatable.get("__parent") as
    | LuaTable<AnyNotNil, unknown>
    | undefined;
  if (parentTable === undefined) {
    error('Failed to get the "__parent" table for an entity.');
  }

  setPrimitiveEntityFields(entity, parentTable, entityFields);

  return entityFields;
}

function setPrimitiveEntityFields(
  entity: Entity,
  metatable: LuaTable<AnyNotNil, unknown>,
  entityFields: LuaTable<string, boolean | number | string>,
) {
  const propGetTable = metatable.get("__propget") as
    | LuaTable<AnyNotNil, unknown>
    | undefined;
  if (propGetTable === undefined) {
    error('Failed to get the "__propget" table for an entity.');
  }

  for (const [key] of pairs(propGetTable)) {
    // The values of this table are functions. Thus, we use the key to index the original entity.
    const indexKey = key as keyof typeof entity;
    const value = entity[indexKey];
    if (isPrimitive(value)) {
      entityFields.set(indexKey, value);
    }
  }
}

/** Helper function to return a string containing the entity's type, variant, and sub-type. */
export function getEntityID(entity: Entity): string {
  return `${entity.Type}.${entity.Variant}.${entity.SubType}`;
}

/**
 * Helper function to return a formatted string in the format returned by the `getEntityID`
 * function.
 */
export function getEntityIDFromConstituents(
  entityType: EntityType,
  variant: int,
  subType: int,
): string {
  return `${entityType}.${variant}.${subType}`;
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
 * Helper function to measure an entity's velocity to see if it is moving.
 *
 * @param entity The entity whose velocity to measure.
 * @param threshold Optional. The threshold from 0 to consider to be moving. Default is 0.01.
 */
export function isEntityMoving(entity: Entity, threshold = 0.01): boolean {
  return entity.Velocity.Length() >= threshold;
}

/**
 * Helper function to determine if the specified entity type is an end-game story boss, like Isaac,
 * Blue Baby, Mega Satan, The Beast, and so on. This is useful because certain effects should only
 * apply to non-story bosses, like Vanishing Twin. Also see the `STORY_BOSSES` constant.
 */
export function isStoryBoss(entityType: EntityType): boolean {
  return STORY_BOSSES_SET.has(entityType);
}

/**
 * Helper function to parse a string that contains an entity type, a variant, and a sub-type,
 * separated by periods.
 *
 * For example, passing "45.0.1" would return an array of [45, 0, 1].
 *
 * Returns undefined if the string cannot be parsed.
 */
export function parseEntityID(
  entityID: string,
): [entityType: EntityType, variant: int, subType: int] | undefined {
  const entityIDArray = entityID.split(".");
  if (entityIDArray.length !== 3) {
    return undefined;
  }

  const [entityTypeString, variantString, subTypeString] = entityIDArray;

  const entityType = tonumber(entityTypeString);
  if (entityType === undefined) {
    return undefined;
  }

  const variant = tonumber(variantString);
  if (variant === undefined) {
    return undefined;
  }

  const subType = tonumber(subTypeString);
  if (subType === undefined) {
    return undefined;
  }

  return [entityType, variant, subType];
}

/**
 * Helper function to parse a string that contains an entity type and a variant separated by a
 * period.
 *
 * For example, passing "45.0" would return an array of [45, 0].
 *
 * Returns undefined if the string cannot be parsed.
 */
export function parseEntityTypeVariantString(
  entityTypeVariantString: string,
): [entityType: EntityType, variant: int] | undefined {
  const entityTypeVariantArray = entityTypeVariantString.split(".");
  if (entityTypeVariantArray.length !== 2) {
    return undefined;
  }

  const [entityTypeString, variantString] = entityTypeVariantArray;

  const entityType = tonumber(entityTypeString);
  if (entityType === undefined) {
    return undefined;
  }

  const variant = tonumber(variantString);
  if (variant === undefined) {
    return undefined;
  }

  return [entityType, variant];
}

/**
 * Helper function to remove all of the matching entities in the room.
 *
 * @param entityType The entity type to match.
 * @param entityVariant Optional. The variant to match. Default is -1. -1 matches every variant.
 * @param entitySubType Optional. The sub-type to match. Default is -1. -1 matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of collectibles.
 * @returns An array of the entities that were removed.
 */
export function removeAllMatchingEntities(
  entityType: EntityType,
  entityVariant = -1,
  entitySubType = -1,
  cap: int | undefined = undefined,
): Entity[] {
  const entities = getEntities(entityType, entityVariant, entitySubType);
  return removeEntities(entities, cap);
}

/**
 * Helper function to remove all of the entities in the supplied array.
 *
 * @param entities The array of entities to remove.
 * @param cap Optional. If specified, will only remove the given amount of entities.
 * @returns An array of the entities that were removed.
 */
export function removeEntities<T extends AnyEntity>(
  entities: T[],
  cap?: int,
): T[] {
  if (entities.length === 0) {
    return [];
  }

  const entitiesRemoved: T[] = [];
  for (const entity of entities) {
    entity.Remove();

    entitiesRemoved.push(entity);
    if (cap !== undefined && entitiesRemoved.length >= cap) {
      return entitiesRemoved;
    }
  }

  return entitiesRemoved;
}

/**
 * Helper function to reroll an enemy. Use this instead of the vanilla "Game.RerollEnemy" function
 * if you want the rerolled enemy to be returned.
 *
 * @param entity The entity to reroll.
 * @returns If the game failed to reroll the enemy, returns undefined. Otherwise, returns the
 *          rerolled entity.
 */
export function rerollEnemy(entity: Entity): Entity | undefined {
  const oldEntities = getEntities();
  const wasRerolled = game.RerollEnemy(entity);
  if (!wasRerolled) {
    return undefined;
  }

  const newEntities = getEntities();
  const filteredNewEntities = getFilteredNewEntities(oldEntities, newEntities);
  if (filteredNewEntities.length === 0) {
    error(
      'Failed to find the new entity generated by the "Game.RerollEnemy" method.',
    );
  }

  return filteredNewEntities[0];
}

export function setEntityRandomColor(entity: Entity): void {
  const rng = newRNG(entity.InitSeed);

  const r = getRandom(rng);
  const g = getRandom(rng);
  const b = getRandom(rng);

  const color = Color(r, g, b);
  entity.SetColor(color, 100000, 100000, false, false);
}

/**
 * Helper function to spawn an entity. Use this instead of the `Isaac.Spawn` method if you do not
 * need to specify the velocity or spawner.
 *
 * Also see the `spawnWithSeed` helper function.
 */
export function spawn(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): Entity {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (position === undefined) {
    const entityID = getEntityIDFromConstituents(entityType, variant, subType);
    error(
      `Failed to spawn entity ${entityID} since an undefined position was passed to the "spawn" function.`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (velocity === undefined) {
    const entityID = getEntityIDFromConstituents(entityType, variant, subType);
    error(
      `Failed to spawn entity ${entityID} since an undefined velocity was passed to the "spawn" function.`,
    );
  }

  if (seedOrRNG === undefined) {
    return Isaac.Spawn(
      entityType,
      variant,
      subType,
      position,
      velocity,
      spawner,
    );
  }

  const seed = isRNG(seedOrRNG) ? seedOrRNG.Next() : seedOrRNG;
  return game.Spawn(
    entityType,
    variant,
    position,
    velocity,
    spawner,
    subType,
    seed,
  );
}

/**
 * Helper function to spawn an entity. Use this instead of the `Game.Spawn` method if you do not
 * need to specify the velocity or spawner.
 */
export function spawnWithSeed(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): Entity {
  return spawn(
    entityType,
    variant,
    subType,
    position,
    velocity,
    spawner,
    seedOrRNG,
  );
}
