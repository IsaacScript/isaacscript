import { game, sfxManager } from "../cachedClasses";
import { arrayToString } from "./array";
import { getCollectibleName } from "./collectibles";
import { getEntities, getEntityID } from "./entity";
import { hasFlag } from "./flag";
import { getGridEntities } from "./gridEntity";
import { range } from "./math";
import { getEffectsList, getPlayerName } from "./player";
import { getPlayerHealth } from "./playerHealth";
import { getRoomData, getRoomGridIndex, getRoomListIndex } from "./rooms";
import { getSortedSetValues } from "./set";
import { getTrinketName } from "./trinkets";

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
  // 1 - getDebugPrependString
  // 2 - calling function
  // 3 - the function that calls the calling function
  numParentFunctions = 3,
): string {
  if (debug !== undefined) {
    // The --luadebug launch flag is enabled
    const debugTable = debug.getinfo(numParentFunctions);
    if (debugTable !== undefined) {
      return `${debugTable.name}:${debugTable.linedefined} - ${msg}`;
    }
  }

  if (getParentFunctionDescription !== undefined) {
    // The Racing+ sandbox is enabled
    return `${getParentFunctionDescription(numParentFunctions + 1)} - ${msg}`;
  }

  return msg;
}

/**
 * Helper function to avoid typing out `Isaac.DebugString()`. If you have the --luadebug launch flag
 * turned on or the Racing+ sandbox enabled, then this function will also prepend the function name
 * and the line number before the string.
 */
export function log(this: void, msg: string): void {
  const debugMsg = getDebugPrependString(msg);
  Isaac.DebugString(debugMsg);
}

/** Helper function for printing out every damage flag that is turned on. Useful when debugging. */
export function logAllDamageFlags(this: void, flags: int): void {
  logAllFlags(flags, DamageFlag as unknown as LuaTable, "damage");
}

/** Helper function for printing out every entity flag that is turned on. Useful when debugging. */
export function logAllEntityFlags(this: void, flags: int): void {
  logAllFlags(flags, EntityFlag as unknown as LuaTable, "entity");
}

