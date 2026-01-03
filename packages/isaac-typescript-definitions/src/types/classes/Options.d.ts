import type { AnnouncerVoiceMode } from "../../enums/AnnouncerVoiceMode";
import type { CameraStyle } from "../../enums/CameraStyle";
import type { ConsoleFont } from "../../enums/ConsoleFont";
import type { ExtraHudStyle } from "../../enums/ExtraHudStyle";
import type { JacobEsauControls } from "../../enums/JacobEsauControls";
import type { LanguageAbbreviation } from "../../enums/LanguageAbbreviation";

declare global {
  /**
   * This contains the options that correspond to the settings in the "options.ini" file.
   *
   * The fields are listed in order of how they appear in the in-game options menu (rather than
   * alphabetically).
   *
   * `Options` is technically not an Isaac API class; it has a type of `table` (instead of
   * `userdata`).
   */
  namespace Options {
    /**
     * How loud the non-music sound effects should be.
     *
     * This can be changed from the in-game options menu.
     *
     * Valid values are from 0-1.
     */
    let SFXVolume: float;

    /**
     * How loud the in-game music should be.
     *
     * This can be changed from the in-game options menu.
     *
     * Valid values are from 0-1.
     */
    let MusicVolume: float;

    /**
     * How faded the in-game map will be.
     *
     * This can be changed from the in-game options menu.
     *
     * Valid values are from 0-1.
     */
    let MapOpacity: float;

    /** This can be changed from the in-game options menu. */
    let Fullscreen: boolean;

    /**
     * The filter is a setting that makes the game look more like the Flash version (i.e. Wrath of
     * the Lamb).
     *
     * This can be changed from the in-game options menu.
     */
    let Filter: boolean;

    /**
     * This can be changed from the in-game options menu.
     *
     * Valid values are from 0.5-1.5.
     */
    let Gamma: float;

    /**
     * Whether achievement pop-ups will display (e.g. "A Small Rock has appeared in the basement").
     *
     * This can be changed from the in-game options menu.
     */
    let DisplayPopups: boolean;

    /**
     * This can be changed from the in-game options menu, but only when in the main menu and not in
     * a run.
     */
    const Language: LanguageAbbreviation;

    /**
     * Toggles the active camera.
     *
     * This can be changed from the in-game options menu.
     *
     * 1: on, 2: off.
     */
    let CameraStyle: CameraStyle;

    /**
     * Sets the style of the Extra HUD (i.e. the in-game item tracker).
     *
     * This can be changed from the in-game options menu.
     *
     * 0: off, 1: on, 2: mini.
     */
    let ExtraHUDStyle: ExtraHudStyle;

    /**
     * This can be changed from the in-game options menu.
     *
     * Valid values are from 0-1.
     */
    let HUDOffset: float;

    /**
     * The Found HUD is the in-game stat menu. The name is a reference to MissingHUD, which was a
     * stat HUD added by a mod.
     *
     * This can be changed from the in-game options menu.
     */
    let FoundHUD: boolean;

    /**
     * Toggles charge bars that show the charging progress for items like Brimstone.
     *
     * This can be changed from the in-game options menu.
     */
    let ChargeBars: boolean;

    /**
     * Toggles a shiny effect added to enemy projectiles.
     *
     * This can be changed from the in-game options menu.
     */
    let BulletVisibility: boolean;

    /**
     * Toggles the way to activate Esau's items.
     *
     * This can be changed from the in-game options menu.
     *
     * Added in Repentance+.
     */
    let JacobEsauControls: JacobEsauControls;

    /**
     * Whether the announcer voice should play when using items, pills, cards, and runes.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let AnnouncerVoiceMode: AnnouncerVoiceMode;

    /**
     * How big the text in the debug console should be.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     *
     * 0: default, 1: small, 2: tiny.
     */
    let ConsoleFont: ConsoleFont;

    /** This cannot be changed in-game and is only exposed in the "options.ini" file. */
    let DebugConsoleEnabled: boolean;

    /**
     * When enabled, Lua errors and other console output will be shown in-game without having to
     * manually bring up the console.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let FadedConsoleDisplay: boolean;

    /**
     * How big the window can be before the game changes the rendering to fill the screen.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     *
     * Valid values are from 1-99.
     */
    let MaxRenderScale: int;

    /**
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     *
     * Valid values are from 1-99.
     */
    let MaxScale: int;

    /**
     * Whether the mouse can be used to shoot tears and control items like Epic Fetus or Marked.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let MouseControl: boolean;

    /**
     * Whether the game will automatically pause if you switch to a different program.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let PauseOnFocusLost: boolean;

    /**
     * Whether the rumble feature is enabled for controller players.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let RumbleEnabled: boolean;

    /**
     * Whether the game will save the history of executed debug console commands.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let SaveCommandHistory: boolean;

    /**
     * This only takes effect if the `Fullscreen` option is also set to true.
     *
     * This cannot be changed in-game and is only exposed in the "options.ini" file.
     */
    let UseBorderlessFullscreen: boolean;

    /** This cannot be changed in-game and is only exposed in the "options.ini" file. */
    let VSync: boolean;
  }
}
