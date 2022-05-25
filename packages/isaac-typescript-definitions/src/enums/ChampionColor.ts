export enum ChampionColor {
  /** 33% more life. Drops a red heart. */
  RED = 0,

  /** 33% increased movement speed. Drops a Lil Battery. */
  YELLOW = 1,

  /** Leaves green creep as it walks. Drops a pill. */
  GREEN = 2,

  /** Greed shot (causing dropped coins on hit). Drops 1-3 coins. */
  ORANGE = 3,

  /** Half speed. Spawns 3 blue flies on death. */
  BLUE = 4,

  /** Explodes on death. Drops a bomb. */
  BLACK = 5,

  /** Invincible until all other enemies are killed. Drops an eternal heart. */
  WHITE = 6,

  /** 33% health, half speed. Drops a key. */
  GREY = 7,

  /** Spectral projectiles and can move past environmental obstacles. Drops a locked chest. */
  TRANSPARENT = 8,

  /** Fades in and out of visibility. Drops a red chest. */
  FLICKER = 9,

  /** Random projectiles. No drop. */
  PINK = 10,

  /** Pulls the player (and tears) towards itself. Drops a trinket. */
  PURPLE = 11,

  /**
   * Collapses into a flesh pile upon death and regenerates if not finished off.
   *
   * Drops a double heart.
   */
  DARK_RED = 12,

  /** Releases blood shots in 8 directions when killed. Drops a half red heart. */
  LIGHT_BLUE = 13,

  /**
   * The enemy blends into the background and briefly becomes visible when damaged.
   *
   * Drops a rune.
   */
  CAMO = 14,

  /** Splits into two copies of itself upon death. */
  PULSE_GREEN = 15,

  /** Repels Isaac's tears while in the gray state. Drops a random pickup. */
  PULSE_GREY = 16,

  /** Has 1-2 Eternal Flies circling it. Spawns two attack flies on death. */
  FLY_PROTECTED = 17,

  /** Half size, 33% less HP, 33% faster. 20% chance to drop a pill. */
  TINY = 18,

  /** Double size, 50% more HP, does 2 hearts of damage, 10% slower. 20% chance to drop a pill. */
  GIANT = 19,

  /** Heals all enemies in the room (including itself) for 30 HP per second. Drops a heart. */
  PULSE_RED = 20,

  /**
   * Spawns an Attack Fly on hit. After each hit, there is a delay until the next hit results in
   * another Attack Fly. A single Pulsating enemy can have up to 5 Attack Flies at once.
   *
   * Spawns 4-6 blue flies on death.
   */
  SIZE_PULSE = 21,

  /**
   * 3x HP. All enemies in the room that are not champions will turn yellow while the crowned enemy
   * is alive. The affected enemies will drop batteries like yellow champions upon dying.
   *
   * Drops 2-3 random pickups.
   */
  KING = 22,

  /**
   * Does 2 hearts of damage when touched. Produces a Necronomicon effect upon death.
   *
   * Deals two full hearts of damage.
   */
  DEATH = 23,

  /** Constantly poops. */
  BROWN = 24,

  /** Many champion effects combined, drops one of everything. */
  RAINBOW = 25,
}
