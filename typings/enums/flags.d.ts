// Enums from the "resources/scripts/enums.lua" file
// (flags only)

declare enum EntityFlag {
  /** 1 << 0 */
  FLAG_NO_STATUS_EFFECTS = 1 << 0,

  /** 1 << 1 */
  FLAG_NO_INTERPOLATE = 1 << 1,

  /** 1 << 2 */
  FLAG_APPEAR = 1 << 2,

  /** 1 << 3 */
  FLAG_RENDER_FLOOR = 1 << 3,

  /** 1 << 4 */
  FLAG_NO_TARGET = 1 << 4,

  /** 1 << 5 */
  FLAG_FREEZE = 1 << 5,

  /** 1 << 6 */
  FLAG_POISON = 1 << 6,

  /** 1 << 7 */
  FLAG_SLOW = 1 << 7,

  /** 1 << 8 */
  FLAG_CHARM = 1 << 8,

  /** 1 << 9 */
  FLAG_CONFUSION = 1 << 9,

  /** 1 << 10 */
  FLAG_MIDAS_FREEZE = 1 << 10,

  /** 1 << 11 */
  FLAG_FEAR = 1 << 11,

  /** 1 << 12 */
  FLAG_BURN = 1 << 12,

  /** 1 << 13 */
  FLAG_RENDER_WALL = 1 << 13,

  /** 1 << 14 */
  FLAG_INTERPOLATION_UPDATE = 1 << 14,

  /** 1 << 15 */
  FLAG_APPLY_GRAVITY = 1 << 15,

  /** 1 << 16 */
  FLAG_NO_BLOOD_SPLASH = 1 << 16,

  /** 1 << 17 */
  FLAG_NO_REMOVE_ON_TEX_RENDER = 1 << 17,

  /** 1 << 18 */
  FLAG_NO_DEATH_TRIGGER = 1 << 18,

  /**
   * This shares the same value as `FLAG_LASER_POP` and `FLAG_ITEM_SHOULD_DUPLICATE`, but has a
   * different meaning depending on the entity type.
   *
   * 1 << 19
   */
  FLAG_NO_SPIKE_DAMAGE = 1 << 19,

  /**
   * This shares the same value as `FLAG_NO_SPIKE_DAMAGE` and `FLAG_ITEM_SHOULD_DUPLICATE`, but has
   * a different meaning depending on the entity type.
   *
   * 1 << 19
   */
  FLAG_LASER_POP = 1 << 19,

  /**
   * This shares the same value as `FLAG_NO_SPIKE_DAMAGE` and `FLAG_LASER_POP`, but has a
   * different meaning depending on the entity type.
   *
   * 1 << 19
   */
  FLAG_ITEM_SHOULD_DUPLICATE = 1 << 19,

  /** 1 << 20 */
  FLAG_BOSSDEATH_TRIGGERED = 1 << 20,

  /** 1 << 21 */
  FLAG_DONT_OVERWRITE = 1 << 21,

  /** 1 << 22 */
  FLAG_SPAWN_STICKY_SPIDERS = 1 << 22,

  /** 1 << 23 */
  FLAG_SPAWN_BLACK_HP = 1 << 23,

  /** 1 << 24 */
  FLAG_SHRINK = 1 << 24,

  /** 1 << 25 */
  FLAG_NO_FLASH_ON_DAMAGE = 1 << 25,

  /** 1 << 26 */
  FLAG_NO_KNOCKBACK = 1 << 26,

  /** 1 << 27 */
  FLAG_SLIPPERY_PHYSICS = 1 << 27,

  /** 1 << 28 */
  FLAG_ADD_JAR_FLY = 1 << 28,

  /** 1 << 29 */
  FLAG_FRIENDLY = 1 << 29,

  /** 1 << 30 */
  FLAG_NO_PHYSICS_KNOCKBACK = 1 << 30,

