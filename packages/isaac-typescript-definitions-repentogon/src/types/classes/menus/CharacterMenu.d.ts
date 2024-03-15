import type { Difficulty, PlayerType } from "isaac-typescript-definitions";
import type { CharacterMenuType } from "../../../enums/CharacterMenuType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace CharacterMenu {
    /**
     * Returns the sprite used for the background of the character wheel background.
     *
     * Modded characters with their own unique character wheel background uses a different sprite
     * than the one this method returns.
     */
    function GetBigCharPageSprite(): Sprite;

    /**
     * Returns the sprite used for the background of the character menu.
     *
     * Modded characters with their own unique character menu background uses a different sprite
     * than the one this method returns.
     */
    function GetBGSprite(): Sprite;

    function GetCharacterPortraitSprite(): Sprite;

    /** Returns the depth of the character wheel. */
    function GetCharacterWheelDepth(): number;

    /** Returns the width of the character wheel. */
    function GetCharacterWheelWidth(): number;

    /** Returns the currently selected difficulty on the character menu. */
    function GetDifficulty(): Difficulty;

    /** Returns the sprite used to display the difficulty options. */
    function GetDifficultyPageSprite(): Sprite;

    /**
     * Returns sprite that is displayed on the menu as an overlay when the currently selected
     * difficulty is Hard Mode or Greedier.
     */
    function GetDifficultyOverlaySprite(): Sprite;

    /** Returns the sprite used to display the easter eggs widget. */
    function GetEasterEggPageSprite(): Sprite;

    /** Returns whether the currently selected character is unlocked. */
    function GetIsCharacterUnlocked(): boolean;

    /**
     * Returns the background of the character menu that is active when Greed or Greedier is
     * selected.
     */
    function GetGreedDecoSprite(): Sprite;

    /** Returns the number of characters displayed on the character wheel. */
    function GetNumCharacters(): int;

    /** Returns the sprite used to display the page swap widget. */
    function GetPageSwapWidgetSprite(): Sprite;

    /** Returns the current scroll speed of the character wheel. */
    function GetScrollSpeed(): number;

    function GetSeedEntrySprite(): Sprite;

    /** Returns the sprite used to display the seeds menu and the currently selected seed. */
    function GetSeedPageSprite(): Sprite;

    /** Returns the sprite used to display the seed unlock page. */
    function GetSeedUnlockPageSprite(): Sprite;

    /** Returns the `PlayerType` of the currently selected character. */
    function GetSelectedCharacterID(): PlayerType;

    /** Returns the currently selected `CharacterMenuType`. */
    function GetSelectedCharacterMenu(): CharacterMenuType;

    /**
     * Returns the background decoration sprite that is displayed when the tainted character select
     * screen is active.
     */
    function GetTaintedBGDecoSprite(): Sprite;

    /** Returns the sprite used to display the current win streak. */
    function GetWinStreakPageSprite(): Sprite;

    /** Sets the depth of the character wheel. */
    function SetCharacterWheelDepth(depth: number): void;

    /** Sets the width of the character wheel. */
    function SetCharacterWheelWidth(value: number): void;

    /** Sets the currently selected difficulty on the character menu. */
    function SetDifficulty(difficulty: Difficulty): void;

    /** Sets whether the currently selected character is unlocked. */
    function SetIsCharacterUnlocked(unlocked: boolean): void;

    /** Sets the scroll speed of the character wheel. */
    function SetScrollSpeed(speed: number): void;

    /** Sets the current character menu. */
    function SetSelectedCharacterMenu(
      characterMenuType: CharacterMenuType,
    ): void;

    /** Sets the current selected character to the provided `PlayerType`. */
    function SetSelectedCharacterID(characterId: PlayerType): void;
  }
}
