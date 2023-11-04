import type {
  CardType,
  CollectibleType,
  LevelStage,
  NPCState,
  PillColor,
  PillEffect,
  PlayerType,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";

/**
 * Helper function to safely cast an `int` to a `CardType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asCardType(num: int): CardType {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `CollectibleType`. (This is better than using the
 * `as` TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asCollectibleType(num: int): CollectibleType {
  return num;
}

/**
 * Helper function to safely cast an enum to an `int`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asFloat(num: number): float {
  return num;
}

/**
 * Helper function to safely cast an enum to an `int`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asInt(num: number): int {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `LevelStage`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asLevelStage(num: int): LevelStage {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `NPCState`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asNPCState(num: int): NPCState {
  return num;
}

/**
 * Helper function to safely cast an enum to a `number`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asNumber(num: number): number {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `PillColor`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asPillColor(num: int): PillColor {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `PillEffect`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asPillEffect(num: int): PillEffect {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `PlayerType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asPlayerType(num: int): PlayerType {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `RoomType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asRoomType(num: int): RoomType {
  return num;
}

/**
 * Helper function to safely cast an enum to a `string`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asString(str: string): string {
  return str;
}

/**
 * Helper function to safely cast an `int` to a `TrinketType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asTrinketType(num: int): TrinketType {
  return num;
}

export function isBoolean(variable: unknown): variable is boolean {
  return type(variable) === "boolean";
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(variable: unknown): variable is Function {
  return type(variable) === "function";
}

export function isInteger(variable: unknown): variable is int {
  if (!isNumber(variable)) {
    return false;
  }

  return variable === Math.floor(variable);
}

export function isNumber(variable: unknown): variable is number {
  return type(variable) === "number";
}

/** Helper function to detect if a variable is a boolean, number, or string. */
export function isPrimitive(
  variable: unknown,
): variable is boolean | number | string {
  const variableType = type(variable);
  return (
    variableType === "boolean" ||
    variableType === "number" ||
    variableType === "string"
  );
}

export function isString(variable: unknown): variable is string {
  return type(variable) === "string";
}

export function isTable(
  variable: unknown,
): variable is LuaMap<AnyNotNil, unknown> {
  return type(variable) === "table";
}

export function isUserdata(variable: unknown): variable is LuaUserdata {
  return type(variable) === "userdata";
}
