/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace BestiaryMenu {
  /** Returns the sprite used for the bestiary menu. */
  function GetBestiaryMenuSprite(): Sprite;

  /** Returns the sprite used for the death screen. */
  function GetDeathScreenSprite(): Sprite;

  /** Returns the sprite used for the enemy displayed in the bestiary. */
  function GetEnemySprite(): Sprite;

  /** Returns the index of the currently selected page in the bestiary. */
  function GetSelectedPage(): int;

  /**
   * Returns the index of the last page in the bestiary where enemies are displayed. Pages
   * afterwards are reserved for bosses.
   */
  function GetLastEnemyPageID(): int;

  /** Returns the number of pages in the bestiary that are dedicated to bosses. */
  function GetNumBossPages(): int;

  /**
   * Returns the number of pages in the bestiary that are dedicated to enemies that are not bosses.
   */
  function GetNumMonsterPages(): int;

  /** Returns the total number of pages in the bestiary. */
  function GetNumPages(): int;

  /** Returns the index of the currently selected element in the bestiary. */
  function GetSelectedElement(): int;

  /** Sets the current active page in the bestiary. */
  function SetSelectedPage(page: int): void;

  /** Sets the current selected element in the bestiary. */
  function SetSelectedElement(element: int): void;
}
