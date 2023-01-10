import { ButtonAction, Direction } from "isaac-typescript-definitions";
import { HasAllEnumKeys } from "../types/HasAllEnumKeys";

export const DIRECTION_TO_SHOOT_ACTION = {
  [Direction.NO_DIRECTION]: undefined, // -1
  [Direction.LEFT]: ButtonAction.SHOOT_LEFT, // 0
  [Direction.UP]: ButtonAction.SHOOT_UP, // 1
  [Direction.RIGHT]: ButtonAction.SHOOT_RIGHT, // 2
  [Direction.DOWN]: ButtonAction.SHOOT_DOWN, // 3
} as const satisfies HasAllEnumKeys<Direction, ButtonAction | undefined>;
