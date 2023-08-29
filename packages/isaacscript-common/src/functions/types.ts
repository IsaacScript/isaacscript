import type {
  CardType,
  CollectibleType,
  LevelStage,
  NPCState,
  PillColor,
  PillEffect,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";

/**
 * Helper function to safely cast a `number` to a `CardType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asCardType(num: number): CardType {
  return num;
}

/**
 * Helper function to safely cast a `number` to a `CollectibleType`. (This is better than using the
 * `as` TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asCollectibleType(num: number): CollectibleType {
  return num;
}

/**
 * Helper function to safely cast a `number` to a `LevelStage`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asLevelStage(num: number): LevelStage {
  return num;
}

/**
 * Helper function to safely cast a `number` to a `NPCState`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asNPCState(num: number): NPCState {
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
 * Helper function to safely cast a `number` to a `PillColor`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asPillColor(num: number): PillColor {
  return num;
}

/**
 * Helper function to safely cast a `number` to a `PillEffect`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asPillEffect(num: number): PillEffect {
  return num;
}

/**
 * Helper function to safely cast a `number` to a `PlayerType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asPlayerType(num: number): PlayerType {
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
 * Helper function to safely cast a `number` to a `TrinketType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "isaacscript/strict-enums" ESLint rule.
 */
export function asTrinketType(num: number): TrinketType {
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
