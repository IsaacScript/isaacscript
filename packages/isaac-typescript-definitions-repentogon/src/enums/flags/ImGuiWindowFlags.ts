/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @enum
 * @notExported
 * @rename ImGuiWindowFlag
 * @see https://repentogon.com/
 */
const ImGuiWindowFlagInternal = {
  NONE: 0,

  /** Disables the title bar. */
  NO_TITLE_BAR: 1 << 0,

  NO_RESIZE: 1 << 1,

  /** Disables moving the window. */
  NO_MOVE: 1 << 2,

  /** Disable scrollbars. The window can still scroll with the mouse or programmatically. */
  NO_SCROLLBAR: 1 << 3,

  /**
   * Disable user vertically scrolling with mouse wheel. On child window, mouse wheel will be
   * forwarded to the parent unless `ImGuiWindowFlag.NO_SCROLLBAR` is also set.
   */
  NO_SCROLL_WITH_MOUSE: 1 << 4,

  /** Disable user collapsing window by double-clicking on it. */
  NO_COLLAPSE: 1 << 5,

  /** Resize every window to its content every frame. */
  ALWAYS_AUTO_RESIZE: 1 << 6,

  /** Disable drawing background colors and outside borders. */
  NO_BACKGROUND: 1 << 7,

  /** Never load/save settings in an `.ini` file. */
  NO_SAVED_SETTINGS: 1 << 8,

  /** Disable catching mouse inputs. */
  NO_MOUSE_INPUTS: 1 << 9,

  /** Has a menu-bar. */
  MENU_BAR: 1 << 10,

  /** Allow horizontal scrollbar to appear (off by default). */
  HORIZONTAL_SCROLLBAR: 1 << 11,

  /** Disable taking focus when transitioning from hidden to visible state. */
  NO_FOCUS_ON_APPEARING: 1 << 12,

  /**
   * Disable bringing window to front when taking focus (e.g. clicking on it or programmatically
   * giving it focus).
   */
  NO_BRING_TO_FRONT_ON_FOCUS: 1 << 13,

  /** Always show vertical scrollbar. */
  ALWAYS_VERTICAL_SCROLLBAR: 1 << 14,

  /** Always show horizontal scrollbar. */
  ALWAYS_HORIZONTAL_SCROLLBAR: 1 << 15,

  /** No gamepad/keyboard navigation within the window. */
  NO_NAV_INPUTS: 1 << 16,

  /** No focusing toward this window with gamepad/keyboard navigation (e.g. skipped by CTRL+TAB). */
  NO_NAV_FOCUS: 1 << 17,

  /**
   * Display a dot next to the title. When used in a tab/docking context, tab is selected when
   * clicking the X + closure is not assumed (will wait for user to stop submitting the tab).
   * Otherwise closure is assumed.
   */
  UNSAVED_DOCUMENT: 1 << 18,
} as const;

type ImGuiWindowFlagValue = BitFlag & {
  readonly __imGuiWindowFlagBrand: symbol;
};
type ImGuiWindowFlagType = {
  readonly [K in keyof typeof ImGuiWindowFlagInternal]: ImGuiWindowFlagValue;
};

export const ImGuiWindowFlag = ImGuiWindowFlagInternal as ImGuiWindowFlagType;
export type ImGuiWindowFlag = ImGuiWindowFlagType[keyof ImGuiWindowFlagType];

export const ImGuiWindowFlagZero = 0 as BitFlags<ImGuiWindowFlag>;
