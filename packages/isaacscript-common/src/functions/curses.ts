import { LevelCurse } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { hasFlag } from "./flag";

export function hasCurse(curse: LevelCurse): boolean {
  const level = game.GetLevel();
  const curses = level.GetCurses();
  return hasFlag(curses, curse);
}
