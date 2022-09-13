import { RenderMode } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { CONSOLE_COMMANDS_SET } from "../sets/consoleCommandsSet";

/**
 * Helper function to return an array with the elements from start to end. It is inclusive at the
 * start and exclusive at the end. (The "e" stands for exclusive.)
 *
 * If only one argument is specified, then it will assume that the start is 0.
 *
 * - For example, `erange(1, 3)` will return `[1, 2]`.
 * - For example, `erange(2)` will return `[0, 1]`.
 */
export function erange(start: int, end?: int): int[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const array: int[] = [];
  for (let i = start; i < end; i++) {
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
 * Helper function to return an array with the elements from start to end, inclusive. (The "i"
 * stands for inclusive.)
 *
 * If only one argument is specified, then it will assume that the start is 0.
 *
 * - For example, `irange(1, 3)` will return `[1, 2, 3]`.
 * - For example, `irange(2)` will return `[0, 1, 2]`.
 */
export function irange(start: int, end?: int): int[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const array: int[] = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }

  return array;
}

/**
 * Since this is a UI element, we do not want to draw it in water reflections. `renderOffset` will
 * be a non-zero value in reflections.
 */
export function isReflectionRender(): boolean {
  const room = game.GetRoom();
  const renderMode = room.GetRenderMode();
  return renderMode === RenderMode.WATER_REFLECT;
}

/**
 * Helper function to see if a particular command is a vanilla console command. This is useful
 * because the `EXECUTE_CMD` callback will not fire for any vanilla commands.
 */
export function isVanillaConsoleCommand(commandName: string): boolean {
  return CONSOLE_COMMANDS_SET.has(commandName);
}

/**
 * Helper function to print something to the in-game console. Use this instead of invoking the
 * `Isaac.ConsoleOutput` method directly because it will automatically insert a newline at the end
 * of the message (which `Isaac.ConsoleOutput` does not do by default).
 */
export function printConsole(msg: string): void {
  Isaac.ConsoleOutput(`${msg}\n`);
}

/** Helper function to print whether something was enabled or disabled to the in-game console. */
export function printEnabled(enabled: boolean, description: string): void {
  const enabledText = enabled ? "Enabled" : "Disabled";
  printConsole(`${enabledText} ${description}.`);
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

/**
 * Helper function to sort a two-dimensional array by the first element.
 *
 * For example:
 *
 * ```ts
 * const myArray = [[1, 2], [2, 3], [3, 4]];
 * myArray.sort(twoDimensionalSort);
 * ```
 *
 * From:
 * https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
 */
export function twoDimensionalSort<T>(array1: T[], array2: T[]): -1 | 0 | 1 {
  const firstElement1 = array1[0];
  const firstElement2 = array2[0];

  if (firstElement1 === undefined || firstElement1 === null) {
    error(
      "Failed to two-dimensional sort since the first element of the first array was undefined.",
    );
  }

  if (firstElement2 === undefined || firstElement2 === null) {
    error(
      "Failed to two-dimensional sort since the first element of the second array was undefined.",
    );
  }

  if (firstElement1 === firstElement2) {
    return 0;
  }

  return firstElement1 < firstElement2 ? -1 : 1;
}
