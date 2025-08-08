/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace StatsMenu {
  /** Returns the sprites used by the secrets menu. */
  function GetSecretsMenuSprite(): Sprite;

  /** Returns the sprite used by the left cursor in the secrets menu. */
  function GetSecretsMenuCursorLeftSprite(): Sprite;

  /** Returns the sprite used by the right cursor in the secrets menu. */
  function GetSecretsMenuCursorRightSprite(): Sprite;

  function GetSecretsMiniSprite1(): Sprite;
  function GetSecretsMiniSprite2(): Sprite;
  function GetSecretsMiniSprite3(): Sprite;
  function GetSecretsMiniSprite4(): Sprite;
  function GetSecretsMiniSprite5(): Sprite;
  function GetSecretsMiniSprite6(): Sprite;
  function GetSecretsMiniSprite7(): Sprite;
  function GetSecretsMiniSprite8(): Sprite;
  function GetSecretsMiniSprite9(): Sprite;

  /** Returns the selected element. */
  function GetSelectedElement(): int;

  /** Returns the sprites used by the stats menu. */
  function GetStatsMenuSprite(): Sprite;

  /** Returns whether the secrets menu is active. */
  function IsSecretsMenuVisible(): boolean;

  /** Sets the menu's selected element. */
  function SetSelectedMenu(): boolean;
}
