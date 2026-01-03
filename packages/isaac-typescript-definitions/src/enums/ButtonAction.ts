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

  /**
   * This only fires on `InputHook.IS_ACTION_PRESSED` (0).
   *
   * This enum value changed in Repentance+ from 16 to 18.
   */
  RESTART_REPENTANCE = 16,

  /**
   * This only fires on `InputHook.IS_ACTION_TRIGGERED` (1).
   *
   * This enum value changed in Repentance+ from 17 to 16.
   */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  FULLSCREEN_REPENTANCE_PLUS = 16,

  /**
   * This only fires on `InputHook.IS_ACTION_TRIGGERED` (1).
   *
   * This enum value changed in Repentance+ from 17 to 16.
   */
  FULLSCREEN_REPENTANCE = 17,

  /**
   * This only fires on `InputHook.IS_ACTION_TRIGGERED` (1).
   *
   * This enum value changed in Repentance+ from 18 to 17.
   */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MUTE_REPENTANCE_PLUS = 17,

  /**
   * This only fires on `InputHook.IS_ACTION_TRIGGERED` (1).
   *
   * This enum value changed in Repentance+ from 18 to 17.
   */
  MUTE_REPENTANCE = 18,

  /**
   * This only fires on `InputHook.IS_ACTION_PRESSED` (0).
   *
   * This enum value changed in Repentance+ from 16 to 18.
   */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  RESTART_REPENTANCE_PLUS = 18,

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

  /** This enum value changed in Repentance+ from 24 to 26. */
  MENU_LEFT_TRIGGER_REPENTANCE = 24,

  /** Added in Repentance+. (It took the old value for "MENU_LEFT_TRIGGER".) */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MENU_LEFT_SHOULDER = 24,

  /** This enum value changed in Repentance+ from 25 to 27. */
  MENU_RIGHT_TRIGGER_REPENTANCE = 25,

  /** Added in Repentance+. (It took the old value for "MENU_RIGHT_TRIGGER".) */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MENU_RIGHT_SHOULDER = 25,

  /** This enum value changed in Repentance+ from 26 to 28. */
  MENU_TAB_REPENTANCE = 26,

  /**
   * Does not seem to trigger any input hooks while on keyboard.
   *
   * This enum value changed in Repentance+ from 24 to 26.
   */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MENU_LEFT_TRIGGER_REPENTANCE_PLUS = 26,

  /**
   * Does not seem to trigger any input hooks while on keyboard.
   *
   * This enum value changed in Repentance+ from 25 to 27.
   */
  MENU_RIGHT_TRIGGER_REPENTANCE_PLUS = 27,

  /**
   * This only fires on `InputHook.IS_ACTION_TRIGGERED` (1).
   *
   * This enum value changed in Repentance+ from 28 to 32.
   */
  CONSOLE_REPENTANCE = 28,

  /**
   * Does not seem to trigger any input hooks while on keyboard.
   *
   * This enum value changed in Repentance+ from 26 to 28.
   */
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MENU_TAB_REPENTANCE_PLUS = 28,

  /** Added in Repentance+. */
  MENU_EX = 29,

  /** Added in Repentance+. */
  EMOTES = 30,

  /**
   * This only fires on `InputHook.IS_ACTION_TRIGGERED` (1).
   *
   * This enum value changed in Repentance+ from 28 to 32.
   */
  CONSOLE_REPENTANCE_PLUS = 32,
}
