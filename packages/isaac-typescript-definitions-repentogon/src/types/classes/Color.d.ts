/**
 * @param r Optional. Default is 1.
 * @param g Optional. Default is 1.
 * @param b Optional. Default is 1.
 * @param a Optional. Default is 1.
 * @param ro Optional. Default is 0.
 * @param go Optional. Default is 0.
 * @param bo Optional. Default is 0.
 * @param rc Optional. Default is 0.
 * @param gc Optional. Default is 0.
 * @param bc Optional. Default is 0.
 * @param ac Optional. Default is 0.
 */
declare function Color(
  r?: float,
  g?: float,
  b?: float,
  a?: float,
  ro?: float,
  go?: float,
  bo?: float,
  rc?: float,
  gc?: float,
  bc?: float,
  ac?: float,
): Color;

declare interface Color extends IsaacAPIClass {
  /** Returns the color's current colorize values. */
  GetColorize: () => RGBAValue;

  /** Returns the color's current offset values. */
  GetOffset: () => RGBValue;

  /** Returns the color's current tint. */
  GetTint: () => RGBAValue;

  /** Returns a string representation of the color. */
  Print: () => string;
}

/** @noSelf */
declare namespace Color {
  // Unlike the vanilla API where constants like `Vector.Zero` can be overwritten, using these
  // constants is safe as Repentogon prevents these values from being changed by other mods.

  /**
   * Used by enemies like Crackles and Coal Spiders. This color has a hardcoded special property;
   * gibs start orange and fade into grey.
   */
  const EmberFade: Color;

  /** Used by lasers with the Almond Milk effect. */
  const LaserAlmond: Color;

  /** Used by lasers with the Chocolate Milk effect. */
  const LaserChocolate: Color;

  /** Used by lasers with the Lump of Coal effect. */
  const LaserCoal: Color;

  /** Used by lasers with the Fire Mind effect. */
  const LaserFireMind: Color;

  /** Used by homing lasers. */
  const LaserHoming: Color;

  /** Used by lasers with the Ipecac effect. */
  const LaserIpecac: Color;

  /** Used by Mother's mega laser. */
  const LaserMother: Color;

  /** Used by lasers with the Number One effect. */
  const LaserNumberOne: Color;

  /** Used by lasers with the Soy Milk effect. */
  const LaserSoy: Color;

  /** Used by poisonous lasers. */
  const LaserPoison: Color;

  /** Used by puke projectiles fired by The Cage. */
  const ProjectileCageBlue: Color;

  /** Used by clustered projectiles fired in Corpse by enemies such as Mother. */
  const ProjectileCorpseClusterDark: Color;

  /** Used by clustered projectiles fired in Corpse by enemies such as Mother. */
  const ProjectileCorpseClusterLight: Color;

  /**
   * Used by projectiles fired in Corpse by enemies such as Mother. Also used for the green laser
   * fired by Chimera.
   */
  const ProjectileCorpseGreen: Color;

  /** Used by pink-ish white-ish projectiles fired in Corpse by enemies such as Mother. */
  const ProjectileCorpsePink: Color;

  /** Used by white-ish grey-ish projectiles fired in Corpse by enemies such as Mother. */
  const ProjectileCorpseWhite: Color;

  /** Used by yellow projectiles fired in Corpse by enemies such as The Scourge. */
  const ProjectileCorpseYellow: Color;

  /** Used by projectiles which spawn fire waves fired by enemies like Crackle. */
  const ProjectileFireWave: Color;

  /** Used by homing projectiles fired by enemies such as Psychic Maw. */
  const ProjectileHoming: Color;

  /** Used by the blue projectiles fired by Hush. */
  const ProjectileHushBlue: Color;

  /** Used by the green projectiles fired by Hush. */
  const ProjectileHushGreen: Color;

  /** Used by the yellow projectiles fired by Hush. */
  const ProjectileHushYellow: Color;

  /** Used by explosive projectiles fired by enemies such as Gurgles. */
  const ProjectileIpecac: Color;

  /** Used by black projectiles fired by Mega Satan. */
  const ProjectileMegaSatanBlack: Color;

  /** Used by white projectiles fired by Mega Satan. */
  const ProjectileMegaSatanWhite: Color;

  /** Used by soy projectiles fired by enemies like Soy Creep. */
  const ProjectileSoy: Color;

  /** Used by tar projectiles fired by enemies like Clot. */
  const ProjectileTar: Color;

  /** Used for tears fired by players with Almond Milk. */
  const TearAlmond: Color;

  /** Used for tears fired by players with Chocolate Milk. */
  const TearChocolate: Color;

  /** Used for tears fired by players with Lump of Coal. */
  const TearCoal: Color;

  /** Used for tears fired by players with Common Cold. */
  const TearCommonCold: Color;

  /** Used for homing tears fired by players with Spoon Bender. */
  const TearHoming: Color;

  /** Used for explosive tears fired by players with Ipecac. */
  const TearIpecac: Color;

  /** Used for tears fired by players with Number One. */
  const TearNumberOne: Color;

  /** Used for poison tears fired by players with Scorpio. */
  const TearScorpio: Color;

  /** Used for poison tears fired by players with Serpents Kiss. */
  const TearSerpentsKiss: Color;

  /** Used for tears fired by players with Soy Milk. */
  const TearSoy: Color;

  /** Used for tears fired by familiars such as Little Gish. */
  const TearTar: Color;
}
