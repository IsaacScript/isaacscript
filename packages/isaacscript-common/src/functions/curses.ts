import type { LevelCurse } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { hasFlag } from "./flag";

/**
 * Helper function to get the actual bit flag for modded curses.
 *
 * Will throw a run-time error if the provided curse does not exist.
 *
 * Use this over the `Isaac.GetCurseIdByName` method because that will return an integer instead of
 * a bit flag.
 */
export function getCurseIDByName(name: string): LevelCurse {
  const curseID = Isaac.GetCurseIdByName(name);
  if (curseID === -1) {
    error(
      `Failed to get the curse ID corresponding to the curse name of "${curseID}". Does this name match what you put in the "content/curses.xml" file?`,
    );
  }

  // For example, the final vanilla curse is "Curse of the Giant", which has an ID of 8. This
  // corresponds to `LevelCurse.GIANT`, which has a value of `1 << 7`.
  return (1 << (curseID - 1)) as LevelCurse;
}

export function hasCurse(curse: LevelCurse): boolean {
  const level = game.GetLevel();
  const curses = level.GetCurses();
  return hasFlag(curses, curse);
}
