import {
  BombVariant,
  EffectVariant,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  KnifeVariant,
  LaserVariant,
  PickupVariant,
  PlayerVariant,
  ProjectileVariant,
  TearVariant,
} from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";
import { getEntities, getEntityFromPtrHash, getEntityID } from "./entities";
import { getGridEntities, getGridEntityID } from "./gridEntities";
import { log } from "./log";

const IGNORE_EFFECT_VARIANTS = new ReadonlySet<EffectVariant>([
  EffectVariant.BLOOD_EXPLOSION, // 2
  EffectVariant.BLOOD_PARTICLE, // 5
  EffectVariant.TINY_BUG, // 21
  EffectVariant.TINY_FLY, // 33
  EffectVariant.WATER_DROPLET, // 41
  EffectVariant.WORM, // 63
  EffectVariant.WALL_BUG, // 68
  EffectVariant.FALLING_EMBER, // 87
  EffectVariant.LIGHT, // 121
  EffectVariant.TADPOLE, // 158
]);

/** Helper function for printing out every entity (or filtered entity) in the current room. */
export function logAllEntities(
  this: void,
  includeBackgroundEffects: boolean,
  entityTypeFilter?: EntityType,
): void {
  let msg = "Entities in the room";
  if (entityTypeFilter !== undefined) {
    msg += ` (filtered to entity type ${entityTypeFilter})`;
  } else if (!includeBackgroundEffects) {
    msg += " (not including background effects)";
  }
  msg += ":\n";

  const entities = getEntities();
  let numMatchedEntities = 0;

  for (const [i, entity] of entities.entries()) {
    // If a filter was specified, exclude all entities outside of the filter.
    if (entityTypeFilter !== undefined && entity.Type !== entityTypeFilter) {
      continue;
    }

    const effect = entity.ToEffect();
    if (
      !includeBackgroundEffects &&
      effect !== undefined &&
      IGNORE_EFFECT_VARIANTS.has(effect.Variant)
    ) {
      continue;
    }

    msg += getEntityLogLine(entity, i + 1);
    numMatchedEntities++;
  }

  const zeroText = "(no entities matched)";
  const oneOrMoreText = `(${numMatchedEntities} total ${
    numMatchedEntities === 1 ? "entity" : "entities"
  })`;
  const text = numMatchedEntities === 0 ? zeroText : oneOrMoreText;

  msg += `${text}\n`;

  // We must log each line because otherwise the message can get truncated.
  for (const line of msg.trim().split("\n")) {
    log(line);
  }
}

/**
 * Helper function for printing out every grid entity (or filtered grid entity) in the current room.
 *
 * @param includeWalls Optional. Whether oto log the walls. Default is false.
 * @param gridEntityTypeFilter Optional. If specified, will only log the given `GridEntityType`.
 *                             Default is undefined.
 */
export function logAllGridEntities(
  this: void,
  includeWalls = false,
  gridEntityTypeFilter?: GridEntityType,
): void {
  let msg = "Grid entities in the room";
  if (gridEntityTypeFilter !== undefined) {
    msg += ` (filtered to grid entity type ${gridEntityTypeFilter})`;
  } else if (!includeWalls) {
    msg += " (not including walls)";
  }
  msg += ":\n";

  const gridEntities = getGridEntities();
  let numMatchedEntities = 0;
  for (const gridEntity of gridEntities) {
    const gridEntityIndex = gridEntity.GetGridIndex();
    const gridEntityType = gridEntity.GetType();

    // If a filter was specified, exclude all entities outside of the filter.
    if (
      gridEntityTypeFilter !== undefined &&
      gridEntityType !== gridEntityTypeFilter
    ) {
      continue;
    }

    if (
      !includeWalls &&
      gridEntityType === GridEntityType.WALL &&
      gridEntityTypeFilter !== GridEntityType.WALL
    ) {
      continue;
    }

    msg += getGridEntityLogLine(gridEntity, gridEntityIndex);

    numMatchedEntities++;
  }

  msg +=
    numMatchedEntities === 0
      ? "(no grid entities matched)\n"
      : `(${numMatchedEntities} total grid ${
          numMatchedEntities === 1 ? "entity" : "entities"
        })\n`;

  // We must log each line because otherwise the message can get truncated.
  for (const line of msg.trim().split("\n")) {
    log(line);
  }
}

