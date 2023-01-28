import { Direction } from "isaac-typescript-definitions";

export const DIRECTION_TO_DEGREES = {
  [Direction.NO_DIRECTION]: 0, // -1
  [Direction.LEFT]: 180, // 0
  [Direction.UP]: 270, // 1
  [Direction.RIGHT]: 0, // 2
  [Direction.DOWN]: 90, // 3
} as const satisfies Record<Direction, int>;
