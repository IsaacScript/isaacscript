import { CornerType } from "../enums/CornerType";

/**
 * An interface representing a corner in the room.
 *
 * This is used by the `getRoomShapeCorners` helper function.
 */
export interface Corner {
  readonly type: CornerType;
  readonly position: Readonly<Vector>;
}