/** Helper function for logging an array of specific entities. */
export function logEntities(this: void, entities: Entity[]): void {
  for (const entity of entities) {
    logEntity(entity);
  }
}

/** Helper function to log information about a specific entity. */
export function logEntity(this: void, entity: Entity): void {
  const msg = getEntityLogLine(entity);
  log(msg);
}

function getEntityLogLine(this: void, entity: Entity, num?: int): string {
  let msg = num === undefined ? "" : `${num}) `;

  msg += getEntityID(entity);

  const bomb = entity.ToBomb();
  if (bomb !== undefined) {
    msg += ` (bomb - ${getBombVariantName(bomb)})`;
  }

  const effect = entity.ToEffect();
  if (effect !== undefined) {
    msg += ` (effect - ${getEffectVariantName(effect)}) (State: ${
      effect.State
    })`;
  }

  const familiar = entity.ToFamiliar();
  if (familiar !== undefined) {
    msg += ` (familiar - ${getFamiliarVariantName(familiar)}) (State: ${
      familiar.State
    })`;
  }

  const knife = entity.ToKnife();
  if (knife !== undefined) {
    msg += ` (knife - ${getKnifeVariantName(knife)})`;
  }

  const laser = entity.ToLaser();
  if (laser !== undefined) {
    msg += ` (laser - ${getLaserVariantName(laser)})`;
  }

  const npc = entity.ToNPC();
  if (npc !== undefined) {
    msg += ` (NPC - ${getEntityTypeName(npc)}) (State: ${npc.State})`;
  }

  const pickup = entity.ToPickup();
  if (pickup !== undefined) {
    msg += ` (pickup - ${getPickupVariantName(pickup)}) (State: ${
      pickup.State
    })`;
  }

  const player = entity.ToPlayer();
  if (player !== undefined) {
    msg += ` (player - ${getPlayerVariantName(player)})`;
  }

  const projectile = entity.ToProjectile();
  if (projectile !== undefined) {
    msg += ` (projectile - ${getProjectileVariantName(projectile)})`;
  }

  const tear = entity.ToTear();
  if (tear !== undefined) {
    msg += ` (tear - ${getTearVariantName(tear)})`;
  }

  msg += "\n";
  msg += `  - Index: ${entity.Index}\n`;
  msg += `  - InitSeed: ${entity.InitSeed}\n`;
  msg += `  - DropSeed: ${entity.DropSeed}\n`;
  msg += `  - Position: (${entity.Position.X}, ${entity.Position.Y})\n`;
  msg += `  - Velocity: (${entity.Velocity.X}, ${entity.Velocity.Y})\n`;
  msg += `  - HP: ${entity.HitPoints} / ${entity.MaxHitPoints}\n`;
  msg += `  - Parent: ${entity.Parent}\n`;
  msg += `  - Child: ${entity.Child}\n`;
  msg += `  - SpawnerEntity: ${entity.SpawnerEntity}\n`;
  msg += `  - SpawnerType / SpawnerVariant: ${entity.SpawnerType}.${entity.SpawnerVariant}\n`;
  msg += `  - FrameCount: ${entity.FrameCount}\n`;
  if (npc !== undefined) {
    msg += `  - CanShutDoors: ${npc.CanShutDoors}\n`;
  }

  return msg;
}