  /** 1 << 31 */
  FLAG_DONT_COUNT_BOSS_HP = 2147483648,
  // (this cannot be represented as "1 << 31" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 32 */
  FLAG_NO_SPRITE_UPDATE = 4294967296,
  // (this cannot be represented as "1 << 32" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 33 */
  FLAG_CONTAGIOUS = 8589934592,
  // (this cannot be represented as "1 << 33" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 34 */
  FLAG_BLEED_OUT = 17179869184,
  // (this cannot be represented as "1 << 34" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 35 */
  FLAG_HIDE_HP_BAR = 34359738368,
  // (this cannot be represented as "1 << 35" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 36 */
  FLAG_NO_DAMAGE_BLINK = 68719476736,
  // (this cannot be represented as "1 << 36" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 37 */
  FLAG_PERSISTENT = 137438953472,
  // (this cannot be represented as "1 << 37" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 38 */
  FLAG_BACKDROP_DETAIL = 274877906944,
  // (this cannot be represented as "1 << 38" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 39 */
  FLAG_AMBUSH = 549755813888,
  // (this cannot be represented as "1 << 39" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 40 */
  FLAG_GLITCH = 1099511627776,
  // (this cannot be represented as "1 << 40" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 41 */
  FLAG_SPIN = 2199023255552,
  // (this cannot be represented as "1 << 41" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 42 */
  FLAG_NO_REWARD = 4398046511104,
  // (this cannot be represented as "1 << 42" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 43 */
  FLAG_REDUCE_GIBS = 8796093022208,
  // (this cannot be represented as "1 << 43" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 44 */
  FLAG_TRANSITION_UPDATE = 17592186044416,
  // (this cannot be represented as "1 << 44" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 45 */
  FLAG_NO_PLAYER_CONTROL = 35184372088832,
  // (this cannot be represented as "1 << 45" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 46 */
  FLAG_NO_QUERY = 70368744177664,
  // (this cannot be represented as "1 << 46" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 47 */
  FLAG_KNOCKED_BACK = 140737488355328,
  // (this cannot be represented as "1 << 47" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 48 */
  FLAG_APPLY_IMPACT_DAMAGE = 281474976710656,
  // (this cannot be represented as "1 << 48" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 49 */
  FLAG_ICE_FROZEN = 562949953421312,
  // (this cannot be represented as "1 << 49" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 50 */
  FLAG_ICE = 1125899906842624,
  // (this cannot be represented as "1 << 50" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 51 */
  FLAG_MAGNETIZED = 2251799813685248,
  // (this cannot be represented as "1 << 51" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 52 */
  FLAG_BAITED = 4503599627370496,
  // (this cannot be represented as "1 << 52" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 53 */
  FLAG_KILLSWITCH = 9007199254740992,
  // (this cannot be represented as "1 << 53" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 54 */
  FLAG_WEAKNESS = 18014398509481984,
  // (this cannot be represented as "1 << 54" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 55 */
  FLAG_EXTRA_GORE = 36028797018963968,
  // (this cannot be represented as "1 << 55" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 56 */
  FLAG_BRIMSTONE_MARKED = 72057594037927936,
  // (this cannot be represented as "1 << 56" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 57 */
  FLAG_HELD = 144115188075855872,
  // (this cannot be represented as "1 << 57" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 58 */
  FLAG_THROWN = 288230376151711744,
  // (this cannot be represented as "1 << 58" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 59 */
  FLAG_FRIENDLY_BALL = 576460752303423488,
  // (this cannot be represented as "1 << 59" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)
}

/**
 * For EntityType.ENTITY_TEAR (2)
 *
 * In Lua, the values of this enum are instantiated with `BitSet128` objects. Since we cannot use
 * objects in enum declarations, IsaacScript simply displays these as the raw numbers. This is only
 * cosmetic; when you actually use these flags, they will really be `BitSet128` objects.
 */
declare enum TearFlags {
  /** Default tear (no special effects). */
  TEAR_NORMAL = 0,

  /**
   * Goes through obstacles. Used by Ouija Board.
   *
   * 1 << 0
   */
  TEAR_SPECTRAL = 1 << 0,

  /**
   * Goes through enemies. Used by Cupid's Arrow.
   *
   * 1 << 1
   */
  TEAR_PIERCING = 1 << 1,

  /**
   * Used by Spoon Bender.
   *
   * 1 << 2
   */
  TEAR_HOMING = 1 << 2,

  /**
   * Slows enemies on contact. Used by Spider Bite.
   *
   * 1 << 3
   */
  TEAR_SLOW = 1 << 3,

  /**
   * Used by The Common Cold.
   *
   * 1 << 4
   */
  TEAR_POISON = 1 << 4,

  /**
   * Freezes enemies in place. (For the ice effect, see `TearFlags.TEAR_ICE`.) Used by Mom's
   * Contacts.
   *
   * 1 << 5
   */
  TEAR_FREEZE = 1 << 5,

  /**
   * Splits into two different tears on collision. Used by The Parasite.
   *
   * 1 << 6
   */
  TEAR_SPLIT = 1 << 6,

  /**
   * The tear increases in size and damage the longer it travels. Used by Lump of Coal.
   *
   * 1 << 7
   */
  TEAR_GROW = 1 << 7,

  /**
   * Returns backwards after travelling for a little while. Used by My Reflection.
   *
   * 1 << 8
   */
  TEAR_BOOMERANG = 1 << 8,

  /**
   * Keeps going past enemies that it kills (with less damage). Used by Polyphemus.
   *
   * 1 << 9
   */
  TEAR_PERSISTENT = 1 << 9,

  /**
   * Used by the Wiggle Worm trinket.
   *
   * 1 << 10
   */
  TEAR_WIGGLE = 1 << 10,

  /**
   * Created a blue fly on hit. Used by The Mulligan.
   *
   * 1 << 11
   */
  TEAR_MULLIGAN = 1 << 11,

  /**
   * Explodes on hit. Used by Ipecac.
   *
   * 1 << 12
   */
  TEAR_EXPLOSIVE = 1 << 12,

  /**
   * Used by Mom's Eyeshadow.
   *
   * 1 << 13
   */
  TEAR_CHARM = 1 << 13,

  /**
   * Used by Iron Bar.
   *
   * 1 << 14
   */
  TEAR_CONFUSION = 1 << 14,

  /**
   * Enemies killed have a 33% chance to drop a heart. Used by Tainted Magdalene.
   *
   * 1 << 15
   */
  TEAR_HP_DROP = 1 << 15,

  /**
   * Tears orbit around the player. Used by Tiny Planet.
   *
   * 1 << 16
   */
  TEAR_ORBIT = 1 << 16,

  /**
   * Floats in place until the player releases the fire button. Used by Anti-Gravity.
   *
   * 1 << 17
   */
  TEAR_WAIT = 1 << 17,

