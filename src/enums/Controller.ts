/**
 * These enums loop after 31, so 32 = D_PAD_LEFT, 63 = D_PAD_LEFT, and so on.
 *
 * There appears to be no input key for joystick movement.
 */
export enum Controller {
  D_PAD_LEFT = 0,
  D_PAD_RIGHT = 1,
  D_PAD_UP = 2,
  D_PAD_DOWN = 3,

  /** A, X and B on Xbox, Playstation and Nintendo respectively. */
  BUTTON_A = 4,

  /** B, O and A on Xbox, Playstation and Nintendo respectively. */
  BUTTON_B = 5,

  /** X, □ and Y on Xbox, Playstation and Nintendo respectively. */
  BUTTON_X = 6,

  /** Y, Δ and X on Xbox, Playstation and Nintendo respectively. */
  BUTTON_Y = 7,

  /** Left shoulder button. */
  BUMPER_LEFT = 8,

  TRIGGER_LEFT = 9,
  STICK_LEFT = 10,

  /** Right shoulder button. */
  BUMPER_RIGHT = 11,

  TRIGGER_RIGHT = 12,
  STICK_RIGHT = 13,

  /** Select, Share and - on Xbox, Playstation and Nintendo respectively. */
  BUTTON_BACK = 14,

  /** Start, Options and + on Xbox, Playstation and Nintendo respectively. */
  BUTTON_START = 15,
}
