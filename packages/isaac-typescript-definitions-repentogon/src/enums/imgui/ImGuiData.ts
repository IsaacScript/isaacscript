/**
 * The type of autocomplete the command has for the debug console.
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum ImGuiData {
  /** Descriptive text of an element. */
  LABEL = 0,

  /** Used for single value elements like text inputs, the currently selected Radio Button, etc. */
  VALUE = 1,

  /** Used for elements that use an array as their data source like Radio Buttons, Plots, etc. */
  LIST_VALUES = 2,

  /** Minimum value of a slider input. */
  MIN = 3,

  /** Maximum value of a slider input. */
  MAX = 4,

  /** Hint text of a text input, or overlay texts used in plots or progress bars. */
  HINT_TEXT = 5,

  /** Color input. Can be RGB or RGBA. */
  COLOR_VALUES = 6,
}
