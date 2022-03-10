declare enum ActionTriggers {
  ACTIONTRIGGER_NONE = 0,

  /** 1 << 0 */
  ACTIONTRIGGER_BOMBPLACED = 1 << 0,

  /** 1 << 1 */
  ACTIONTRIGGER_MOVED = 1 << 1,

  /** 1 << 2 */
  ACTIONTRIGGER_SHOOTING = 1 << 2,

  /** 1 << 3 */
  ACTIONTRIGGER_CARDPILLUSED = 1 << 3,

  /** 1 << 4 */
  ACTIONTRIGGER_ITEMACTIVATED = 1 << 4,

  /** 1 << 5 */
  ACTIONTRIGGER_ITEMSDROPPED = 1 << 5,
}
