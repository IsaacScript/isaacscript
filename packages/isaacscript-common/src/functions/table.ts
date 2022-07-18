import { isBoolean, isNumber, isString } from "./types";

/**
 * In a Map, you can use the `clear` method to delete every element. However, in a LuaTable, the
 * `clear` method does not exist. Use this helper function as a drop-in replacement for this.
 */
export function clearTable(luaTable: LuaTable): void {
  for (const [key] of pairs(luaTable)) {
    luaTable.delete(key);
  }
}

/** Helper function to copy specific values from a object to a table. */
export function copyValuesToTable(
  object: unknown,
  keys: string[],
  luaTable: LuaTable<string, unknown>,
): void {
  const otherTable = object as LuaTable<string, string | number>;

  for (const key of keys) {
    const value = otherTable.get(key);
    luaTable.set(key, value);
  }
}

/**
 * Helper function to safely get boolean values from a Lua table. Will throw an error if the
 * specific value does not exist on the table.
 *
 * This function is variadic, meaning that you can specify N arguments to get N values.
 */
export function getBooleansFromTable(
  luaTable: LuaTable<string, unknown>,
  objectName: string,
  ...keys: string[]
): boolean[] {
  const booleans: boolean[] = [];
  for (const key of keys) {
    const value = luaTable.get(key);
    if (value === undefined) {
      error(
        `Failed to find a value for "${key}" in a table representing a "${objectName}" object.`,
      );
    }

    if (isBoolean(value)) {
      booleans.push(value);
    } else {
      error(
        `Failed to get the boolean for the "${key}" value of a table representing a "${objectName}" object because the type was: ${typeof value}`,
      );
    }
  }

  return booleans;
}

/**
 * Helper function to safely get number values from a Lua table. Will throw an error if the specific
 * value does not exist on the table or if it cannot be converted to a number.
 *
 * This function is variadic, meaning that you can specify N arguments to get N values.
 */
export function getNumbersFromTable(
  luaTable: LuaTable<string, unknown>,
  objectName: string,
  ...keys: string[]
): number[] {
  const numbers: number[] = [];
  for (const key of keys) {
    const value = luaTable.get(key);
    if (value === undefined) {
      error(
        `Failed to find a value for "${key}" in a table representing a "${objectName}" object.`,
      );
    }

    if (isNumber(value)) {
      numbers.push(value);
    } else if (isString(value)) {
      const number = tonumber(value);
      if (number === undefined) {
        error(
          `Failed to convert the "${key}" value of a table representing a "${objectName}" object to a number: ${value}`,
        );
      }
      numbers.push(number);
    } else {
      error(
        `Failed to get the number for the "${key}" value of a table representing a "${objectName}" object because the type was: ${typeof value}`,
      );
    }
  }

  return numbers;
}

/**
 * Helper function to safely get string values from a Lua table. Will throw an error if the specific
 * value does not exist on the table.
 *
 * This function is variadic, meaning that you can specify N arguments to get N values.
 */
export function getStringsFromTable(
  luaTable: LuaTable<string, unknown>,
  objectName: string,
  ...keys: string[]
): string[] {
  const strings: string[] = [];
  for (const key of keys) {
    const value = luaTable.get(key);
    if (value === undefined) {
      error(
        `Failed to find a value for "${key}" in a table representing a "${objectName}" object.`,
      );
    }

    if (isString(value)) {
      strings.push(value);
    } else {
      const string = tostring(value);
      strings.push(string);
    }
  }

  return strings;
}

/**
 * Helper function to iterate over a table deterministically. This is useful because by default, the
 * `pairs` function will return the keys of a Lua table in a random order.
 *
 * This function will sort the table entries based on the value of the key.
 *
 * This function will only work on tables that have number keys or string keys. It will throw a
 * run-time error if it encounters a key of another type.
 *
 * @param luaTable The table to iterate over.
 * @param func The function to run for each iteration.
 * @param inOrder Optional. Whether to iterate in order. True by default. You can dynamically set to
 *                false in situations where iterating randomly would not matter and you need the
 *                extra performance.
 */
export function iterateTableInOrder<K, V>(
  luaTable: LuaTable<K, V>,
  func: (key: K, value: V) => void,
  inOrder = true,
): void {
  // First, handle the trivial case of a non-deterministic iteration.
  if (!inOrder) {
    for (const [key, value] of pairs(luaTable)) {
      func(key, value);
    }
    return;
  }

  const keys = Object.keys(luaTable);
  const hasAllNumberKeys = keys.every((key) => isNumber(key));
  const hasAllStringKeys = keys.every((key) => isString(key));
  if (!hasAllNumberKeys && !hasAllStringKeys) {
    // Since the table has non-homogenous keys, we won't be able to sort it. Revert to
    // non-deterministic iteration in this case.
    for (const [key, value] of pairs(luaTable)) {
      func(key, value);
    }
    return;
  }
  keys.sort();

  for (const key of keys) {
    const keyIndex = key as unknown as K;
    const value = luaTable.get(keyIndex);
    func(keyIndex, value);
  }
}

/**
 * Helper function to check if a Lua table has all of the provided keys.
 *
 * This function is variadic, meaning that you can specify as many arguments as you want to check
 * for.
 */
export function tableHasKeys(
  luaTable: LuaTable<AnyNotNil, unknown>,
  ...keys: string[]
): boolean {
  return keys.every((key) => luaTable.has(key));
}
