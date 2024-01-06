/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace BestiaryMenu {
  function GetBestiaryMenuSprite(): Sprite;

  function GetDeathScreenSprite(): Sprite;

  function GetEnemySprite(): Sprite;

  function GetSelectedPage(): int;

  function GetLastEnemyPageID(): int;

  function GetNumBossPages(): int;

  function SetNumPages(): int;

  function GetSelectedElement(): int;

  function SetSelectedPage(page: int): void;

  function SetSelectedElement(element: int): void;
}
