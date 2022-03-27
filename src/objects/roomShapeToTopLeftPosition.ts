import { VectorZero } from "../constants";

const NARROW_HORIZONTAL_TOP_LEFT_POSITION = Vector(0, 2);
const NARROW_VERTICAL_TOP_LEFT_POSITION = Vector(4, 0);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const ROOM_SHAPE_TO_TOP_LEFT_POSITION: {
  readonly [key in RoomShape]: Vector;
} = {
  [RoomShape.ROOMSHAPE_1x1]: VectorZero, // 1
  [RoomShape.ROOMSHAPE_IH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 2
  [RoomShape.ROOMSHAPE_IV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 3
  [RoomShape.ROOMSHAPE_1x2]: VectorZero, // 4
  [RoomShape.ROOMSHAPE_IIV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 5
  [RoomShape.ROOMSHAPE_2x1]: VectorZero, // 6
  [RoomShape.ROOMSHAPE_IIH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 7
  [RoomShape.ROOMSHAPE_2x2]: VectorZero, // 8
  [RoomShape.ROOMSHAPE_LTL]: Vector(13, 0), // 9
  [RoomShape.ROOMSHAPE_LTR]: VectorZero, // 10
  [RoomShape.ROOMSHAPE_LBL]: VectorZero, // 11
  [RoomShape.ROOMSHAPE_LBR]: VectorZero, // 12
  [RoomShape.NUM_ROOMSHAPES]: VectorZero, // 13
};
