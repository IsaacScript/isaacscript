import { twoDimensionalSort } from "./utils";

/**
 * In a Map, you can use the `clear` method to delete every element. However, in a LuaTable, the
 * `clear` method does not exist. Use this helper function as a drop-in replacement for this.
 */
export function clearTable(table: LuaTable): void {
  for (const [key] of pairs(table)) {
    table.delete(key);
  }
}

/** Helper function to copy specific values from a object to a table. */
export function copyValuesToTable(
  object: unknown,
  keys: string[],
  table: LuaTable<string, unknown>,
): void {
  const otherTable = object as LuaTable<string, string | number>;

  for (const key of keys) {
    const value = otherTable.get(key);
    table.set(key, value);
  }
}

/**
 * Helper function to safely get boolean values from a Lua table. Will throw an error if the
 * specific value does not exist on the table.
 *
 * This function is variadic, meaning that you can specify N arguments to get N values.
 */
export function getBooleansFromTable(
  table: LuaTable<string, unknown>,
  objectName: string,
  ...keys: string[]
): boolean[] {
  const booleans: boolean[] = [];
  for (const key of keys) {
    const value = table.get(key);
    if (value === undefined) {
      error(
        `Failed to find a value for "${key}" in a table representing a "${objectName}" object.`,
      );
    }

    if (typeof value === "boolean") {
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
  table: LuaTable<string, unknown>,
  objectName: string,
  ...keys: string[]
): number[] {
  const numbers: number[] = [];
  for (const key of keys) {
    const value = table.get(key);
    if (value === undefined) {
      error(
        `Failed to find a value for "${key}" in a table representing a "${objectName}" object.`,
      );
    }

    if (typeof value === "number") {
      numbers.push(value);
    } else if (typeof value === "string") {
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
  table: LuaTable<string, unknown>,
  objectName: string,
  ...keys: string[]
): string[] {
  const strings: string[] = [];
  for (const key of keys) {
    const value = table.get(key);
    if (value === undefined) {
      error(
        `Failed to find a value for "${key}" in a table representing a "${objectName}" object.`,
      );
    }

    if (typeof value === "string") {
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
 * @param table The table to iterate over.
 * @param func The function to run for each iteration.
 * @param deterministic Optional. Whether to iterate deterministically. True by default. You can
 *                      dynamically set to false in situations where you need extra performance.
 */
export function iterateTableDeterministically<K, V>(
  table: LuaTable<K, V>,
  func: (key: K, value: V) => void,
  deterministic = true,
): void {
  // First, handle the trivial case of a non-deterministic iteration.
  if (!deterministic) {
    for (const [key, value] of pairs(table)) {
      func(key, value);
    }
    return;
  }

  // We can't sort a Lua multi-return, so we have to convert it to an array first.
  const entriesArray: Array<[K, V]> = [];
  for (const [key, value] of pairs(table)) {
    const entry: [K, V] = [key, value];
    entriesArray.push(entry);
  }

  entriesArray.sort(twoDimensionalSort);

  for (const [key, value] of entriesArray) {
    func(key, value);
  }
}

/**
 * Helper function to check if a Lua table has all of the provided keys.
 *
 * This function is variadic, meaning that you can specify as many arguments as you want to check
 * for.
 */
export function tableHasKeys(
  table: LuaTable<AnyNotNil, unknown>,
  ...keys: string[]
): boolean {
  return keys.every((key) => table.has(key));
}
