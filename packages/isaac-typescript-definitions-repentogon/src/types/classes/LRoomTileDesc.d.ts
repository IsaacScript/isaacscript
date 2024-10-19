/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface LRoomTileDesc {
  /** Returns the grid coordinates of the upper half's bottom right corner. */
  GetHighBottomRight: () => [int, int];

  /** Returns the grid coordinates of the upper half's top left corner. */
  GetHighTopLeft: () => [int, int];

  /** Returns the grid coordinates of the lower half's bottom right corner. */
  GetLowBottomRight: () => [int, int];

  /** Returns the grid coordinates of the lower half's top left corner. */
  GetLowTopLeft: () => [int, int];

  /** Returns the grid coordinates of a random tile. */
  GetRandomTile: (seed: Seed) => [int, int];
}
