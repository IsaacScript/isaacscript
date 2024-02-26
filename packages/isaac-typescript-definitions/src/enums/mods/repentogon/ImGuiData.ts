/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum ImGuiData {
  /** Descriptive text of an element. */
  LABEL = 0,

  /** Used for single value elements like checkboxes, integer inputs, etc. */
  VALUE = 1,

  /**
   * Used for elements that use a table as their data source like RadioButtons, Comboboxes, Plots,
   * etc.
   */
  LIST_VALUES = 2,

  /** Min value of a slider input. */
  MIN = 3,

  /** Max value of a slider input. */
  MAX = 4,

  /** Hint text of a text input or overlay texts used in plots or progress bars. */
  HINT_TEXT = 5,

  /** Color input. */
  COLOR_VALUES = 6,
}
