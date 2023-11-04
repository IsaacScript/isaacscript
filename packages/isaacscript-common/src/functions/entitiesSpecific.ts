import type {
  BombVariant,
  EffectVariant,
  FamiliarVariant,
  KnifeVariant,
  LaserVariant,
  PickupVariant,
  ProjectileVariant,
  SlotVariant,
  TearVariant,
} from "isaac-typescript-definitions";
import { EntityType } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { getEntities, removeEntities, spawn } from "./entities";
import { assertDefined } from "./utils";

/**
 * Helper function to get all of the bombs in the room. (Specifically, this refers to the
 * `EntityBomb` class, not bomb pickups.)
 *
 * For example:
 *
 * ```ts
 * // Make all of the bombs in the room invisible.
 * for (const bomb of getBombs()) {
 *   bomb.Visible = false;
 * }
 * ```
 *
 * @param bombVariant Optional. If specified, will only get the bombs that match the variant.
 *                    Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the bombs that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getBombs(
  bombVariant: BombVariant | -1 = -1,
  subType = -1,
): EntityBomb[] {
  const entities = getEntities(EntityType.BOMB, bombVariant, subType);

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
 * For example:
 *
 * ```ts
 * // Make all of the effects in the room invisible.
 * for (const effect of getEffects()) {
 *   effect.Visible = false;
 * }
 * ```
 *
 * @param effectVariant Optional. If specified, will only get the effects that match the variant.
 *                      Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the effects that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getEffects(
  effectVariant: EffectVariant | -1 = -1,
  subType = -1,
): EntityEffect[] {
  const entities = getEntities(EntityType.EFFECT, effectVariant, subType);

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
 * Helper function to get all of the familiars in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the familiars in the room invisible.
 * for (const familiar of getFamiliars()) {
 *   familiar.Visible = false;
 * }
 * ```
 *
 * @param familiarVariant Optional. If specified, will only get the familiars that match the
 *                        variant. Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the familiars that match the sub-type.
 *                Default is -1, which matches every sub-type.
 */
