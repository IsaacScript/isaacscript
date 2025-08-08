export enum ButtonAction {
  /** This only fires on `InputHook.GET_ACTION_VALUE` (2). */
  LEFT = 0,

  /** This only fires on `InputHook.GET_ACTION_VALUE` (2). */
  RIGHT = 1,

  /** This only fires on `InputHook.GET_ACTION_VALUE` (2). */
  UP = 2,

  /** This only fires on `InputHook.GET_ACTION_VALUE` (2). */
  DOWN = 3,

  /** This fires on `InputHook.IS_ACTION_PRESSED` (0) and `InputHook.GET_ACTION_VALUE` (2). */
  SHOOT_LEFT = 4,

  /** This fires on `InputHook.IS_ACTION_PRESSED` (0) and `InputHook.GET_ACTION_VALUE` (2). */
  SHOOT_RIGHT = 5,

  /** This fires on `InputHook.IS_ACTION_PRESSED` (0) and `InputHook.GET_ACTION_VALUE` (2). */
  SHOOT_UP = 6,

  /** This fires on `InputHook.IS_ACTION_PRESSED` (0) and `InputHook.GET_ACTION_VALUE` (2). */
  SHOOT_DOWN = 7,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  BOMB = 8,

  /** This fires on `InputHook.IS_ACTION_PRESSED` (0) and `InputHook.IS_ACTION_TRIGGERED` (1). */
  ITEM = 9,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  PILL_CARD = 10,

  /**
   * This is also used for switching cards, switching The Forgotten, holding Esau in place, and so
   * on.
   *
   * This fires on `InputHook.IS_ACTION_PRESSED` (0) and `InputHook.IS_ACTION_TRIGGERED` (1).
   */
  DROP = 11,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  PAUSE = 12,

  /** This only fires on `InputHook.IS_ACTION_PRESSED` (0). */
  MAP = 13,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  MENU_CONFIRM = 14,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  MENU_BACK = 15,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  FULLSCREEN = 16,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  MUTE = 17,

  /** This only fires on `InputHook.IS_ACTION_PRESSED` (0). */
  RESTART = 18,

  /** Does not seem to trigger any input hooks while on keyboard. */
  JOIN_MULTIPLAYER = 19,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  MENU_LEFT = 20,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  MENU_RIGHT = 21,

  /** Does not seem to trigger any input hooks while on keyboard. */
  MENU_UP = 22,

  /** Does not seem to trigger any input hooks while on keyboard. */
  MENU_DOWN = 23,

  MENU_LB = 24,
  MENU_RB = 25,

  /** Does not seem to trigger any input hooks while on keyboard. */
  MENU_LT = 26,

  /** Does not seem to trigger any input hooks while on keyboard. */
  MENU_RT = 27,

  /** Does not seem to trigger any input hooks while on keyboard. */
  MENU_TAB = 28,

  MENU_EX = 29,
  EMOTES = 30,

  /** This only fires on `InputHook.IS_ACTION_TRIGGERED` (1). */
  CONSOLE = 32,
}