function getBombVariantName(bomb: EntityBomb) {
  // Handle modded entities.
  const enumName = BombVariant[bomb.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `BombVariant.${enumName}`;
}

function getEffectVariantName(effect: EntityEffect) {
  // Handle modded entities.
  const enumName = EffectVariant[effect.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `EffectVariant.${enumName}`;
}

function getFamiliarVariantName(familiar: EntityFamiliar) {
  // Handle modded entities.
  const enumName = FamiliarVariant[familiar.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `FamiliarVariant.${enumName}`;
}

function getKnifeVariantName(knife: EntityKnife) {
  // Handle modded entities.
  const enumName = KnifeVariant[knife.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `KnifeVariant.${enumName}`;
}

function getLaserVariantName(laser: EntityLaser) {
  // Handle modded entities.
  const enumName = LaserVariant[laser.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `LaserVariant.${enumName}`;
}

function getEntityTypeName(npc: EntityNPC) {
  // Handle modded entities.
  const enumName = EntityType[npc.Type] as string | undefined;
  return enumName === undefined ? "unknown" : `EntityType.${enumName}`;
}

function getPickupVariantName(pickup: EntityPickup) {
  // Handle modded entities.
  const enumName = PickupVariant[pickup.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `PickupVariant.${enumName}`;
}

function getPlayerVariantName(player: EntityPlayer) {
  // Handle modded entities.
  const enumName = PlayerVariant[player.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `PlayerVariant.${enumName}`;
}

function getProjectileVariantName(projectile: EntityProjectile) {
  // Handle modded entities.
  const enumName = ProjectileVariant[projectile.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `ProjectileVariant.${enumName}`;
}

function getTearVariantName(tear: EntityTear) {
  // Handle modded entities.
  const enumName = TearVariant[tear.Variant] as string | undefined;
  return enumName === undefined ? "unknown" : `TearVariant.${enumName}`;
}

/** Helper function for logging an array of specific grid entities. */
export function logGridEntities(this: void, gridEntities: GridEntity[]): void {
  for (const gridEntity of gridEntities) {
    logGridEntity(gridEntity);
  }
}

/** Helper function for log information about a specific grid entity. */
export function logGridEntity(this: void, gridEntity: GridEntity): void {
  const msg = getGridEntityLogLine(gridEntity);
  log(msg);
}

function getGridEntityLogLine(
  this: void,
  gridEntity: GridEntity,
  num?: int,
): string {
  const gridEntityDesc = gridEntity.GetSaveState();

  let msg = num === undefined ? "" : `${num}) `;

  msg += getGridEntityID(gridEntity);

  const door = gridEntity.ToDoor();
  if (door !== undefined) {
    msg += " (door)";
  }

  const pit = gridEntity.ToPit();
  if (pit !== undefined) {
    msg += " (pit)";
  }

  const poop = gridEntity.ToPoop();
  if (poop !== undefined) {
    msg += " (poop)";
  }

  const pressurePlate = gridEntity.ToPressurePlate();
  if (pressurePlate !== undefined) {
    msg += " (pressurePlate)";
  }

  const rock = gridEntity.ToRock();
  if (rock !== undefined) {
    msg += " (rock)";
  }

  const spikes = gridEntity.ToSpikes();
  if (spikes !== undefined) {
    msg += " (spikes)";
  }

  const tnt = gridEntity.ToTNT();
  if (tnt !== undefined) {
    msg += " (TNT)";
  }

  msg += `  - State: ${gridEntity.State}\n`;
  msg += `  - VarData: ${gridEntity.VarData}\n`;
  msg += `  - Position: (${gridEntity.Position.X}, ${gridEntity.Position.Y})\n`;
  msg += `  - SpawnSeed: ${gridEntityDesc.SpawnSeed}\n`;
  msg += `  - VariableSeed: ${gridEntityDesc.VariableSeed})\n`;
  if (door !== undefined) {
    msg += `  - Slot: ${door.Slot}\n`;
    msg += `  - Direction: ${door.Direction}\n`;
    msg += `  - TargetRoomIndex: ${door.TargetRoomIndex}\n`;
    msg += `  - TargetRoomType: ${door.TargetRoomType}\n`;
  }

  return msg;
}

/**
 * Helper function to log information about the entity that corresponding to a pointer hash. (Only
 * use this when debugging, since retrieving the corresponding entity is expensive.)
 */
export function logPtrHash(this: void, ptrHash: PtrHash): void {
  log(`PtrHash: ${ptrHash}`);
  const entity = getEntityFromPtrHash(ptrHash);
  if (entity === undefined) {
    log("No corresponding entity found.");
  } else {
    logEntity(entity);
  }
}

/**
 * Helper function to log information about the entity that corresponding to one or more pointer
 * hashes. (Only use this when debugging, since retrieving the corresponding entity is expensive.)
 */
export function logPtrHashes(this: void, ptrHashes: PtrHash[]): void {
  for (const ptrHash of ptrHashes) {
    logPtrHash(ptrHash);
  }
}
