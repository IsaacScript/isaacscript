import type { MainMenuType } from "../../../../enums/mods/repentogon/MainMenuType";
import type { ColorModifier } from "../ColorModifier";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace MenuManager {
    function GetActiveMenu(): MainMenuType;

    function GetBackWidgetSprite(): Sprite;

    function GetColorModifierLerpAmount(): ColorModifier;

    function GetSelectWidgetSprite(): Sprite;

    function GetShadowSprite(): Sprite;

    function GetViewPosition(): Vector;

    function SetActiveMenu(menu: MainMenuType): void;

    /**
     * @param colorModifier
     * @param lerp Default is true.
     * @param rate Default is 0.015.
     */
    function SetColorModifier(
      colorModifier: ColorModifier,
      lerp?: boolean,
      rate?: number,
    ): void;

    function SetViewPosition(position: Vector): void;
  }
}
