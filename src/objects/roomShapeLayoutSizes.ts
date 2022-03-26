import {
  ONE_BY_ONE_CONTENTS_HEIGHT,
  ONE_BY_ONE_CONTENTS_WIDTH,
} from "./roomShapeVolumes";

const ONE_BY_ONE_LAYOUT_SIZE = Vector(
  ONE_BY_ONE_CONTENTS_WIDTH,
  ONE_BY_ONE_CONTENTS_HEIGHT,
);
const TWO_BY_ONE_VERTICAL_LAYOUT_SIZE = Vector(
  ONE_BY_ONE_CONTENTS_WIDTH,
  ONE_BY_ONE_CONTENTS_HEIGHT * 2,
);
const TWO_BY_ONE_HORIZONTAL_LAYOUT_SIZE = Vector(
  ONE_BY_ONE_CONTENTS_WIDTH * 2,
  ONE_BY_ONE_CONTENTS_HEIGHT,
);
const TWO_BY_TWO_LAYOUT_SIZE = Vector(
  ONE_BY_ONE_CONTENTS_WIDTH * 2,
  ONE_BY_ONE_CONTENTS_HEIGHT * 2,
);

/**
 * The dimensions of a room shape's layout. This is NOT the size of the room's actual contents! For
 * that, use `ROOM_SHAPE_BOUNDS`.
 *
 * For example, a horizontal narrow room has a layout size of equal to that of a 1x1 room.
 */
export const ROOM_SHAPE_LAYOUT_SIZES: {
  readonly [key in RoomShape]: Vector;
} = {
  [RoomShape.ROOMSHAPE_1x1]: ONE_BY_ONE_LAYOUT_SIZE, // 1
  [RoomShape.ROOMSHAPE_IH]: ONE_BY_ONE_LAYOUT_SIZE, // 2
  [RoomShape.ROOMSHAPE_IV]: ONE_BY_ONE_LAYOUT_SIZE, // 3
  [RoomShape.ROOMSHAPE_1x2]: TWO_BY_ONE_VERTICAL_LAYOUT_SIZE, // 4
  [RoomShape.ROOMSHAPE_IIV]: TWO_BY_ONE_VERTICAL_LAYOUT_SIZE, // 5
  [RoomShape.ROOMSHAPE_2x1]: TWO_BY_ONE_HORIZONTAL_LAYOUT_SIZE, // 6
  [RoomShape.ROOMSHAPE_IIH]: TWO_BY_ONE_HORIZONTAL_LAYOUT_SIZE, // 7
  [RoomShape.ROOMSHAPE_2x2]: TWO_BY_TWO_LAYOUT_SIZE, // 8
  [RoomShape.ROOMSHAPE_LTL]: TWO_BY_TWO_LAYOUT_SIZE, // 9
  [RoomShape.ROOMSHAPE_LTR]: TWO_BY_TWO_LAYOUT_SIZE, // 10
  [RoomShape.ROOMSHAPE_LBL]: TWO_BY_TWO_LAYOUT_SIZE, // 11
  [RoomShape.ROOMSHAPE_LBR]: TWO_BY_TWO_LAYOUT_SIZE, // 12
  [RoomShape.NUM_ROOMSHAPES]: TWO_BY_TWO_LAYOUT_SIZE, // 13
};
