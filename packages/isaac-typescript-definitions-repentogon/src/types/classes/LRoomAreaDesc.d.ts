/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface LRoomAreaDesc {
  /** Returns the position of the upper half's bottom right corner. */
  readonly GetHighBottomRight: () => Vector;

  /** Returns the position of the upper half's bottom right corner. */
  readonly GetHighTopLeft: () => Vector;

  /** Returns the position of the bottom half's bottom right corner. */
  readonly GetLowBottomRight: () => Vector;

  /** Returns the position of the lower half's top left corner. */
  readonly GetLowTopLeft: () => Vector;
}
