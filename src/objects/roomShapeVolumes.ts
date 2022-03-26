/* eslint-disable sort-exports/sort-exports */

export const ONE_BY_ONE_CONTENTS_WIDTH = 13;
export const ONE_BY_ONE_CONTENTS_HEIGHT = 7;
const ONE_BY_ONE_VOLUME =
  ONE_BY_ONE_CONTENTS_HEIGHT * ONE_BY_ONE_CONTENTS_WIDTH;

export const NARROW_CONTENTS_WIDTH = 5;
export const NARROW_CONTENTS_HEIGHT = 3;
const NARROW_HORIZONTAL_VOLUME =
  ONE_BY_ONE_CONTENTS_WIDTH * NARROW_CONTENTS_HEIGHT;
const NARROW_VERTICAL_VOLUME =
  NARROW_CONTENTS_WIDTH * ONE_BY_ONE_CONTENTS_HEIGHT;

const ONE_BY_TWO_VOLUME = ONE_BY_ONE_VOLUME * 2;
const L_ROOM_VOLUME = ONE_BY_ONE_VOLUME * 3;

/**
 * Volume is the amount of tiles that are inside the room shape.
 *
 * (This cannot be directly calculated from the bounds since L rooms are a special case.)
 */
export const ROOM_SHAPE_VOLUMES: {
  readonly [key in RoomShape]: int;
} = {
  [RoomShape.ROOMSHAPE_1x1]: ONE_BY_ONE_VOLUME, // 1
  [RoomShape.ROOMSHAPE_IH]: NARROW_HORIZONTAL_VOLUME, // 2
  [RoomShape.ROOMSHAPE_IV]: NARROW_VERTICAL_VOLUME, // 3
  [RoomShape.ROOMSHAPE_1x2]: ONE_BY_TWO_VOLUME, // 4
  [RoomShape.ROOMSHAPE_IIV]: NARROW_VERTICAL_VOLUME * 2, // 5
  [RoomShape.ROOMSHAPE_2x1]: ONE_BY_TWO_VOLUME, // 6
  [RoomShape.ROOMSHAPE_IIH]: NARROW_HORIZONTAL_VOLUME * 2, // 7
  [RoomShape.ROOMSHAPE_2x2]: ONE_BY_ONE_VOLUME * 4, // 8
  [RoomShape.ROOMSHAPE_LTL]: L_ROOM_VOLUME, // 9
  [RoomShape.ROOMSHAPE_LTR]: L_ROOM_VOLUME, // 10
  [RoomShape.ROOMSHAPE_LBL]: L_ROOM_VOLUME, // 11
  [RoomShape.ROOMSHAPE_LBR]: L_ROOM_VOLUME, // 12
  [RoomShape.NUM_ROOMSHAPES]: 0, // 13
};
