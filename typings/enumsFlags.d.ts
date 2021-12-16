// Enums from the "resources/scripts/enums.lua" file
// (flags only)

declare enum EntityFlag {
  FLAG_NO_STATUS_EFFECTS = 1,
  FLAG_NO_INTERPOLATE = 1 << 1,
  FLAG_APPEAR = 1 << 2,
  FLAG_RENDER_FLOOR = 1 << 3,
  FLAG_NO_TARGET = 1 << 4,
  FLAG_FREEZE = 1 << 5,
  FLAG_POISON = 1 << 6,
  FLAG_SLOW = 1 << 7,
  FLAG_CHARM = 1 << 8,
  FLAG_CONFUSION = 1 << 9,
  FLAG_MIDAS_FREEZE = 1 << 10,
  FLAG_FEAR = 1 << 11,
  FLAG_BURN = 1 << 12,
  FLAG_RENDER_WALL = 1 << 13,
  FLAG_INTERPOLATION_UPDATE = 1 << 14,
  FLAG_APPLY_GRAVITY = 1 << 15,
  FLAG_NO_BLOOD_SPLASH = 1 << 16,
  FLAG_NO_REMOVE_ON_TEX_RENDER = 1 << 17,
  FLAG_NO_DEATH_TRIGGER = 1 << 18,
  FLAG_NO_SPIKE_DAMAGE = 1 << 19,
  FLAG_LASER_POP = 1 << 19,
  FLAG_ITEM_SHOULD_DUPLICATE = 1 << 19,
  FLAG_BOSSDEATH_TRIGGERED = 1 << 20,
  FLAG_DONT_OVERWRITE = 1 << 21,
  FLAG_SPAWN_STICKY_SPIDERS = 1 << 22,
  FLAG_SPAWN_BLACK_HP = 1 << 23,
  FLAG_SHRINK = 1 << 24,
  FLAG_NO_FLASH_ON_DAMAGE = 1 << 25,
  FLAG_NO_KNOCKBACK = 1 << 26,
  FLAG_SLIPPERY_PHYSICS = 1 << 27,
  FLAG_ADD_JAR_FLY = 1 << 28,
  FLAG_FRIENDLY = 1 << 29,
  FLAG_NO_PHYSICS_KNOCKBACK = 1 << 30,
  FLAG_DONT_COUNT_BOSS_HP = 1 << 31,
  FLAG_NO_SPRITE_UPDATE = 1 << 32,
  FLAG_CONTAGIOUS = 1 << 33,
  FLAG_BLEED_OUT = 1 << 34,
  FLAG_HIDE_HP_BAR = 1 << 35,
  FLAG_NO_DAMAGE_BLINK = 1 << 36,
  FLAG_PERSISTENT = 1 << 37,
  FLAG_BACKDROP_DETAIL = 1 << 38,
  FLAG_AMBUSH = 1 << 39,
  FLAG_GLITCH = 1 << 40,
  FLAG_SPIN = 1 << 41,
  FLAG_NO_REWARD = 1 << 42,
  FLAG_REDUCE_GIBS = 1 << 43,
  FLAG_TRANSITION_UPDATE = 1 << 44,
  FLAG_NO_PLAYER_CONTROL = 1 << 45,
  FLAG_NO_QUERY = 1 << 46,
  FLAG_KNOCKED_BACK = 1 << 47,
  FLAG_APPLY_IMPACT_DAMAGE = 1 << 48,
  FLAG_ICE_FROZEN = 1 << 49,
  FLAG_ICE = 1 << 50,
  FLAG_MAGNETIZED = 1 << 51,
  FLAG_BAITED = 1 << 52,
  FLAG_KILLSWITCH = 1 << 53,
  FLAG_WEAKNESS = 1 << 54,
  FLAG_EXTRA_GORE = 1 << 55,
  FLAG_BRIMSTONE_MARKED = 1 << 56,
  FLAG_HELD = 1 << 57,
  FLAG_THROWN = 1 << 58,
  FLAG_FRIENDLY_BALL = 1 << 59,
}

/** For EntityType.ENTITY_TEAR (2) */
declare enum TearFlags {
  /** Default tear (no special effects). */
  TEAR_NORMAL = 0,

  /** Goes through obstacles. Used by Ouija Board. */
  TEAR_SPECTRAL = 1,

  /** Goes through enemies. Used by Cupid's Arrow. */
  TEAR_PIERCING = 1 << 1,

  /** Used by Spoon Bender. */
  TEAR_HOMING = 1 << 2,

