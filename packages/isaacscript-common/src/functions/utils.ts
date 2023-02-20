import { RenderMode } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { getAllPlayers } from "./playerIndex";
import { isFunction } from "./types";

/**
 * Helper function to return an array of integers with the specified range, inclusive on the lower
 * end and exclusive on the high end. (The "e" stands for exclusive.)
 *
 * - For example, `eRange(1, 3)` will return `[1, 2]`.
 * - For example, `eRange(2)` will return `[0, 1]`.
 *
 * @param start The integer to start at.
 * @param end Optional. The integer to end at. If not specified, then the start will be 0 and the
 *            first argument will be the end.
 * @param increment Optional. The increment to use. Default is 1.
 */
export function eRange(start: int, end?: int, increment = 1): int[] {
  if (end === undefined) {
    return eRange(0, start);
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
 * (The "i" stands for inclusive.)
 *
 * - For example, `iRange(1, 3)` will return `[1, 2, 3]`.
 * - For example, `iRange(2)` will return `[0, 1, 2]`.
 *
 * @param start The integer to start at.
 * @param end Optional. The integer to end at. If not specified, then the start will be 0 and the
 *            first argument will be the end.
 * @param increment Optional. The increment to use. Default is 1.
 */
export function iRange(start: int, end?: int, increment = 1): int[] {
  if (end === undefined) {
    return iRange(0, start);
  }

  const exclusiveEnd = end + 1;
  return eRange(start, exclusiveEnd, increment);
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
 * Specifically, this function looks for unique `ControllerIndex` across all players.
 */
export function isMultiplayer(): boolean {
  const players = getAllPlayers();
  const controllerIndexes = players.map((player) => player.ControllerIndex);
  const controllerIndexesSet = new Set(controllerIndexes);

  return controllerIndexesSet.size > 1;
}

/**
 * Helper function to see if the current render callback is rendering a water reflection.
 *
 * When the player is in a room with water, things will be rendered twice: once for the normal
 * rendering, and once for the reflecting rendering. Thus, any mod code in a render callback will
 * run twice per frame in these situations, which may be unexpected or cause bugs.
 *
 * This function is typically used to early return from a render function if it returns true.
 */
export function isReflectionRender(): boolean {
  const room = game.GetRoom();
  const renderMode = room.GetRenderMode();
  return renderMode === RenderMode.WATER_REFLECT;
}

/**
 * Helper function to check if the player is using Afterbirth+ or Repentance.
 *
 * This function should always be used over the `REPENTANCE` constant, since it is not safe.
 *
 * Specifically, this function checks for the `Sprite.GetAnimation` method:
 * https://bindingofisaacrebirth.fandom.com/wiki/V1.06.J818#Lua_Changes
 */
export function isRepentance(): boolean {
  const metatable = getmetatable(Sprite) as LuaMap<string, unknown> | undefined;
  if (metatable === undefined) {
    error("Failed to get the metatable of the Sprite global table.");
  }

  const classTable = metatable.get("__class") as
    | LuaMap<string, unknown>
    | undefined;
  if (classTable === undefined) {
    error('Failed to get the "__class" key of the Sprite metatable.');
  }

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
export function repeat(n: int, func: (i: int) => void): void {
  for (let i = 0; i < n; i++) {
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
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function todo(...args: unknown[]): void {}
