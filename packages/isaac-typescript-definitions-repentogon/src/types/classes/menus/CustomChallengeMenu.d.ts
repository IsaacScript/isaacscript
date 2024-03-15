import type { Challenge } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace CustomChallengeMenu {
    /** Returns the sprite used to display the custom challenge menu. */
    function GetSprite(): Sprite;

    /** Returns the currently selected `Challenge`. */
    function GetSelectedChallengeID(): Challenge;

    /** Sets the currently selected challenge to the provided `Challenge`. */
    function SetSelectedChallengeID(challenge: Challenge): void;
  }
}
