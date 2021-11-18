declare namespace Options {
  /**
   * Whether the announcer voice should play when using items, pills, cards, and runes.
   * 0: random, 1: off, 2: always on.
   */
  let AnnouncerVoiceMode: int;

  let BulletVisibility: boolean;

  /** Toggles the active camera. 1: on, 2: off. */
  let CameraStyle: int;

  let ChargeBars: boolean;

  /** How big the text in the debug console should be. 0: default, 1: small, 2: tiny. */
  let ConsoleFont: int;

  let DebugConsoleEnabled: boolean;
  let DisplayPopups: boolean;

  /** Sets the style of the Extra HUD. 0: off, 1: on, 2: mini. */
  let ExtraHUDStyle: int;

  let FadedConsoleDisplay: boolean;
  let Filter: boolean;
  let FoundHUD: boolean;
  let Fullscreen: boolean;

  /** Valid values are from 0.5-1.5. */
  let Gamma: float;

  /** Valid values are from 0-1. */
  let HUDOffset: float;

  const Language: string;

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
