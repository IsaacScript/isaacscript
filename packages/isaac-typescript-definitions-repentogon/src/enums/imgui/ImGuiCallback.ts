/**
 * The type of autocomplete the command has for the debug console.
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
export enum ImGuiCallback {
  CLICKED = 0,
  HOVERED = 1,
  ACTIVE = 2,
  FOCUSED = 3,
  VISIBLE = 4,
  EDITED = 5,
  ACTIVATED = 6,
  DEACTIVATED = 7,
  DEACTIVATED_AFTER_EDIT = 8,
  TOGGLED_OPEN = 9,
  RENDER = 10,
}
