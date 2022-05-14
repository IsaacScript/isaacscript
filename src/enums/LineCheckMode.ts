export enum LineCheckMode {
  /** Stopped by pits and rocks (e.g. like a Gaper's behavior). */
  NORMAL = 0,

  /** Same as MODE_NORMAL, but less resource-intensive. */
  ECONOMIC = 1,

  /** Only blocked by walls and metal blocks. */
  EXPLOSION = 2,

  /** Not blocked by pits. Used by enemies that shoot projectiles at you, such as Hosts. */
  PROJECTILE = 3,
}