  /** Slows enemies on contact. Used by Spider Bite. */
  TEAR_SLOW = 1 << 3,

  /** Used by The Common Cold. */
  TEAR_POISON = 1 << 4,

  /**
   * Freezes enemies in place. (For the ice effect, see `TearFlags.TEAR_ICE`.) Used by Mom's
   * Contacts.
   */
  TEAR_FREEZE = 1 << 5,

  /** Splits into two different tears on collision. Used by The Parasite. */
  TEAR_SPLIT = 1 << 6,

  /** The tear increases in size and damage the longer it travels. Used by Lump of Coal. */
  TEAR_GROW = 1 << 7,

  /** Returns backwards after travelling for a little while. Used by My Reflection. */
  TEAR_BOOMERANG = 1 << 8,

  /** Keeps going past enemies that it kills (with less damage). Used by Polyphemus. */
  TEAR_PERSISTENT = 1 << 9,

  /** Used by the Wiggle Worm trinket. */
  TEAR_WIGGLE = 1 << 10,

  /** Created a blue fly on hit. Used by The Mulligan. */
  TEAR_MULLIGAN = 1 << 11,

  /** Explodes on hit. Used by Ipecac. */
  TEAR_EXPLOSIVE = 1 << 12,

  /** Used by Mom's Eyeshadow. */
  TEAR_CHARM = 1 << 13,

  /** Used by Iron Bar. */
  TEAR_CONFUSION = 1 << 14,

  /** Enemies killed have a 33% chance to drop a heart. */
  TEAR_HP_DROP = 1 << 15,

  /** Tears orbit around the player. Used by Tiny Planet. */
  TEAR_ORBIT = 1 << 16,

  /** Floats in place until the player releases the fire button. Used by Anti-Gravity. */
  TEAR_WAIT = 1 << 17,

  /** Splits into four different tears on collision. Used by Cricket's Body. */
  TEAR_QUADSPLIT = 1 << 18,

  /** Bounces off of enemies, walls, rocks, and so on. Used by Rubber Cement. */
  TEAR_BOUNCE = 1 << 19,

  /** Used by Mom's Perfume. */
  TEAR_FEAR = 1 << 20,

  /** The tear shrinks the longer it travels. Used by Proptosis. */
  TEAR_SHRINK = 1 << 21,

  /** Used by Fire Mind. */
  TEAR_BURN = 1 << 22,

  /** Attracts enemies and pickups. Used by Strange Attractor. */
  TEAR_ATTRACTOR = 1 << 23,

  /** Pushes enemies back further than normal. */
  TEAR_KNOCKBACK = 1 << 24,

  /** Used by Pulse Worm. */
  TEAR_PULSE = 1 << 25,

  TEAR_SPIRAL = 1 << 26,

  /** Used by Flat worm. */
  TEAR_FLAT = 1 << 27,

  /** Makes tears explode out of the bomb. Used by Sad Bombs. */
  TEAR_SAD_BOMB = 1 << 28,

  /** Damages everything in the room when it explodes. Used by Butt Bombs. */
  TEAR_BUTT_BOMB = 1 << 29,

  /** Used by Hook Worm. */
  TEAR_SQUARE = 1 << 30,

  /** Creates an aura around the tear. Used by Godhead. */
  TEAR_GLOW = 1 << 31,

  /** Slows enemies and colors them black. Used by Lil Gish. */
  TEAR_GISH = 1 << 32,

  /** Spawns green creep on hit. Used by Mysterious Liquid. */
  TEAR_MYSTERIOUS_LIQUID_CREEP = 1 << 33,

  /** Deletes projectiles that it collides with. Used by Lost Contact. */
  TEAR_SHIELDED = 1 << 34,

  /** Spawns a pickup upon exploding. Used by Glitter Bombs. */
  TEAR_GLITTER_BOMB = 1 << 35,

  /** Splits into 5 little bombs upon exploding. Used by Scatter Bombs. */
  TEAR_SCATTER_BOMB = 1 << 36,

  /** Sticks to enemies and continues to deal damage. Used by Explosivo and Sticky Bombs. */
  TEAR_STICKY = 1 << 37,

  /** Pass through walls to loop around the screen. Used by Continuum. */
  TEAR_CONTINUUM = 1 << 38,

  /** Creates a light beam on hit. Used by Holy Light. */
  TEAR_LIGHT_FROM_HEAVEN = 1 << 39,

  /** Spawns a coin on hit. Used by Bumbo. */
  TEAR_COIN_DROP = 1 << 40,

  /** Enemies killed will spawn a black heart. */
  TEAR_BLACK_HP_DROP = 1 << 41,