  /**
   * Splits into four different tears on collision. Used by Cricket's Body.
   *
   * 1 << 18
   */
  TEAR_QUADSPLIT = 1 << 18,

  /**
   * Bounces off of enemies, walls, rocks, and so on. Used by Rubber Cement.
   *
   * 1 << 19
   */
  TEAR_BOUNCE = 1 << 19,

  /**
   * Used by Mom's Perfume.
   *
   * 1 << 20
   */
  TEAR_FEAR = 1 << 20,

  /**
   * The tear shrinks the longer it travels. Used by Proptosis.
   *
   * 1 << 21
   */
  TEAR_SHRINK = 1 << 21,

  /**
   * Used by Fire Mind.
   *
   * 1 << 22
   */
  TEAR_BURN = 1 << 22,

  /**
   * Attracts enemies and pickups. Used by Strange Attractor.
   *
   * 1 << 23
   */
  TEAR_ATTRACTOR = 1 << 23,

  /**
   * Pushes enemies back further than normal.
   *
   * 1 << 24
   */
  TEAR_KNOCKBACK = 1 << 24,

  /**
   * Used by Pulse Worm.
   *
   * 1 << 25
   */
  TEAR_PULSE = 1 << 25,

  /**
   * Used by Ring Worm.
   *
   * 1 << 26
   */
  TEAR_SPIRAL = 1 << 26,

  /**
   * Used by Flat Worm.
   *
   * 1 << 27
   */
  TEAR_FLAT = 1 << 27,

  /**
   * Makes tears explode out of the bomb. Used by Sad Bombs.
   *
   * 1 << 28
   */
  TEAR_SAD_BOMB = 1 << 28,

  /**
   * Damages everything in the room when it explodes. Used by Butt Bombs.
   *
   * 1 << 29
   */
  TEAR_BUTT_BOMB = 1 << 29,

  /**
   * Used by Hook Worm.
   *
   * 1 << 30
   */
  TEAR_SQUARE = 1 << 30,

