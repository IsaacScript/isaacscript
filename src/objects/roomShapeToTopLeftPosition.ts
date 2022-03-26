const NARROW_HORIZONTAL_TOP_LEFT_POSITION = Vector(0, 2);
const NARROW_VERTICAL_TOP_LEFT_POSITION = Vector(4, 0);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const ROOM_SHAPE_TO_TOP_LEFT_POSITION: {
  readonly [key in RoomShape]: Vector;
} = {
  [RoomShape.ROOMSHAPE_1x1]: Vector.Zero, // 1
  [RoomShape.ROOMSHAPE_IH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 2
  [RoomShape.ROOMSHAPE_IV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 3
  [RoomShape.ROOMSHAPE_1x2]: Vector.Zero, // 4
  [RoomShape.ROOMSHAPE_IIV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 5
  [RoomShape.ROOMSHAPE_2x1]: Vector.Zero, // 6
  [RoomShape.ROOMSHAPE_IIH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 7
  [RoomShape.ROOMSHAPE_2x2]: Vector.Zero, // 8
  [RoomShape.ROOMSHAPE_LTL]: Vector(13, 0), // 9
  [RoomShape.ROOMSHAPE_LTR]: Vector.Zero, // 10
  [RoomShape.ROOMSHAPE_LBL]: Vector.Zero, // 11
  [RoomShape.ROOMSHAPE_LBR]: Vector.Zero, // 12
  [RoomShape.NUM_ROOMSHAPES]: Vector.Zero, // 13
};
