import { arrayToString } from "./array";
import { getCollectibleName } from "./collectibles";
import { hasFlag } from "./flag";
import { getEffectsList } from "./player";
import { getRoomData, getRoomGridIndex, getRoomListIndex } from "./rooms";
import { getTrinketName } from "./trinkets";

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
  flagEnum: LuaTable,
  description = "",
): void {
  if (description !== "") {
    description += " ";
  }

  log(`Logging all ${description}flags:`);
  let hasNoFlags = true;
  for (const [key, value] of pairs(flagEnum)) {
    if (hasFlag(flags, value as int)) {
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
  const game = Game();

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
  const game = Game();
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
export function logAllUseFlags(this: void, flags: int): void {
  logAllFlags(flags, UseFlag as unknown as LuaTable, "use");
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

/** Helper function for printing out information about the current room. */
export function logRoom(this: void): void {
  const roomGridIndex = getRoomGridIndex();
  const roomListIndex = getRoomListIndex();
  const roomData = getRoomData();

  if (roomData === undefined) {
    log("Current room data is undefined.");
  } else {
    log(
      `Current room type/variant/sub-type: ${roomData.Type}.${roomData.Variant}.${roomData.Subtype}`,
    );
  }
  log(`Current room grid index: ${roomGridIndex}`);
  log(`Current room list index: ${roomListIndex}`);
}

export function logTable(this: void, table: unknown, parentTables = 0): void {
  const numSpaces = (parentTables + 1) * 2; // 2, 4, 6, etc.

  if (parentTables === 0) {
    log("Printing out a Lua table:");
  }

  const indentation = " ".repeat(numSpaces);
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

  const setValues = [...set.values()];
  setValues.sort();

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
  globals.logKColor = logKColor;
  globals.logMap = logMap;
  // globals.logRoom = logRoom;
  globals.logTable = logTable;
  globals.logTemporaryEffects = logTemporaryEffects;
  globals.logSet = logSet;
  globals.logVector = logVector;
}