  /**
   * Creates an aura around the tear. Used by Godhead.
   *
   * 1 << 31
   */
  TEAR_GLOW = 2147483648,
  // (this cannot be represented as "1 << 31" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Slows enemies and colors them black. Used by Lil Gish.
   *
   * 1 << 32
   */
  TEAR_GISH = 4294967296,
  // (this cannot be represented as "1 << 32" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns green creep on hit. Used by Mysterious Liquid.
   *
   * 1 << 33
   */
  TEAR_MYSTERIOUS_LIQUID_CREEP = 8589934592,
  // (this cannot be represented as "1 << 33" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Deletes projectiles that it collides with. Used by Lost Contact.
   *
   * 1 << 34
   */
  TEAR_SHIELDED = 17179869184,
  // (this cannot be represented as "1 << 34" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns a pickup upon exploding. Used by Glitter Bombs.
   *
   * 1 << 35
   */
  TEAR_GLITTER_BOMB = 34359738368,
  // (this cannot be represented as "1 << 35" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Splits into 5 little bombs upon exploding. Used by Scatter Bombs.
   *
   * 1 << 36
   */
  TEAR_SCATTER_BOMB = 68719476736,
  // (this cannot be represented as "1 << 36" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Sticks to enemies and continues to deal damage. Used by Explosivo and Sticky Bombs.
   *
   * 1 << 37
   */
  TEAR_STICKY = 137438953472,
  // (this cannot be represented as "1 << 37" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Pass through walls to loop around the screen. Used by Continuum.
   *
   * 1 << 38
   */
  TEAR_CONTINUUM = 274877906944,
  // (this cannot be represented as "1 << 38" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Creates a light beam on hit. Used by Holy Light.
   *
   * 1 << 39
   */
  TEAR_LIGHT_FROM_HEAVEN = 549755813888,
  // (this cannot be represented as "1 << 39" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns a coin on hit. Used by Bumbo.
   *
   * 1 << 40
   */
  TEAR_COIN_DROP = 1099511627776,
  // (this cannot be represented as "1 << 40" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies killed will spawn a black heart.
   *
   * 1 << 41
   */
  TEAR_BLACK_HP_DROP = 2199023255552,
  // (this cannot be represented as "1 << 41" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Follows the parent player's beam. Used by Tractor Beam.
   *
   * 1 << 42
   */
  TEAR_TRACTOR_BEAM = 4398046511104,
  // (this cannot be represented as "1 << 42" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Shrink enemies on hit. Used by God's Flesh.
   *
   * 1 << 43
   */
  TEAR_GODS_FLESH = 8796093022208,
  // (this cannot be represented as "1 << 43" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Have a chance to spawn a coin on hit.
   *
   * 1 << 44
   */
  TEAR_GREED_COIN = 17592186044416,
  // (this cannot be represented as "1 << 44" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Causes a large explosion in the shape of a cross. Used by Bomber Boy.
   *
   * 1 << 45
   */
  TEAR_CROSS_BOMB = 35184372088832,
  // (this cannot be represented as "1 << 45" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Used by Ouroboros Worm.
   *
   * 1 << 46
   */
  TEAR_BIG_SPIRAL = 70368744177664,
  // (this cannot be represented as "1 << 46" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Used by Glaucoma.
   *
   * 1 << 47
   */
  TEAR_PERMANENT_CONFUSION = 140737488355328,
  // (this cannot be represented as "1 << 47" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Sticks to enemies and does damage over time. Used by Sinus Infection.
   *
   * 1 << 48
   */
  TEAR_BOOGER = 281474976710656,
  // (this cannot be represented as "1 << 48" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns creep on hit and spawns blue flies or spiders. Used by Parasitoid.
   *
   * 1 << 49
   */
  TEAR_EGG = 562949953421312,
  // (this cannot be represented as "1 << 49" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Can open doors or break grid entities. Used by Sulfuric Acid.
   *
   * 1 << 50
   */
  TEAR_ACID = 1125899906842624,
  // (this cannot be represented as "1 << 50" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Splits into two tears. Used by Compound Fracture.
   *
   * 1 << 51
   */
  TEAR_BONE = 2251799813685248,
  // (this cannot be represented as "1 << 51" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Piercing. When passing through an enemy, gains homing and does double damage. Used by Eye of
   * Belial.
   *
   * 1 << 52
   */
  TEAR_BELIAL = 4503599627370496,
  // (this cannot be represented as "1 << 52" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies turn gold and drop coins on death. Used by Midas' Touch.
   *
   * 1 << 53
   */
  TEAR_MIDAS = 9007199254740992,
  // (this cannot be represented as "1 << 53" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Used by Euthanasia.
   *
   * 1 << 54
   */
  TEAR_NEEDLE = 18014398509481984,
  // (this cannot be represented as "1 << 54" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Causes electricity to ripple around the room, damaging enemies. Used by Jacob's Ladder.
   *
   * 1 << 55
   */
  TEAR_JACOBS = 36028797018963968,
  // (this cannot be represented as "1 << 55" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Void tears. Instantly kills enemies. Used by Little Horn.
   *
   * 1 << 56
   */
  TEAR_HORN = 72057594037927936,
  // (this cannot be represented as "1 << 56" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Electricity arcs between tears. Used by Technology Zero.
   *
   * 1 << 57
   */
  TEAR_LASER = 144115188075855872,
  // (this cannot be represented as "1 << 57" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Tears stay in the air and bump into each other. Used by Pop!
   *
   * 1 << 58
   */
  TEAR_POP = 288230376151711744,
  // (this cannot be represented as "1 << 58" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Tears combine when they collide into each other. Used by Lachryphagy.
   *
   * 1 << 59
   */
  TEAR_ABSORB = 576460752303423488,
  // (this cannot be represented as "1 << 59" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Lasers are generated on top of the tear. Used by Trisagion.
   *
   * 1 << 60
   */
  TEAR_LASERSHOT = 1152921504606846976,
  // (this cannot be represented as "1 << 60" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Continually bounces as it travels. Used by Flat Stone.
   *
   * 1 << 61
   */
  TEAR_HYDROBOUNCE = 2305843009213693952,
  // (this cannot be represented as "1 << 61" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Arcing shots that split into smaller tears on impact. Used by Haemolacria.
   *
   * 1 << 62
   */
  TEAR_BURSTSPLIT = 4611686018427387904,
  // (this cannot be represented as "1 << 62" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns green creep. Used by Bob's Bladder.
   *
   * 1 << 63
   */
  TEAR_CREEP_TRAIL = 9223372036854775808,
  // (this cannot be represented as "1 << 63" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Knockback tears. Used by Knockout Drops.
   *
   * 1 << 64
   */
  TEAR_PUNCH = 18446744073709551616,
  // (this cannot be represented as "1 << 64" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies become frozen on death. (For the freeze-in-place effect, see `TearFlags.FREEZE`.)
   *
   * 1 << 65
   */
  TEAR_ICE = 36893488147419103232,
  // (this cannot be represented as "1 << 65" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies being magnetized and pull other things towards them. Used by Lodestone.
   *
   * 1 << 66
   */
  TEAR_MAGNETIZE = 73786976294838206464,
  // (this cannot be represented as "1 << 66" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Marks enemies. Marked enemies will attack and damage each other, as well as have reduced
   * movement speed. Used by Rotten Tomato.
   *
   * 1 << 67
   */
  TEAR_BAIT = 147573952589676412928,
  // (this cannot be represented as "1 << 67" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Velocity can be adjusted by the player while in the air. Used by Eye of the Occult.
   *
   * 1 << 68
   */
  TEAR_OCCULT = 295147905179352825856,
  // (this cannot be represented as "1 << 68" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Tears orbit in a narrow and stable orbit. Used by Saturnus.
   *
   * 1 << 69
   */
  TEAR_ORBIT_ADVANCED = 590295810358705651712,
  // (this cannot be represented as "1 << 69" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Chance to break rocks and open doors. Deals extra damage to rock-type enemies.
   *
   * 1 << 70
   */
  TEAR_ROCK = 1180591620717411303424,
  // (this cannot be represented as "1 << 70" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Tears turn and go horizontally when moving past an enemy. Used by Brain Worm.
   *
   * 1 << 71
   */
  TEAR_TURN_HORIZONTAL = 2361183241434822606848,
  // (this cannot be represented as "1 << 71" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns red creep.
   *
   * 1 << 72
   */
  TEAR_BLOOD_BOMB = 4722366482869645213696,
  // (this cannot be represented as "1 << 72" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies are turned into poop.
   *
   * 1 << 73
   */
  TEAR_ECOLI = 9444732965739290427392,
  // (this cannot be represented as "1 << 73" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies have a chance to drop a coin on death. Used by The Hanged Man?
   *
   * 1 << 74
   */
  TEAR_COIN_DROP_DEATH = 18889465931478580854784,
  // (this cannot be represented as "1 << 74" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Explosion creates a Brimstone laser cross pattern.
   *
   * 1 << 75
   */
  TEAR_BRIMSTONE_BOMB = 37778931862957161709568,
  // (this cannot be represented as "1 << 75" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Creates a black hole on impact.
   *
   * 1 << 76
   */
  TEAR_RIFT = 75557863725914323419136,
  // (this cannot be represented as "1 << 76" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Sticks to enemies and multiplies on enemy death.
   *
   * 1 << 77
   */
  TEAR_SPORE = 151115727451828646838272,
  // (this cannot be represented as "1 << 77" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Spawns a ghost upon explosion.
   *
   * 1 << 78
   */
  TEAR_GHOST_BOMB = 302231454903657293676544,
  // (this cannot be represented as "1 << 78" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Killed enemies will drop a random tarot card.
   *
   * 1 << 79
   */
  TEAR_CARD_DROP_DEATH = 604462909807314587353088,
  // (this cannot be represented as "1 << 79" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Killed enemies will drop a random rune.
   *
   * 1 << 80
   */
  TEAR_RUNE_DROP_DEATH = 1208925819614629174706176,
  // (this cannot be represented as "1 << 80" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /**
   * Enemies will teleport to a different part of the room on hit.
   *
   * 1 << 81
   */
  TEAR_TELEPORT = 2417851639229258349412352,
  // (this cannot be represented as "1 << 81" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  TEAR_EFFECT_COUNT = 82,

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 115
   */
  TEAR_REROLL_ROCK_WISP = 41538374868278621028243970633760768,
  // (this cannot be represented as "1 << 115" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 116
   */
  TEAR_MOM_STOMP_WISP = 83076749736557242056487941267521536,
  // (this cannot be represented as "1 << 116" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 117
   */
  TEAR_ENEMY_TO_WISP = 166153499473114484112975882535043072,
  // (this cannot be represented as "1 << 117" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Chance to reroll the enemy on hit. Used by D10 wisps.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 118
   */
  TEAR_REROLL_ENEMY = 332306998946228968225951765070086144,
  // (this cannot be represented as "1 << 118" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Causes giant explosions that create pits. Used by Giga Bombs.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 119
   */
  TEAR_GIGA_BOMB = 664613997892457936451903530140172288,
  // (this cannot be represented as "1 << 119" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Enemies explode into more gibs on death than normal. Used by Berserk!
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 120
   */
  TEAR_EXTRA_GORE = 1329227995784915872903807060280344576,
  // (this cannot be represented as "1 << 120" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Lasers cycle between colors, causing a rainbow effect.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 121
   */
  TEAR_RAINBOW = 2658455991569831745807614120560689152,
  // (this cannot be represented as "1 << 121" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Bombs can be detonated by Remote Detonator.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 122
   */
  TEAR_DETONATE = 5316911983139663491615228241121378304,
  // (this cannot be represented as "1 << 122" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Tears stick to each other and form a chain that can be swung around. Used by Akeldama.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 123
   */
  TEAR_CHAIN = 10633823966279326983230456482242756608,
  // (this cannot be represented as "1 << 123" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Black aura effect. Used by Dark Matter.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 124
   */
  TEAR_DARK_MATTER = 21267647932558653966460912964485513216,
  // (this cannot be represented as "1 << 124" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Bombs dropped while having a Golden Bomb will have this flag.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 125
   */
  TEAR_GOLDEN_BOMB = 42535295865117307932921825928971026432,
  // (this cannot be represented as "1 << 125" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * Bombs dropped while having Fast Bombs will have this flag.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 126
   */
  TEAR_FAST_BOMB = 85070591730234615865843651857942052864,
  // (this cannot be represented as "1 << 126" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)

