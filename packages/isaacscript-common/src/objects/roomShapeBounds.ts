import { RoomShape } from "isaac-typescript-definitions";
import {
  NARROW_CONTENTS_HEIGHT,
  NARROW_CONTENTS_WIDTH,
  ONE_BY_ONE_CONTENTS_HEIGHT,
  ONE_BY_ONE_CONTENTS_WIDTH,
} from "./roomShapeVolumes";

const TWO_BY_TWO_BOUNDS = Vector(
  ONE_BY_ONE_CONTENTS_WIDTH * 2,
  ONE_BY_ONE_CONTENTS_HEIGHT * 2,
);

/**
 * The size of a room shape's contents. This does not include the tiles that the walls are on. L
 * rooms use the same bounds as a 2x2 room.
 */
export const ROOM_SHAPE_BOUNDS: {
  readonly [key in RoomShape]: Vector;
} = {
  // 1
  [RoomShape.SHAPE_1x1]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT,
  ),

  // 2
  [RoomShape.IH]: Vector(ONE_BY_ONE_CONTENTS_WIDTH, NARROW_CONTENTS_HEIGHT),

  // 3
  [RoomShape.IV]: Vector(NARROW_CONTENTS_WIDTH, ONE_BY_ONE_CONTENTS_HEIGHT),

  // 4
  [RoomShape.SHAPE_1x2]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT * 2,
  ),

  // 5
  [RoomShape.IIV]: Vector(
    NARROW_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT * 2,
  ),

  // 6
  [RoomShape.SHAPE_2x1]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH * 2,
    ONE_BY_ONE_CONTENTS_HEIGHT,
  ),

  // 7
  [RoomShape.IIH]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH * 2,
    NARROW_CONTENTS_HEIGHT,
  ),

  // 8
  [RoomShape.SHAPE_2x2]: TWO_BY_TWO_BOUNDS,

  // 9
  [RoomShape.LTL]: TWO_BY_TWO_BOUNDS,

  // 10
  [RoomShape.LTR]: TWO_BY_TWO_BOUNDS,

  // 11
  [RoomShape.LBL]: TWO_BY_TWO_BOUNDS,

  // 12
  [RoomShape.LBR]: TWO_BY_TWO_BOUNDS,
};
