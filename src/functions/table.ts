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
 * Helper function to check if a Lua table has all of the provided keys.
 *
 * This function is variadic, meaning that you can specify as many arguments as you want to check
 * for.
 */
export function tableHasKeys(table: LuaTable, ...keys: string[]): boolean {
  return keys.every((key) => table.has(key));
}
