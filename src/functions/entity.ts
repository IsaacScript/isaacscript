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

/** Helper function to get all of the non-dead bosses in the room. */
export function getAliveBosses(): EntityNPC[] {
  const aliveBosses: EntityNPC[] = [];
  for (const boss of getBosses()) {
    if (!boss.IsDead()) {
      aliveBosses.push(boss);
    }
  }

  return aliveBosses;
}

/** Helper function to get all of the non-dead NPCs in the room. */
export function getAliveNPCs(): EntityNPC[] {
  const aliveNPCs: EntityNPC[] = [];
  for (const npc of getNPCs()) {
    if (!npc.IsDead()) {
      aliveNPCs.push(npc);
    }
  }

  return aliveNPCs;
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
export function getBombs(): EntityBomb[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_BOMB);
  const bombs: EntityBomb[] = [];
  for (const entity of entities) {
    const bomb = entity.ToBomb();
    if (bomb !== undefined) {
      bombs.push(bomb);
    }
  }

  return bombs;
}

/** Helper function to get all of the bosses in the room. */
export function getBosses(): EntityNPC[] {
  const bosses: EntityNPC[] = [];
  for (const npc of getNPCs()) {
    if (npc.IsBoss()) {
      bosses.push(npc);
    }
  }

  return bosses;
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
export function getEffects(): EntityEffect[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_EFFECT);
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
 * Example:
 * ```
 * // Make all of the familiars in the room invisible
 * for (const familiar of getFamiliars()) {
 *   familiar.Visible = false;
 * }
 * ```
 */
export function getFamiliars(): EntityFamiliar[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_FAMILIAR);
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
export function getKnives(): EntityKnife[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_KNIFE);
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
export function getLasers(): EntityLaser[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_LASER);
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
 * Due to bugs with `Isaac.FindInRadius()`, this function uses `Isaac.GetRoomEntities()`,
 * which is more expensive but also more robust.
 *
 * Example:
 * ```
 * // Make all of the enemies in the room invisible
 * for (const npc of getNPCs()) {
 *   npc.Visible = false;
 * }
 * ```
 */
export function getNPCs(): EntityNPC[] {
  const npcs: EntityNPC[] = [];
  for (const entity of Isaac.GetRoomEntities()) {
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
 * Example:
 * ```
 * // Make all of the pickups in the room invisible
 * for (const pickup of getPickups()) {
 *   pickup.Visible = false;
 * }
 * ```
 */
export function getPickups(): EntityPickup[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_PICKUP);
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
export function getProjectiles(): EntityProjectile[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_PROJECTILE);
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
export function getTears(): EntityTear[] {
  const entities = Isaac.FindByType(EntityType.ENTITY_TEAR);
  const tears: EntityTear[] = [];
  for (const entity of entities) {
    const tear = entity.ToTear();
    if (tear !== undefined) {
      tears.push(tear);
    }
  }

  return tears;
}

/** Removes all of the entities in the supplied array. */
export function removeEntities(entities: Entity[]): void {
  for (const entity of entities) {
    entity.Remove();
  }
}

export function removeAllMatchingEntities(
  entityType: int,
  entityVariant = -1,
  entitySubType = -1,
): void {
  const entities = Isaac.FindByType(entityType, entityVariant, entitySubType);
  removeEntities(entities);
}

export function removeAllBombs(): void {
  const bombs = getBombs();
  for (const bomb of bombs) {
    bomb.Remove();
  }
}

export function removeAllEffects(): void {
  const effects = getEffects();
  for (const effect of effects) {
    effect.Remove();
  }
}

export function removeAllFamiliars(): void {
  const familiars = getFamiliars();
  for (const familiar of familiars) {
    familiar.Remove();
  }
}

export function removeAllKnives(): void {
  const knives = getKnives();
  for (const knife of knives) {
    knife.Remove();
  }
}

export function removeAllLasers(): void {
  const lasers = getLasers();
  for (const laser of lasers) {
    laser.Remove();
  }
}

export function removeAllNPCs(): void {
  const npcs = getNPCs();
  for (const npc of npcs) {
    npc.Remove();
  }
}
export function removeAllPickups(): void {
  const pickups = getPickups();
  for (const pickup of pickups) {
    pickup.Remove();
  }
}

export function removeAllProjectiles(): void {
  const projectiles = getProjectiles();
  for (const projectile of projectiles) {
    projectile.Remove();
  }
}

export function removeAllTears(): void {
  const tears = getTears();
  for (const tear of tears) {
    tear.Remove();
  }
}
