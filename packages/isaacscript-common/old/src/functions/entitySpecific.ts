import {
  BombVariant,
  EffectVariant,
  EntityType,
  FamiliarVariant,
  KnifeVariant,
  LaserVariant,
  PickupVariant,
  ProjectileVariant,
  SlotVariant,
  TearVariant,
} from "isaac-typescript-definitions";
import { VectorZero } from "../constants";
import { getEntities, removeEntities, spawn } from "./entity";

/**
 * Helper function to get all of the `EntityType.BOMB` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the bombs in the room invisible
 * for (const bomb of getBombs()) {
 *   bomb.Visible = false;
 * }
 * ```
 */
export function getBombs(
  bombVariant: BombVariant = -1,
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
 * Helper function to get all of the `EntityType.EFFECT` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the effects in the room invisible
 * for (const effect of getEffects()) {
 *   effect.Visible = false;
 * }
 * ```
 */
export function getEffects(
  effectVariant: EffectVariant = -1,
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
 * // Make all of the familiars in the room invisible
 * for (const familiar of getFamiliars()) {
 *   familiar.Visible = false;
 * }
 * ```
 */
export function getFamiliars(
  familiarVariant: FamiliarVariant = -1,
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
 * Helper function to get all of the `EntityType.KNIFE` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the knives in the room invisible
 * for (const knife of getKnives()) {
 *   knife.Visible = false;
 * }
 * ```
 */
export function getKnives(
  knifeVariant: KnifeVariant = -1,
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
 * Helper function to get all of the `EntityType.LASER` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the lasers in the room invisible
 * for (const laser of getLasers()) {
 *   laser.Visible = false;
 * }
 * ```
 */
export function getLasers(
  laserVariant: LaserVariant = -1,
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

/** The same thing as the `getEntities` function, but returns only NPCs. */
export function getNPCs(
  entityType?: EntityType,
  variant?: int,
  subType?: int,
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
 * // Make all of the pickups in the room invisible
 * for (const pickup of getPickups()) {
 *   pickup.Visible = false;
 * }
 * ```
 */
export function getPickups(
  pickupVariant: PickupVariant = -1,
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
 * Helper function to get all of the `EntityType.PROJECTILE` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the projectiles in the room invisible
 * for (const projectile of getProjectiles()) {
 *   projectile.Visible = false;
 * }
 * ```
 */
export function getProjectiles(
  projectileVariant: ProjectileVariant = -1,
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
 * Helper function to get all of the `EntityType.SLOT` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the slots in the room invisible
 * for (const slot of getSlots()) {
 *   slot.Visible = false;
 * }
 * ```
 */
export function getSlots(
  slotVariant: SlotVariant = -1,
  subType = -1,
): EntitySlot[] {
  const slots = getEntities(EntityType.SLOT, slotVariant, subType);

  return slots as EntitySlot[];
}

/**
 * Helper function to get all of the `EntityType.TEAR` in the room.
 *
 * For example:
 *
 * ```ts
 * // Make all of the tears in the room invisible
 * for (const tear of getTears()) {
 *   tear.Visible = false;
 * }
 * ```
 */
export function getTears(
  tearVariant: TearVariant = -1,
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
 * Helper function to remove all of the `EntityType.BOMB` in the room.
 *
 * @param bombVariant Optional. If specified, will only remove bombs that match this variant.
 * @param subType Optional. If specified, will only remove bombs that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of bombs.
 * @returns True if one or more bombs were removed, false otherwise.
 */
export function removeAllBombs(
  bombVariant?: BombVariant,
  subType?: int,
  cap?: int,
): boolean {
  const bombs = getBombs(bombVariant, subType);
  return removeEntities(bombs, cap);
}

/**
 * Helper function to remove all of the effects in the room.
 *
 * @param effectVariant Optional. If specified, will only remove effects that match this variant.
 * @param subType Optional. If specified, will only remove effects that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of effects.
 * @returns True if one or more effects were removed, false otherwise.
 */
export function removeAllEffects(
  effectVariant?: EffectVariant,
  subType?: int,
  cap?: int,
): boolean {
  const effects = getEffects(effectVariant, subType);
  return removeEntities(effects, cap);
}

/**
 * Helper function to remove all of the familiars in the room.
 *
 * @param familiarVariant Optional. If specified, will only remove familiars that match this
 *                        variant.
 * @param subType Optional. If specified, will only remove familiars that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of familiars.
 * @returns True if one or more familiars were removed, false otherwise.
 */
export function removeAllFamiliars(
  familiarVariant?: FamiliarVariant,
  subType?: int,
  cap?: int,
): boolean {
  const familiars = getFamiliars(familiarVariant, subType);
  return removeEntities(familiars, cap);
}

/**
 * Helper function to remove all of the `EntityType.KNIFE` in the room.
 *
 * @param knifeVariant Optional. If specified, will only remove knives that match this variant.
 * @param subType Optional. If specified, will only remove knives that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of knives.
 * @returns True if one or more knives were removed, false otherwise.
 */
export function removeAllKnives(
  knifeVariant?: KnifeVariant,
  subType?: int,
  cap?: int,
): boolean {
  const knives = getKnives(knifeVariant, subType);
  return removeEntities(knives, cap);
}

/**
 * Helper function to remove all of the `EntityType.LASER` in the room.
 *
 * @param laserVariant Optional. If specified, will only remove lasers that match this variant.
 * @param subType Optional. If specified, will only remove lasers that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of lasers.
 * @returns True if one or more lasers were removed, false otherwise.
 */
export function removeAllLasers(
  laserVariant?: LaserVariant,
  subType?: int,
  cap?: int,
): boolean {
  const lasers = getLasers(laserVariant, subType);
  return removeEntities(lasers, cap);
}

/**
 * Helper function to remove all NPCs in the room.
 *
 * @param cap Optional. If specified, will only remove the given amount of NPCs.
 * @returns True if one or more NPCs were removed, false otherwise.
 */
export function removeAllNPCs(cap?: int): boolean {
  const npcs = getNPCs();
  return removeEntities(npcs, cap);
}

/**
 * Helper function to remove all of the pickups in the room.
 *
 * @param pickupVariant Optional. If specified, will only remove pickups that match this variant.
 * @param subType Optional. If specified, will only remove pickups that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of pickups.
 * @returns True if one or more pickups were removed, false otherwise.
 */
export function removeAllPickups(
  pickupVariant?: PickupVariant,
  subType?: int,
  cap?: int,
): boolean {
  const pickups = getPickups(pickupVariant, subType);
  return removeEntities(pickups, cap);
}

/**
 * Helper function to remove all of the `EntityType.PROJECTILE` in the room.
 *
 * @param projectileVariant Optional. If specified, will only remove projectiles that match this
 *                          variant.
 * @param subType Optional. If specified, will only remove projectiles that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of projectiles.
 * @returns True if one or more projectiles were removed, false otherwise.
 */
export function removeAllProjectiles(
  projectileVariant?: ProjectileVariant,
  subType?: int,
  cap?: int,
): boolean {
  const projectiles = getProjectiles(projectileVariant, subType);
  return removeEntities(projectiles, cap);
}

/**
 * Helper function to remove all of the `EntityType.SLOT` in the room.
 *
 * @param slotVariant Optional. If specified, will only remove slots that match this variant.
 * @param subType Optional. If specified, will only remove slots that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of slots.
 * @returns True if one or more slots were removed, false otherwise.
 */
export function removeAllSlots(
  slotVariant?: SlotVariant,
  subType?: int,
  cap?: int,
): boolean {
  const slots = getSlots(slotVariant, subType);
  return removeEntities(slots, cap);
}

/**
 * Helper function to remove all of the `EntityType.TEAR` in the room.
 *
 * @param tearVariant Optional. If specified, will only remove tears that match this variant.
 * @param subType Optional. If specified, will only remove tears that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of tears.
 * @returns True if one or more tears were removed, false otherwise.
 */
export function removeAllTears(
  tearVariant?: TearVariant,
  subType?: int,
  cap?: int,
): boolean {
  const tears = getTears(tearVariant, subType);
  return removeEntities(tears, cap);
}

/** Helper function to spawn a `EntityType.BOMB` (4). */
export function spawnBomb(
  bombVariant: BombVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityBomb {
  const entity = spawn(
    EntityType.BOMB,
    bombVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const bomb = entity.ToBomb();
  if (bomb === undefined) {
    error("Failed to spawn a bomb.");
  }
  return bomb;
}

/** Helper function to spawn a `EntityType.BOMB` (4) with a specific seed. */
export function spawnBombWithSeed(
  bombVariant: BombVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityBomb {
  return spawnBomb(bombVariant, subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.EFFECT` (1000). */
export function spawnEffect(
  effectVariant: EffectVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityEffect {
  const entity = spawn(
    EntityType.EFFECT,
    effectVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const effect = entity.ToEffect();
  if (effect === undefined) {
    error("Failed to spawn an effect.");
  }
  return effect;
}

/** Helper function to spawn a `EntityType.EFFECT` (1000) with a specific seed. */
export function spawnEffectWithSeed(
  effectVariant: EffectVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityEffect {
  return spawnEffect(effectVariant, subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.FAMILIAR` (3). */
export function spawnFamiliar(
  familiarVariant: FamiliarVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityFamiliar {
  const entity = spawn(
    EntityType.FAMILIAR,
    familiarVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const familiar = entity.ToFamiliar();
  if (familiar === undefined) {
    error("Failed to spawn a familiar.");
  }
  return familiar;
}

/** Helper function to spawn a `EntityType.FAMILIAR` (3) with a specific seed. */
export function spawnFamiliarWithSeed(
  familiarVariant: FamiliarVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityFamiliar {
  return spawnFamiliar(
    familiarVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

/** Helper function to spawn a `EntityType.KNIFE` (8). */
export function spawnKnife(
  knifeVariant: KnifeVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityKnife {
  const entity = spawn(
    EntityType.KNIFE,
    knifeVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const knife = entity.ToKnife();
  if (knife === undefined) {
    error("Failed to spawn a knife.");
  }
  return knife;
}

/** Helper function to spawn a `EntityType.KNIFE` (8) with a specific seed. */
export function spawnKnifeWithSeed(
  knifeVariant: KnifeVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityKnife {
  return spawnKnife(knifeVariant, subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.LASER` (7). */
export function spawnLaser(
  laserVariant: LaserVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityLaser {
  const entity = spawn(
    EntityType.LASER,
    laserVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const laser = entity.ToLaser();
  if (laser === undefined) {
    error("Failed to spawn a laser.");
  }
  return laser;
}

/** Helper function to spawn a `EntityType.LASER` (7) with a specific seed. */
export function spawnLaserWithSeed(
  laserVariant: LaserVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityLaser {
  return spawnLaser(laserVariant, subType, position, velocity, spawner, seed);
}

/** Helper function to spawn an NPC. */
export function spawnNPC(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityNPC {
  const entity = spawn(
    entityType,
    variant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const npc = entity.ToNPC();
  if (npc === undefined) {
    error("Failed to spawn an NPC.");
  }
  return npc;
}

/** Helper function to spawn an NPC with a specific seed. */
export function spawnNPCWithSeed(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityNPC {
  return spawnNPC(
    entityType,
    variant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

/** Helper function to spawn a `EntityType.PICKUP` (5). */
export function spawnPickup(
  pickupVariant: PickupVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityPickup {
  const entity = spawn(
    EntityType.PICKUP,
    pickupVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const pickup = entity.ToPickup();
  if (pickup === undefined) {
    error("Failed to spawn a pickup.");
  }
  return pickup;
}

/** Helper function to spawn a `EntityType.PICKUP` (5) with a specific seed. */
export function spawnPickupWithSeed(
  pickupVariant: PickupVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityPickup {
  return spawnPickup(pickupVariant, subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.PROJECTILE` (9). */
export function spawnProjectile(
  projectileVariant: ProjectileVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityProjectile {
  const entity = spawn(
    EntityType.PROJECTILE,
    projectileVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const projectile = entity.ToProjectile();
  if (projectile === undefined) {
    error("Failed to spawn a projectile.");
  }
  return projectile;
}

/** Helper function to spawn a `EntityType.PROJECTILE` (9) with a specific seed. */
export function spawnProjectileWithSeed(
  projectileVariant: ProjectileVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityProjectile {
  return spawnProjectile(
    projectileVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

/** Helper function to spawn a `EntityType.SLOT` (6). */
export function spawnSlot(
  slotVariant: SlotVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): Entity {
  return spawn(
    EntityType.SLOT,
    slotVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );
}

/** Helper function to spawn a `EntityType.SLOT` (6) with a specific seed. */
export function spawnSlotWithSeed(
  slotVariant: SlotVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): Entity {
  return spawnSlot(slotVariant, subType, position, velocity, spawner, seed);
}

/** Helper function to spawn a `EntityType.TEAR` (2). */
export function spawnTear(
  tearVariant: TearVariant,
  subType: int,
  position: Vector,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
  seed: Seed | undefined = undefined,
): EntityTear {
  const entity = spawn(
    EntityType.TEAR,
    tearVariant,
    subType,
    position,
    velocity,
    spawner,
    seed,
  );

  const tear = entity.ToTear();
  if (tear === undefined) {
    error("Failed to spawn a tear.");
  }
  return tear;
}

/** Helper function to spawn a `EntityType.EntityType` (2) with a specific seed. */
export function spawnTearWithSeed(
  tearVariant: TearVariant,
  subType: int,
  position: Vector,
  seed: Seed,
  velocity = VectorZero,
  spawner: Entity | undefined = undefined,
): EntityTear {
  return spawnTear(tearVariant, subType, position, velocity, spawner, seed);
}