  /**
   * A single tear controlled by the player with the shooting keys. Used by The Ludovico Technique.
   *
   * This is a reserved flag and cannot be randomly picked.
   *
   * 1 << 127
   */
  TEAR_LUDOVICO = 170141183460469231731687303715884105728,
  // (this cannot be represented as "1 << 127" because JavaScript only has 32-bit numbers and it
  // will be converted to the wrong number)
}

/** For EntityType.ENTITY_PROJECTILE (9) */
declare enum ProjectileFlags {
  /** 1 << 0 */
  SMART = 1 << 0,

  /** 1 << 1 */
  EXPLODE = 1 << 1,

  /** 1 << 2 */
  ACID_GREEN = 1 << 2,

  /** 1 << 3 */
  GOO = 1 << 3,

  /** 1 << 4 */
  GHOST = 1 << 4,

  /** 1 << 5 */
  WIGGLE = 1 << 5,

  /** 1 << 6 */
  BOOMERANG = 1 << 6,

  /** 1 << 7 */
  HIT_ENEMIES = 1 << 7,

  /** 1 << 8 */
  ACID_RED = 1 << 8,

  /** 1 << 9 */
  GREED = 1 << 9,

  /** 1 << 10 */
  RED_CREEP = 1 << 10,

  /** 1 << 11 */
  ORBIT_CW = 1 << 11,

