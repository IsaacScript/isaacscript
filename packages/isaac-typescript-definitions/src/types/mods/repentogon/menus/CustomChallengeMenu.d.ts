import type { Challenge } from "../../../../enums/Challenge";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace CustomChallengeMenu {
    function GetSprite(): Sprite;

    function GetSelectedChallengeID(): Challenge;

    function SetSelectedChallengeID(challenge: Challenge): void;
  }
}
