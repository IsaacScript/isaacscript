import type { EntityType } from "isaac-typescript-definitions";
import { EntityFlag } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { VectorZero } from "../core/constants";
import { ENTITIES_WITH_ARMOR_SET } from "../sets/entitiesWithArmorSet";
import type { AnyEntity } from "../types/AnyEntity";
import type { EntityID } from "../types/EntityID";
import { getIsaacAPIClassName } from "./isaacAPIClass";
import { getRandom } from "./random";
import { newReadonlyColor } from "./readOnly";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import { setSpriteOpacity } from "./sprites";
import { isTSTLSet } from "./tstlClass";
import { isPrimitive } from "./types";
import { assertDefined } from "./utils";
import { doesVectorHaveLength, isVector, vectorToString } from "./vector";

/** From DeadInfinity. */
const DAMAGE_FLASH_COLOR = newReadonlyColor(
  0.5,
  0.5,
  0.5,
  1,
  200 / 255,
  0 / 255,
  0 / 255,
);

/**
 * Helper function to count the number of entities in room. Use this over the vanilla
 * `Isaac.CountEntities` method to avoid having to specify a spawner and to handle ignoring charmed
 * enemies.
 *
 * @param entityType Optional. Default is -1, which matches every entity type.
 * @param variant Optional. Default is -1, which matches every variant.
 * @param subType Optional. Default is -1, which matches every sub-type.
 * @param ignoreFriendly Optional. Default is false. Will throw a runtime error if set to true and
 *                       the `entityType` is equal to -1.
 */
