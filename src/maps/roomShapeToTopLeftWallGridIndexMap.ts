/**
 * Only used for special room shapes where the top left wall grid index is not equal to
 * `DEFAULT_TOP_LEFT_WALL_GRID_INDEX`.
 */
export const ROOM_SHAPE_TO_TOP_LEFT_WALL_GRID_INDEX_MAP = new Map([
  [RoomShape.ROOMSHAPE_IH, 30], // 2
  [RoomShape.ROOMSHAPE_IV, 4], // 3
  [RoomShape.ROOMSHAPE_IIV, 4], // 5
  [RoomShape.ROOMSHAPE_IIH, 56], // 7
  [RoomShape.ROOMSHAPE_LTL, 13], // 9
]);

export const DEFAULT_TOP_LEFT_WALL_GRID_INDEX = 0;
