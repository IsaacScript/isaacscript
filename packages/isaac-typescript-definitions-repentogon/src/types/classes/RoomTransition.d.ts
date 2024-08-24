import type { BossID } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   * @noSelf
   */
  namespace RoomTransition {
    function GetPlayerExtraPortraitSprite(): Sprite;

    function GetTransitionMode(): int;

    /** Returns the sprite used by the boss VS screen. */
    function GetVersusScreenSprite(): Sprite;

    /** Returns whether the boss intro is rendering. */
    function IsRenderingBossIntro(): boolean;

    /**
     * Plays the boss intro.
     *
     * @param bossID1
     * @param bossID2 Optional. The second boss to display if the current room is a double trouble
     *                boss room. If this method is called anywhere else, this parameter does
     *                nothing. Default is 0.
     */
    function StartBossIntro(bossID1: BossID, bossID2?: BossID): void;
  }
}
