/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface History extends IsaacAPIClass {
  /** Returns an array of the list of `HistoryItem` found in the current run. */
  GetCollectiblesHistory: () => HistoryItem[];

  /**
   * Removes a `HistoryItem` from the player's item history. This does *not* actually remove the
   * collectible from their inventory.
   *
   * @returns Whether the item was removed or not.
   */
  RemoveHistoryItemByIndex: (index: int) => boolean;
}
