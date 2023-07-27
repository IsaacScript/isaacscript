import type { CornerType } from "../enums/CornerType";

/**
 * An interface representing a corner in the room.
 *
 * This is used by the `getRoomShapeCorners` helper function.
 */
export interface Corner {
  readonly type: CornerType;

  /** The grid index of the corresponding wall tile. */
  readonly gridIndex: int;

  /**
   * The position is not the same as the center of the corresponding grid index. Rather, it is the
   * exact position of the corner, which will be offset from the grid index position by half of a
   * grid tile.
   */
  readonly position: Readonly<Vector>;
}
