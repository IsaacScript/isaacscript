import { Direction } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { newReadonlyVector } from "../functions/readOnly";

export const DIRECTION_TO_VECTOR = {
  [Direction.NO_DIRECTION]: VectorZero, // -1
  [Direction.LEFT]: newReadonlyVector(-1, 0), // 0
  [Direction.UP]: newReadonlyVector(0, -1), // 1
  [Direction.RIGHT]: newReadonlyVector(1, 0), // 2
  [Direction.DOWN]: newReadonlyVector(0, 1), // 3
} as const satisfies Record<Direction, Readonly<Vector>>;
