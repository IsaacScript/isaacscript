/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum BlendType {
  /** Ignores any kind of source/destination modifiers. */
  CONSTANT = 0,

  NORMAL = 1,
  ADDITIVE = 2,
  MULTIPLICATIVE = 3,
  OVERLAY = 4,
}
