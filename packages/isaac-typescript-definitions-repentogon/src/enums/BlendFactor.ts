/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum BlendFactor {
  ZERO = 0,
  ONE = 1,
  SRC_COLOR = 2,
  ONE_MINUS_SRC_COLOR = 3,
  DST_COLOR = 4,
  ONE_MINUS_DST_COLOR = 5,
  SRC_ALPHA = 6,
  ONE_MINUS_SRC_ALPHA = 7,
  DST_ALPHA = 8,
  ONE_MINUS_DST_ALPHA = 9,

  /** Currently nonfunctional. */
  CONSTANT_COLOR = 10,

  /** Currently nonfunctional. */
  ONE_MINUS_CONSTANT_COLOR = 11,

  /** Currently nonfunctional. */
  CONSTANT_ALPHA = 12,

  /** Currently nonfunctional. */
  ONE_MINUS_CONSTANT_ALPHA = 13,

  SRC_ALPHA_SATURATE = 14,
}
