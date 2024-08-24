import type { StageID } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   * @noSelf
   */
  namespace BossPoolManager {
    function GetPool(stageID: StageID): BossPool;

    /**
     * Returns an array of booleans determining which bosses have been removed from the boss pool
     * after being encountered. This does not account for bosses that have been encountered in The
     * Void.
     *
     * This method does not account for bosses that the game forcefully spawns in if a certain
     * condition is met, such as the Horsemen or The Fallen. If you wish to see if these bosses have
     * been removed, use `BossPoolManager.GetRemovedSpecialBosses` instead.
     */
    function GetRemovedBosses(): boolean[];

    /**
     * Returns an array of booleans determining which special bosses have been removed from the boss
     * pool after being encountered. This does not account for bosses that have been encountered in
     * The Void.
     *
     * A special boss is a boss that you can only encounter if a certain condition is met, such as
     * the Horsemen or The Fallen. If wish to check to see if a regular boss has been removed from
     * the boss pool, use `BossPoolManager.GetRemovedBosses` instead.
     */
    function GetRemovedSpecialBosses(): boolean[];
  }
}
