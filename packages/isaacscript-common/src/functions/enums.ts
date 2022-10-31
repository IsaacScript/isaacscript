import { getRandomArrayElement } from "./array";
import { getRandomSeed } from "./rng";
import { isString } from "./types";
import { iRange } from "./utils";

/**
 * TypeScriptToLua will transpile TypeScript enums to Lua tables that have a double mapping. Thus,
 * when you iterate over them, you will get both the names of the enums and the values of the enums,
 * in a random order. Use this helper function to get the entries of the enum with the reverse
 * mappings filtered out.
 *
 * This function will return the enum values in a sorted order, which may not necessarily be the
 * same order as which they were declared in.
 *
 * This function will work properly for both number enums and string enums. (Reverse mappings are
 * not created for string enums.)
 *
 * Also see the `getEnumKeys` and `getEnumValues` helper functions.
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/main/gotchas#iterating-over-enums
 */
export function getEnumEntries<T>(
  transpiledEnum: T,
): Array<[key: string, value: T[keyof T]]> {
  // The values cannot simply be type `T` due to the special construction of bit flag enums.
  const enumEntries: Array<[key: string, value: T[keyof T]]> = [];
  for (const [key, value] of pairs(transpiledEnum)) {
    // Ignore the reverse mappings created by TypeScriptToLua. Note that reverse mappings are not
    // created for string enums.
    if (isString(key)) {
      enumEntries.push([key, value]);
    }
  }

  // The enums will be in a random order (because of "pairs"), so sort them based on the values.
  // https://stackoverflow.com/questions/5199901/how-to-sort-an-associative-array-by-its-values-in-javascript
  enumEntries.sort(
    ([_key1, value1], [_key2, value2]) =>
      value1 < value2 ? -1 : value1 > value2 ? 1 : 0, // eslint-disable-line no-nested-ternary
  );

  return enumEntries;
}

/**
 * TypeScriptToLua will transpile TypeScript enums to Lua tables that have a double mapping. Thus,
 * when you iterate over them, you will get both the names of the enums and the values of the enums,
 * in a random order. If all you need are the keys of an enum, use this helper function.
 *
 * This function will return the enum keys in a sorted order, which may not necessarily be the same
 * order as which they were declared in.
 *
 * This function will work properly for both number enums and string enums. (Reverse mappings are
 * not created for string enums.)
 *
 * Also see the `getEnumEntries` and `getEnumValues` helper functions.
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/main/gotchas#iterating-over-enums
 */
export function getEnumKeys<T>(transpiledEnum: T): string[] {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.map(([key, _value]) => key);
}

/** Helper function to get the amount of entries inside of an enum. */
export function getEnumLength<T>(transpiledEnum: T): int {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.length;
}

/**
 * TypeScriptToLua will transpile TypeScript enums to Lua tables that have a double mapping. Thus,
 * when you iterate over them, you will get both the names of the enums and the values of the enums,
 * in a random order. If all you need are the values of an enum, use this helper function.
 *
 * This function will return the enum values in a sorted order, which may not necessarily be the
 * same order as which they were declared in.
 *
 * This function will work properly for both number enums and string enums. (Reverse mappings are
 * not created for string enums.)
 *
 * Also see the `getEnumEntries` and `getEnumKeys` helper functions.
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/main/gotchas#iterating-over-enums
 */
export function getEnumValues<T>(transpiledEnum: T): Array<T[keyof T]> {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.map(([_key, value]) => value);
}

/**
 * Helper function to get the enum value with the highest value.
 *
 * Note that this is not necessarily the enum value that is declared last, since there is no way to
 * infer that at run-time.
 */
export function getLastEnumValue<T>(transpiledEnum: T): T[keyof T] {
  const enumValues = getEnumValues(transpiledEnum);

  const lastElement = enumValues[enumValues.length - 1];
  if (lastElement === undefined) {
    error(
      "Failed to get the last value from an enum since the enum was empty.",
    );
  }

  return lastElement;
}

/**
 * Helper function to get a random value from the provided enum.
 *
 * @param transpiledEnum The enum to get the value from.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomEnumValue<T>(
  transpiledEnum: T,
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: Array<T[keyof T]> | ReadonlyArray<T[keyof T]> = [],
): T[keyof T] {
  const enumValues = getEnumValues(transpiledEnum);
  return getRandomArrayElement(enumValues, seedOrRNG, exceptions);
}

/**
 * Helper function to check every value of a custom enum for -1. Will throw an run-time error if any
 * -1 values are found. This is helpful because many methods of the Isaac class return -1 if they
 * fail.
 *
 * For example:
 *
 * ```ts
 * enum EntityTypeCustom {
 *   FOO = Isaac.GetEntityTypeByName("Foo"),
 * }
 *
 * validateCustomEnum("EntityTypeCustom", EntityTypeCustom);
 * ```
 */
export function validateCustomEnum(
  transpiledEnumName: string,
  transpiledEnum: unknown,
): void {
  for (const [key, value] of getEnumEntries(transpiledEnum)) {
    if (value === -1) {
      error(
        `Failed to find the custom enum value: ${transpiledEnumName}.${key}`,
      );
    }
  }
}

/**
 * Helper function to validate if every value in an enum is contiguous, starting at 0.
 *
 * This is useful to automate checking large enums for typos.
 */
export function validateEnumContiguous<T>(
  transpiledEnumName: string,
  transpiledEnum: T,
): void {
  const values = getEnumValues(transpiledEnum);
  const lastValue = values[values.length - 1];
  if (lastValue === undefined) {
    error(
      "Failed to validate that an enum was contiguous, since the last value was undefined.",
    );
  }
  if (typeof lastValue !== "number") {
    error(
      "Failed to validate that an enum was contiguous, since the last value was not a number.",
    );
  }

  const valuesSet = new Set(values);
  for (const value of iRange(lastValue)) {
    if (!valuesSet.has(value as unknown as T[keyof T])) {
      error(
        `Failed to find a custom enum value of ${value} for: ${transpiledEnumName}`,
      );
    }
  }
}
