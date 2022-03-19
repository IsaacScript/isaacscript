declare enum RoomShape {
  ROOMSHAPE_1x1 = 1,

  /** Narrow 1x1 horizontal. */
  ROOMSHAPE_IH = 2,

  /** Narrow 1x1 vertical. */
  ROOMSHAPE_IV = 3,

  /** 2x1 vertical. */
  ROOMSHAPE_1x2 = 4,

  /** Narrow 2x1 vertical. */
  ROOMSHAPE_IIV = 5,

  /** 2x1 horizontal. */
  ROOMSHAPE_2x1 = 6,

  /** Narrow 2x1 horizontal. */
  ROOMSHAPE_IIH = 7,

  ROOMSHAPE_2x2 = 8,

  /** Looks like a "⅃" with a gap in the top-left-hand corner. */
  ROOMSHAPE_LTL = 9,

  /** Looks like an "L" with a gap in the top-right-hand corner. */
  ROOMSHAPE_LTR = 10,

  /** Looks like a "⅂" with a gap in the bottom-left-hand corner. */
  ROOMSHAPE_LBL = 11,

  /** Looks like a "Г" with a gap in the bottom-right-hand corner. */
  ROOMSHAPE_LBR = 12,

  NUM_ROOMSHAPES = 13,
}
