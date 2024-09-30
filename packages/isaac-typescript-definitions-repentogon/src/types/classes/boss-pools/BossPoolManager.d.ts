import type { BossID, StageID } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   * @noSelf
   */
  namespace BossPoolManager {
    /** Returns the Boss Pool corresponding to the provided `stageID`. */
    function GetPool(stageID: StageID): BossPool;

    /**
     * Returns a map determining which bosses have been removed from the boss pool after being
     * encountered.
     *
     * This method does not account for bosses that have been encountered in The Void.
     *
     * This method also does not account for bosses that the game forcefully spawns in if a certain
     * condition is met, such as the Horsemen or The Fallen. To see if a boss that the game forces
     * has been removed, use the `BossPoolManager.GetRemovedSpecialBosses` method instead.
     */
    function GetRemovedBosses(): LuaMap<BossID, boolean>;

    /**
     * Returns a map determining which special bosses have been removed from the boss pool after
     * being encountered.
     *
     * A special boss is a boss that you can only encounter if a certain condition is met, such as
     * the Horsemen or The Fallen. If wish to check to see if a regular boss has been removed from
     * the boss pool, use the `BossPoolManager.GetRemovedBosses` method instead.
     *
     * This method does not account for bosses that have been encountered in The Void.
     */
    function GetRemovedSpecialBosses(): LuaMap<BossID, boolean>;
  }
}