/** Helper function for printing out every flag that is turned on. Useful when debugging. */
export function logAllFlags(
  this: void,
  flags: int,
  flagEnum?: LuaTable,
  description = "",
): void {
  if (description !== "") {
    description += " ";
  }

  if (flagEnum === undefined) {
    flagEnum = new LuaTable();

    // Bit shifts of 63 or greater do not work properly
    for (let i = 0; i <= 62; i++) {
      flagEnum.set(`1 << ${i}`, 1 << i);
    }
  }

  log(`Logging all ${description}flags for value ${flags}:`);
  let hasNoFlags = true;
  for (const [key, value] of pairs(flagEnum)) {
    if (typeof value !== "number") {
      continue;
    }

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
export function logAllGameStateFlags(this: void): void {
  log("Logging all game state flags:");
  let hasNoFlags = true;
  for (const [key, value] of pairs(GameStateFlag)) {
    const gameStateFlag = value as GameStateFlag;
    const flagValue = game.GetStateFlag(gameStateFlag);
    if (flagValue) {
      log(`  Has flag: ${key} (${value})`);
      hasNoFlags = false;
    }
  }

  if (hasNoFlags) {
    log("  n/a (no flags)");
  }
}

/**
 * Helper function for printing out every projectile flag that is turned on. Useful when debugging.
 */
export function logAllProjectileFlags(this: void, flags: int): void {
  logAllFlags(flags, ProjectileFlags as unknown as LuaTable, "projectile");
}

/**
 * Helper function for printing out every seed effect (i.e. Easter Egg) that is turned on for the
 * particular run.
 */
export function logAllSeedEffects(this: void): void {
  const seeds = game.GetSeeds();

  log("Logging all seed effects:");
  let hasNoSeedEffects = true;
  for (const [key, value] of pairs(SeedEffect)) {
    const seedEffect = value as SeedEffect;
    if (seeds.HasSeedEffect(seedEffect)) {
      log(`  ${key} (${value})`);
      hasNoSeedEffects = false;
    }
  }

  if (hasNoSeedEffects) {
    log("  n/a (no seed effects)");
  }
}

/** Helper function for printing out every tear flag that is turned on. Useful when debugging. */
export function logAllTearFlags(this: void, flags: int): void {
  logAllFlags(flags, TearFlags as unknown as LuaTable, "tear");
}

/** Helper function for printing out every use flag that is turned on. Useful when debugging. */
export function logAllUseFlags(this: void, _flags: int): void {
  // TODO: fix this after the next vanilla patch
  log(
    'The "logAllUseFlags" helper function is temporarily disabled while the UseFlag enum remains unpatched in vanilla.',
  );
  // logAllFlags(flags, UseFlag as unknown as LuaTable, "use");
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

export function logEntity(this: void, entity: Entity): void {
  log(`Entity: ${entity.Type}.${entity.Variant}.${entity.SubType}`);
}

export function logEntities(
  this: void,
  includeBackgroundEffects: boolean,
  entityTypeFilter?: EntityType | int,
): void {
  let headerMsg = "Entities in the room";
  if (entityTypeFilter !== undefined) {
    headerMsg += ` (filtered to entity type ${entityTypeFilter})`;
  }
  if (!includeBackgroundEffects) {
    headerMsg += " (not excluding background effects)";
  }
  headerMsg += ":";
  log(headerMsg);

  const entities = getEntities();
  let numMatchedEntities = 0;
  entities.forEach((entity, i) => {
    // If a filter was specified, exclude all entities outside of the filter
    if (entityTypeFilter !== undefined && entity.Type !== entityTypeFilter) {
      return;
    }

    if (
      !includeBackgroundEffects &&
      entity.Type === EntityType.ENTITY_EFFECT &&
      IGNORE_EFFECT_VARIANTS.has(entity.Variant)
    ) {
      return;
    }

    const entityID = getEntityID(entity);
    let debugString = `${i + 1} - ${entityID}`;

    const bomb = entity.ToBomb();
    if (bomb !== undefined) {
      debugString += " (bomb)";
    }

    const effect = entity.ToEffect();
    if (effect !== undefined) {
      debugString += `.${effect.State} (effect)`;
    }

    const familiar = entity.ToFamiliar();
    if (familiar !== undefined) {
      debugString += `.${familiar.State} (familiar)`;
    }

    const knife = entity.ToKnife();
    if (knife !== undefined) {
      debugString += " (knife)";
    }

    const laser = entity.ToLaser();
    if (laser !== undefined) {
      debugString += " (laser)";
    }

    const npc = entity.ToNPC();
    if (npc !== undefined) {
      debugString += `.${npc.State} (NPC) (CanShutDoors: ${npc.CanShutDoors})`;
    }

    const pickup = entity.ToPickup();
    if (pickup !== undefined) {
      debugString += `.${pickup.State} (pickup)`;
    }

    const player = entity.ToPlayer();
    if (player !== undefined) {
      debugString += " (player)";
    }

    const projectile = entity.ToProjectile();
    if (projectile !== undefined) {
      debugString += " (projectile)";
    }

    const tear = entity.ToTear();
    if (tear !== undefined) {
      debugString += " (tear)";
    }

    debugString += ` (InitSeed: ${entity.InitSeed})`;
    debugString += ` (DropSeed: ${entity.DropSeed})`;
    debugString += ` (Position: ${entity.Position.X}, ${entity.Position.Y})`;
    debugString += ` (Velocity: ${entity.Velocity.X}, ${entity.Velocity.Y})`;
    debugString += ` (HP: ${entity.HitPoints} / ${entity.MaxHitPoints})`;
    log(debugString);

    numMatchedEntities += 1;
  });

  if (numMatchedEntities === 0) {
    log("(no entities matched)");
  } else {
    log(`(${numMatchedEntities} total entities)`);
  }
}

export function logGridEntities(
  this: void,
  includeWalls: boolean,
  gridEntityTypeFilter?: GridEntityType | int,
): void {
  let headerMsg = "Grid entities in the room";
  if (gridEntityTypeFilter !== undefined) {
    headerMsg += ` (filtered to grid entity type ${gridEntityTypeFilter})`;
  }
  if (!includeWalls) {
    headerMsg += " (not including walls)";
  }
  log(headerMsg);

  const gridEntities = getGridEntities();
  let numMatchedEntities = 0;
  gridEntities.forEach((gridEntity) => {
    const gridEntityIndex = gridEntity.GetGridIndex();
    const gridEntityType = gridEntity.GetType();
    const gridEntityVariant = gridEntity.GetVariant();
    const gridEntityDesc = gridEntity.GetSaveState();

    // If a filter was specified, exclude all entities outside of the filter
    if (
      gridEntityTypeFilter !== undefined &&
      gridEntityType !== gridEntityTypeFilter
    ) {
      return;
    }

    if (
      !includeWalls &&
      gridEntityType === GridEntityType.GRID_WALL &&
      gridEntityTypeFilter !== GridEntityType.GRID_WALL
    ) {
      return;
    }

    let debugString = `${gridEntityIndex} - ${gridEntityType}.${gridEntityVariant}.${gridEntity.State}`;

    const door = gridEntity.ToDoor();
    if (door !== undefined) {
      debugString += ` (door) (Slot: ${door.Slot}, Direction: ${door.Direction}, TargetRoomIndex: ${door.TargetRoomIndex}, TargetRoomType: ${door.TargetRoomType})`;
    }

    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      debugString += " (pit)";
    }

    const poop = gridEntity.ToPoop();
    if (poop !== undefined) {
      debugString += " (poop)";
    }

    const pressurePlate = gridEntity.ToPressurePlate();
    if (pressurePlate !== undefined) {
      debugString += " (pressurePlate)";
    }

    const rock = gridEntity.ToRock();
    if (rock !== undefined) {
      debugString += " (rock)";
    }

    const spikes = gridEntity.ToSpikes();
    if (spikes !== undefined) {
      debugString += " (spikes)";
    }

    const tnt = gridEntity.ToTNT();
    if (tnt !== undefined) {
      debugString += " (TNT)";
    }

    debugString += ` (VarData: ${gridEntity.VarData})`;
    debugString += ` (Position: ${gridEntity.Position.X}, ${gridEntity.Position.Y})`;
    debugString += ` (SpawnSeed: ${gridEntityDesc.SpawnSeed}, VariableSeed: ${gridEntityDesc.VariableSeed})`;
    log(debugString);

    numMatchedEntities += 1;
  });

  if (numMatchedEntities === 0) {
    log("(no grid entities matched)");
  } else {
    log(`(${numMatchedEntities} total grid entities)`);
  }
}

export function logKColor(this: void, kColor: KColor): void {
  log(
    `Color: R${kColor.Red}, G${kColor.Green}, B${kColor.Blue}, A${kColor.Alpha}`,
  );
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

/** Helper function for logging every sound effect that is currently playing. */
export function logSounds(this: void): void {
  for (const soundEffect of range(0, SoundEffect.NUM_SOUND_EFFECTS - 1)) {
    if (sfxManager.IsPlaying(soundEffect)) {
      log(`Currently playing sound effect: ${soundEffect}`);
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
      logTable(value, parentTables + 1);
    }

    numKeys += 1;
  }

  log(`The size of the table was: ${numKeys}`);
}

export function logTemporaryEffects(this: void, player: EntityPlayer): void {
  const effects = getEffectsList(player);

  log("Logging all player temporary effects:");

  if (effects.length === 0) {
    log("  n/a (no temporary effects)");
    return;
  }

  effects.forEach((effect, i) => {
    if (effect.Item.IsCollectible()) {
      const collectibleName = getCollectibleName(effect.Item.ID);
      log(`  ${i + 1}) ${collectibleName}`);
    } else if (effect.Item.IsTrinket()) {
      const trinketName = getTrinketName(effect.Item.ID);
      log(`  ${i + 1}) ${trinketName}`);
    } else if (effect.Item.IsNull()) {
      log(`  ${i + 1}) Null item: ${effect.Item.ID}`);
    } else {
      log(`  ${i + 1}) Unknown type of temporary effect: ${effect.Item.ID}`);
    }
  });
}

export function logSet(this: void, set: Set<AnyNotNil>): void {
  log("Printing out a TSTL Set:");

  const setValues = getSortedSetValues(set);
  for (const value of setValues) {
    log(`  Value: ${value}`);
  }

  log(`The size of the set was: ${set.size}`);
}

export function logVector(this: void, vector: Vector): void {
  log(`Vector: (${vector.X}, ${vector.Y})`);
}

/**
 * Converts every `isaacscript-common` function that begins with "log" to a global function.
 * This is useful for printing out variables from the in-game debug console.
 */
export function setLogFunctionsGlobal(): void {
  const globals = _G as Record<string, unknown>;

  globals.log = log;
  globals.logAllDamageFlags = logAllDamageFlags;
  globals.logAllEntityFlags = logAllEntityFlags;
  globals.logAllFlags = logAllFlags;
  globals.logAllGameStateFlags = logAllGameStateFlags;
  globals.logAllProjectileFlags = logAllProjectileFlags;
  globals.logAllSeedEffects = logAllSeedEffects;
  globals.logAllTearFlags = logAllTearFlags;
  globals.logAllUseFlags = logAllUseFlags;
  globals.logArray = logArray;
  globals.logColor = logColor;
  globals.logEntity = logEntity;
  globals.logEntities = logEntities;
  globals.logGridEntities = logGridEntities;
  globals.logKColor = logKColor;
  globals.logMap = logMap;
  globals.logRoom = logRoom;
  globals.logTable = logTable;
  globals.logTemporaryEffects = logTemporaryEffects;
  globals.logSet = logSet;
  globals.logSounds = logSounds;
  globals.logVector = logVector;
}
