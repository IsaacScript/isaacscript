declare namespace Options {
  /**
   * Whether the announcer voice should play when using items, pills, cards, and runes.
   * This cannot be changed in-game and is only exposed in the "options.ini" file.
   * 0: random, 1: always off, 2: always on.
   */
  let AnnouncerVoiceMode: 0 | 1 | 2;

  /** This can be changed from the in-game options menu. */
  let BulletVisibility: boolean;

  /**
   * Toggles the active camera.
   * This can be changed from the in-game options menu.
   * 1: on, 2: off.
   */
  let CameraStyle: 1 | 2;

  /** This can be changed from the in-game options menu. */
  let ChargeBars: boolean;

  /**
   * How big the text in the debug console should be.
   * This cannot be changed in-game and is only exposed in the "options.ini" file.
   * 0: default, 1: small, 2: tiny.
   */
  let ConsoleFont: 0 | 1 | 2;

  /** This cannot be changed in-game and is only exposed in the "options.ini" file. */
  let DebugConsoleEnabled: boolean;

  /** This can be changed from the in-game options menu. */
  let DisplayPopups: boolean;

  /**
   * Sets the style of the Extra HUD.
   * This can be changed from the in-game options menu.
   * 0: off, 1: on, 2: mini.
   */
  let ExtraHUDStyle: 0 | 1 | 2;

  /** This cannot be changed in-game and is only exposed in the "options.ini" file. */
  let FadedConsoleDisplay: boolean;

  /**
   * The filter is a setting that makes the game look more like the Flash version (i.e. Wrath of the
   * Lamb).
   * This can be changed from the in-game options menu.
   */
  let Filter: boolean;

  /**
   * The Found HUD is the in-game stat menu. The name is a reference to MissingHUD, which was a stat
   * HUD added by a mod.
   * This can be changed from the in-game options menu.
   */
  let FoundHUD: boolean;

  /** This can be changed from the in-game options menu. */
  let Fullscreen: boolean;

  /**
   * This can be changed from the in-game options menu.
   * Valid values are from 0.5-1.5.
   */
  let Gamma: float;

  /**
   * This can be changed from the in-game options menu.
   * Valid values are from 0-1.
   */
  let HUDOffset: float;

  /** This can be changed from the in-game options menu. */
  const Language: LanguageAbbreviation;

  /** Valid values are from 0-1. */
  let MapOpacity: float;

  /** Valid values are from 1-99. */
  let MaxRenderScale: int;

  /** Valid values are from 1-99. */
  let MaxScale: int;

  let MouseControl: boolean;

  /** How loud the in-game music should be. Valid values are from 0-1. */
  let MusicVolume: float;

  let PauseOnFocusLost: boolean;
  let RumbleEnabled: boolean;

  let SaveCommandHistory: boolean;

  /** How loud the non-music sound effects should be. Valid values are from 0-1. */
  let SFXVolume: float;

  /** This only takes effect if Fullscreen is also true. */
  let UseBorderlessFullscreen: boolean;

  let VSync: boolean;
}
