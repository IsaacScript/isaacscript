import { ReadonlySet } from "../types/ReadonlySet";
import { getAllPlayers } from "./playerIndex";
import { isFunction } from "./types";

/**
 * Helper function to throw an error (using the `error` Lua function) if the provided value is equal
 * to `undefined`.
 *
 * This is useful to have TypeScript narrow a `T | undefined` value to `T` in a concise way.
 */
export function assertDefined<T>(
  value: T,
  ...[msg]: [undefined] extends [T]
    ? [string]
    : [
        "The assertion is useless because the provided value does not contain undefined.",
      ]
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    error(msg);
  }
}

/**
 * Helper function to throw an error (using the `error` Lua function) if the provided value is equal
 * to `null`.
 *
 * This is useful to have TypeScript narrow a `T | null` value to `T` in a concise way.
 */
export function assertNotNull<T>(
  value: T,
  ...[msg]: [null] extends [T]
    ? [string]
    : [
        "The assertion is useless because the provided value does not contain null.",
      ]
): asserts value is Exclude<T, null> {
  if (value === null) {
    error(msg);
  }
}

/**
 * Helper function to return an array of integers with the specified range, inclusive on the lower
 * end and exclusive on the high end. (The "e" in the function name stands for exclusive.) Thus,
 * this function works in a similar way as the built-in `range` function from Python.
 *
 * If the end is lower than the start, an empty array will be returned.
 *
 * For example:
 *
 * - `eRange(2)` returns `[0, 1]`.
 * - `eRange(3)` returns `[0, 1, 2]`.
 * - `eRange(-3)` returns `[0, -1, -2]`.
 * - `eRange(1, 3)` returns `[1, 2]`.
 * - `eRange(2, 5)` returns `[2, 3, 4]`.
 *
 * @param start The integer to start at.
 * @param end Optional. The integer to end at. If not specified, then the start will be 0 and the
 *            first argument will be the end.
 * @param increment Optional. The increment to use. Default is 1.
 */
export function eRange(start: int, end?: int, increment = 1): readonly int[] {
  if (end === undefined) {
    return eRange(0, start, increment);
  }

  const array: int[] = [];

  for (let i = start; i < end; i += increment) {
    array.push(i);
  }

  return array;
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
 * Helper function to return an array of integers with the specified range, inclusive on both ends.
 * (The "i" in the function name stands for inclusive.)
 *
 * If the end is lower than the start, an empty array will be returned.
 *
 * For example:
 *
 * - `iRange(2)` returns `[0, 1, 2]`.
 * - `iRange(3)` returns `[0, 1, 2, 3]`.
 * - `iRange(-3)` returns `[0, -1, -2, -3]`.
 * - `iRange(1, 3)` returns `[1, 2, 3]`.
 * - `iRange(2, 5)` returns `[2, 3, 4, 5]`.
 * - `iRange(5, 2)` returns `[5, 4, 3, 2]`.
 *
 * @param start The integer to start at.
 * @param end Optional. The integer to end at. If not specified, then the start will be 0 and the
 *            first argument will be the end.
 * @param increment Optional. The increment to use. Default is 1.
 */
export function iRange(start: int, end?: int, increment = 1): readonly int[] {
  if (end === undefined) {
    return iRange(0, start, increment);
  }

  return eRange(start, end + 1, increment);
}

/**
 * Helper function to check if a variable is within a certain range, inclusive on both ends.
 *
 * - For example, `inRange(1, 1, 3)` will return `true`.
 * - For example, `inRange(0, 1, 3)` will return `false`.
 *
 * @param num The number to check.
 * @param start The start of the range to check.
 * @param end The end of the range to check.
 */
export function inRange(num: int, start: int, end: int): boolean {
  return num >= start && num <= end;
}

/**
 * Helper function to detect if there is two or more players currently playing.
 *
 * Specifically, this function looks for unique `ControllerIndex` values across all players.
 *
 * This function is not safe to use in the `POST_PLAYER_INIT` callback, because the
 * `ControllerIndex` will not be set properly. As a workaround, you can use it in the
 * `POST_PLAYER_INIT_FIRST` callback (or some other callback like `POST_UPDATE`).
 */
export function isMultiplayer(): boolean {
  const players = getAllPlayers();
  const controllerIndexes = players.map((player) => player.ControllerIndex);
  const controllerIndexesSet = new ReadonlySet(controllerIndexes);

  return controllerIndexesSet.size > 1;
}

/**
 * Helper function to check if the player is using Afterbirth+ or Repentance.
 *
 * This function should always be used over the `REPENTANCE` constant, since the latter is not safe.
 *
 * Specifically, this function checks for the `Sprite.GetAnimation` method:
 * https://bindingofisaacrebirth.fandom.com/wiki/V1.06.J818#Lua_Changes
 */
export function isRepentance(): boolean {
  const metatable = getmetatable(Sprite) as LuaMap<string, unknown> | undefined;
  assertDefined(
    metatable,
    "Failed to get the metatable of the Sprite global table.",
  );

  const classTable = metatable.get("__class") as
    | LuaMap<string, unknown>
    | undefined;
  assertDefined(
    classTable,
    'Failed to get the "__class" key of the Sprite metatable.',
  );

  const getAnimation = classTable.get("GetAnimation");
  return isFunction(getAnimation);
}

/**
 * Helper function to repeat code N times. This is faster to type and cleaner than using a for loop.
 *
 * For example:
 *
 * ```ts
 * const player = Isaac.GetPlayer();
 * repeat(10, () => {
 *   player.AddCollectible(CollectibleType.STEVEN);
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
export function repeat(num: int, func: (i: int) => void): void {
  for (let i = 0; i < num; i++) {
    func(i);
  }
}

/**
 * Helper function to signify that the enclosing code block is not yet complete. Using this function
 * is similar to writing a "TODO" comment, but it has the benefit of preventing ESLint errors due to
 * unused variables or early returns.
 *
 * When you see this function, it simply means that the programmer intends to add in more code to
 * this spot later.
 *
 * This function is variadic, meaning that you can pass as many arguments as you want. (This is
 * useful as a means to prevent unused variables.)
 *
 * This function does not actually do anything. (It is an "empty" function.)
 *
 * @allowEmptyVariadic
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export function todo(...args: readonly unknown[]): void {}
