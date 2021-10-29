import { arrayToString } from "./array";
import { hasFlag } from "./flag";

// This function is part of the sandbox provided by the Racing+ client
declare global {
  function getParentFunctionDescription(this: void, levels: int): string;
}

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
 * Helper function to avoid typing out `Isaac.DebugString()`.
 * If you have the --luadebug launch flag turned on or the Racing+ sandbox enabled,
 * then this function will also prepend the function name and the line number before the string.
 */
export function log(msg: string): void {
  const debugMsg = getDebugPrependString(msg);
  Isaac.DebugString(debugMsg);
}

/**
 * Helper function for printing out every damage flag that is turned on. Helpful when debugging.
 */
export function logAllDamageFlags(flags: int): void {
  logAllFlags(flags, DamageFlag as unknown as LuaTable, "damage");
}

/**
 * Helper function for printing out every entity flag that is turned on. Helpful when debugging.
 */
export function logAllEntityFlags(flags: int): void {
  logAllFlags(flags, EntityFlag as unknown as LuaTable, "entity");
}

/**
 * Helper function for printing out every flag that is turned on. Helpful when debugging.
 */
export function logAllFlags(
  flags: int,
  flagEnum: LuaTable,
  description = "",
): void {
  if (description !== "") {
    description += " ";
  }
  log(`Logging all ${description}flags:`);
  for (const [key, value] of pairs(flagEnum)) {
    if (hasFlag(flags, value)) {
      log(`- Has flag: ${key}`);
    }
  }
}

export function logAllGameStateFlags(): void {
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
export function logAllProjectileFlags(flags: int): void {
  logAllFlags(flags, ProjectileFlags as unknown as LuaTable, "projectile");
}

/**
 * Helper function for printing out every use flag that is turned on. Helpful when debugging.
 */
export function logAllUseFlags(flags: int): void {
  logAllFlags(flags, UseFlag as unknown as LuaTable, "use");
}

export function logArray<T>(array: T[]): void {
  const arrayString = arrayToString(array);
  log(`Array: ${arrayString}`);
}

export function logColor(color: Color): void {
  log(
    `Color: R${color.R}, G${color.G}, B${color.B}, A${color.A}, RO${color.RO}, BO${color.BO}, GO${color.GO}`,
  );
}

export function logEntity(entity: Entity): void {
  log(`Entity: ${entity.Type}.${entity.Variant}.${entity.SubType}`);
}

export function logKColor(kColor: KColor): void {
  log(
    `Color: R${kColor.Red}, G${kColor.Green}, B${kColor.Blue}, A${kColor.Alpha}`,
  );
}

export function logMap(map: Map<AnyNotNil, unknown>): void {
  log("Printing out a TSTL Map:");
  for (const [key, value] of map.entries()) {
    log(`  Key: ${key}, Value: ${value}`);
  }
  log(`The size of the map was: ${map.size}`);
}

export function logTable(table: unknown): void {
  log("Printing out a Lua table:");
  for (const [key, value] of pairs(table)) {
    log(`  Key: ${key}, Value: ${value}`);
  }
}

export function logSet(set: Set<AnyNotNil>): void {
  log("Printing out a TSTL Set:");
  for (const value of set.values()) {
    log(`  Value: ${value}`);
  }
  log(`The size of the set was: ${set.size}`);
}
