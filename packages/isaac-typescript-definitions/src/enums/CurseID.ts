/**
 * Matches the "id" field in the "resources/curses.xml" file. This is used to compute the
 * `LevelCurse` enum.
 *
 * The values of this enum are integers. Do not use this enum to check for the presence of curses;
 * use the `LevelCurse` enum instead, which has bit flag values.
 */
export enum CurseID {
  DARKNESS = 1,
  LABYRINTH = 2,
  LOST = 3,
  UNKNOWN = 4,
  CURSED = 5,
  MAZE = 6,
  BLIND = 7,
  GIANT = 8,
}
