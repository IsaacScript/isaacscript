import {
  DamageFlag,
  EffectVariant,
  EntityFlag,
  EntityType,
  GameStateFlag,
  GridEntityType,
  LevelStateFlag,
  ProjectileFlag,
  SeedEffect,
  SoundEffect,
  TearFlag,
  UseFlag,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../cachedClasses";
import { arrayToString } from "./array";
import { getCollectibleName } from "./collectibles";
import { getEntities, getEntityID } from "./entity";
import { getEnumEntries } from "./enums";
import { hasFlag } from "./flag";
import { getGridEntities } from "./gridEntity";
import { getIsaacAPIClassType } from "./isaacAPIClass";
import { getEffectsList, getPlayerName } from "./player";
import { getPlayerHealth } from "./playerHealth";
import { getRoomData, getRoomGridIndex, getRoomListIndex } from "./roomData";
import { getSortedSetValues } from "./set";
import { getTrinketName } from "./trinkets";
import { printConsole } from "./utils";
import { vectorToString } from "./vector";

const IGNORE_EFFECT_VARIANTS: ReadonlySet<EffectVariant> = new Set([
  EffectVariant.BLOOD_EXPLOSION, // 2
  EffectVariant.BLOOD_PARTICLE, // 5
  EffectVariant.TINY_BUG, // 21
  EffectVariant.TINY_FLY, // 33
  EffectVariant.WATER_DROPLET, // 41
  EffectVariant.WALL_BUG, // 68
  EffectVariant.FALLING_EMBER, // 87
  EffectVariant.LIGHT, // 121
  EffectVariant.TADPOLE, // 158
]);

/**
 * Helper function to prefix the name of the function and the line number before a debug message.
 */
export function getDebugPrependString(
  msg: string,
  // We use 3 as a default because:
  // - 1 - getDebugPrependString
  // - 2 - calling function
  // - 3 - the function that calls the calling function
  numParentFunctions = 3,
): string {
  if (debug !== undefined) {
    // The "--luadebug" launch flag is enabled.
    const debugTable = debug.getinfo(numParentFunctions);
    if (debugTable !== undefined) {
      return `${debugTable.name}:${debugTable.linedefined} - ${msg}`;
    }
  }

  if (getParentFunctionDescription !== undefined) {
    // The Racing+ sandbox is enabled.
    return `${getParentFunctionDescription(numParentFunctions + 1)} - ${msg}`;
  }

  return msg;
}

/**
 * Helper function to avoid typing out `Isaac.DebugString()`.
 *
 * If you have the "--luadebug" launch flag turned on or the Racing+ sandbox enabled, then this
 * function will also prepend the function name and the line number before the string.
 */
export function log(this: void, msg: string): void {
  const debugMsg = getDebugPrependString(msg);
  Isaac.DebugString(debugMsg);
}

export function logArray<T>(this: void, array: T[]): void {
  const arrayString = arrayToString(array);
  log(`Array: ${arrayString}`);
}

export function logColor(this: void, color: Color): void {
  log(
    `Color: R${color.R}, G${color.G}, B${color.B}, A${color.A}, RO${color.RO}, BO${color.BO}, GO${color.GO}`,
  );
}

/** Helper function for printing out every damage flag that is turned on. Useful when debugging. */
export function logDamageFlags(
  this: void,
  flags: DamageFlag | BitFlags<DamageFlag>,
): void {
  logFlags(flags, DamageFlag, "damage");
}

export function logEffects(this: void, player: EntityPlayer): void {
  const effects = getEffectsList(player);

  log("Logging player effects:");

  if (effects.length === 0) {
    log("  n/a (no effects)");
    return;
  }

  effects.forEach((effect, i) => {
    let effectDescription: string;
    if (effect.Item.IsCollectible()) {
      const collectibleName = getCollectibleName(effect.Item.ID);
      effectDescription = `Collectible: ${collectibleName}`;
    } else if (effect.Item.IsTrinket()) {
      const trinketName = getTrinketName(effect.Item.ID);
      effectDescription = `Trinket: ${trinketName}`;
    } else if (effect.Item.IsNull()) {
      effectDescription = `Null item: ${effect.Item.ID}`;
    } else {
      effectDescription = `Unknown type of effect: ${effect.Item.ID}`;
    }

    log(`  ${i + 1}) ${effectDescription} (x${effect.Count})`);
  });
}

/** Helper function for printing out every entity (or filtered entity) in the current room. */
export function logEntities(
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
  entities.forEach((entity, i) => {
    // If a filter was specified, exclude all entities outside of the filter.
    if (entityTypeFilter !== undefined && entity.Type !== entityTypeFilter) {
      return;
    }

    if (
      !includeBackgroundEffects &&
      entity.Type === EntityType.EFFECT &&
      IGNORE_EFFECT_VARIANTS.has(entity.Variant)
    ) {
      return;
    }

    const entityID = getEntityID(entity);
    msg += `${i + 1}) ${entityID}`;

    const bomb = entity.ToBomb();
    if (bomb !== undefined) {
      msg += " (bomb)";
    }

    const effect = entity.ToEffect();
    if (effect !== undefined) {
      msg += ` (effect) (State: ${effect.State})`;
    }

    const familiar = entity.ToFamiliar();
    if (familiar !== undefined) {
      msg += ` (familiar) (State: ${familiar.State})`;
    }

    const knife = entity.ToKnife();
    if (knife !== undefined) {
      msg += " (knife)";
    }

    const laser = entity.ToLaser();
    if (laser !== undefined) {
      msg += " (laser)";
    }

    const npc = entity.ToNPC();
    if (npc !== undefined) {
      msg += ` (NPC) (State: ${npc.State})`;
    }

    const pickup = entity.ToPickup();
    if (pickup !== undefined) {
      msg += ` (pickup) (State: ${pickup.State})`;
    }

    const player = entity.ToPlayer();
    if (player !== undefined) {
      msg += " (player)";
    }

    const projectile = entity.ToProjectile();
    if (projectile !== undefined) {
      msg += " (projectile)";
    }

    const tear = entity.ToTear();
    if (tear !== undefined) {
      msg += " (tear)";
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
    if (npc !== undefined) {
      msg += `  - CanShutDoors: ${npc.CanShutDoors}\n`;
    }

    numMatchedEntities += 1;
  });

  if (numMatchedEntities === 0) {
    msg += "(no entities matched)\n";
  } else {
    msg += `(${numMatchedEntities} total entities)\n`;
  }

  log(msg);
}

/** Helper function for printing out every entity flag that is turned on. Useful when debugging. */
export function logEntityFlags(
  this: void,
  flags: EntityFlag | BitFlags<EntityFlag>,
): void {
  logFlags(flags, EntityFlag, "entity");
}

export function logEntityID(this: void, entity: Entity): void {
  log(`Entity: ${entity.Type}.${entity.Variant}.${entity.SubType}`);
}

/**
 * Helper function to log an error message and also print it to the console for better visibility.
 *
 * This is useful in situations where using the `error` function would be dangerous (since it
 * prevents all of the subsequent code in the callback from running).
 */
export function logError(this: void, msg: string): void {
  const errorMsg = `Error: ${msg}`;
  log(errorMsg);
  printConsole(errorMsg);
}

/** Helper function for printing out every flag that is turned on. Useful when debugging. */
export function logFlags<T extends BitFlag | BitFlag128>(
  this: void,
  flags: T | BitFlags<T>,
  flagEnum: Record<string, T>,
  description = "",
): void {
  if (description !== "") {
    description = "flag";
  }

  log(`Logging ${description} values for: ${flags}`);
  let hasNoFlags = true;
  for (const [key, value] of getEnumEntries(flagEnum)) {
    if (hasFlag(flags, value)) {
      log(`  Has flag: ${key} (${value})`);
      hasNoFlags = false;
    }
  }

  if (hasNoFlags) {
    log("  n/a (no flags)");
  }
}

/**
 * Helper function for printing out every game state flag that is turned on. Useful when debugging.
 */
export function logGameStateFlags(this: void): void {
  log("Logging game state flags:");

  const gameStateFlagEntries = getEnumEntries(GameStateFlag);

  let hasNoFlags = true;
  for (const [key, gameStateFlag] of gameStateFlagEntries) {
    const flagValue = game.GetStateFlag(gameStateFlag);
    if (flagValue) {
      log(`  Has flag: ${key} (${gameStateFlag})`);
      hasNoFlags = false;
    }
  }

  if (hasNoFlags) {
    log("  n/a (no flags)");
  }
}

/**
 * Helper function for printing out every grid entity (or filtered grid entity) in the current room.
 */
export function logGridEntities(
  this: void,
  includeWalls: boolean,
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
  gridEntities.forEach((gridEntity) => {
    const gridEntityIndex = gridEntity.GetGridIndex();
    const gridEntityType = gridEntity.GetType();
    const gridEntityVariant = gridEntity.GetVariant();
    const gridEntityDesc = gridEntity.GetSaveState();

    // If a filter was specified, exclude all entities outside of the filter.
    if (
      gridEntityTypeFilter !== undefined &&
      gridEntityType !== gridEntityTypeFilter
    ) {
      return;
    }

    if (
      !includeWalls &&
      gridEntityType === GridEntityType.WALL &&
      gridEntityTypeFilter !== GridEntityType.WALL
    ) {
      return;
    }

    msg += `${gridEntityIndex}) ${gridEntityType}.${gridEntityVariant}.${gridEntity.State}`;

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

    numMatchedEntities += 1;
  });

  if (numMatchedEntities === 0) {
    msg += "(no grid entities matched)\n";
  } else {
    msg += `(${numMatchedEntities} total grid entities)\n`;
  }

  log(msg);
}

export function logKColor(this: void, kColor: KColor): void {
  log(
    `Color: R${kColor.Red}, G${kColor.Green}, B${kColor.Blue}, A${kColor.Alpha}`,
  );
}

/**
 * Helper function for printing out every level state flag that is turned on. Useful when debugging.
 */
export function logLevelStateFlags(this: void): void {
  const level = game.GetLevel();

  const levelStateFlagEntries = getEnumEntries(LevelStateFlag);

  log("Logging level state flags:");
  let hasNoFlags = true;
  for (const [key, levelStateFlag] of levelStateFlagEntries) {
    const flagValue = level.GetStateFlag(levelStateFlag);
    if (flagValue) {
      log(`  Has flag: ${key} (${levelStateFlag})`);
      hasNoFlags = false;
    }
  }

  if (hasNoFlags) {
    log("  n/a (no flags)");
  }
}

export function logMap(this: void, map: Map<AnyNotNil, unknown>): void {
  log("Printing out a TSTL Map:");

  const mapKeys = [...map.keys()];
  mapKeys.sort();

  for (const key of mapKeys) {
    const value = map.get(key);
    log(`  Key: ${key}, Value: ${value}`);
  }

  log(`The size of the map was: ${map.size}`);
}

export function logPlayerHealth(this: void, player: EntityPlayer): void {
  const playerName = getPlayerName(player);
  const playerHealth = getPlayerHealth(player);

  log(`Player health for ${playerName}:`);
  log(`  Max hearts: ${playerHealth.maxHearts}`);
  log(`  Hearts: ${playerHealth.hearts}`);
  log(`  Eternal hearts: ${playerHealth.eternalHearts}`);
  log(`  Soul hearts: ${playerHealth.soulHearts}`);
  log(`  Bone hearts: ${playerHealth.boneHearts}`);
  log(`  Golden hearts: ${playerHealth.goldenHearts}`);
  log(`  Rotten hearts: ${playerHealth.rottenHearts}`);
  log(`  Broken hearts: ${playerHealth.brokenHearts}`);
  log(`  Soul charges: ${playerHealth.soulCharges}`);
  log(`  Blood charges: ${playerHealth.bloodCharges}`);
  log(`  Soul heart types: [${playerHealth.soulHeartTypes.join(",")}]`);
}

/**
 * Helper function for printing out every projectile flag that is turned on. Useful when debugging.
 */
export function logProjectileFlags(
  this: void,
  flags: ProjectileFlag | BitFlags<ProjectileFlag>,
): void {
  logFlags(flags, ProjectileFlag, "projectile");
}

/** Helper function for logging information about the current room. */
export function logRoom(this: void): void {
  const roomGridIndex = getRoomGridIndex();
  const roomListIndex = getRoomListIndex();
  const roomData = getRoomData();

  if (roomData === undefined) {
    log("Current room data is undefined.");
  } else {
    log(`Current room stage ID: ${roomData.StageID}`);
    log(
      `Current room type/variant/sub-type: ${roomData.Type}.${roomData.Variant}.${roomData.Subtype}`,
    );
    log(`Current room name: ${roomData.Name}`);
  }
  log(`Current room grid index: ${roomGridIndex}`);
  log(`Current room list index: ${roomListIndex}`);
}

/**
 * Helper function for printing out every seed effect (i.e. Easter Egg) that is turned on for the
 * particular run.
 */
export function logSeedEffects(this: void): void {
  const seeds = game.GetSeeds();

  const seedEffectEntries = getEnumEntries(SeedEffect);

  log("Logging seed effects:");
  let hasNoSeedEffects = true;
  for (const [key, seedEffect] of seedEffectEntries) {
    if (seeds.HasSeedEffect(seedEffect)) {
      log(`  ${key} (${seedEffect})`);
      hasNoSeedEffects = false;
    }
  }

  if (hasNoSeedEffects) {
    log("  n/a (no seed effects)");
  }
}

export function logSet(this: void, set: Set<AnyNotNil>): void {
  log("Printing out a TSTL Set:");

  const setValues = getSortedSetValues(set);
  for (const value of setValues) {
    log(`  Value: ${value}`);
  }

  log(`The size of the set was: ${set.size}`);
}

/** Helper function for logging every sound effect that is currently playing. */
export function logSounds(this: void): void {
  const soundEffects = getEnumEntries(SoundEffect);

  for (const [key, soundEffect] of soundEffects) {
    if (sfxManager.IsPlaying(soundEffect)) {
      log(`Currently playing sound effect: ${key} (${soundEffect})`);
    }
  }
}

export function logTable(this: void, table: unknown, parentTables = 0): void {
  if (parentTables === 0) {
    log("Printing out a Lua table:");
  }

  const numSpaces = (parentTables + 1) * 2; // 2, 4, 6, etc.
  const indentation = " ".repeat(numSpaces);

  if (table === undefined) {
    log(`${indentation}n/a (the table was nil)`);
    return;
  }

  let numKeys = 0;
  for (const [key, value] of pairs(table)) {
    log(`${indentation}Key: ${key}, Value: ${value}`);

    const valueType = type(value);
    if (valueType === "table") {
      if (key === "__class") {
        log(
          `${indentation}(skipping enumerating this key to avoid infinite recursion)`,
        );
      } else {
        logTable(value, parentTables + 1);
      }
    }

    numKeys += 1;
  }

  log(`The size of the table was: ${numKeys}`);
}

/** Helper function for printing out every tear flag that is turned on. Useful when debugging. */
export function logTearFlags(
  this: void,
  flags: TearFlag | BitFlags<TearFlag>,
): void {
  logFlags(flags, TearFlag, "tear");
}

/** Helper function for printing out every use flag that is turned on. Useful when debugging. */
export function logUseFlags(
  this: void,
  flags: UseFlag | BitFlags<UseFlag>,
): void {
  logFlags(flags, UseFlag, "use");
}

/**
 * Helper function to enumerate all of the properties of a "userdata" object (i.e. an object from
 * the Isaac API).
 */
export function logUserdata(this: void, userdata: unknown): void {
  const userdataType = type(userdata);
  if (userdataType !== "userdata") {
    log("Userdata: [not userdata]");
    return;
  }

  const metatable = getmetatable(userdata) as LuaTable<AnyNotNil, unknown>;
  if (metatable === undefined) {
    log("Userdata: [no metatable]");
    return;
  }

  const classType = getIsaacAPIClassType(userdata);
  if (classType === undefined) {
    log("Userdata: [no class type]");
  } else {
    log(`Userdata: ${classType}`);
  }

  logTable(metatable);
}

export function logVector(this: void, vector: Vector, round = false): void {
  const vectorString = vectorToString(vector, round);
  log(`Vector: ${vectorString}`);
}

/**
 * Converts every `isaacscript-common` function that begins with "log" to a global function.
 *
 * This is useful when printing out variables from the in-game debug console.
 */
export function setLogFunctionsGlobal(): void {
  const globals = _G as Record<string, unknown>;

  globals["log"] = log;
  globals["logArray"] = logArray;
  globals["logColor"] = logColor;
  globals["logDamageFlags"] = logDamageFlags;
  globals["logEffects"] = logEffects;
  globals["logEntities"] = logEntities;
  globals["logEntityID"] = logEntityID;
  globals["logEntityFlags"] = logEntityFlags;
  globals["logError"] = logError;
  globals["logFlags"] = logFlags;
  globals["logGameStateFlags"] = logGameStateFlags;
  globals["logGridEntities"] = logGridEntities;
  globals["logKColor"] = logKColor;
  globals["logLevelStateFlags"] = logLevelStateFlags;
  globals["logMap"] = logMap;
  globals["logPlayerHealth"] = logPlayerHealth;
  globals["logProjectileFlags"] = logProjectileFlags;
  globals["logRoom"] = logRoom;
  globals["logSeedEffects"] = logSeedEffects;
  globals["logSet"] = logSet;
  globals["logSounds"] = logSounds;
  globals["logTable"] = logTable;
  globals["logTearFlags"] = logTearFlags;
  globals["logUseFlags"] = logUseFlags;
  globals["logUserdata"] = logUserdata;
  globals["logVector"] = logVector;
}
