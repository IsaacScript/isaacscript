const HEX_STRING_LENGTH = 6;

/**
 * Using a Set constructor to copy a Set does not seem to work properly, so this helper function is
 * used instead.
 */
export function copySet<T>(oldSet: Set<T>): Set<T> {
  const newSet = new Set<T>();
  for (const value of oldSet.values()) {
    newSet.add(value);
  }

  return newSet;
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
 * @param hexString A hex string like "#ffffff".
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

export function isGreedMode(): boolean {
  const game = Game();

  return (
    game.Difficulty === Difficulty.DIFFICULTY_GREED ||
    game.Difficulty === Difficulty.DIFFICULTY_GREEDIER
  );
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
 * In a Map, you can use the `clear` method to delete every element. However, in a LuaTable, the
 * `clear` method does not exist. Use this helper function as a drop-in replacement for this.
 */
export function tableClear(table: LuaTable): void {
  for (const [key] of pairs(table)) {
    table.delete(key);
  }
}

/**
 * Helper function to change the current room. It can be used for both teleportation and "normal"
 * room transitions, depending on what is passed for the `direction` and `roomTransitionAnim`
 * arguments. Use this function instead of invoking `Game.StartRoomTransition()` directly so that
 * you don't forget to set `Level.LeaveDoor` property.
 *
 * @param roomIndex The room index of the destination room.
 * @param direction Optional. Default is `Direction.NO_DIRECTION`.
 * @param roomTransitionAnim Optional. Default is `RoomTransitionAnim.TELEPORT`.
 */
export function teleport(
  roomIndex: int,
  direction = Direction.NO_DIRECTION,
  roomTransitionAnim = RoomTransitionAnim.TELEPORT,
): void {
  const game = Game();
  const level = game.GetLevel();

  // This must be set before every `Game.StartRoomTransition()` invocation or else the function can
  // send you to the wrong room
  level.LeaveDoor = -1;

  game.StartRoomTransition(roomIndex, direction, roomTransitionAnim);
}
