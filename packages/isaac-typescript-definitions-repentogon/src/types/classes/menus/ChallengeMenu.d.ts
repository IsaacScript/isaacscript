import type { Challenge } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @noSelf
   * @see https://repentogon.com/
   */
  namespace ChallengeMenu {
    /** Returns the sprite used for the Challenge Menu. */
    function GetSprite(): Sprite;

    /** Returns the `Challenge` that is currently selected on the Challenge Menu. */
    function GetSelectedChallengeID(): Challenge;

    /** Sets the currently selected challenge based on the provided `Challenge`. */
    function SetSelectedChallengeID(challenge: Challenge): void;
  }
}
