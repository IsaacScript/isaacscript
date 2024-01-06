import type { Difficulty } from "../../../../enums/Difficulty";
import type { PlayerType } from "../../../../enums/collections/subTypes";
import type { CharacterMenuType } from "../../../../enums/mods/repentogon/CharacterMenuType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace CharacterMenu {
    function GetBigCharPageSprite(): Sprite;

    function GetBGSprite(): Sprite;

    function GetCharacterPortraitSprite(): Sprite;

    function GetCharacterWheelDepth(): number;

    function GetCharacterWheelWidth(): number;

    function GetDifficulty(): Difficulty;

    function GetDifficultyPageSprite(): Sprite;

    /** Returns the blood stain sprite that appears when selecting Hard mode / Greedier. */
    function GetDifficultyOverlaySprite(): Sprite;

    function GetEastereggPageSprite(): Sprite;

    function GetIsCharacterUnlocked(): boolean;

    function GetGreedDecoSprite(): Sprite;

    function GetNumCharacters(): int;

    function GetPageSwapWidgetSprite(): Sprite;

    function GetScrollSpeed(): number;

    function GetSeedEntrySprite(): Sprite;

    function GetSeedPageSprite(): Sprite;

    function GetSeedUnlockPageSprite(): Sprite;

    function GetSelectedCharacterMenu(): CharacterMenuType;

    function GetTaintedBGDecoSprite(): Sprite;

    function GetWinStreakPageSprite(): Sprite;

    function SetCharacterWheelDepth(depth: number): void;

    function SetCharacterWheelWidth(value: number): void;

    function SetDifficulty(difficulty: Difficulty): void;

    function SetIsCharacterUnlocked(unlocked: boolean): void;

    function SetScrollSpeed(speed: number): void;

    function SetSelectedCharacterMenu(
      characterMenuType: CharacterMenuType,
    ): void;

    function SetSelectedCharacterID(characterId: PlayerType): void;
  }
}
