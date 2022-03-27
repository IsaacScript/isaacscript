import { VectorZero } from "../constants";
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
  [RoomShape.ROOMSHAPE_1x1]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT,
  ),

  // 2
  [RoomShape.ROOMSHAPE_IH]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH,
    NARROW_CONTENTS_HEIGHT,
  ),

  // 3
  [RoomShape.ROOMSHAPE_IV]: Vector(
    NARROW_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT,
  ),

  // 4
  [RoomShape.ROOMSHAPE_1x2]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT * 2,
  ),

  // 5
  [RoomShape.ROOMSHAPE_IIV]: Vector(
    NARROW_CONTENTS_WIDTH,
    ONE_BY_ONE_CONTENTS_HEIGHT * 2,
  ),

  // 6
  [RoomShape.ROOMSHAPE_2x1]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH * 2,
    ONE_BY_ONE_CONTENTS_HEIGHT,
  ),

  // 7
  [RoomShape.ROOMSHAPE_IIH]: Vector(
    ONE_BY_ONE_CONTENTS_WIDTH * 2,
    NARROW_CONTENTS_HEIGHT,
  ),

  // 8
  [RoomShape.ROOMSHAPE_2x2]: TWO_BY_TWO_BOUNDS,

  // 9
  [RoomShape.ROOMSHAPE_LTL]: TWO_BY_TWO_BOUNDS,

  // 10
  [RoomShape.ROOMSHAPE_LTR]: TWO_BY_TWO_BOUNDS,

  // 11
  [RoomShape.ROOMSHAPE_LBL]: TWO_BY_TWO_BOUNDS,

  // 12
  [RoomShape.ROOMSHAPE_LBR]: TWO_BY_TWO_BOUNDS,

  // 13
  [RoomShape.NUM_ROOMSHAPES]: VectorZero,
};