export function countEntities(
  entityType: EntityType | -1 = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): int {
  if (entityType === -1) {
    // The `Isaac.CountEntities` method requires an argument of `EntityType`, so we must revert to
    // using the `Isaac.GetRoomEntities` method, which is slower.
    const entities = Isaac.GetRoomEntities();
    if (!ignoreFriendly) {
      return entities.length;
    }

    const nonFriendlyEntities = entities.filter(
      (entity) => !entity.HasEntityFlags(EntityFlag.FRIENDLY),
    );
    return nonFriendlyEntities.length;
  }

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
 * Helper function to check if one or more matching entities exist in the current room. It uses the
 * `doesEntityExist` helper function to determine this.
 *
 * @param entityTypes An array or set of the entity types that you want to check for. Will return
 *                    true if any of the provided entity types exist.
 * @param ignoreFriendly Optional. Default is false.
 */
export function doesAnyEntityExist(
  entityTypes:
    | EntityType[]
    | readonly EntityType[]
    | Set<EntityType>
    | ReadonlySet<EntityType>,
  ignoreFriendly = false,
): boolean {
  const entityTypesArray = isTSTLSet(entityTypes)
    ? [...entityTypes.values()]
    : (entityTypes as EntityType[]);

  return entityTypesArray.some((entityType) =>
    doesEntityExist(entityType, -1, -1, ignoreFriendly),
  );
}

/**
 * Helper function to check if one or more of a specific kind of entity is present in the current
 * room. It uses the `countEntities` helper function to determine this.
 *
 * @param entityType Optional. Default is -1, which matches every entity type.
 * @param variant Optional. Default is -1, which matches every variant.
 * @param subType Optional. Default is -1, which matches every sub-type.
 * @param ignoreFriendly Optional. Default is false.
 */
export function doesEntityExist(
  entityType: EntityType | -1 = -1,
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
 *
 * @param referenceEntity The entity that is close by.
 * @param entities The array of entities to look through.
 * @param filterFunc Optional. A function to filter for a specific type of entity, like e.g. an
 *                   enemy with a certain amount of HP left.
 */
export function getClosestEntityTo<T extends AnyEntity>(
  referenceEntity: Entity,
  entities: T[],
  filterFunc?: (entity: T) => boolean,
): T | undefined {
  let closestEntity: T | undefined;
  let closestDistance = math.huge;
  for (const entity of entities) {
    const distance = referenceEntity.Position.Distance(entity.Position);

    if (
      distance < closestDistance &&
      (filterFunc === undefined || filterFunc(entity))
    ) {
      closestEntity = entity;
      closestDistance = distance;
    }
  }

  return closestEntity;
}

/** Helper function to get the entity type, variant, and sub-type from an `EntityID`. */
export function getConstituentsFromEntityID(
  entityID: EntityID,
): [entityType: EntityType, variant: int, subType: int] {
  const parts = entityID.split(".");
  if (parts.length !== 3) {
    error(`Failed to get the constituents from entity ID: ${entityID}`);
  }

  const [entityTypeString, variantString, subTypeString] = parts;

  const entityType = tonumber(entityTypeString);
  assertDefined(
    entityType,
    `Failed to convert the entity type to a number: ${entityTypeString}`,
  );

  const variant = tonumber(variantString);
  assertDefined(
    variant,
    `Failed to convert the entity variant to a number: ${variantString}`,
  );

  const subType = tonumber(subTypeString);
  assertDefined(
    subType,
    `Failed to convert the entity sub-type to a number: ${subTypeString}`,
  );

  return [entityType, variant, subType];
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
 * // Make all of the entities in the room invisible.
 * for (const entity of getEntities()) {
 *   entity.Visible = false;
 * }
 * ```
 *
 * @param entityType Optional. If specified, will only get the entities that match the type. Default
 *                   is -1, which matches every type.
 * @param variant Optional. If specified, will only get the entities that match the variant. Default
 *                is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the entities that match the sub-type.
 *                Default is -1, which matches every sub-type.
 * @param ignoreFriendly Optional. If set to true, it will exclude friendly NPCs from being
 *                       returned. Default is false. Will only be taken into account if the
 *                       `entityType` is specified.
 */
export function getEntities(
  entityType: EntityType | -1 = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): Entity[] {
  if (entityType === -1) {
    return Isaac.GetRoomEntities();
  }

  return Isaac.FindByType(entityType, variant, subType, ignoreFriendly);
}

/**
 * Helper function to get all the fields on an entity. For example, this is useful for comparing it
 * to another entity later. (One option is to use the `logTableDifferences` function for this.)
 *
 * This function will only get fields that are equal to booleans, numbers, or strings, or Vectors,
 * as comparing other types is non-trivial.
 */
export function getEntityFields(
  entity: Entity,
): LuaMap<string, boolean | number | string> {
  const entityFields = new LuaMap<string, boolean | number | string>();

  const metatable = getmetatable(entity) as
    | LuaMap<AnyNotNil, unknown>
    | undefined;
  assertDefined(metatable, "Failed to get the metatable for an entity.");

  setPrimitiveEntityFields(entity, metatable, entityFields);

  // If this is a class that inherits from `Entity` (like `EntityPlayer`), the "__propget" table
  // will not contain the attributes for `Entity`. Thus, if this is not an `Entity`, we have
  // additional fields to add.
  const className = getIsaacAPIClassName(entity);
  if (className === "Entity") {
    return entityFields;
  }

  const parentTable = metatable.get("__parent") as
    | LuaMap<AnyNotNil, unknown>
    | undefined;
  assertDefined(
    parentTable,
    'Failed to get the "__parent" table for an entity.',
  );

  setPrimitiveEntityFields(entity, parentTable, entityFields);

  return entityFields;
}

function setPrimitiveEntityFields(
  entity: Entity,
  metatable: LuaMap<AnyNotNil, unknown>,
  entityFields: LuaMap<string, boolean | number | string>,
) {
  const propGetTable = metatable.get("__propget") as
    | LuaMap<AnyNotNil, unknown>
    | undefined;
  assertDefined(
    propGetTable,
    'Failed to get the "__propget" table for an entity.',
  );

  for (const [key] of propGetTable) {
    // The values of this table are functions. Thus, we use the key to index the original entity.
    const indexKey = key as keyof typeof entity;
    const value = entity[indexKey];
    if (isPrimitive(value)) {
      entityFields.set(indexKey as string, value);
    } else if (isVector(value)) {
      entityFields.set(indexKey as string, vectorToString(value));
    }
  }
}

/**
 * Helper function to get an entity from a `PtrHash`. Note that doing this is very expensive, so you
 * should only use this function when debugging. (Normally, if you need to work backwards from a
 * reference, you would use an `EntityPtr` instead of a `PtrHash`.
 */
export function getEntityFromPtrHash(ptrHash: PtrHash): Entity | undefined {
  const entities = getEntities();
  return entities.find((entity) => GetPtrHash(entity) === ptrHash);
}

/** Helper function to get a string containing the entity's type, variant, and sub-type. */
export function getEntityID(entity: Entity): EntityID {
  return `${entity.Type}.${entity.Variant}.${entity.SubType}` as EntityID;
}

/**
 * Helper function to get a formatted string in the format returned by the `getEntityID` function.
 */
export function getEntityIDFromConstituents(
  entityType: EntityType,
  variant: int,
  subType: int,
): EntityID {
  return `${entityType}.${variant}.${subType}` as EntityID;
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
 * Helper function to see if a particular entity has armor. In this context, armor refers to the
 * damage scaling mechanic. For example, Ultra Greed has armor, but a Gaper does not.
 *
 * For more on armor, see the wiki: https://bindingofisaacrebirth.fandom.com/wiki/Damage_Scaling
 */
export function hasArmor(entity: Entity): boolean {
  const typeVariantString = `${entity.Type}.${entity.Variant}`;
  return ENTITIES_WITH_ARMOR_SET.has(typeVariantString);
}

/**
 * Helper function to measure an entity's velocity to see if it is moving.
 *
 * Use this helper function over checking if the velocity length is equal to 0 because entities can
 * look like they are completely immobile but yet still have a non zero velocity. Thus, using a
 * threshold is needed.
 *
 * @param entity The entity whose velocity to measure.
 * @param threshold Optional. The threshold from 0 to consider to be moving. Default is 0.01.
 */
export function isEntityMoving(entity: Entity, threshold = 0.01): boolean {
  return doesVectorHaveLength(entity.Velocity, threshold);
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
 * @param entityVariant Optional. The variant to match. Default is -1, which matches every variant.
 * @param entitySubType Optional. The sub-type to match. Default is -1, which matches every
 *                      sub-type.
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
      break;
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

/**
 * Helper function to make an entity flash red like it is taking damage. This is useful when you
 * want to make it appear as if an entity is taking damage without actually dealing any damage to
 * it.
 */
export function setEntityDamageFlash(entity: Entity): void {
  entity.SetColor(DAMAGE_FLASH_COLOR, 2, 0);
}

/**
 * Helper function to keep an entity's color the same values as it already is but set the opacity to
 * a specific value.
 *
 * @param entity The entity to set.
 * @param alpha A value between 0 and 1 that represents the fade amount.
 */
export function setEntityOpacity(entity: Entity, alpha: float): void {
  const sprite = entity.GetSprite();
  setSpriteOpacity(sprite, alpha);
}

export function setEntityRandomColor(entity: Entity): void {
  const seed = entity.InitSeed === 0 ? getRandomSeed() : entity.InitSeed;
  const rng = newRNG(seed);

  const r = getRandom(rng);
  const g = getRandom(rng);
  const b = getRandom(rng);

  const color = Color(r, g, b);
  entity.SetColor(color, 100_000, 100_000, false, false);
}

/**
 * Helper function to spawn an entity. Use this instead of the `Isaac.Spawn` method if you do not
 * need to specify the velocity or spawner.
 *
 * Also see the `spawnWithSeed` helper function.
 *
 * @param entityType The `EntityType` of the entity to spawn.
 * @param variant The variant of the entity to spawn.
 * @param subType The sub-type of the entity to spawn.
 * @param positionOrGridIndex The position or grid index of the entity to spawn.
 * @param velocity Optional. The velocity of the entity to spawn. Default is `VectorZero`.
 * @param spawner Optional. The entity that will be the `SpawnerEntity`. Default is undefined.
 * @param seedOrRNG Optional. The seed or RNG object to use to generate the `InitSeed` of the
 *                  entity. Default is undefined, which will make the entity spawn with a random
 *                  seed using the `Isaac.Spawn` method.
 */
export function spawn(
  entityType: EntityType,
  variant: int,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): Entity {
  const room = game.GetRoom();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (positionOrGridIndex === undefined) {
    const entityID = getEntityIDFromConstituents(entityType, variant, subType);
    error(
      `Failed to spawn entity ${entityID} since an undefined position was passed to the "spawn" function.`,
    );
  }

  const position = isVector(positionOrGridIndex)
    ? positionOrGridIndex
    : room.GetGridPosition(positionOrGridIndex);

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
 * Helper function to spawn the entity corresponding to an `EntityID`.
 *
 * @param entityID The `EntityID` of the entity to spawn.
 * @param positionOrGridIndex The position or grid index of the entity to spawn.
 * @param velocity Optional. The velocity of the entity to spawn. Default is `VectorZero`.
 * @param spawner Optional. The entity that will be the `SpawnerEntity`. Default is undefined.
 * @param seedOrRNG Optional. The seed or RNG object to use to generate the `InitSeed` of the
 *                  entity. Default is undefined, which will make the entity spawn with a random
 *                  seed using the `Isaac.Spawn` method.
 */
export function spawnEntityID(
  entityID: EntityID,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): Entity {
  const [entityType, variant, subType] = getConstituentsFromEntityID(entityID);
  return spawn(
    entityType,
    variant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
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
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): Entity {
  return spawn(
    entityType,
    variant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}
