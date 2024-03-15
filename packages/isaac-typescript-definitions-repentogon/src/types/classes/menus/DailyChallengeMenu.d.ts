/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace DailyChallengeMenu {
  /** Returns the sprite used for the daily challenge menu. */
  function GetSprite(): Sprite;

  /** Returns the sprite used for the daily challenge leaderboard. */
  function GetLeaderboardSprite(): Sprite;

  /** Returns the sprite used for the leaderboard score menu. */
  function GetLeaderboardScoreMenuSprite(): Sprite;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Returns the amount of time left in hours until the current daily challenge expires. */
  function GetTimeLeftHours(): int;

  /** Returns the amount of time left in minutes until the current daily challenge ends. */
  function GetTimeLeftMinutes(): int;

  /** Returns the amount of time left in seconds until the current daily challenge ends. */
  function GetTimeLeftSeconds(): int;

  /** Returns whether the daily challenge leaderboard is visible. */
  function IsLeaderboardVisible(): boolean;

  /** Sets the currently active element to the specified index. */
  function SetSelectedElement(elementId: int): void;
}
