import type { MainMenuType } from "../../../enums/MainMenuType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace MenuManager {
    /** Retrieves the currently active `MainMenuType`. */
    function GetActiveMenu(): MainMenuType;

    /** Returns the sprite used for the back button widget. */
    function GetBackWidgetSprite(): Sprite;

    /**
     * Returns a color modifier responsible for the current color modification effect's linear
     * interpolation behavior.
     */
    function GetColorModifierLerpAmount(): ColorModifier;

    /** Returns the current color modifier of the menu. */
    function GetCurrentColorModifier(): ColorModifier;

    /** Returns the sprite used for the select widget. */
    function GetSelectWidgetSprite(): Sprite;

    /**
     * Returns the sprite used for the menu's shadow overlay (Such as the shadow of Isaac's head
     * which is visible).
     */
    function GetShadowSprite(): Sprite;

    /** Returns the target color modifier that the current color modifier is transitioning into. */
    function GetTargetColorModifier(): ColorModifier;

    /** Returns the current position of the main menu camera. */
    function GetViewPosition(): Vector;

    /** Sets the current menu to the specified `MainMenuType`. */
    function SetActiveMenu(menu: MainMenuType): void;

    /** Sets the current color modifier of the menu. */
    function SetColorModifier(
      colorModifier: ColorModifier,
      lerp?: boolean,
      rate?: number,
    ): void;

    /** Sets the position of the main menu camera. */
    function SetViewPosition(position: Vector): void;
  }
}
