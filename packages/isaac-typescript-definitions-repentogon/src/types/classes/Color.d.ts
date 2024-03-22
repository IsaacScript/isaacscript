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

  // Unlike the vanilla API where constants like `Vector.Zero` can be overwritten, using these
  // constants is safe as Repentogon prevents these values from being changed by other mods.

  /**
   * Used by enemies like Crackles and Coal Spiders. This color has a hardcoded special property;
   * gibs start orange and fade into grey.
   */
  EmberFade: Color;

  /** Used by lasers with the Almond Milk effect. */
  LaserAlmond: Color;

  /** Used by lasers with the Chocolate Milk effect. */
  LaserChocolate: Color;

  /** Used by lasers with the Lump of Coal effect. */
  LaserCoal: Color;

  /** Used by lasers with the Fire Mind effect. */
  LaserFireMind: Color;

  /** Used by homing lasers. */
  LaserHoming: Color;

  /** Used by lasers with the Ipecac effect. */
  LaserIpecac: Color;

  /** Used by Mother's mega laser. */
  LaserMother: Color;

  /** Used by lasers with the Number One effect. */
  LaserNumberOne: Color;

  /** Used by lasers with the Soy Milk effect. */
  LaserSoy: Color;

  /** Used by poisonous lasers. */
  LaserPoison: Color;

  /** Used by puke projectiles fired by The Cage. */
  ProjectileCageBlue: Color;

  /** Used by clustered projectiles fired in Corpse by enemies such as Mother. */
  ProjectileCorpseClusterDark: Color;

  /** Used by clustered projectiles fired in Corpse by enemies such as Mother. */
  ProjectileCorpseClusterLight: Color;

  /**
   * Used by projectiles fired in Corpse by enemies such as Mother. Also used for the green laser
   * fired by Chimera.
   */
  ProjectileCorpseGreen: Color;

  /** Used by pink-ish white-ish projectiles fired in Corpse by enemies such as Mother. */
  ProjectileCorpsePink: Color;

  /** Used by white-ish grey-ish projectiles fired in Corpse by enemies such as Mother. */
  ProjectileCorpseWhite: Color;

  /** Used by yellow projectiles fired in Corpse by enemies such as The Scourge. */
  ProjectileCorpseYellow: Color;

  /** Used by projectiles which spawn fire waves fired by enemies like Crackle. */
  ProjectileFireWave: Color;

  /** Used by homing projectiles fired by enemies such as Psychic Maw. */
  ProjectileHoming: Color;

  /** Used by the blue projectiles fired by Hush. */
  ProjectileHushBlue: Color;

  /** Used by the green projectiles fired by Hush. */
  ProjectileHushGreen: Color;

  /** Used by the yellow projectiles fired by Hush. */
  ProjectileHushYellow: Color;

  /** Used by explosive projectiles fired by enemies such as Gurgles. */
  ProjectileIpecac: Color;

  /** Used by black projectiles fired by Mega Satan. */
  ProjectileMegaSatanBlack: Color;

  /** Used by white projectiles fired by Mega Satan. */
  ProjectileMegaSatanWhite: Color;

  /** Used by soy projectiles fired by enemies like Soy Creep. */
  ProjectileSoy: Color;

  /** Used by tar projectiles fired by enemies like Clot. */
  ProjectileTar: Color;

  /** Used for tears fired by players with Almond Milk. */
  TearAlmond: Color;

  /** Used for tears fired by players with Chocolate Milk. */
  TearChocolate: Color;

  /** Used for tears fired by players with Lump of Coal. */
  TearCoal: Color;

  /** Used for tears fired by players with Common Cold. */
  TearCommonCold: Color;

  /** Used for homing tears fired by players with Spoon Bender. */
  TearHoming: Color;

  /** Used for explosive tears fired by players with Ipecac. */
  TearIpecac: Color;

  /** Used for tears fired by players with Number One. */
  TearNumberOne: Color;

  /** Used for poison tears fired by players with Scorpio. */
  TearScorpio: Color;

  /** Used for poison tears fired by players with Serpents Kiss. */
  TearSerpentsKiss: Color;

  /** Used for tears fired by players with Soy Milk. */
  TearSoy: Color;

  /** Used for tears fired by familiars such as Little Gish. */
  TearTar: Color;
}
