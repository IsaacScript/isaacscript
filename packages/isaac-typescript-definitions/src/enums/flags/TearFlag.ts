/**
 * For `EntityType.TEAR` (2).
 *
 * This enum was renamed from "TearFlags" to be consistent with the other flag enums.
 *
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type. Furthermore, enums cannot be instantiated
 * with `BitSet128` objects.)
 *
 * Generally, the `TearVariant` affects the graphics of the tear, while the `TearFlag` affects the
 * gameplay mechanic. For example, the Euthanasia collectible grants a chance for needle tears that
 * explode. `TearVariant.NEEDLE` makes the tear look like a needle, and the exploding effect comes
 * from `TearFlag.NEEDLE`.
 *
 * However, there are some exceptions. For example, Sharp Key makes Isaac shoot key tears that deal
 * extra damage. Both the graphical effect and the extra damage are granted by
 * `TearVariant.KEY_BLOOD`.
 *
 * @enum
 * @notExported
 * @rename TearFlag
 */
const TearFlagInternal = {
  /**
   * Default tear (no special effects).
   *
   * 1 << -1 (0)
   */
  NORMAL: BitSet128(0, 0),

  /**
   * Goes through obstacles. Used by Ouija Board.
   *
   * 1 << 0 (1)
   */
  SPECTRAL: getTearFlag(0),

  /**
   * Goes through enemies. Used by Cupid's Arrow.
   *
   * 1 << 1 (2)
   */
  PIERCING: getTearFlag(1),

  /**
   * Used by Spoon Bender.
   *
   * 1 << 2 (4)
   */
  HOMING: getTearFlag(2),

  /**
   * Slows enemies on contact. Used by Spider Bite.
   *
   * 1 << 3 (8)
   */
  SLOW: getTearFlag(3),

  /**
   * Used by The Common Cold.
   *
   * 1 << 4 (16)
   */
  POISON: getTearFlag(4),

  /**
   * Freezes enemies in place. (For the ice effect, see `TearFlag.TEAR_ICE`.) Used by Mom's
   * Contacts.
   *
   * 1 << 5 (32)
   */
  FREEZE: getTearFlag(5),

  /**
   * Splits into two different tears on collision. Used by The Parasite.
   *
   * 1 << 6 (64)
   */
  SPLIT: getTearFlag(6),

  /**
   * The tear increases in size and damage the longer it travels. Used by Lump of Coal.
   *
   * 1 << 7 (128)
   */
  GROW: getTearFlag(7),

  /**
   * Returns backwards after traveling for a little while. Used by My Reflection.
   *
   * 1 << 8 (256)
   */
  BOOMERANG: getTearFlag(8),

  /**
   * Keeps going past enemies that it kills (with less damage). Used by Polyphemus.
   *
   * 1 << 9 (512)
   */
  PERSISTENT: getTearFlag(9),

  /**
   * Used by the Wiggle Worm trinket.
   *
   * 1 << 10 (1024)
   */
  WIGGLE: getTearFlag(10),

  /**
   * Created a blue fly on hit. Used by The Mulligan.
   *
   * 1 << 11 (2048)
   */
  MULLIGAN: getTearFlag(11),

  /**
   * Explodes on hit. Used by Ipecac.
   *
   * 1 << 12 (4096)
   */
  EXPLOSIVE: getTearFlag(12),

  /**
   * Used by Mom's Eyeshadow.
   *
   * 1 << 13 (8192)
   */
  CHARM: getTearFlag(13),

  /**
   * Used by Iron Bar.
   *
   * 1 << 14 (16384)
   */
  CONFUSION: getTearFlag(14),

  /**
   * Enemies killed have a 33% chance to drop a heart. Used by Tainted Magdalene.
   *
   * 1 << 15 (32768)
   */
  HP_DROP: getTearFlag(15),

  /**
   * Tears orbit around the player. Used by Tiny Planet.
   *
   * 1 << 16 (65536)
   */
  ORBIT: getTearFlag(16),

  /**
   * Floats in place until the player releases the fire button. Used by Anti-Gravity.
   *
   * 1 << 17 (131072)
   */
  WAIT: getTearFlag(17),

  /**
   * Splits into four different tears on collision. Used by Cricket's Body.
   *
   * 1 << 18 (262144)
   */
  QUAD_SPLIT: getTearFlag(18),

  /**
   * Bounces off of enemies, walls, rocks, and so on. Used by Rubber Cement.
   *
   * 1 << 19 (524288)
   */
  BOUNCE: getTearFlag(19),

  /**
   * Used by Mom's Perfume.
   *
   * 1 << 20 (1048576)
   */
  FEAR: getTearFlag(20),

  /**
   * The tear shrinks the longer it travels. Used by Proptosis.
   *
   * 1 << 21 (2097152)
   */
  SHRINK: getTearFlag(21),

  /**
   * Used by Fire Mind.
   *
   * 1 << 22 (4194304)
   */
  BURN: getTearFlag(22),

  /**
   * Attracts enemies and pickups. Used by Strange Attractor.
   *
   * 1 << 23 (8388608)
   */
  ATTRACTOR: getTearFlag(23),

  /**
   * Pushes enemies back further than normal.
   *
   * 1 << 24 (16777216)
   */
  KNOCKBACK: getTearFlag(24),

  /**
   * Used by Pulse Worm.
   *
   * 1 << 25 (33554432)
   */
  PULSE: getTearFlag(25),

  /**
   * Used by Ring Worm.
   *
   * 1 << 26 (67108864)
   */
  SPIRAL: getTearFlag(26),

  /**
   * Used by Flat Worm.
   *
   * 1 << 27 (134217728)
   */
  FLAT: getTearFlag(27),

  /**
   * Makes tears explode out of the bomb. Used by Sad Bombs.
   *
   * 1 << 28 (268435456)
   */
  SAD_BOMB: getTearFlag(28),

  /**
   * Damages everything in the room when it explodes. Used by Butt Bombs.
   *
   * 1 << 29 (536870912)
   */
  BUTT_BOMB: getTearFlag(29),

  /**
   * Used by Hook Worm.
   *
   * 1 << 30 (1073741824)
   */
  SQUARE: getTearFlag(30),

  /**
   * Creates an aura around the tear. Used by Godhead.
   *
   * 1 << 31 (2147483648)
   */
  GLOW: getTearFlag(31),

  /**
   * Slows enemies and colors them black. Used by Lil Gish.
   *
   * 1 << 32 (4294967296)
   */
  GISH: getTearFlag(32),

  /**
   * Spawns green creep on hit. Used by Mysterious Liquid.
   *
   * 1 << 33
   */
  MYSTERIOUS_LIQUID_CREEP: getTearFlag(33),

  /**
   * Deletes projectiles that it collides with. Used by Lost Contact.
   *
   * 1 << 34
   */
  SHIELDED: getTearFlag(34),

  /**
   * Spawns a pickup upon exploding. Used by Glitter Bombs.
   *
   * 1 << 35
   */
  GLITTER_BOMB: getTearFlag(35),

  /**
   * Splits into 5 little bombs upon exploding. Used by Scatter Bombs.
   *
   * 1 << 36
   */
  SCATTER_BOMB: getTearFlag(36),

  /**
   * Sticks to enemies and continues to deal damage. Used by Explosivo and Sticky Bombs.
   *
   * 1 << 37
   */
  STICKY: getTearFlag(37),

  /**
   * Pass through walls to loop around the screen. Used by Continuum.
   *
   * 1 << 38
   */
  CONTINUUM: getTearFlag(38),

  /**
   * Creates a light beam on hit. Used by Holy Light.
   *
   * 1 << 39
   */
  LIGHT_FROM_HEAVEN: getTearFlag(39),

  /**
   * Spawns a coin on hit. Used by Bumbo.
   *
   * 1 << 40
   */
  COIN_DROP: getTearFlag(40),

  /**
   * Enemies killed will spawn a black heart.
   *
   * 1 << 41
   */
  BLACK_HP_DROP: getTearFlag(41),

  /**
   * Follows the parent player's beam. Used by Tractor Beam.
   *
   * 1 << 42
   */
  TRACTOR_BEAM: getTearFlag(42),

  /**
   * Shrink enemies on hit. Used by God's Flesh.
   *
   * 1 << 43
   */
  GODS_FLESH: getTearFlag(43),

  /**
   * Have a chance to spawn a coin on hit.
   *
   * 1 << 44
   */
  GREED_COIN: getTearFlag(44),

  /**
   * Causes a large explosion in the shape of a cross. Used by Bomber Boy.
   *
   * 1 << 45
   */
  CROSS_BOMB: getTearFlag(45),

  /**
   * Used by Ouroboros Worm.
   *
   * 1 << 46
   */
  BIG_SPIRAL: getTearFlag(46),

  /**
   * Used by Glaucoma.
   *
   * 1 << 47
   */
  PERMANENT_CONFUSION: getTearFlag(47),

  /**
   * Sticks to enemies and does damage over time. Used by Sinus Infection.
   *
   * 1 << 48
   */
  BOOGER: getTearFlag(48),

  /**
   * Spawns creep on hit and spawns blue flies or spiders. Used by Parasitoid.
   *
   * 1 << 49
   */
  EGG: getTearFlag(49),

  /**
   * Can open doors or break grid entities. Used by Sulfuric Acid.
   *
   * 1 << 50
   */
  ACID: getTearFlag(50),

  /**
   * Splits into two tears. Used by Compound Fracture.
   *
   * 1 << 51
   */
  BONE: getTearFlag(51),

  /**
   * Piercing. When passing through an enemy, gains homing and does double damage. Used by Eye of
   * Belial.
   *
   * 1 << 52
   */
  BELIAL: getTearFlag(52),

  /**
   * Enemies turn gold and drop coins on death. Used by Midas' Touch.
   *
   * 1 << 53
   */
  MIDAS: getTearFlag(53),

  /**
   * Used by Euthanasia.
   *
   * 1 << 54
   */
  NEEDLE: getTearFlag(54),

  /**
   * Causes electricity to ripple around the room, damaging enemies. Used by Jacob's Ladder.
   *
   * 1 << 55
   */
  JACOBS: getTearFlag(55),

  /**
   * Void tears. Instantly kills enemies. Used by Little Horn.
   *
   * 1 << 56
   */
  HORN: getTearFlag(56),

  /**
   * Electricity arcs between tears. Used by Technology Zero.
   *
   * 1 << 57
   */
  LASER: getTearFlag(57),

  /**
   * Tears stay in the air and bump into each other. Used by Pop!
   *
   * 1 << 58
   */
  POP: getTearFlag(58),

  /**
   * Tears combine when they collide into each other. Used by Lachryphagy.
   *
   * 1 << 59
   */
  ABSORB: getTearFlag(59),

  /**
   * Lasers are generated on top of the tear. Used by Trisagion.
   *
   * 1 << 60
   */
  LASER_SHOT: getTearFlag(60),

  /**
   * Continually bounces as it travels. Used by Flat Stone.
   *
   * 1 << 61
   */
  HYDRO_BOUNCE: getTearFlag(61),

  /**
   * Arcing shots that split into smaller tears on impact. Used by Haemolacria.
   *
   * 1 << 62
   */
  BURST_SPLIT: getTearFlag(62),

  /**
   * Spawns green creep. Used by Bob's Bladder.
   *
   * 1 << 63
   */
  CREEP_TRAIL: getTearFlag(63),

  /**
   * Knockback tears. Used by Knockout Drops.
   *
   * 1 << 64
   */
  PUNCH: getTearFlag(64),

  /**
   * Enemies become frozen on death. (For the freeze-in-place effect, see `TearFlag.FREEZE`.)
   *
   * 1 << 65
   */
  ICE: getTearFlag(65),

  /**
   * Enemies being magnetized and pull other things towards them. Used by Lodestone.
   *
   * 1 << 66
   */
  MAGNETIZE: getTearFlag(66),

  /**
   * Marks enemies. Marked enemies will attack and damage each other, as well as have reduced
   * movement speed. Used by Rotten Tomato.
   *
   * 1 << 67
   */
  BAIT: getTearFlag(67),

  /**
   * Velocity can be adjusted by the player while in the air. Used by Eye of the Occult.
   *
   * 1 << 68
   */
  OCCULT: getTearFlag(68),

  /**
   * Tears orbit in a narrow and stable orbit. Used by Saturnus.
   *
   * 1 << 69
   */
  ORBIT_ADVANCED: getTearFlag(69),

  /**
   * Chance to break rocks and open doors. Deals extra damage to rock-type enemies.
   *
   * 1 << 70
   */
  ROCK: getTearFlag(70),

  /**
   * Tears turn and go horizontally when moving past an enemy. Used by Brain Worm.
   *
   * 1 << 71
   */
  TURN_HORIZONTAL: getTearFlag(71),

  /**
   * Spawns red creep.
   *
   * 1 << 72
   */
  BLOOD_BOMB: getTearFlag(72),

  /**
   * Enemies are turned into poop.
   *
   * 1 << 73
   */
  ECOLI: getTearFlag(73),

  /**
   * Enemies have a chance to drop a coin on death. Used by The Hanged Man?
   *
   * 1 << 74
   */
  COIN_DROP_DEATH: getTearFlag(74),

  /**
   * Explosion creates a Brimstone laser cross pattern.
   *
   * 1 << 75
   */
  BRIMSTONE_BOMB: getTearFlag(75),

  /**
   * Creates a black hole on impact.
   *
   * 1 << 76
   */
  RIFT: getTearFlag(76),

  /**
   * Sticks to enemies and multiplies on enemy death.
   *
   * 1 << 77
   */
  SPORE: getTearFlag(77),

  /**
   * Spawns a ghost upon explosion.
   *
   * 1 << 78
   */
  GHOST_BOMB: getTearFlag(78),

  /**
   * Killed enemies will drop a random tarot card.
   *
   * 1 << 79
   */
  CARD_DROP_DEATH: getTearFlag(79),

  /**
   * Killed enemies will drop a random rune.
   *
   * 1 << 80
   */
  RUNE_DROP_DEATH: getTearFlag(80),

  /**
   * Enemies will teleport to a different part of the room on hit.
   *
   * 1 << 81
   */
  TELEPORT: getTearFlag(81),

  /**
   * Used on tears fired on the G-Fuel seed to keep them lingering on a single spot before dropping
   * to the ground. (This is only present on some of the weapon types.)
   *
   * 1 << 82
   */
  TEAR_DECELERATE: getTearFlag(82),

  /**
   * Used on tears fired on the G-Fuel seed to make them accelerate over time. (This is only present
   * on some of the weapon types.)
   *
   * 1 << 83
   */
  TEAR_ACCELERATE: getTearFlag(83),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Similar to `TearFlag.BOUNCE` but only bounces off walls, not enemies.
   *
   * 1 << 104
   */
  BOUNCE_WALLS_ONLY: getTearFlag(104),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Cannot deal damage to grid entities. This is used by Saturnus to prevent unfair damage in some
   * rooms.
   *
   * 1 << 105
   */
  NO_GRID_DAMAGE: getTearFlag(105),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Deals extra damage from behind and inflicts bleeding.
   *
   * 1 << 106
   */
  BACKSTAB: getTearFlag(106),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses whack their target with a sword and perform spin attacks.
   *
   * 1 << 107
   */
  FETUS_SWORD: getTearFlag(107),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses whack their target with a bone club instead of ramming into them.
   *
   * 1 << 108
   */
  FETUS_BONE: getTearFlag(108),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses carry a knife.
   *
   * 1 << 109
   */
  FETUS_KNIFE: getTearFlag(109),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses have a Tech X ring around them.
   *
   * 1 << 110
   */
  FETUS_TECH_X: getTearFlag(110),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses keep their distance and occasionally shoot tech lasers at their target.
   *
   * 1 << 111
   */
  FETUS_TECH: getTearFlag(111),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses shoot a brimstone beam at the first enemy they hit.
   *
   * 1 << 112
   */
  FETUS_BRIMSTONE: getTearFlag(112),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * Fetuses drop a bomb on their first impact with an enemy.
   *
   * 1 << 113
   */
  FETUS_BOMBER: getTearFlag(113),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * The base flag for C-Section fetuses.
   *
   * 1 << 114
   */
  FETUS: getTearFlag(114),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 115
   */
  REROLL_ROCK_WISP: getTearFlag(115),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 116
   */
  MOM_STOMP_WISP: getTearFlag(116),

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 117
   */
  ENEMY_TO_WISP: getTearFlag(117),

  /**
   * Chance to reroll the enemy on hit. Used by D10 wisps.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 118
   */
  REROLL_ENEMY: getTearFlag(118),

  /**
   * Causes giant explosions that create pits. Used by Giga Bombs.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 119
   */
  GIGA_BOMB: getTearFlag(119),

  /**
   * Enemies explode into more gibs on death than normal. Used by Berserk!
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 120
   */
  EXTRA_GORE: getTearFlag(120),

  /**
   * Lasers cycle between colors, causing a rainbow effect.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 121
   */
  RAINBOW: getTearFlag(121),

  /**
   * Bombs can be detonated by Remote Detonator.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 122
   */
  DETONATE: getTearFlag(122),

  /**
   * Tears stick to each other and form a chain that can be swung around. Used by Akeldama.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 123
   */
  CHAIN: getTearFlag(123),

  /**
   * Black aura effect. Used by Dark Matter.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 124
   */
  DARK_MATTER: getTearFlag(124),

  /**
   * Bombs dropped while having a Golden Bomb will have this flag.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 125
   */
  GOLDEN_BOMB: getTearFlag(125),

  /**
   * Bombs dropped while having Fast Bombs will have this flag.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 126
   */
  FAST_BOMB: getTearFlag(126),

  /**
   * A single tear controlled by the player with the shooting keys. Used by The Ludovico Technique.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 127
   */
  LUDOVICO: getTearFlag(127),
} as const;

type TearFlagValue = BitFlag128 & {
  readonly __tearFlagBrand: symbol;
};
type TearFlagType = {
  readonly [K in keyof typeof TearFlagInternal]: TearFlagValue;
};

export const TearFlag = TearFlagInternal as TearFlagType;
export type TearFlag = TearFlagType[keyof TearFlagType];

export const TearFlagZero = TearFlag.NORMAL;

/** Identical to the `TEARFLAG` function in "enums.lua". */
function getTearFlag(shift: int): BitSet128 {
  return shift >= 64
    ? BitSet128(0, 1 << (shift - 64))
    : BitSet128(1 << shift, 0);
}
