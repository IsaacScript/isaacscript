import { VectorZero } from "../constants";

const TWO_BY_TWO_BOTTOM_RIGHT_POSITION = Vector(25, 13);
const ONE_BY_TWO_VERTICAL_BOTTOM_RIGHT_POSITION = Vector(12, 13);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION: {
  readonly [key in RoomShape]: Vector;
} = {
  [RoomShape.ROOMSHAPE_1x1]: Vector(12, 6), // 1
  [RoomShape.ROOMSHAPE_IH]: Vector(12, 4), // 2
  [RoomShape.ROOMSHAPE_IV]: Vector(8, 6), // 3
  [RoomShape.ROOMSHAPE_1x2]: ONE_BY_TWO_VERTICAL_BOTTOM_RIGHT_POSITION, // 4
  [RoomShape.ROOMSHAPE_IIV]: Vector(8, 13), // 5
  [RoomShape.ROOMSHAPE_2x1]: Vector(25, 6), // 6
  [RoomShape.ROOMSHAPE_IIH]: Vector(25, 4), // 7
  [RoomShape.ROOMSHAPE_2x2]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 8
  [RoomShape.ROOMSHAPE_LTL]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 9
  [RoomShape.ROOMSHAPE_LTR]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 10
  [RoomShape.ROOMSHAPE_LBL]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 11
  [RoomShape.ROOMSHAPE_LBR]: ONE_BY_TWO_VERTICAL_BOTTOM_RIGHT_POSITION, // 12
  [RoomShape.NUM_ROOMSHAPES]: VectorZero, // 13
};
