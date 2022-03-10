declare const enum DisplayFlag {
  /** 1 << -1 */
  INVISIBLE = 1 << -1,

  /** 1 << 0 */
  VISIBLE = 1 << 0,

  /** 1 << 1 */
  SHADOW = 1 << 1,

  /** 1 << 2 */
  SHOW_ICON = 1 << 2,
}