  /** 1 << 12 */
  ORBIT_CCW = 1 << 12,

  /** 1 << 13 */
  NO_WALL_COLLIDE = 1 << 13,

  /** 1 << 14 */
  CREEP_BROWN = 1 << 14,

  /** 1 << 15 */
  FIRE = 1 << 15,

  /** 1 << 16 */
  BURST = 1 << 16,

  /** 1 << 17 */
  ANY_HEIGHT_ENTITY_HIT = 1 << 17,

  /** 1 << 18 */
  CURVE_LEFT = 1 << 18,

  /** 1 << 19 */
  CURVE_RIGHT = 1 << 19,

  /** 1 << 20 */
  TURN_HORIZONTAL = 1 << 20,

  /** 1 << 21 */
  SINE_VELOCITY = 1 << 21,

  /** 1 << 22 */
  MEGA_WIGGLE = 1 << 22,

  /** 1 << 23 */
  SAWTOOTH_WIGGLE = 1 << 23,

  /** 1 << 24 */
  SLOWED = 1 << 24,

  /** 1 << 25 */
  TRIANGLE = 1 << 25,

  /** 1 << 26 */
  MOVE_TO_PARENT = 1 << 26,

  /** 1 << 27 */
  ACCELERATE = 1 << 27,

  /** 1 << 28 */
  DECELERATE = 1 << 28,

  /** 1 << 29 */
  BURST3 = 1 << 29,

  /** 1 << 30 */
  CONTINUUM = 1 << 30,

  /** 1 << 31 */
  CANT_HIT_PLAYER = 2147483648,
  // (this cannot be represented as "1 << 31" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 32 */
  CHANGE_FLAGS_AFTER_TIMEOUT = 4294967296,
  // (this cannot be represented as "1 << 32" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 33 */
  CHANGE_VELOCITY_AFTER_TIMEOUT = 8589934592,
  // (this cannot be represented as "1 << 33" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 34 */
  STASIS = 17179869184,
  // (this cannot be represented as "1 << 34" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 35 */
  FIRE_WAVE = 34359738368,
  // (this cannot be represented as "1 << 35" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 36 */
  FIRE_WAVE_X = 68719476736,
  // (this cannot be represented as "1 << 36" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 37 */
  ACCELERATE_EX = 137438953472,
  // (this cannot be represented as "1 << 37" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 38 */
  BURST8 = 274877906944,
  // (this cannot be represented as "1 << 38" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 39 */
  FIRE_SPAWN = 549755813888,
  // (this cannot be represented as "1 << 39" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 40 */
  ANTI_GRAVITY = 1099511627776,
  // (this cannot be represented as "1 << 40" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 41 */
  TRACTOR_BEAM = 2199023255552,
  // (this cannot be represented as "1 << 41" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 42 */
  BOUNCE = 4398046511104,
  // (this cannot be represented as "1 << 42" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 43 */
  BOUNCE_FLOOR = 8796093022208,
  // (this cannot be represented as "1 << 43" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 44 */
  SHIELDED = 17592186044416,
  // (this cannot be represented as "1 << 44" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 45 */
  BLUE_FIRE_SPAWN = 35184372088832,
  // (this cannot be represented as "1 << 45" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 46 */
  LASER_SHOT = 70368744177664,
  // (this cannot be represented as "1 << 46" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 47 */
  GODHEAD = 140737488355328,
  // (this cannot be represented as "1 << 47" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 48 */
  SMART_PERFECT = 281474976710656,
  // (this cannot be represented as "1 << 48" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 49 */
  BURSTSPLIT = 562949953421312,
  // (this cannot be represented as "1 << 49" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 50 */
  WIGGLE_ROTGUT = 1125899906842624,
  // (this cannot be represented as "1 << 50" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 51 */
  FREEZE = 2251799813685248,
  // (this cannot be represented as "1 << 51" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 52 */
  ACCELERATE_TO_POSITION = 4503599627370496,
  // (this cannot be represented as "1 << 52" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 53 */
  BROCCOLI = 9007199254740992,
  // (this cannot be represented as "1 << 53" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 54 */
  BACKSPLIT = 18014398509481984,
  // (this cannot be represented as "1 << 54" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 55 */
  SIDEWAVE = 36028797018963968,
  // (this cannot be represented as "1 << 55" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 56 */
  ORBIT_PARENT = 72057594037927936,
  // (this cannot be represented as "1 << 56" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 57 */
  FADEOUT = 144115188075855872,
  // (this cannot be represented as "1 << 57" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)
}

declare enum CacheFlag {
  /** 1 << 0 */
  CACHE_DAMAGE = 1 << 0,

  /** 1 << 1 */
  CACHE_FIREDELAY = 1 << 1,

  /** 1 << 2 */
  CACHE_SHOTSPEED = 1 << 2,

  /** 1 << 3 */
  CACHE_RANGE = 1 << 3,

  /** 1 << 4 */
  CACHE_SPEED = 1 << 4,

  /** 1 << 5 */
  CACHE_TEARFLAG = 1 << 5,

  /** 1 << 6 */
  CACHE_TEARCOLOR = 1 << 6,

  /** 1 << 7 */
  CACHE_FLYING = 1 << 7,

