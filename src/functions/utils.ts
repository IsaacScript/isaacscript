import { DIRECTION_NAMES } from "../objects/directionNames";

const HEX_STRING_LENGTH = 6;

/**
 * Helper function to get type safety on a switch statement.
 *
 * Very useful to be future-safe against people adding values to a type or an enum.
 *
 * Example:
 * ```ts
 * enum Situation {
 *   ONE,
 *   TWO,
 *   THREE,
 *   // FOUR, // If we uncomment this line, the program will no longer compile
 * }
 *
 * function handleSituation(situation: Situation) {
 *   switch (situation) {
 *     case Situation.ONE: {
 *       return 41;
 *     }
 *
 *     case Situation.TWO: {
 *       return 68;
 *     }
 *
 *     case Situation.THREE: {
 *       return 12;
 *     }
 *
 *     default: {
 *       return ensureAllCases(situation);
 *     }
 *   }
 * }
 * ```
 */
export const ensureAllCases = (obj: never): never => obj;

export function getDirectionName(direction: Direction): string | undefined {
  return DIRECTION_NAMES[direction];
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
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/docs/gotchas#iterating-over-enums
 */
export function getEnumKeys<T>(transpiledEnum: T): string[] {
  const enumKeys: string[] = [];
  for (const [key] of pairs(transpiledEnum)) {
    // Ignore the reverse mappings created by TypeScriptToLua
    // Note that reverse mappings are not created for string enums
    if (typeof key === "string") {
      enumKeys.push(key);
    }
  }

  // The enums will be in a random order (because of "pairs"), so sort them
  enumKeys.sort();

  return enumKeys;
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
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/docs/gotchas#iterating-over-enums
 *
 * You can also use this function for vanilla enums, which can make code easier to read than using
 * `pairs` or `Object.values`.
 */
export function getEnumValues<T>(transpiledEnum: T): Array<T[keyof T]> {
  const enumValues: Array<T[keyof T]> = [];
  for (const [key, value] of pairs(transpiledEnum)) {
    // Ignore the reverse mappings created by TypeScriptToLua
    // Note that reverse mappings are not created for string enums
    if (typeof key === "string") {
      enumValues.push(value);
    }
  }

  // The enums will be in a random order (because of "pairs"), so sort them
  enumValues.sort();

  return enumValues;
}

/**
 * Helper function to log what is happening in functions that recursively move through nested data
 * structures.
 */
export function getTraversalDescription(
  key: unknown,
  traversalDescription: string,
): string {
  if (traversalDescription !== "") {
    traversalDescription += " --> ";
  }

  traversalDescription += tostring(key);

  return traversalDescription;
}

/**
 * Converts a hex string like "#33aa33" to a KColor object.
 *
 * @param hexString A hex string like "#ffffff" or "ffffff". (The "#" character is optional.)
 */
export function hexToKColor(hexString: string, alpha: float): KColor {
  hexString = hexString.replace("#", "");
  if (hexString.length !== HEX_STRING_LENGTH) {
    error(`Hex strings must be of length ${HEX_STRING_LENGTH}.`);
  }

  const rString = hexString.substr(0, 2);
  const R = tonumber(`0x${rString}`);
  if (R === undefined) {
    error(`Failed to convert \`0x${rString}\` to a number.`);
  }

  const gString = hexString.substr(2, 2);
  const G = tonumber(`0x${gString}`);
  if (G === undefined) {
    error(`Failed to convert \`0x${gString}\` to a number.`);
  }

  const bString = hexString.substr(4, 2);
  const B = tonumber(`0x${bString}`);
  if (B === undefined) {
    error(`Failed to convert \`0x${bString}\` to a number.`);
  }

  // KColor values should be between 0 and 1
  const base = 255;
  return KColor(R / base, G / base, B / base, alpha);
}

/**
 * Players can boot the game with an launch option called "--luadebug", which will enable additional
 * functionality that is considered to be unsafe. For more information about this flag, see the
 * wiki: https://bindingofisaacrebirth.fandom.com/wiki/Launch_Options
 *
 * When this flag is enabled, the global environment will be slightly different. The differences are
 * documented here: https://wofsauge.github.io/IsaacDocs/rep/Globals.html
 *
 * This function uses the `package` global variable as a proxy to determine if the "--luadebug" flag
 * is enabled or not.
 */
export function isLuaDebugEnabled(): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return package !== undefined;
}

/**
 * Since this is a UI element, we do not want to draw it in water reflections. `renderOffset` will
 * be a non-zero value in reflections.
 */
export function isReflectionRender(renderOffset: Vector): boolean {
  // We cannot use the "vectorEquals" helper function because floating point numbers cause
  // "Vector.Zero" to be represented as "(1.52587890625e-05, 0.0)"
  const x = Math.round(renderOffset.X);
  const y = Math.round(renderOffset.Y);
  return x !== 0 || y !== 0;
}

/**
 * Helper function to print something to the in-game console. Use this instead of invoking the
 * `Isaac.ConsoleOutput` method directly because it will automatically insert a newline at the end
 * of the message (which `Isaac.ConsoleOutput` does not do by default).
 */
export function printConsole(msg: string): void {
  Isaac.ConsoleOutput(`${msg}\n`);
}

/**
 * Helper function to repeat code N times. This is faster to type and cleaner than using a for loop.
 *
 * Example:
 * ```ts
 * const player = Isaac.GetPlayer();
 * repeat(10, () => {
 *   player.AddCollectible(CollectibleType.COLLECTIBLE_STEVEN);
 * });
 * ```
 *
 * The repeated function is passed the index of the iteration, if needed:
 *
 * ```ts
 * repeat(3, (i) => {
 *   print(i); // Prints "0", "1", "2"
 * });
 * ```
 */
export function repeat(n: int, func: (i: int) => void): void {
  for (let i = 0; i < n; i++) {
    func(i);
  }
}

/**
 * Helper function to check every value of a custom enum for -1. This is helpful as a run-time check
 * because many methods of the Isaac class return -1 if they fail.
 *
 * Example:
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
  const customEnumType = type(transpiledEnum);
  if (customEnumType !== "table") {
    return;
  }

  // We don't use the "getEnumValues" helper function because we want to know the name of the key
  // that is invalid
  const table = transpiledEnum as LuaTable<AnyNotNil, unknown>;
  const keys = Object.keys(table).filter((key) => typeof key === "string");
  keys.sort();

  for (const key of keys) {
    const value = table.get(key);
    if (value === -1) {
      error(`Failed to find: ${transpiledEnumName}.${key}`);
    }
  }
}
