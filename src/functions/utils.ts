import { RenderMode } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";

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
 * Since this is a UI element, we do not want to draw it in water reflections. `renderOffset` will
 * be a non-zero value in reflections.
 */
export function isReflectionRender(): boolean {
  const room = game.GetRoom();
  const renderMode = room.GetRenderMode();
  return renderMode === RenderMode.WATER_REFLECT;
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
 * Example:
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
 * is similar to writing a "TODO" comment, but it has the benefit of preventing early returns from
 * being automatically deleted by ESLint.
 *
 * When you see this function, it simply means that the programmer intends to add in more code to
 * this spot later.
 *
 * This function does not actually do anything. (It is an "empty" function.)
 */
export function todo(): void {}
