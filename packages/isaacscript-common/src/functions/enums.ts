import { ReadonlySet } from "../types/ReadonlySet";
import { getRandomArrayElement } from "./array";
import { getRandomSeed } from "./rng";
import { isNumber, isString } from "./types";
import { assertDefined, iRange } from "./utils";

/**
 * TypeScriptToLua will transpile TypeScript number enums to Lua tables that have a double mapping.
 * Thus, when you iterate over them, you will get both the names of the enums and the values of the
 * enums, in a random order. Use this helper function to get the entries of the enum with the
 * reverse mappings filtered out.
 *
 * This function will return the enum values in a sorted order, which may not necessarily be the
 * same order as which they were declared in. (It is impossible to get the declaration order at
 * run-time.)
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
 * TypeScriptToLua will transpile TypeScript number enums to Lua tables that have a double mapping.
 * Thus, when you iterate over them, you will get both the names of the enums and the values of the
 * enums, in a random order. If all you need are the keys of an enum, use this helper function.
 *
 * This function will return the enum keys in a sorted order, which may not necessarily be the same
 * order as which they were declared in. (It is impossible to get the declaration order at
 * run-time.)
 *
 * This function will work properly for both number enums and string enums. (Reverse mappings are
 * not created for string enums.)
 *
 * Also see the `getEnumEntries` and `getEnumValues` helper functions.
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/main/gotchas#iterating-over-enums
 */
export function getEnumKeys(
  transpiledEnum: Record<string | number, string | number>,
): string[] {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.map(([key, _value]) => key);
}

/** Helper function to get the amount of entries inside of an enum. */
export function getEnumLength(
  transpiledEnum: Record<string | number, string | number>,
): int {
  const enumEntries = getEnumEntries(transpiledEnum);
  return enumEntries.length;
}

/**
 * TypeScriptToLua will transpile TypeScript number enums to Lua tables that have a double mapping.
 * Thus, when you iterate over them, you will get both the names of the enums and the values of the
 * enums, in a random order. If all you need are the names of an enum from the reverse mapping, use
 * this helper function.
 *
 * This function will return the enum names in a sorted order, which may not necessarily be the same
 * order as which they were declared in. (It is impossible to get the declaration order at
 * run-time.)
 *
 * This function will work properly for both number enums and string enums. (Reverse mappings are
 * not created for string enums, so their names would be equivalent to what would be returned by the
 * `getEnumKeys` function.)
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/main/gotchas#iterating-over-enums
 */
export function getEnumNames(
  transpiledEnum: Record<string | number, string | number>,
): string[] {
  const enumNames: string[] = [];

  for (const [key, _value] of pairs(transpiledEnum)) {
    if (isString(key)) {
      enumNames.push(key);
    }
  }

  // The enum names will be in a random order (because of "pairs"), so sort them.
  enumNames.sort();

  return enumNames;
}

/**
 * TypeScriptToLua will transpile TypeScript number enums to Lua tables that have a double mapping.
 * Thus, when you iterate over them, you will get both the names of the enums and the values of the
 * enums, in a random order. If all you need are the values of an enum, use this helper function.
 *
 * This function will return the enum values in a sorted order, which may not necessarily be the
 * same order as which they were declared in. (It is impossible to get the declaration order at
 * run-time.)
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
 * Note that this is not necessarily the enum value that is declared last in the code, since there
 * is no way to infer that at run-time.
 *
 * Throws an error if the provided enum is empty.
 */
export function getHighestEnumValue<T>(transpiledEnum: T): T[keyof T] {
  const enumValues = getEnumValues(transpiledEnum);

  const lastElement = enumValues.at(-1);
  assertDefined(
    lastElement,
    "Failed to get the last value from an enum since the enum was empty.",
  );

  return lastElement;
}

/**
 * Helper function to get the enum value with the lowest value.
 *
 * Note that this is not necessarily the enum value that is declared first in the code, since there
 * is no way to infer that at run-time.
 *
 * Throws an error if the provided enum is empty.
 */
export function getLowestEnumValue<T>(transpiledEnum: T): T[keyof T] {
  const enumValues = getEnumValues(transpiledEnum);

  const firstElement = enumValues[0];
  assertDefined(
    firstElement,
    "Failed to get the first value from an enum since the enum was empty.",
  );

  return firstElement;
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

/** Helper function to validate that a particular value exists inside of an enum. */
export function isEnumValue<T extends Record<string, number | string>>(
  value: number | string,
  transpiledEnum: T,
): value is T[keyof T] {
  const enumValues = getEnumValues(transpiledEnum);
  return enumValues.includes(value as T[keyof T]);
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
 * Helper function to validate if every value in a number enum is contiguous, starting at 0.
 *
 * This is useful to automate checking large enums for typos.
 */
export function validateEnumContiguous<T>(
  transpiledEnumName: string,
  transpiledEnum: T,
): void {
  const values = getEnumValues(transpiledEnum);
  const lastValue = values.at(-1);
  assertDefined(
    lastValue,
    "Failed to validate that an enum was contiguous, since the last value was undefined.",
  );

  if (!isNumber(lastValue)) {
    error(
      "Failed to validate that an enum was contiguous, since the last value was not a number.",
    );
  }

  const valuesSet = new ReadonlySet(values);
  for (const value of iRange(lastValue)) {
    if (!valuesSet.has(value as unknown as T[keyof T])) {
      error(
        `Failed to find a custom enum value of ${value} for: ${transpiledEnumName}`,
      );
    }
  }
}

/**
 * Helper function to validate that an interface contains all of the keys of an enum. You must
 * specify both generic parameters in order for this to work properly (i.e. the interface and then
 * the enum).
 *
 * For example:
 *
 * ```ts
 * enum MyEnum {
 *   Value1,
 *   Value2,
 *   Value3,
 * }
 *
 * interface MyEnumToType {
 *   [MyEnum.Value1]: boolean;
 *   [MyEnum.Value2]: number;
 *   [MyEnum.Value3]: string;
 * }
 *
 * validateInterfaceMatchesEnum<MyEnumToType, MyEnum>();
 * ```
 *
 * This function is only meant to be used with interfaces (i.e. types that will not exist at
 * run-time). If you are generating an object that will contain all of the keys of an enum, use the
 * `satisfies` operator with the `Record` type instead.
 */
export function validateInterfaceMatchesEnum<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends Record<Enum, unknown>,
  Enum extends string | number,
>(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