export function getFamiliars(
  familiarVariant: FamiliarVariant | -1 = -1,
  subType = -1,
): EntityFamiliar[] {
  const entities = getEntities(EntityType.FAMILIAR, familiarVariant, subType);

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
 * For example:
 *
 * ```ts
 * // Make all of the knives in the room invisible.
 * for (const knife of getKnives()) {
 *   knife.Visible = false;
 * }
 * ```
 *
 * @param knifeVariant Optional. If specified, will only get the knives that match the variant.
 *                     Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the knives that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getKnives(
  knifeVariant: KnifeVariant | -1 = -1,
  subType = -1,
): EntityKnife[] {
  const entities = getEntities(EntityType.KNIFE, knifeVariant, subType);

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
 * For example:
 *
 * ```ts
 * // Make all of the lasers in the room invisible.
 * for (const laser of getLasers()) {
 *   laser.Visible = false;
 * }
 * ```
 *
 * @param laserVariant Optional. If specified, will only get the lasers that match the variant.
 *                     Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only get the lasers that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getLasers(
  laserVariant: LaserVariant | -1 = -1,
  subType = -1,
): EntityLaser[] {
  const entities = getEntities(EntityType.LASER, laserVariant, subType);

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
 * Helper function to get all of the NPCs in the room.
 *
 * @param entityType Optional. If specified, will only get the NPCs that match the type. Default is
 *                   -1, which matches every entity type.
 * @param variant Optional. If specified, will only get the NPCs that match the variant. Default is
 *                -1, which matches every entity type.
 * @param subType Optional. If specified, will only get the bombs that match the sub-type. Default
 *                is -1, which matches every sub-type.
 * @param ignoreFriendly Optional. If set to true, it will exclude friendly NPCs from being
 *                       returned. Default is false. Will only be taken into account if the
 *                       `entityType` is specified.
 */
export function getNPCs(
  entityType: EntityType | -1 = -1,
  variant = -1,
  subType = -1,
  ignoreFriendly = false,
): EntityNPC[] {
  const entities = getEntities(entityType, variant, subType, ignoreFriendly);

  const npcs: EntityNPC[] = [];
  for (const entity of entities) {
    const npc = entity.ToNPC();
    if (npc !== undefined) {
      npcs.push(npc);
    }
  }

  return npcs;
}

/**
 * Helper function to get all of the pickups in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the pickups in the room invisible.
 * for (const pickup of getPickups()) {
 *   pickup.Visible = false;
 * }
 * ```
 *
 * @param pickupVariant Optional. If specified, will only get the pickups that match the variant.
 *                      Default is -1, which matches every entity type.
 * @param subType Optional. If specified, will only get the pickups that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getPickups(
  pickupVariant: PickupVariant | -1 = -1,
  subType = -1,
): EntityPickup[] {
  const entities = getEntities(EntityType.PICKUP, pickupVariant, subType);

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
 * For example:
 *
 * ```ts
 * // Make all of the projectiles in the room invisible.
 * for (const projectile of getProjectiles()) {
 *   projectile.Visible = false;
 * }
 * ```
 *
 * @param projectileVariant Optional. If specified, will only get the projectiles that match the
 *                          variant. Default is -1, which matches every entity type.
 * @param subType Optional. If specified, will only get the projectiles that match the sub-type.
 *                Default is -1, which matches every sub-type.
 */
export function getProjectiles(
  projectileVariant: ProjectileVariant | -1 = -1,
  subType = -1,
): EntityProjectile[] {
  const entities = getEntities(
    EntityType.PROJECTILE,
    projectileVariant,
    subType,
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
 * For example:
 *
 * ```ts
 * // Make all of the slots in the room invisible.
 * for (const slot of getSlots()) {
 *   slot.Visible = false;
 * }
 * ```
 *
 * @param slotVariant Optional. If specified, will only get the slots that match the variant.
 *                    Default is -1, which matches every entity type.
 * @param subType Optional. If specified, will only get the slots that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getSlots(
  slotVariant: SlotVariant | -1 = -1,
  subType = -1,
): EntitySlot[] {
  const slots = getEntities(EntityType.SLOT, slotVariant, subType);

  return slots as EntitySlot[];
}

/**
 * Helper function to get all of the tears in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the tears in the room invisible.
 * for (const tear of getTears()) {
 *   tear.Visible = false;
 * }
 * ```
 *
 * @param tearVariant Optional. If specified, will only get the tears that match the variant.
 *                    Default is -1, which matches every entity type.
 * @param subType Optional. If specified, will only get the tears that match the sub-type. Default
 *                is -1, which matches every sub-type.
 */
export function getTears(
  tearVariant: TearVariant | -1 = -1,
  subType = -1,
): EntityTear[] {
  const entities = getEntities(EntityType.TEAR, tearVariant, subType);

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
 * Helper function to remove all of the bombs in the room. (Specifically, this refers to the
 * `EntityBomb` class, not bomb pickups.)
 *
 * @param bombVariant Optional. If specified, will only remove the bombs that match the variant.
 *                    Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove the bombs that match the sub-type.
 *                Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of bombs.
 * @returns An array of the bombs that were removed.
 */
export function removeAllBombs(
  bombVariant: BombVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityBomb[] {
  const bombs = getBombs(bombVariant, subType);
  return removeEntities(bombs, cap);
}

/**
 * Helper function to remove all of the effects in the room.
 *
 * @param effectVariant Optional. If specified, will only remove the effects that match the variant.
 *                      Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove the effects that match the sub-type.
 *                Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of effects.
 * @returns An array of the effects that were removed.
 */
export function removeAllEffects(
  effectVariant: EffectVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityEffect[] {
  const effects = getEffects(effectVariant, subType);
  return removeEntities(effects, cap);
}

/**
 * Helper function to remove all of the familiars in the room.
 *
 * @param familiarVariant Optional. If specified, will only remove the familiars that match the
 *                        variant. Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove the familiars that match the sub-type.
 *                Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of familiars.
 * @returns An array of the familiars that were removed.
 */
export function removeAllFamiliars(
  familiarVariant: FamiliarVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityFamiliar[] {
  const familiars = getFamiliars(familiarVariant, subType);
  return removeEntities(familiars, cap);
}

/**
 * Helper function to remove all of the knives in the room.
 *
 * @param knifeVariant Optional. If specified, will only remove the knives that match the variant.
 *                     Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove the knives that match the sub-type.
 *                Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of knives.
 * @returns An array of the knives that were removed.
 */
export function removeAllKnives(
  knifeVariant: KnifeVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityKnife[] {
  const knives = getKnives(knifeVariant, subType);
  return removeEntities(knives, cap);
}

/**
 * Helper function to remove all of the lasers in the room.
 *
 * @param laserVariant Optional. If specified, will only remove the lasers that match the variant.
 *                     Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove the lasers that match the sub-type.
 *                Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of lasers.
 * @returns An array of the lasers that were removed.
 */
export function removeAllLasers(
  laserVariant: LaserVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityLaser[] {
  const lasers = getLasers(laserVariant, subType);
  return removeEntities(lasers, cap);
}

/**
 * Helper function to remove all of the NPCs in the room.
 *
 * @param entityType Optional. If specified, will only remove the NPCs that match the type. Default
 *                   is -1, which matches every type.
 * @param variant Optional. If specified, will only remove the NPCs that match the variant. Default
 *                is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove the NPCs that match the sub-type. Default
 *                is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of NPCs.
 * @returns An array of the NPCs that were removed.
 */
export function removeAllNPCs(
  entityType: EntityType | -1 = -1,
  variant = -1,
  subType = -1,
  cap?: int,
): EntityNPC[] {
  const npcs = getNPCs(entityType, variant, subType);
  return removeEntities(npcs, cap);
}

/**
 * Helper function to remove all of the pickups in the room.
 *
 * @param pickupVariant Optional. If specified, will only remove pickups that match this variant.
 *                      Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove pickups that match this sub-type. Default
 *                is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of pickups.
 * @returns An array of the pickups that were removed.
 */
export function removeAllPickups(
  pickupVariant: PickupVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityPickup[] {
  const pickups = getPickups(pickupVariant, subType);
  return removeEntities(pickups, cap);
}

/**
 * Helper function to remove all of the projectiles in the room.
 *
 * @param projectileVariant Optional. If specified, will only remove projectiles that match this
 *                          variant. Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove projectiles that match this sub-type.
 *                Default is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of projectiles.
 * @returns An array of the projectiles that were removed.
 */
export function removeAllProjectiles(
  projectileVariant: ProjectileVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityProjectile[] {
  const projectiles = getProjectiles(projectileVariant, subType);
  return removeEntities(projectiles, cap);
}

/**
 * Helper function to remove all of the slots in the room.
 *
 * @param slotVariant Optional. If specified, will only remove slots that match this variant.
 *                    Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove slots that match this sub-type. Default
 *                is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of slots.
 * @returns An array of the slots that were removed.
 */
export function removeAllSlots(
  slotVariant: SlotVariant | -1 = -1,
  subType = -1,
  cap?: int,
): Entity[] {
  const slots = getSlots(slotVariant, subType);
  return removeEntities(slots, cap);
}

/**
 * Helper function to remove all of the tears in the room.
 *
 * @param tearVariant Optional. If specified, will only remove tears that match this variant.
 *                    Default is -1, which matches every variant.
 * @param subType Optional. If specified, will only remove tears that match this sub-type. Default
 *                is -1, which matches every sub-type.
 * @param cap Optional. If specified, will only remove the given amount of tears.
 * @returns An array of the tears that were removed.
 */
export function removeAllTears(
  tearVariant: TearVariant | -1 = -1,
  subType = -1,
  cap?: int,
): EntityTear[] {
  const tears = getTears(tearVariant, subType);
  return removeEntities(tears, cap);
}

/** Helper function to spawn a `EntityType.BOMB` (4). */
export function spawnBomb(
  bombVariant: BombVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityBomb {
  const entity = spawn(
    EntityType.BOMB,
    bombVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const bomb = entity.ToBomb();
  assertDefined(bomb, "Failed to spawn a bomb.");

  return bomb;
}

/** Helper function to spawn a `EntityType.BOMB` (4) with a specific seed. */
export function spawnBombWithSeed(
  bombVariant: BombVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityBomb {
  return spawnBomb(
    bombVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.EFFECT` (1000). */
export function spawnEffect(
  effectVariant: EffectVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityEffect {
  const entity = spawn(
    EntityType.EFFECT,
    effectVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const effect = entity.ToEffect();
  assertDefined(effect, "Failed to spawn an effect.");

  return effect;
}

/** Helper function to spawn a `EntityType.EFFECT` (1000) with a specific seed. */
export function spawnEffectWithSeed(
  effectVariant: EffectVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityEffect {
  return spawnEffect(
    effectVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/**
 * Helper function to spawn a `EntityType.FAMILIAR` (3).
 *
 * If you are trying to implement a custom familiar, you probably want to use the
 * `checkFamiliarFromCollectibles` helper function instead.
 */
export function spawnFamiliar(
  familiarVariant: FamiliarVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityFamiliar {
  const entity = spawn(
    EntityType.FAMILIAR,
    familiarVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const familiar = entity.ToFamiliar();
  assertDefined(familiar, "Failed to spawn a familiar.");

  return familiar;
}

/** Helper function to spawn a `EntityType.FAMILIAR` (3) with a specific seed. */
export function spawnFamiliarWithSeed(
  familiarVariant: FamiliarVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityFamiliar {
  return spawnFamiliar(
    familiarVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.KNIFE` (8). */
export function spawnKnife(
  knifeVariant: KnifeVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityKnife {
  const entity = spawn(
    EntityType.KNIFE,
    knifeVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const knife = entity.ToKnife();
  assertDefined(knife, "Failed to spawn a knife.");

  return knife;
}

/** Helper function to spawn a `EntityType.KNIFE` (8) with a specific seed. */
export function spawnKnifeWithSeed(
  knifeVariant: KnifeVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityKnife {
  return spawnKnife(
    knifeVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.LASER` (7). */
export function spawnLaser(
  laserVariant: LaserVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityLaser {
  const entity = spawn(
    EntityType.LASER,
    laserVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const laser = entity.ToLaser();
  assertDefined(laser, "Failed to spawn a laser.");

  return laser;
}

/** Helper function to spawn a `EntityType.LASER` (7) with a specific seed. */
export function spawnLaserWithSeed(
  laserVariant: LaserVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityLaser {
  return spawnLaser(
    laserVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/**
 * Helper function to spawn an NPC.
 *
 * Note that if you pass a non-NPC `EntityType` to this function, it will cause a run-time error,
 * since the `Entity.ToNPC` method will return undefined.
 */
export function spawnNPC(
  entityType: EntityType,
  variant: int,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityNPC {
  const entity = spawn(
    entityType,
    variant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const npc = entity.ToNPC();
  assertDefined(npc, "Failed to spawn an NPC.");

  return npc;
}

/**
 * Helper function to spawn an NPC with a specific seed.
 *
 * Note that if you pass a non-NPC `EntityType` to this function, it will cause a run-time error,
 * since the `Entity.ToNPC` method will return undefined.
 */
export function spawnNPCWithSeed(
  entityType: EntityType,
  variant: int,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityNPC {
  return spawnNPC(
    entityType,
    variant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5). */
export function spawnPickup(
  pickupVariant: PickupVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityPickup {
  const entity = spawn(
    EntityType.PICKUP,
    pickupVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const pickup = entity.ToPickup();
  assertDefined(pickup, "Failed to spawn a pickup.");

  return pickup;
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with a specific seed. */
export function spawnPickupWithSeed(
  pickupVariant: PickupVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnPickup(
    pickupVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.PROJECTILE` (9). */
export function spawnProjectile(
  projectileVariant: ProjectileVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityProjectile {
  const entity = spawn(
    EntityType.PROJECTILE,
    projectileVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const projectile = entity.ToProjectile();
  assertDefined(projectile, "Failed to spawn a projectile.");

  return projectile;
}

/** Helper function to spawn a `EntityType.PROJECTILE` (9) with a specific seed. */
export function spawnProjectileWithSeed(
  projectileVariant: ProjectileVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityProjectile {
  return spawnProjectile(
    projectileVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.SLOT` (6). */
export function spawnSlot(
  slotVariant: SlotVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntitySlot {
  return spawn(
    EntityType.SLOT,
    slotVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  ) as EntitySlot;
}

/** Helper function to spawn a `EntityType.SLOT` (6) with a specific seed. */
export function spawnSlotWithSeed(
  slotVariant: SlotVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntitySlot {
  return spawnSlot(
    slotVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}

/** Helper function to spawn a `EntityType.TEAR` (2). */
export function spawnTear(
  tearVariant: TearVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
  seedOrRNG: Seed | RNG | undefined = undefined,
): EntityTear {
  const entity = spawn(
    EntityType.TEAR,
    tearVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );

  const tear = entity.ToTear();
  assertDefined(tear, "Failed to spawn a tear.");

  return tear;
}

/** Helper function to spawn a `EntityType.EntityType` (2) with a specific seed. */
export function spawnTearWithSeed(
  tearVariant: TearVariant,
  subType: int,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG,
  velocity: Vector = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityTear {
  return spawnTear(
    tearVariant,
    subType,
    positionOrGridIndex,
    velocity,
    spawner,
    seedOrRNG,
  );
}
