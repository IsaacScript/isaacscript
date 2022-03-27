const ONE_BY_ONE_WIDTH = 15;
const TWO_BY_ONE_WIDTH = 28;

export const ROOM_SHAPE_TO_GRID_WIDTH: {
  readonly [key in RoomShape]: int;
} = {
  [RoomShape.ROOMSHAPE_1x1]: ONE_BY_ONE_WIDTH, // 1
  [RoomShape.ROOMSHAPE_IH]: ONE_BY_ONE_WIDTH, // 2
  [RoomShape.ROOMSHAPE_IV]: ONE_BY_ONE_WIDTH, // 3
  [RoomShape.ROOMSHAPE_1x2]: ONE_BY_ONE_WIDTH, // 4
  [RoomShape.ROOMSHAPE_IIV]: ONE_BY_ONE_WIDTH, // 5
  [RoomShape.ROOMSHAPE_2x1]: TWO_BY_ONE_WIDTH, // 6
  [RoomShape.ROOMSHAPE_IIH]: TWO_BY_ONE_WIDTH, // 7
  [RoomShape.ROOMSHAPE_2x2]: TWO_BY_ONE_WIDTH, // 8
  [RoomShape.ROOMSHAPE_LTL]: TWO_BY_ONE_WIDTH, // 9
  [RoomShape.ROOMSHAPE_LTR]: TWO_BY_ONE_WIDTH, // 10
  [RoomShape.ROOMSHAPE_LBL]: TWO_BY_ONE_WIDTH, // 11
  [RoomShape.ROOMSHAPE_LBR]: TWO_BY_ONE_WIDTH, // 12
  [RoomShape.NUM_ROOMSHAPES]: 0, // 13
};
