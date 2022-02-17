const HEX_STRING_LENGTH = 6;

/**
 * Using a Map constructor to copy a Map does not seem to work properly, so use this helper function
 * instead.
 */
export function copyMap<K, V>(oldMap: Map<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap.entries()) {
    newMap.set(key, value);
  }

  return newMap;
}

/**
 * Helper function to get type safety on a switch statement.
 * Very useful to be future-safe against people adding values to a type or an enum.
 *
 * Example:
 * ```
 * enum Situations {
 *   Situation1,
 *   Situation2,
 *   Situation3,
 *   // Situation4, // If we uncomment this line, the program will no longer compile
 * }
 *
 * function doThingBasedOnSituation(situation: Situation) {
 *   switch (situation) {
 *     case Situation1: {
 *       return 41;
 *     }
 *
 *     case Situation2: {
 *       return 68;
 *     }
 *
 *     case Situation3: {
 *       return 12;
 *     }
 *
 *     default: {
 *       ensureAllCases(situation);
 *       return 0;
 *     }
 *   }
 * }
 * ```
 */
export const ensureAllCases = (obj: never): never => obj;

/**
 * TypeScriptToLua will transpile TypeScript enums to Lua tables that have a double mapping. Thus,
 * when you iterate over them, you will get both the names of the enums and the values of the enums,
 * in a random order. If all you need are the values of an enum, use this helper function.
 *
 * For a more in depth explanation, see:
 * https://isaacscript.github.io/docs/gotchas#iterating-over-enums
 */
export function getEnumValues(transpiledEnum: unknown): int[] {
  const enumValues: int[] = [];
  for (const [key, value] of pairs(transpiledEnum)) {
    // Ignore the reverse mappings created by TypeScriptToLua
    if (type(key) === "string") {
      enumValues.push(value);
    }
  }

  // The enums will be in a random order, so sort them
  enumValues.sort();

  return enumValues;
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
 * Whether or not the player is playing on a set seed (i.e. that they entered in a specific seed by
 * pressing tab on the character selection screen). When the player resets the game on a set seed,
 * the game will not switch to a different seed.
 */
export function onSetSeed(): boolean {
  const game = Game();
  const seeds = game.GetSeeds();
  const customRun = seeds.IsCustomRun();
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.CHALLENGE_NULL && customRun;
}

/**
 * Helper function to print something to the in-game console. Use this instead of invoking
 * `Isaac.ConsoleOutput()` directly because it will automatically insert a newline at the end of the
 * message (which `Isaac.ConsoleOutput()` does not do by default).
 */
export function printConsole(msg: string): void {
  Isaac.ConsoleOutput(`${msg}\n`);
}

/**
 * In a Map, you can use the `clear` method to delete every element. However, in a LuaTable, the
 * `clear` method does not exist. Use this helper function as a drop-in replacement for this.
 */
export function tableClear(table: LuaTable): void {
  for (const [key] of pairs(table)) {
    table.delete(key);
  }
}

/** Helper function to trim a prefix from a string, if it exists. Returns the trimmed string. */
export function trimPrefix(string: string, prefix: string): string {
  if (!string.startsWith(prefix)) {
    return string;
  }

  return string.slice(prefix.length);
}
