/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum FollowerPriority {
  DEFAULT = 0,
  SHOOTER = 1,

  /** Used by Dry Bab, Mongo Baby, Censer, and Lil Abaddon. */
  DEFENSIVE = 2,

  /** Used by Lil Brim and Lil Monstro. */
  SHOOTER_SPECIAL = 3,

  INCUBUS = 10,
  KING_BABY = 9999,
}
