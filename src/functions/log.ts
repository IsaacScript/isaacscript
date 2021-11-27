import { arrayToString } from "./array";
import { hasFlag } from "./flag";

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

/** Helper function for printing out every damage flag that is turned on. Helpful when debugging. */
export function logAllDamageFlags(this: void, flags: int): void {
  logAllFlags(flags, DamageFlag as unknown as LuaTable, "damage");
}

/** Helper function for printing out every entity flag that is turned on. Helpful when debugging. */
export function logAllEntityFlags(this: void, flags: int): void {
  logAllFlags(flags, EntityFlag as unknown as LuaTable, "entity");
}

/** Helper function for printing out every flag that is turned on. Helpful when debugging. */
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
  for (const [key, value] of pairs(flagEnum)) {
    if (hasFlag(flags, value as int)) {
      log(`- Has flag: ${key}`);
    }
  }
}

/**
 * Helper function for printing out every game state flag that is turned on. Helpful when debugging.
 */
export function logAllGameStateFlags(this: void): void {
  const game = Game();

  log("Logging all game state flags:");
  for (const [key, value] of Object.entries(GameStateFlag)) {
    const gameStateFlag = value as GameStateFlag;
    const flagValue = game.GetStateFlag(gameStateFlag);
    if (flagValue) {
      log(`- Has flag: ${key}`);
    }
  }
}

/**
 * Helper function for printing out every projectile flag that is turned on. Helpful when debugging.
 */
export function logAllProjectileFlags(this: void, flags: int): void {
  logAllFlags(flags, ProjectileFlags as unknown as LuaTable, "projectile");
}

/** Helper function for printing out every use flag that is turned on. Helpful when debugging. */
export function logAllTearFlags(this: void, flags: int): void {
  logAllFlags(flags, TearFlags as unknown as LuaTable, "tear");
}

/** Helper function for printing out every use flag that is turned on. Helpful when debugging. */
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
  for (const [key, value] of map.entries()) {
    log(`  Key: ${key}, Value: ${value}`);
  }
  log(`The size of the map was: ${map.size}`);
}

export function logTable(this: void, table: unknown): void {
  log("Printing out a Lua table:");
  for (const [key, value] of pairs(table)) {
    log(`  Key: ${key}, Value: ${value}`);
  }
}

export function logSet(this: void, set: Set<AnyNotNil>): void {
  log("Printing out a TSTL Set:");
  for (const value of set.values()) {
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
  globals.logAllUseFlags = logAllUseFlags;
  globals.logArray = logArray;
  globals.logColor = logColor;
  globals.logEntity = logEntity;
  globals.logKColor = logKColor;
  globals.logMap = logMap;
  globals.logTable = logTable;
  globals.logSet = logSet;
  globals.logVector = logVector;
}

/**
 * Helper function to print a stack trace to the "log.txt" file, similar to JavaScript's
 * `console.trace()` function. This will only work if the `--luadebug` launch option is enabled.
 */
export function traceback(): void {
  if (debug !== undefined) {
    // The --luadebug launch flag is enabled
    const tracebackMsg = debug.traceback();
    Isaac.DebugString(tracebackMsg);
    return;
  }

  if (sandboxTraceback !== undefined) {
    // The Racing+ sandbox is enabled
    sandboxTraceback();
    return;
  }

  Isaac.DebugString(
    "Error: Cannot perform a traceback since --luadebug is not enabled.",
  );
}
