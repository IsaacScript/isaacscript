/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface LRoomAreaDesc {
  /** Returns the position of the upper half's bottom right corner. */
  GetHighBottomRight: () => Vector;

  /** Returns the position of the upper half's bottom right corner. */
  GetHighTopLeft: () => Vector;

  /** Returns the position of the bottom half's bottom right corner. */
  GetLowBottomRight: () => Vector;

  /** Returns the position of the lower half's top left corner. */
  GetLowTopLeft: () => Vector;
}
