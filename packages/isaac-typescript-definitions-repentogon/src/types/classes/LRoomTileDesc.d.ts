/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface LRoomTileDesc {
  /** Returns the grid coordinates of the upper half's bottom right corner. */
  readonly GetHighBottomRight: () => [int, int];

  /** Returns the grid coordinates of the upper half's top left corner. */
  readonly GetHighTopLeft: () => [int, int];

  /** Returns the grid coordinates of the lower half's bottom right corner. */
  readonly GetLowBottomRight: () => [int, int];

  /** Returns the grid coordinates of the lower half's top left corner. */
  readonly GetLowTopLeft: () => [int, int];

  /** Returns the grid coordinates of a random tile. */
  readonly GetRandomTile: (seed: Seed) => [int, int];
}
