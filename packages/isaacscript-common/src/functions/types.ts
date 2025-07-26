/**
 * Consider the following code that uses a number enum:
 *
 * ```ts
 * enum MyEnum {
 *   Value1,
 * }
 *
 * function asMyEnum(num: number): MyEnum {}
 *
 * declare const something: unknown;
 *
 * const foo = something as MyEnum; // no error
 * const bar: MyEnum = something; // error
 * const baz = asMyEnum(something); // error
 * ```
 *
 * Here, using `as` does not give an error because TypeScript allows you to assert a type to a
 * supertype or a subtype. Thus, using `as` to perform a type assertion is not as safe as using a
 * variable declaration or a helper function. However, if we use a variable declaration, then the
 * `complete/strict-enums` rule is triggered, which requires suppressing the lint rule with a `//
 * eslint-disable-next-line`. Thus, the safest and more concise way to do a type assertion is to use
 * a helper function.
 *
 * This file contains helper functions for various number enums that might require type assertions.
 * It also contains helper functions for run-time type checks.
 *
 * @module
 */

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
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asCardType(num: int): CardType {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `CollectibleType`. (This is better than using the
 * `as` TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asCollectibleType(num: int): CollectibleType {
  return num;
}

/**
 * Helper function to safely cast an enum to an `int`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asFloat(num: number): float {
  return num;
}

/**
 * Helper function to safely cast an enum to an `int`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asInt(num: number): int {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `LevelStage`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asLevelStage(num: int): LevelStage {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `NPCState`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asNPCState(num: int): NPCState {
  return num;
}

/**
 * Helper function to safely cast an enum to a `number`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asNumber(num: number): number {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `PillColor`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asPillColor(num: int): PillColor {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `PillEffect`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asPillEffect(num: int): PillEffect {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `PlayerType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asPlayerType(num: int): PlayerType {
  return num;
}

/**
 * Helper function to safely cast an `int` to a `RoomType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asRoomType(num: int): RoomType {
  return num;
}

/**
 * Helper function to safely cast an enum to a `string`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asString(str: string): string {
  return str;
}

/**
 * Helper function to safely cast an `int` to a `TrinketType`. (This is better than using the `as`
 * TypeScript keyword to do a type assertion, since that can obfuscate compiler errors. )
 *
 * This is useful to satisfy the "complete/strict-enums" ESLint rule.
 */
export function asTrinketType(num: int): TrinketType {
  return num;
}

export function isBoolean(variable: unknown): variable is boolean {
  return typeof variable === "boolean";
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(variable: unknown): variable is Function {
  return typeof variable === "function";
}

export function isInteger(variable: unknown): variable is int {
  if (!isNumber(variable)) {
    return false;
  }

  return variable === Math.floor(variable);
}

export function isNumber(variable: unknown): variable is number {
  return typeof variable === "number";
}

/** Helper function to detect if a variable is a boolean, number, or string. */
export function isPrimitive(
  variable: unknown,
): variable is boolean | number | string {
  const variableType = typeof variable;
  return (
    variableType === "boolean"
    || variableType === "number"
    || variableType === "string"
  );
}

export function isString(variable: unknown): variable is string {
  return typeof variable === "string";
}

export function isTable(
  variable: unknown,
): variable is LuaMap<AnyNotNil, unknown> {
  // We cannot use `typeof` here since "table" is not a JavaScript type.
  return type(variable) === "table";
}

export function isUserdata(variable: unknown): variable is LuaUserdata {
  // We cannot use `typeof` here since "userdata" is not a JavaScript type.
  return type(variable) === "userdata";
}

/**
 * Helper function to convert a string to an integer. Returns undefined if the string is not an
 * integer.
 *
 * Under the hood, this uses the built-in `tonumber` and `math.floor` functions.
 *
 * This is named `parseIntSafe` in order to match the helper function from `complete-common`.
 */
export function parseIntSafe(string: string): int | undefined {
  if (!isString(string)) {
    return undefined;
  }

  // - The `tonumber` function correctly deals with leading and trailing whitespace.
  // - The `tonumber` function correctly deals with a mix of numbers and letters. (e.g. `1a` returns
  //   undefined.)
  const number = tonumber(string);
  if (number === undefined) {
    return undefined;
  }

  const flooredNumber = Math.floor(number);
  return number === flooredNumber ? flooredNumber : undefined;
}