  /** Follows the parent player's beam. Used by Tractor Beam. */
  TEAR_TRACTOR_BEAM = 1 << 42,

  /** Shrink enemies on hit. Used by God's Flesh. */
  TEAR_GODS_FLESH = 1 << 43,

  /** Have a chance to spawn a coin on hit. */
  TEAR_GREED_COIN = 1 << 44,

  /** Causes a large explosion in the shape of a cross. Used by Bomber Boy. */
  TEAR_CROSS_BOMB = 1 << 45,

  /** Used by Ouroboros Worm. */
  TEAR_BIG_SPIRAL = 1 << 46,

  /** Used by Glaucoma. */
  TEAR_PERMANENT_CONFUSION = 1 << 47,

  /** Sticks to enemies and does damage over time. Used by Sinus Infection. */
  TEAR_BOOGER = 1 << 48,

  /** Spawns creep on hit and spawns blue flies or spiders. Used by Parasitoid. */
  TEAR_EGG = 1 << 49,

  /** Can open doors or break grid entities. Used by Sulfuric Acid. */
  TEAR_ACID = 1 << 50,

  /** Splits into two tears. Used by Compound Fracture. */
  TEAR_BONE = 1 << 51,

  /**
   * Piercing. When passing through an enemy, gains homing and does double damage. Used by Eye of
   * Belial.
   */
  TEAR_BELIAL = 1 << 52,

  /** Enemies turn gold and drop coins on death. Used by Midas' Touch. */
  TEAR_MIDAS = 1 << 53,

  TEAR_NEEDLE = 1 << 54,

  /** Causes electricity to ripple around the room, damaging enemies. Used by Jacob's Ladder. */
  TEAR_JACOBS = 1 << 55,

  /** Void tears. Instantly kills enemies. Used by Little Horn. */
  TEAR_HORN = 1 << 56,

  /** Electricity arcs between tears. Used by Technology Zero. */
  TEAR_LASER = 1 << 57,

  /** Tears stay in the air and bump into each other. Used by Pop! */
  TEAR_POP = 1 << 58,

  /** Tears combine when they collide into each other. Used by Lachryphagy. */
  TEAR_ABSORB = 1 << 59,

  /** Lasers are generated on top of the tear. Used by Trisagion. */
  TEAR_LASERSHOT = 1 << 60,

  /** Continually bounces as it travels. Used by Flat Stone. */
  TEAR_HYDROBOUNCE = 1 << 61,

  /** Arcing shots that split into smaller tears on impact. Used by Haemolacria. */
  TEAR_BURSTSPLIT = 1 << 62,

  /** Spawns green creep. Used by Bob's Bladder. */
  TEAR_CREEP_TRAIL = 1 << 63,

  /** Knockback tears. Used by Knockout Drops. */
  TEAR_PUNCH = 1 << 64,

  /** Enemies become frozen on death. (For the freeze-in-place effect, see `TearFlags.FREEZE`.) */
  TEAR_ICE = 1 << 65,

  /** Enemies being magnetized and pull other things towards them. Used by Lodestone. */
  TEAR_MAGNETIZE = 1 << 66,

  /**
   * Marks enemies. Marked enemies will attack and damage each other, as well as have reduced
   * movement speed. Used by Rotten Tomato.
   */
  TEAR_BAIT = 1 << 67,

  /** Velocity can be adjusted by the player while in the air. Used by Eye of the Occult. */
  TEAR_OCCULT = 1 << 68,

  /** Tears orbit in a narrow and stable orbit. Used by Saturnus. */
  TEAR_ORBIT_ADVANCED = 1 << 69,

  /** Chance to break rocks and open doors. Deals extra damage to rock-type enemies. */
  TEAR_ROCK = 1 << 70,

  /** Tears turn and go horizontally when moving past an enemy. Used by Brain Worm. */
  TEAR_TURN_HORIZONTAL = 1 << 71,

  /** Spawns red creep. */
  TEAR_BLOOD_BOMB = 1 << 72,

  /** Enemies are turned into poop. */
  TEAR_ECOLI = 1 << 73,

  /** Enemies have a chance to drop a coin on death. Used by The Hanged Man? */
  TEAR_COIN_DROP_DEATH = 1 << 74,

  /** Explosion creates a Brimstone laser cross pattern. */
  TEAR_BRIMSTONE_BOMB = 1 << 75,

  /** Creates a black hole on impact. */
  TEAR_RIFT = 1 << 76,

  /** Sticks to enemies and multiplies on enemy death. */
  TEAR_SPORE = 1 << 77,

