import type { RoomTransitionAnim } from "../../../enums/RoomTransitionAnim";
import type { BossID } from "../../../enums/collections/roomSubTypes";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @noSelf
   * @see https://repentogon.com/index.html
   */
  namespace RoomTransition {
    function GetTransitionMode(): RoomTransitionAnim;
    function GetVersusScreenSprite(): Sprite;
    function IsRenderingBossIntro(): boolean;
    function StartBossIntro(boss1: BossID, boss2: BossID): void;
  }
}