  /** 1 << 8 */
  CACHE_WEAPON = 1 << 8,

  /** 1 << 9 */
  CACHE_FAMILIARS = 1 << 9,

  /** 1 << 10 */
  CACHE_LUCK = 1 << 10,

  /** 1 << 11 */
  CACHE_SIZE = 1 << 11,

  /** 1 << 12 */
  CACHE_COLOR = 1 << 12,

  /** 1 << 13 */
  CACHE_PICKUP_VISION = 1 << 13,

  /** (1 << 16) - 1 */
  CACHE_ALL = (1 << 16) - 1,

  /** 1 << 31 */
  CACHE_TWIN_SYNC = 2147483648,
  // (this cannot be represented as "1 << 31" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)
}

declare enum DamageFlag {
  /** 1 << 0 */
  DAMAGE_NOKILL = 1 << 0,

  /** 1 << 1 */
  DAMAGE_FIRE = 1 << 1,

  /** 1 << 2 */
  DAMAGE_EXPLOSION = 1 << 2,

  /** 1 << 3 */
  DAMAGE_LASER = 1 << 3,

  /** 1 << 4 */
  DAMAGE_ACID = 1 << 4,

  /** 1 << 5 */
  DAMAGE_RED_HEARTS = 1 << 5,

  /** 1 << 6 */
  DAMAGE_COUNTDOWN = 1 << 6,

  /** 1 << 7 */
  DAMAGE_SPIKES = 1 << 7,

  /** 1 << 8 */
  DAMAGE_CLONES = 1 << 8,

  /** 1 << 9 */
  DAMAGE_POOP = 1 << 9,

  /** 1 << 10 */
  DAMAGE_DEVIL = 1 << 10,

  /** 1 << 11 */
  DAMAGE_ISSAC_HEART = 1 << 11,

  /** 1 << 12 */
  DAMAGE_TNT = 1 << 12,

  /** 1 << 13 */
  DAMAGE_INVINCIBLE = 1 << 13,

  /** 1 << 14 */
  DAMAGE_SPAWN_FLY = 1 << 14,

  /** 1 << 15 */
  DAMAGE_POISON_BURN = 1 << 15,

  /** 1 << 16 */
  DAMAGE_CURSED_DOOR = 1 << 16,

  /** 1 << 17 */
  DAMAGE_TIMER = 1 << 17,

  /** 1 << 18 */
  DAMAGE_IV_BAG = 1 << 18,

  /** 1 << 19 */
  DAMAGE_PITFALL = 1 << 19,

  /** 1 << 20 */
  DAMAGE_CHEST = 1 << 20,

  /** 1 << 21 */
  DAMAGE_FAKE = 1 << 21,

  /** 1 << 22 */
  DAMAGE_BOOGER = 1 << 22,

  /** 1 << 23 */
  DAMAGE_SPAWN_BLACK_HEART = 1 << 23,

  /** 1 << 24 */
  DAMAGE_CRUSH = 1 << 24,

  /** 1 << 25 */
  DAMAGE_NO_MODIFIERS = 1 << 25,

  /** 1 << 26 */
  DAMAGE_SPAWN_RED_HEART = 1 << 26,

  /** 1 << 27 */
  DAMAGE_SPAWN_COIN = 1 << 27,

  /** 1 << 28 */
  DAMAGE_NO_PENALTIES = 1 << 28,

  /** 1 << 29 */
  DAMAGE_SPAWN_TEMP_HEART = 1 << 29,

  /** 1 << 30 */
  DAMAGE_IGNORE_ARMOR = 1 << 30,

  /** 1 << 31 */
  DAMAGE_SPAWN_CARD = 2147483648,
  // (this cannot be represented as "1 << 31" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)

  /** 1 << 32 */
  DAMAGE_SPAWN_RUNE = 4294967296,
  // (this cannot be represented as "1 << 32" because JavaScript only has 32-bit numbers and it will
  // be converted to the wrong number)
}