  /** Spawns a ghost upon explosion. */
  TEAR_GHOST_BOMB = 1 << 78,

  /** Killed enemies will drop a random tarot card. */
  TEAR_CARD_DROP_DEATH = 1 << 79,

  /** Killed enemies will drop a random rune. */
  TEAR_RUNE_DROP_DEATH = 1 << 80,

  /** Enemies will teleport to a different part of the room on hit. */
  TEAR_TELEPORT = 1 << 81,

  TEAR_EFFECT_COUNT = 82,

  TEAR_REROLL_ROCK_WISP = 1 << 115,
  TEAR_MOM_STOMP_WISP = 1 << 116,
  TEAR_ENEMY_TO_WISP = 1 << 117,

  /** Chance to reroll the enemy on hit. Used by D10 wisps. */
  TEAR_REROLL_ENEMY = 1 << 118,

  /** Causes giant explosions that create pits. Used by Giga Bombs. */
  TEAR_GIGA_BOMB = 1 << 119,

  /** Enemies explode into more gibs on death than normal. Used by Berserk! */
  TEAR_EXTRA_GORE = 1 << 120,

  /** Lasers cycle between colors, causing a rainbow effect. */
  TEAR_RAINBOW = 1 << 121,

  /** Bombs can be detonated by Remote Detonator. */
  TEAR_DETONATE = 1 << 122,

  /** Tears stick to each other and form a chain that can be swung around. Used by Akeldama. */
  TEAR_CHAIN = 1 << 123,

  /** Black aura effect. Used by Dark Matter. */
  TEAR_DARK_MATTER = 1 << 124,

  /** Bombs dropped while having a Golden Bomb will have this flag. */
  TEAR_GOLDEN_BOMB = 1 << 125,

  /** Bombs dropped while having Fast Bombs will have this flag. */
  TEAR_FAST_BOMB = 1 << 126,

  /**
   * A single tear controlled by the player with the shooting keys. Used by The Ludovico Technique.
   */
  TEAR_LUDOVICO = 1 << 127,
}

/** For EntityType.ENTITY_PROJECTILE (9) */
declare enum ProjectileFlags {
  SMART = 1,
  EXPLODE = 1 << 1,
  ACID_GREEN = 1 << 2,
  GOO = 1 << 3,
  GHOST = 1 << 4,
  WIGGLE = 1 << 5,
  BOOMERANG = 1 << 6,
  HIT_ENEMIES = 1 << 7,
  ACID_RED = 1 << 8,
  GREED = 1 << 9,
  RED_CREEP = 1 << 10,
  ORBIT_CW = 1 << 11,
  ORBIT_CCW = 1 << 12,
  NO_WALL_COLLIDE = 1 << 13,
  CREEP_BROWN = 1 << 14,
  FIRE = 1 << 15,
  BURST = 1 << 16,
  ANY_HEIGHT_ENTITY_HIT = 1 << 17,
  CURVE_LEFT = 1 << 18,
  CURVE_RIGHT = 1 << 19,
  TURN_HORIZONTAL = 1 << 20,
  SINE_VELOCITY = 1 << 21,
  MEGA_WIGGLE = 1 << 22,
  SAWTOOTH_WIGGLE = 1 << 23,
  SLOWED = 1 << 24,
  TRIANGLE = 1 << 25,
  MOVE_TO_PARENT = 1 << 26,
  ACCELERATE = 1 << 27,
  DECELERATE = 1 << 28,
  BURST3 = 1 << 29,
  CONTINUUM = 1 << 30,
  CANT_HIT_PLAYER = 1 << 31,
  CHANGE_FLAGS_AFTER_TIMEOUT = 1 << 32,
  CHANGE_VELOCITY_AFTER_TIMEOUT = 1 << 33,
  STASIS = 1 << 34,
  FIRE_WAVE = 1 << 35,
  FIRE_WAVE_X = 1 << 36,
  ACCELERATE_EX = 1 << 37,
  BURST8 = 1 << 38,
  FIRE_SPAWN = 1 << 39,
  ANTI_GRAVITY = 1 << 40,
  TRACTOR_BEAM = 1 << 41,
  BOUNCE = 1 << 42,
  BOUNCE_FLOOR = 1 << 43,
  SHIELDED = 1 << 44,
  BLUE_FIRE_SPAWN = 1 << 45,
  LASER_SHOT = 1 << 46,
  GODHEAD = 1 << 47,
  SMART_PERFECT = 1 << 48,
  BURSTSPLIT = 1 << 49,
  WIGGLE_ROTGUT = 1 << 50,
  FREEZE = 1 << 51,
  ACCELERATE_TO_POSITION = 1 << 52,
  BROCCOLI = 1 << 53,
  BACKSPLIT = 1 << 54,
  SIDEWAVE = 1 << 55,
  ORBIT_PARENT = 1 << 56,
  FADEOUT = 1 << 57,
}

