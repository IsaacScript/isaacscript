import { RenderMode } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { CONSOLE_COMMANDS_SET } from "../sets/consoleCommandsSet";

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
 * `newObjectWithEnumKeys` helper function instead.
 */
export function validateInterfaceMatchesEnum<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends Record<Enum, unknown>,
  Enum extends string | number,
>(): void {}
