import { Direction } from "isaac-typescript-definitions";
import { HasAllEnumKeys } from "../types/HasAllEnumKeys";

export const DIRECTION_NAMES = {
  [Direction.NO_DIRECTION]: undefined, // -1
  [Direction.LEFT]: "left", // 0
  [Direction.UP]: "up", // 1
  [Direction.RIGHT]: "right", // 2
  [Direction.DOWN]: "down", // 3
} as const satisfies HasAllEnumKeys<Direction, string | undefined>;