declare enum CacheFlag {
  CACHE_DAMAGE = 0x1,
  CACHE_FIREDELAY = 0x2,
  CACHE_SHOTSPEED = 0x4,
  CACHE_RANGE = 0x8,
  CACHE_SPEED = 0x10,
  CACHE_TEARFLAG = 0x20,
  CACHE_TEARCOLOR = 0x40,
  CACHE_FLYING = 0x80,
  CACHE_WEAPON = 0x100,
  CACHE_FAMILIARS = 0x200,
  CACHE_LUCK = 0x400,
  CACHE_SIZE = 0x800,
  CACHE_COLOR = 0x1000,
  CACHE_PICKUP_VISION = 0x2000,
  CACHE_ALL = 0xffff,
  CACHE_TWIN_SYNC = 0x80000000,
}

declare enum DamageFlag {
  DAMAGE_NOKILL = 1,
  DAMAGE_FIRE = 1 << 1,
  DAMAGE_EXPLOSION = 1 << 2,
  DAMAGE_LASER = 1 << 3,
  DAMAGE_ACID = 1 << 4,
  DAMAGE_RED_HEARTS = 1 << 5,
  DAMAGE_COUNTDOWN = 1 << 6,
  DAMAGE_SPIKES = 1 << 7,
  DAMAGE_CLONES = 1 << 8,
  DAMAGE_POOP = 1 << 9,
  DAMAGE_DEVIL = 1 << 10,
  DAMAGE_ISSAC_HEART = 1 << 11,
  DAMAGE_TNT = 1 << 12,
  DAMAGE_INVINCIBLE = 1 << 13,
  DAMAGE_SPAWN_FLY = 1 << 14,
  DAMAGE_POISON_BURN = 1 << 15,
  DAMAGE_CURSED_DOOR = 1 << 16,
  DAMAGE_TIMER = 1 << 17,
  DAMAGE_IV_BAG = 1 << 18,
  DAMAGE_PITFALL = 1 << 19,
  DAMAGE_CHEST = 1 << 20,
  DAMAGE_FAKE = 1 << 21,
  DAMAGE_BOOGER = 1 << 22,
  DAMAGE_SPAWN_BLACK_HEART = 1 << 23,
  DAMAGE_CRUSH = 1 << 24,
  DAMAGE_NO_MODIFIERS = 1 << 25,
  DAMAGE_SPAWN_RED_HEART = 1 << 26,
  DAMAGE_SPAWN_COIN = 1 << 27,
  DAMAGE_NO_PENALTIES = 1 << 28,
  DAMAGE_SPAWN_TEMP_HEART = 1 << 29,
  DAMAGE_IGNORE_ARMOR = 1 << 30,
  DAMAGE_SPAWN_CARD = 1 << 31,
  DAMAGE_SPAWN_RUNE = 1 << 32,
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

declare enum UseFlag {
  /** Don't play use animations. */
  USE_NOANIM = 1,
  /** Don't add costume. */
  USE_NOCOSTUME = 1 << 1,
  /** Effect was triggered by an active item owned by the player. */
  USE_OWNED = 1 << 2,
  /** Allow the effect to trigger on non-main players (i.e. coop babies). */
  USE_ALLOWNONMAIN = 1 << 3,
  /** D4 only: Reroll the player's active item. */
  USE_REMOVEACTIVE = 1 << 4,
  /** Effect was triggered a second time by Car Battery (or Tarot Cloth for cards). */
  USE_CARBATTERY = 1 << 5,
  /** Effect was triggered by Void. */
  USE_VOID = 1 << 6,
  /** Effect was mimicked by an active item (Blank Card, Placebo). */
  USE_MIMIC = 1 << 7,
  /** Never play announcer voice. */
  USE_NOANNOUNCER = 1 << 8,
  /**
   * This allows an item to spawn wisps when called from another item usage as the wisps generator
   * checks for NOANIM, so usually you want to use this with NOANIM call.
   */
  USE_ALLOWWISPSPAWN = 1 << 9,
  /**
   * If set, forces UseActiveItem to use the CustomVarData argument instead of the active item's
   * stored VarData.
   */
  USE_CUSTOMVARDATA = 1 << 10,
}
