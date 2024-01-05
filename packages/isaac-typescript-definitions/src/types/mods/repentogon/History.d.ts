/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export interface History {
  GetCollectiblesHistory: () => HistoryItem[];

  /**
   * Removes an item from the item history tracker on the right-hand side of the screen. Note that
   * this does not remove the item effect from the player.
   *
   * Returns true if an item was removed, otherwise false.
   */
  RemoveHistoryItem: (index: int) => boolean;
}
