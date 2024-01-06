/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace DailyChallengeMenu {
  function GetSprite(): Sprite;

  function GetLeaderboardSprite(): Sprite;

  function GetLeaderboardScoreMenuSprite(): Sprite;

  function GetSelectedElement(): int;

  function GetTimeLeftHours(): int;

  function GetTimeLeftMinutes(): int;

  function GetTimeLeftSeconds(): int;

  function IsLeaderboardVisible(): boolean;

  function SetSelectedElement(elementId: int): void;
}