declare enum GameStateFlag {
  STATE_FAMINE_SPAWNED = 0,
  STATE_PESTILENCE_SPAWNED = 1,
  STATE_WAR_SPAWNED = 2,
  STATE_DEATH_SPAWNED = 3,
  STATE_BOSSPOOL_SWITCHED = 4,
  STATE_DEVILROOM_SPAWNED = 5,
  STATE_DEVILROOM_VISITED = 6,
  STATE_BOOK_REVELATIONS_USED = 7,
  STATE_BOOK_PICKED_UP = 8,
  STATE_WRATH_SPAWNED = 9,
  STATE_GLUTTONY_SPAWNED = 10,
  STATE_LUST_SPAWNED = 11,
  STATE_SLOTH_SPAWNED = 12,
  STATE_ENVY_SPAWNED = 13,
  STATE_PRIDE_SPAWNED = 14,
  STATE_GREED_SPAWNED = 15,
  STATE_SUPERGREED_SPAWNED = 16,
  STATE_DONATION_SLOT_BROKEN = 17,
  STATE_DONATION_SLOT_JAMMED = 18,
  STATE_HEAVEN_PATH = 19,
  STATE_REBIRTH_BOSS_SWITCHED = 20,
  STATE_HAUNT_SELECTED = 21,
  STATE_ADVERSARY_SELECTED = 22,
  STATE_MR_FRED_SELECTED = 23,
  STATE_MAMA_GURDY_SELECTED = 24,
  STATE_URIEL_SPAWNED = 25,
  STATE_GABRIEL_SPAWNED = 26,
  STATE_FALLEN_SPAWNED = 27,
  STATE_HEADLESS_HORSEMAN_SPAWNED = 28,
  STATE_KRAMPUS_SPAWNED = 29,
  STATE_DONATION_SLOT_BLOWN = 30,
  STATE_SHOPKEEPER_KILLED = 31,
  STATE_ULTRAPRIDE_SPAWNED = 32,
  STATE_BOSSRUSH_DONE = 33,
  STATE_GREED_SLOT_JAMMED = 34,
  STATE_AFTERBIRTH_BOSS_SWITCHED = 35,
  STATE_BROWNIE_SELECTED = 36,
  STATE_SUPERBUM_APPEARED = 37,
  STATE_BOSSRUSH_DOOR_SPAWNED = 38,
  STATE_BLUEWOMB_DOOR_SPAWNED = 39,
  STATE_BLUEWOMB_DONE = 40,
  STATE_HEART_BOMB_COIN_PICKED = 41,
  STATE_ABPLUS_BOSS_SWITCHED = 42,
  STATE_SISTERS_VIS_SELECTED = 43,
  STATE_MAX_COINS_OBTAINED = 43,
  STATE_SECRET_PATH = 44,
  STATE_PERFECTION_SPAWNED = 45,
  STATE_MAUSOLEUM_HEART_KILLED = 46,
  STATE_BACKWARDS_PATH_INIT = 47,
  STATE_BACKWARDS_PATH = 48,

  NUM_STATE_FLAGS = 49,
}

declare enum LevelStateFlag {
  STATE_BUM_KILLED = 0,
  STATE_EVIL_BUM_KILLED = 1,
  STATE_REDHEART_DAMAGED = 2,
  STATE_BUM_LEFT = 3,
  STATE_EVIL_BUM_LEFT = 4,
  STATE_DAMAGED = 5,
  STATE_SHOPKEEPER_KILLED_LVL = 6,
  STATE_COMPASS_EFFECT = 7,
  STATE_MAP_EFFECT = 8,
  STATE_BLUE_MAP_EFFECT = 9,
  STATE_FULL_MAP_EFFECT = 10,
  STATE_GREED_LOST_PENALTY = 11,
  STATE_GREED_MONSTRO_SPAWNED = 12,
  STATE_ITEM_DUNGEON_FOUND = 13,
  STATE_MAMA_MEGA_USED = 14,
  STATE_WOODEN_CROSS_REMOVED = 15,
  STATE_SHOVEL_QUEST_TRIGGERED = 16,
  STATE_SATANIC_BIBLE_USED = 17,
  STATE_SOL_EFFECT = 18,
  STATE_LEVEL_START_TRIGGERED = 19,
  STATE_LUNA_EFFECT = 20,
  STATE_VOID_DOOR_DISABLED = 21,
  STATE_MINESHAFT_ESCAPE = 22,
  STATE_MIRROR_BROKEN = 23,

  NUM_STATE_FLAGS = 24,
}

/**
 * The `UseFlag.USE_ECHO_CHAMBER` value is missing from the vanilla enum, so this enum is
 * temporarily marked as being a const enum. When it is added to the vanilla game, this will go back
 * to being a normal enum.
 */
declare const enum UseFlag {
  /**
   * Don't play use animations.
   * 1 << 0
   */
  USE_NOANIM = 1 << 0,

  /**
   * Don't add costume.
   * 1 << 1
   */
  USE_NOCOSTUME = 1 << 1,

  /**
   * Effect was triggered by an active item owned by the player.
   * 1 << 2
   */
  USE_OWNED = 1 << 2,

  /**
   * Allow the effect to trigger on non-main players (i.e. coop babies).
   * 1 << 3
   */
  USE_ALLOWNONMAIN = 1 << 3,

  /**
   * D4 only: Reroll the player's active item.
   * 1 << 4
   */
  USE_REMOVEACTIVE = 1 << 4,

  /**
   * Effect was triggered a second time by Car Battery (or Tarot Cloth for cards).
   * 1 << 5
   */
  USE_CARBATTERY = 1 << 5,

  /**
   * Effect was triggered by Void.
   * 1 << 6
   */
  USE_VOID = 1 << 6,

  /**
   * Effect was mimicked by an active item (Blank Card, Placebo).
   * 1 << 7
   */
  USE_MIMIC = 1 << 7,

  /**
   * Never play announcer voice.
   * 1 << 8
   */
  USE_NOANNOUNCER = 1 << 8,

  /**
   * This allows an item to spawn wisps when called from another item usage as the wisps generator
   * checks for NOANIM, so usually you want to use this with NOANIM call.
   * 1 << 9
   */
  USE_ALLOWWISPSPAWN = 1 << 9,

  /**
   * If set, forces UseActiveItem to use the CustomVarData argument instead of the active item's
   * stored VarData.
   * 1 << 10
   */
  USE_CUSTOMVARDATA = 1 << 10,

  /**
   * This value is missing from the vanilla enum, but is included automatically in the IsaacScript
   * definitions.
   *
   * 1 << 11
   */
  USE_ECHO_CHAMBER = 1 << 11,
}
