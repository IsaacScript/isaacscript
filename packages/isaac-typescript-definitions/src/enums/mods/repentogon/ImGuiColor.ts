/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum ImGuiColor {
  TEXT = 0,
  TEXT_DISABLED = 1,

  /** Background of normal windows. */
  WINDOW_BG = 2,

  /** Background of child windows. */
  CHILD_BG = 3,

  /** Background of popups, menus, tooltips windows. */
  POPUP_BG = 4,
  BORDER = 5,
  BORDER_SHADOW = 6,
  FRAME_BG = 7,

  /** Background of checkbox, radio button, plot, slider, text input. */
  FRAME_BG_HOVERED = 8,
  FRAME_BG_ACTIVE = 9,
  TITLE_BG = 10,
  TITLE_BG_ACTIVE = 11,
  TITLE_BG_COLLAPSED = 12,
  MENU_BAR_BG = 13,
  SCROLLBAR_BG = 14,
  SCROLLBAR_GRAB = 15,
  SCROLLBAR_GRAB_HOVERED = 16,
  SCROLLBAR_GRAB_ACTIVE = 17,
  CHECK_MARK = 18,
  SLIDER_GRAB = 19,
  SLIDER_GRAB_ACTIVE = 20,
  BUTTON = 21,
  BUTTON_HOVERED = 22,
  BUTTON_ACTIVE = 23,

  /** Header colors are used for CollapsingHeader, TreeNode, Selectable, MenuItem. */
  HEADER = 24,
  HEADER_HOVERED = 25,
  HEADER_ACTIVE = 26,
  SEPARATOR = 27,
  SEPARATOR_HOVERED = 28,
  SEPARATOR_ACTIVE = 29,

  /** Resize grip in lower-right and lower-left corners of windows. */
  RESIZE_GRIP = 30,
  RESIZE_GRIP_HOVERED = 31,
  RESIZE_GRIP_ACTIVE = 32,

  /** TabItem in a TabBar. */
  TAB = 33,
  TAB_HOVERED = 34,
  TAB_ACTIVE = 35,
  TAB_UNFOCUSED = 36,
  TAB_UNFOCUSED_ACTIVE = 37,
  PLOT_LINES = 38,
  PLOT_LINES_HOVERED = 39,
  PLOT_HISTOGRAM = 40,
  PLOT_HISTOGRAM_HOVERED = 41,

  /** Table header background. */
  TABLE_HEADER_BG = 42,

  /** Table outer and header borders (prefer using Alpha= 1.0 here). */
  TABLE_BORDER_STRONG = 43,

  /** Table inner borders (prefer using Alpha=1.0 here). */
  TABLE_BORDER_LIGHT = 44,

  /** Table row background (even rows). */
  TABLE_ROW_BG = 45,

  /** Table row background (odd rows). */
  TABLE_ROW_BG_ALT = 46,
  TEXT_SELECTED_BG = 47,

  /** Rectangle highlighting a drop target. */
  DRAG_DROP_TARGET = 48,

  /** Gamepad/keyboard: current highlighted item. */
  NAV_HIGHLIGHT = 49,

  /** Highlight window when using CTRL+TAB. */
  NAV_WINDOWING_HIGHLIGHT = 50,

  /** Darken/colorize entire screen behind the CTRL+TAB window list, when active. */
  NAV_WINDOWING_DIM_BG = 51,

  /** Darken/colorize entire screen behind a modal window, when one is active. */
  MODAL_WINDOW_DIM_BG = 52,
}
