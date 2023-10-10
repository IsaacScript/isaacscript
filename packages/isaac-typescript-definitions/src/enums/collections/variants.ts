/* eslint-disable sort-exports/sort-exports */

/** For `EntityType.PLAYER` (1). */
export enum PlayerVariant {
  PLAYER = 0,
  COOP_BABY = 1,
}

/**
 * For `EntityType.TEAR` (2).
 *
 * Generally, the `TearVariant` affects the graphics of the tear, while the `TearFlag` affects the
 * gameplay mechanic. For example, the Euthanasia collectible grants a chance for needle tears that
 * explode. `TearVariant.NEEDLE` makes the tear look like a needle, and the exploding effect comes
 * from `TearFlag.NEEDLE`.
 *
 * However, there are some exceptions:
 * - `TearVariant.CHAOS_CARD` (9) - The variant grants the instant-kill property of the tear.
 * - `TearVariant.KEY_BLOOD` (44) - Sharp Key makes Isaac shoot key tears that deal extra damage.
 *   Both the graphical effect and the extra damage are granted by this variant.
 */
export enum TearVariant {
  BLUE = 0,
  BLOOD = 1,
  TOOTH = 2,
  METALLIC = 3,
  BOBS_HEAD = 4,
  FIRE_MIND = 5,
  DARK_MATTER = 6,
  MYSTERIOUS = 7,
  SCHYTHE = 8,
  CHAOS_CARD = 9,
  LOST_CONTACT = 10,
  CUPID_BLUE = 11,
  CUPID_BLOOD = 12,
  NAIL = 13,
  PUPULA = 14,
  PUPULA_BLOOD = 15,
  GODS_FLESH = 16,
  GODS_FLESH_BLOOD = 17,
  DIAMOND = 18,
  EXPLOSIVO = 19,
  COIN = 20,
  MULTIDIMENSIONAL = 21,
  STONE = 22,
  NAIL_BLOOD = 23,
  GLAUCOMA = 24,
  GLAUCOMA_BLOOD = 25,
  BOOGER = 26,
  EGG = 27,
  RAZOR = 28,
  BONE = 29,
  BLACK_TOOTH = 30,

  /** Used by Euthanasia. */
  NEEDLE = 31,

  BELIAL = 32,
  EYE = 33,
  EYE_BLOOD = 34,
  BALLOON = 35,
  HUNGRY = 36,
  BALLOON_BRIMSTONE = 37,
  BALLOON_BOMB = 38,
  FIST = 39,

  /** Used by Mom's Bracelet. */
  GRID_ENTITY = 40,

  ICE = 41,
  ROCK = 42,
  KEY = 43,
  KEY_BLOOD = 44,
  ERASER = 45,
  FIRE = 46,
  SWORD_BEAM = 47,
  SPORE = 48,
  TECH_SWORD_BEAM = 49,
  FETUS = 50,
}

/** For `EntityType.FAMILIAR` (3). */
export enum FamiliarVariant {
  FAMILIAR_NULL = 0,
  BROTHER_BOBBY = 1,
  DEMON_BABY = 2,
  LITTLE_CHUBBY = 3,
  LITTLE_GISH = 4,
  LITTLE_STEVEN = 5,
  ROBO_BABY = 6,
  SISTER_MAGGY = 7,
  ABEL = 8,
  GHOST_BABY = 9,
  HARLEQUIN_BABY = 10,
  RAINBOW_BABY = 11,
  ISAACS_HEAD = 12,
  BLUE_BABY_SOUL = 13,
  DEAD_BIRD = 14,
  EVES_BIRD_FOOT = 15,
  DADDY_LONGLEGS = 16,
  PEEPER = 17,
  BOMB_BAG = 20,
  SACK_OF_PENNIES = 21,
  LITTLE_CHAD = 22,
  RELIC = 23,
  BUM_FRIEND = 24,
  HOLY_WATER = 25,
  KEY_PIECE_1 = 26,
  KEY_PIECE_2 = 27,
  KEY_FULL = 28,
  FOREVER_ALONE = 30,
  DISTANT_ADMIRATION = 31,
  GUARDIAN_ANGEL = 32,
  FLY_ORBITAL = 33,
  SACRIFICIAL_DAGGER = 35,
  DEAD_CAT = 40,
  ONE_UP = 41,
  GUPPYS_HAIRBALL = 42,
  BLUE_FLY = 43,
  CUBE_OF_MEAT_1 = 44,
  CUBE_OF_MEAT_2 = 45,
  CUBE_OF_MEAT_3 = 46,
  CUBE_OF_MEAT_4 = 47,
  ISAACS_BODY = 48,
  SMART_FLY = 50,
  DRY_BABY = 51,
  JUICY_SACK = 52,
  ROBO_BABY_2 = 53,
  ROTTEN_BABY = 54,
  HEADLESS_BABY = 55,
  LEECH = 56,
  MYSTERY_SACK = 57,
  BBF = 58,
  BOBS_BRAIN = 59,
  BEST_BUD = 60,
  LIL_BRIMSTONE = 61,
  ISAACS_HEART = 62,
  LIL_HAUNT = 63,
  DARK_BUM = 64,
  BIG_FAN = 65,
  SISSY_LONGLEGS = 66,
  PUNCHING_BAG = 67,
  GUILLOTINE = 68,
  BALL_OF_BANDAGES_1 = 69,
  BALL_OF_BANDAGES_2 = 70,
  BALL_OF_BANDAGES_3 = 71,
  BALL_OF_BANDAGES_4 = 72,
  BLUE_SPIDER = 73,
  MONGO_BABY = 74,
  SAMSONS_CHAINS = 75,
  CAINS_OTHER_EYE = 76,
  BLUE_BABYS_ONLY_FRIEND = 77,
  SCISSORS = 78,
  GEMINI = 79,
  INCUBUS = 80,
  FATES_REWARD = 81,
  LIL_CHEST = 82,
  SWORN_PROTECTOR = 83,
  FRIEND_ZONE = 84,
  LOST_FLY = 85,
  CHARGED_BABY = 86,
  LIL_GURDY = 87,
  BUMBO = 88,
  CENSER = 89,
  KEY_BUM = 90,
  RUNE_BAG = 91,
  SERAPHIM = 92,
  GB_BUG = 93,
  SPIDER_MOD = 94,
  FARTING_BABY = 95,
  SUCCUBUS = 96,
  LIL_LOKI = 97,
  OBSESSED_FAN = 98,
  PAPA_FLY = 99,
  MILK = 100,
  MULTIDIMENSIONAL_BABY = 101,
  SUPER_BUM = 102,
  TONSIL = 103,
  BIG_CHUBBY = 104,
  DEPRESSION = 105,
  SHADE = 106,
  HUSHY = 107,
  LIL_MONSTRO = 108,
  KING_BABY = 109,
  FINGER = 110,
  YO_LISTEN = 111,
  ACID_BABY = 112,
  SPIDER_BABY = 113,
  SACK_OF_SACKS = 114,
  BROWN_NUGGET_POOTER = 115,
  BLOODSHOT_EYE = 116,
  MOMS_RAZOR = 117,
  ANGRY_FLY = 118,
  BUDDY_IN_A_BOX = 119,
  SPRINKLER = 120,
  LEPROSY = 121,
  LIL_HARBINGERS = 122,
  ANGELIC_PRISM = 123,
  MYSTERY_EGG = 124,
  LIL_SPEWER = 125,
  SLIPPED_RIB = 126,
  POINTY_RIB = 127,
  BONE_ORBITAL = 128,
  HALLOWED_GROUND = 129,
  JAW_BONE = 130,
  INTRUDER = 200,
  DIP = 201,
  DAMOCLES = 202,
  BLOOD_OATH = 203,
  PSY_FLY = 204,
  MENORAH = 205,
  WISP = 206,
  PEEPER_2 = 207,
  BOILED_BABY = 208,
  FREEZER_BABY = 209,
  BIRD_CAGE = 210,
  LOST_SOUL = 211,
  LIL_DUMPY = 212,
  KNIFE_PIECE_1 = 213,
  KNIFE_PIECE_2 = 214,
  TINYTOMA = 216,
  TINYTOMA_2 = 217,
  BOT_FLY = 218,
  SIREN_MINION = 220,
  PASCHAL_CANDLE = 221,
  STITCHES = 222,
  KNIFE_FULL = 223,
  BABY_PLUM = 224,
  FRUITY_PLUM = 225,
  SPIN_TO_WIN = 226,
  MINISAAC = 228,
  SWARM_FLY_ORBITAL = 229,
  LIL_ABADDON = 230,
  ABYSS_LOCUST = 231,
  LIL_PORTAL = 232,
  WORM_FRIEND = 233,
  BONE_SPUR = 234,
  TWISTED_BABY = 235,
  STAR_OF_BETHLEHEM = 236,
  ITEM_WISP = 237,
  BLOOD_BABY = 238,
  CUBE_BABY = 239,

  /** Produced from the Gello collectible. */
  UMBILICAL_BABY = 240,

  BLOOD_PUPPY = 241,
  VANISHING_TWIN = 242,
  DECAP_ATTACK = 243,
  FORGOTTEN_BODY = 900,
}

/** For `EntityType.BOMB` (4). */
export enum BombVariant {
  NORMAL = 0,

  /** Mr. Boom bombs. */
  BIG = 1,

  /** The decoy object from Best Friend. */
  DECOY = 2,

  TROLL = 3,
  MEGA_TROLL = 4,

  /** Bob's Curse bombs. */
  POISON = 5,

  /** Bomb's Curse + Mr. Mega bombs. */
  POISON_BIG = 6,

  SAD = 7,
  HOT = 8,
  BUTT = 9,
  MR_MEGA = 10,
  BOBBY = 11,
  GLITTER = 12,

  /** The red bombs that are created on certain Repentance floors. */
  THROWABLE = 13,

  /** The small bombs from Scatter Bombs. */
  SMALL = 14,

  BRIMSTONE = 15,

  /**
   * A special bomb type rarely thrown by Hornfel. This looks very similar to the type of bombs that
   * result from the player having Sad Bombs + Blood Bombs, but this has a slightly different mouth.
   */
  SAD_BLOOD = 16,

  GIGA = 17,
  GOLDEN_TROLL = 18,
  ROCKET = 19,
  ROCKET_GIGA = 20,
}

/** For `EntityType.PICKUP` (5). */
export enum PickupVariant {
  NULL = 0,
  HEART = 10,
  COIN = 20,
  KEY = 30,
  BOMB = 40,
  THROWABLE_BOMB = 41,

  /** The poop bombs that only spawn when the player is Tainted Blue Baby. */
  POOP = 42,

  CHEST = 50,
  BOMB_CHEST = 51,
  SPIKED_CHEST = 52,
  ETERNAL_CHEST = 53,
  MIMIC_CHEST = 54,
  OLD_CHEST = 55,
  WOODEN_CHEST = 56,
  MEGA_CHEST = 57,
  HAUNTED_CHEST = 58,

  /** The gold chest that requires a key to open. */
  LOCKED_CHEST = 60,

  SACK = 69,
  PILL = 70,
  LIL_BATTERY = 90,
  COLLECTIBLE = 100,
  BROKEN_SHOVEL = 110,
  SHOP_ITEM = 150,
  CARD = 300,
  BIG_CHEST = 340,
  TRINKET = 350,
  RED_CHEST = 360,
  TROPHY = 370,
  BED = 380,
  MOMS_CHEST = 390,
}

/** For `EntityType.SLOT` (6). */
export enum SlotVariant {
  SLOT_MACHINE = 1,
  BLOOD_DONATION_MACHINE = 2,
  FORTUNE_TELLING_MACHINE = 3,
  BEGGAR = 4,
  DEVIL_BEGGAR = 5,
  SHELL_GAME = 6,
  KEY_MASTER = 7,
  DONATION_MACHINE = 8,
  BOMB_BUM = 9,
  SHOP_RESTOCK_MACHINE = 10,
  GREED_DONATION_MACHINE = 11,
  MOMS_DRESSING_TABLE = 12,
  BATTERY_BUM = 13,
  ISAAC_SECRET = 14,
  HELL_GAME = 15,
  CRANE_GAME = 16,
  CONFESSIONAL = 17,
  ROTTEN_BEGGAR = 18,
}

/** For `EntityType.LASER` (7). */
export enum LaserVariant {
  /** Used for Brimstone. */
  THICK_RED = 1,

  /** Used for Technology. */
  THIN_RED = 2,

  SHOOP_DA_WHOOP = 3,

  /** Looks like a squiggly line. */
  PRIDE = 4,

  /** Used for Angel lasers. */
  LIGHT_BEAM = 5,

  /** Used for Mega Blast. */
  GIANT_RED = 6,

  TRACTOR_BEAM = 7,

  /** Used for Circle of Protection; looks like a thinner Angel laser. */
  LIGHT_RING = 8,

  BRIMSTONE_TECHNOLOGY = 9,
  ELECTRIC = 10,
  THICKER_RED = 11,
  THICK_BROWN = 12,
  BEAST = 13,
  THICKER_BRIMSTONE_TECHNOLOGY = 14,
  GIANT_BRIMSTONE_TECHNOLOGY = 15,
}

/** For `EntityType.KNIFE` (8). */
export enum KnifeVariant {
  MOMS_KNIFE = 0,
  BONE_CLUB = 1,
  BONE_SCYTHE = 2,
  DONKEY_JAWBONE = 3,
  BAG_OF_CRAFTING = 4,
  SUMPTORIUM = 5,
  // - 6 is unused.
  // - 7 is unused.
  // - 8 is unused.
  NOTCHED_AXE = 9,
  SPIRIT_SWORD = 10,
  TECH_SWORD = 11,
}

/** For `EntityType.PROJECTILE` (9). */
export enum ProjectileVariant {
  NORMAL = 0,
  BONE = 1,
  FIRE = 2,
  PUKE = 3,
  TEAR = 4,
  CORN = 5,
  HUSH = 6,
  COIN = 7,
  GRID = 8,
  ROCK = 9,
  RING = 10,
  MEAT = 11,
  FCUK = 12,
  WING = 13,
  LAVA = 14,
  HEAD = 15,
  PEEP = 16,
}

/** For `EntityType.GAPER` (10). */
export enum GaperVariant {
  FROWNING_GAPER = 0,
  GAPER = 1,
  FLAMING_GAPER = 2,
  ROTTEN_GAPER = 3,
}

/** For `EntityType.GUSHER` (11). */
export enum GusherVariant {
  GUSHER = 0,
  PACER = 1,
}

/** For `EntityType.POOTER` (14). */
export enum PooterVariant {
  POOTER = 0,
  SUPER_POOTER = 1,
  TAINTED_POOTER = 2,
}

/** For `EntityType.CLOTTY` (15). */
export enum ClottyVariant {
  CLOTTY = 0,
  CLOT = 1,
  BLOB = 2,
  GRILLED_CLOTTY = 3,
}

/** For `EntityType.MULLIGAN` (16). */
export enum MulliganVariant {
  MULLIGAN = 0,
  MULLIGOON = 1,
  MULLIBOOM = 2,
}

/** For `EntityType.SHOPKEEPER` (17). */
export enum ShopkeeperVariant {
  SHOPKEEPER = 0,
  SECRET_ROOM_KEEPER = 1,
  ERROR_ROOM_KEEPER = 2,
  SPECIAL_SHOPKEEPER = 3,
  SPECIAL_SECRET_ROOM_KEEPER = 4,
}

/** For `EntityType.LARRY_JR` (19). */
export enum LarryJrVariant {
  LARRY_JR = 0,
  HOLLOW = 1,
  TUFF_TWIN = 2,
  SHELL = 3,
}

/** For `EntityType.HIVE` (22). */
export enum HiveVariant {
  HIVE = 0,
  DROWNED_HIVE = 1,
  HOLY_MULLIGAN = 2,
  TAINTED_MULLIGAN = 3,
}

/** For `EntityType.CHARGER` (23). */
export enum ChargerVariant {
  CHARGER = 0,
  DROWNED_CHARGER = 1,
  DANK_CHARGER = 2,
  CARRION_PRINCESS = 3,
}

/** For `EntityType.GLOBIN` (24). */
export enum GlobinVariant {
  GLOBIN = 0,
  GAZING_GLOBIN = 1,
  DANK_GLOBIN = 2,
  CURSED_GLOBIN = 3,
}

/** For `EntityType.BOOM_FLY` (25). */
export enum BoomFlyVariant {
  BOOM_FLY = 0,
  RED_BOOM_FLY = 1,
  DROWNED_BOOM_FLY = 2,
  DRAGON_FLY = 3,
  BONE_FLY = 4,
  SICK_BOOM_FLY = 5,
  TAINTED_BOOM_FLY = 6,
}

/** For `EntityType.MAW` (26). */
export enum MawVariant {
  MAW = 0,
  RED_MAW = 1,
  PSYCHIC_MAW = 2,
}

/** For `EntityType.HOST` (27). */
export enum HostVariant {
  HOST = 0,
  RED_HOST = 1,
  HARD_HOST = 2,
}

/** For `EntityType.CHUB` (28). */
export enum ChubVariant {
  CHUB = 0,
  CHAD = 1,
  CARRION_QUEEN = 2,
}

/** For `EntityType.HOPPER` (29). */
export enum HopperVariant {
  HOPPER = 0,
  TRITE = 1,
  EGGY = 2,
  TAINTED_HOPPER = 3,
}

/** For `EntityType.BOIL` (30). */
export enum BoilVariant {
  BOIL = 0,
  GUT = 1,
  SACK = 2,
}

/** For `EntityType.SPITTY` (31). */
export enum SpittyVariant {
  SPITTY = 0,
  TAINTED_SPITTY = 1,
}

/**
 * For `EntityType.FIREPLACE` (33).
 *
 * Also see the `FireplaceGridEntityVariant` enum, which is different and used for the grid entity
 * version.
 */
export enum FireplaceVariant {
  NORMAL = 0,
  RED = 1,
  BLUE = 2,
  PURPLE = 3,
  WHITE = 4,
  MOVEABLE = 10,
  COAL = 11,
  MOVEABLE_BLUE = 12,
  MOVEABLE_PURPLE = 13,
}

/** For `EntityType.LEAPER` (34). */
export enum LeaperVariant {
  LEAPER = 0,
  STICKY_LEAPER = 1,
}

/** For `EntityType.MR_MAW` (35). */
export enum MrMawVariant {
  MR_MAW = 0,
  MR_MAW_HEAD = 1,
  MR_RED_MAW = 2,
  MR_RED_MAW_HEAD = 3,
  MR_MAW_NECK = 10,
}

/** For `EntityType.BABY` (38). */
export enum BabyVariant {
  BABY = 0,
  ANGELIC_BABY = 1,
  ULTRA_PRIDE_BABY = 2,
  WRINKLY_BABY = 3,
}

/** For `EntityType.VIS` (39). */
export enum VisVariant {
  VIS = 0,
  DOUBLE_VIS = 1,
  CHUBBER = 2,
  SCARRED_DOUBLE_VIS = 3,
  CHUBBER_PROJECTILE = 22,
}

/** For `EntityType.GUTS` (40). */
export enum GutsVariant {
  GUTS = 0,
  SCARRED_GUTS = 1,
  SLOG = 2,
}

/** For `EntityType.KNIGHT` (41). */
export enum KnightVariant {
  KNIGHT = 0,
  SELFLESS_KNIGHT = 1,
  LOOSE_KNIGHT = 2,
  BRAINLESS_KNIGHT = 3,
  BLACK_KNIGHT = 4,
}

/** For `EntityType.GRIMACE` (42). */
export enum GrimaceVariant {
  STONE_GRIMACE = 0,
  VOMIT_GRIMACE = 1,
  TRIPLE_GRIMACE = 2,
}

/** For `EntityType.MONSTRO_2` (43). */
export enum Monstro2Variant {
  MONSTRO_2 = 0,
  GISH = 1,
}

/** For `EntityType.POKY` (44). */
export enum PokyVariant {
  POKY = 0,
  SLIDE = 1,
}

/** For `EntityType.MOM` (45). */
export enum MomVariant {
  MOM = 0,
  STOMP = 10,
}

/** For `EntityType.SLOTH` (46). */
export enum SlothVariant {
  SLOTH = 0,
  SUPER_SLOTH = 1,
  ULTRA_PRIDE = 2,
}

/** For `EntityType.LUST` (47). */
export enum LustVariant {
  LUST = 0,
  SUPER_LUST = 1,
}

/** For `EntityType.WRATH` (48). */
export enum WrathVariant {
  WRATH = 0,
  SUPER_WRATH = 1,
}

/** For `EntityType.GLUTTONY` (49). */
export enum GluttonyVariant {
  GLUTTONY = 0,
  SUPER_GLUTTONY = 1,
}

/** For `EntityType.GREED` (50). */
export enum GreedVariant {
  GREED = 0,
  SUPER_GREED = 1,
}

/** For `EntityType.ENVY` (51). */
export enum EnvyVariant {
  ENVY = 0,
  SUPER_ENVY = 1,
  ENVY_BIG = 10,
  SUPER_ENVY_BIG = 11,
  ENVY_MEDIUM = 20,
  SUPER_ENVY_MEDIUM = 21,
  ENVY_SMALL = 30,
  SUPER_ENVY_SMALL = 31,
}

/** For `EntityType.PRIDE` (52). */
export enum PrideVariant {
  PRIDE = 0,
  SUPER_PRIDE = 1,
}

/** For `EntityType.DOPLE` (53). */
export enum DopleVariant {
  DOPLE = 0,
  EVIL_TWIN = 1,
}

/** For `EntityType.LEECH` (55). */
export enum LeechVariant {
  LEECH = 0,
  KAMIKAZE_LEECH = 1,
  HOLY_LEECH = 2,
}

/** For `EntityType.MEMBRAIN` (57). */
export enum MemBrainVariant {
  MEMBRAIN = 0,
  MAMA_GUTS = 1,
  DEAD_MEAT = 2,
}

/** For `EntityType.PARA_BITE` (58). */
export enum ParaBiteVariant {
  PARA_BITE = 0,
  SCARRED_PARA_BITE = 1,
}

/** For `EntityType.EYE` (60). */
export enum EyeVariant {
  EYE = 0,
  BLOODSHOT_EYE = 1,
  HOLY_EYE = 2,
}

/** For `EntityType.SUCKER` (61). */
export enum SuckerVariant {
  SUCKER = 0,
  SPIT = 1,
  SOUL_SUCKER = 2,
  INK = 3,
  MAMA_FLY = 4,
  BULB = 5,
  BLOOD_FLY = 6,
  TAINTED_SUCKER = 7,
}

/** For `EntityType.PIN` (62). */
export enum PinVariant {
  PIN = 0,
  SCOLEX = 1,
  FRAIL = 2,
  WORMWOOD = 3,
}

/** For `EntityType.WAR` (65). */
export enum WarVariant {
  WAR = 0,
  CONQUEST = 1,
  WAR_WITHOUT_HORSE = 2,
}

/** For `EntityType.DEATH` (66). */
export enum DeathVariant {
  DEATH = 0,
  DEATH_SCYTHE = 10,
  DEATH_HORSE = 20,
  DEATH_WITHOUT_HORSE = 30,
}

/** For `EntityType.DUKE_OF_FLIES` (67). */
export enum DukeOfFliesVariant {
  DUKE_OF_FLIES = 0,
  HUSK = 1,
}

/** For `EntityType.PEEP` (68). */
export enum PeepVariant {
  PEEP = 0,
  BLOAT = 1,
  PEEP_EYE = 10,
  BLOAT_EYE = 11,
}

/** For `EntityType.LOKI` (69). */
export enum LokiVariant {
  LOKI = 0,
  LOKII = 1,
}

/**
 * For:
 * - `EntityType.FISTULA_BIG` (71)
 * - `EntityType.FISTULA_MEDIUM` (72)
 * - `EntityType.FISTULA_SMALL` (73)
 */
export enum FistulaVariant {
  FISTULA = 0,
  TERATOMA = 1,
}

/** For `EntityType.MOMS_HEART` (78). */
export enum MomsHeartVariant {
  MOMS_HEART = 0,
  IT_LIVES = 1,
  MOMS_GUTS = 2,
}

/** For `EntityType.GEMINI` (79). */
export enum GeminiVariant {
  GEMINI = 0,
  STEVEN = 1,
  BLIGHTED_OVUM = 2,
  GEMINI_BABY = 10,
  STEVEN_BABY = 11,
  BLIGHTED_OVUM_BABY = 12,
  UMBILICAL_CORD = 20,
}

/** For `EntityType.FALLEN` (81). */
export enum FallenVariant {
  FALLEN = 0,
  KRAMPUS = 1,
}

/** For `EntityType.SATAN` (84). */
export enum SatanVariant {
  SATAN = 0,
  STOMP = 10,
}

/** For `EntityType.GURGLE` (87). */
export enum GurgleVariant {
  GURGLE = 0,
  CRACKLE = 1,
}

/** For `EntityType.WALKING_BOIL` (88). */
export enum WalkingBoilVariant {
  WALKING_BOIL = 0,
  WALKING_GUT = 1,
  WALKING_SACK = 2,
}

/** For `EntityType.HEART` (92). */
export enum HeartVariant {
  HEART = 0,
  HALF_HEART = 1,
}

/** For `EntityType.MASK` (93). */
export enum MaskVariant {
  MASK = 0,
  MASK_2 = 1,
}

/** For `EntityType.WIDOW` (100). */
export enum WidowVariant {
  WIDOW = 0,
  WRETCHED = 1,
}

/** For `EntityType.DADDY_LONG_LEGS` (101). */
export enum DaddyLongLegsVariant {
  DADDY_LONG_LEGS = 0,
  TRIACHNID = 1,
}

/** For `EntityType.ISAAC` (102). */
export enum IsaacVariant {
  ISAAC = 0,
  BLUE_BABY = 1,
  BLUE_BABY_HUSH = 2,
}

/** For `EntityType.CONSTANT_STONE_SHOOTER` (202). */
export enum ConstantStoneShooterVariant {
  CONSTANT_STONE_SHOOTER = 0,
  CROSS_STONE_SHOOTER = 10,
  CROSS_STONE_SHOOTER_ALWAYS_ON = 11,
}

/** For `EntityType.BABY_LONG_LEGS` (206). */
export enum BabyLongLegsVariant {
  BABY_LONG_LEGS = 0,
  SMALL_BABY_LONG_LEGS = 1,
}

/** For `EntityType.CRAZY_LONG_LEGS` (207). */
export enum CrazyLongLegsVariant {
  CRAZY_LONG_LEGS = 0,
  SMALL_CRAZY_LONG_LEGS = 1,
}

/** For `EntityType.FATTY` (208). */
export enum FattyVariant {
  FATTY = 0,
  PALE_FATTY = 1,
  FLAMING_FATTY = 2,
}

/** For `EntityType.DEATHS_HEAD` (212). */
export enum DeathsHeadVariant {
  DEATHS_HEAD = 0,

  /**
   * This is the only Death's Head variant that does not rely on other enemies in the room being
   * alive.
   */
  DANK_DEATHS_HEAD = 1,
  CURSED_DEATHS_HEAD = 2,
  BRIMSTONE_DEATHS_HEAD = 3,
  RED_SKULL = 4,
}

/** For `EntityType.SWINGER` (216). */
export enum SwingerVariant {
  SWINGER = 0,
  SWINGER_HEAD = 1,
  SWINGER_NECK = 10,
}

/** For `EntityType.DIP` (217). */
export enum DipVariant {
  DIP = 0,
  CORN = 1,
  BROWNIE_CORN = 2,
  BIG_CORN = 3,
}

/** For `EntityType.SQUIRT` (220). */
export enum SquirtVariant {
  SQUIRT = 0,
  DANK_SQUIRT = 1,
}

/** For `EntityType.SKINNY` (226). */
export enum SkinnyVariant {
  SKINNY = 0,
  ROTTY = 1,
  CRISPY = 2,
}

/** For `EntityType.BONY` (227). */
export enum BonyVariant {
  BONY = 0,
  HOLY_BONY = 1,
}

/** For `EntityType.HOMUNCULUS` (228). */
export enum HomunculusVariant {
  HOMUNCULUS = 0,
  HOMUNCULUS_CORD = 10,
}

/** For `EntityType.TUMOR` (229). */
export enum TumorVariant {
  TUMOR = 0,
  PLANETOID = 1,
}

/** For `EntityType.NERVE_ENDING` (231). */
export enum NerveEndingVariant {
  NERVE_ENDING = 0,
  NERVE_ENDING_2 = 1,
}

/** For `EntityType.GURGLING` (237). */
export enum GurglingVariant {
  GURGLING = 0,
  GURGLING_BOSS = 1,
  TURDLING = 2,
}

/** For `EntityType.GRUB` (239). */
export enum GrubVariant {
  GRUB = 0,
  CORPSE_EATER = 1,
  CARRION_RIDER = 2,
}

/** For `EntityType.WALL_CREEP` (240). */
export enum WallCreepVariant {
  WALL_CREEP = 0,
  SOY_CREEP = 1,
  RAG_CREEP = 2,
  TAINTED_SOY_CREEP = 3,
}

/** For `EntityType.RAGE_CREEP` (241). */
export enum RageCreepVariant {
  RAGE_CREEP = 0,
  SPLIT_RAGE_CREEP = 1,
}

/** For `EntityType.ROUND_WORM` (244). */
export enum RoundWormVariant {
  ROUND_WORM = 0,
  TUBE_WORM = 1,
  TAINTED_ROUND_WORM = 2,
  TAINTED_TUBE_WORM = 3,
}

/** For `EntityType.POOP` (245). */
export enum PoopEntityVariant {
  NORMAL = 0,
  GOLDEN = 1,
  STONE = 11,
  CORNY = 12,
  BURNING = 13,
  STINKY = 14,
  BLACK = 15,
  WHITE = 16,
}

/** For `EntityType.RAGLING` (246). */
export enum RaglingVariant {
  RAGLING = 0,
  RAG_MANS_RAGLING = 1,
}

/** For `EntityType.BEGOTTEN` (251). */
export enum BegottenVariant {
  BEGOTTEN = 0,
  BEGOTTEN_CHAIN = 10,
}

/** For `EntityType.CONJOINED_FATTY` (257). */
export enum ConjoinedFattyVariant {
  CONJOINED_FATTY = 0,
  BLUE_CONJOINED_FATTY = 1,
}

/** For `EntityType.HAUNT` (260). */
export enum HauntVariant {
  HAUNT = 0,
  LIL_HAUNT = 10,
}

/** For `EntityType.DINGLE` (261). */
export enum DingleVariant {
  DINGLE = 0,
  DANGLE = 1,
}

/** For `EntityType.MAMA_GURDY` (266). */
export enum MamaGurdyVariant {
  MAMA_GURDY = 0,
  LEFT_HAND = 1,
  RIGHT_HAND = 2,
}

/** For `EntityType.POLYCEPHALUS` (269). */
export enum PolycephalusVariant {
  POLYCEPHALUS = 0,
  PILE = 1,
}

/** For `EntityType.URIEL` (271) and `EntityType.GABRIEL` (272). */
export enum AngelVariant {
  NORMAL = 0,
  FALLEN = 1,
}

/** For `EntityType.LAMB` (273). */
export enum LambVariant {
  LAMB = 0,
  BODY = 10,
}

/** For `EntityType.MEGA_SATAN` (274) and `EntityType.MEGA_SATAN_2` (275). */
export enum MegaSatanVariant {
  MEGA_SATAN = 0,
  MEGA_SATAN_RIGHT_HAND = 1,
  MEGA_SATAN_LEFT_HAND = 2,
}

/** For `EntityType.PITFALL` (291). */
export enum PitfallVariant {
  PITFALL = 0,
  SUCTION_PITFALL = 1,
  TELEPORT_PITFALL = 2,
}

/** For `EntityType.MOVABLE_TNT` (292). */
export enum MoveableTNTVariant {
  MOVEABLE_TNT = 0,
  MINE_CRAFTER = 1,
}

/** For `EntityType.ULTRA_COIN` (293). */
export enum UltraCoinVariant {
  SPINNER = 0,
  KEY = 1,
  BOMB = 2,
  HEART = 3,
}

/** For `EntityType.STONEY` (302). */
export enum StoneyVariant {
  STONEY = 0,
  CROSS_STONEY = 10,
}

/** For `EntityType.PORTAL` (306). */
export enum PortalVariant {
  PORTAL = 0,
  LIL_PORTAL = 1,
}

/** For `EntityType.LEPER` (310). */
export enum LeperVariant {
  LEPER = 0,
  LEPER_FLESH = 1,
}

/** For `EntityType.MR_MINE` (311). */
export enum MrMineVariant {
  MR_MINE = 0,
  MR_MINE_NECK = 10,
}

/** For `EntityType.LITTLE_HORN` (404). */
export enum LittleHornVariant {
  LITTLE_HORN = 0,
  DARK_BALL = 1,
}

/** For `EntityType.RAG_MAN` (405). */
export enum RagManVariant {
  RAG_MAN = 0,
  RAG_MAN_HEAD = 1,
}

/** For `EntityType.ULTRA_GREED` (406). */
export enum UltraGreedVariant {
  ULTRA_GREED = 0,
  ULTRA_GREEDIER = 1,
}

/** For `EntityType.RAG_MEGA` (409). */
export enum RagMegaVariant {
  RAG_MEGA = 0,
  PURPLE_BALL = 1,
  REBIRTH_PILLAR = 2,
}

/** For `EntityType.BIG_HORN` (411). */
export enum BigHornVariant {
  BIG_HORN = 0,
  SMALL_HOLE = 1,
  BIG_HOLE = 2,
}

/** For `EntityType.BLOOD_PUPPY` (802). */
export enum BloodPuppyVariant {
  SMALL = 0,
  LARGE = 1,
}

/** For `EntityType.SUB_HORF` (812). */
export enum SubHorfVariant {
  SUB_HORF = 0,
  TAINTED_SUB_HORF = 1,
}

/** For `EntityType.POLTY` (816). */
export enum PoltyVariant {
  POLTY = 0,
  KINETI = 1,
}

/** For `EntityType.PREY` (817). */
export enum PreyVariant {
  PREY = 0,
  MULLIGHOUL = 1,
}

/** For `EntityType.ROCK_SPIDER` (818). */
export enum RockSpiderVariant {
  ROCK_SPIDER = 0,
  TINTED_ROCK_SPIDER = 1,
  COAL_SPIDER = 2,
}

/** For `EntityType.FLY_BOMB` (819). */
export enum FlyBombVariant {
  FLY_BOMB = 0,
  ETERNAL_FLY_BOMB = 1,
}

/** For `EntityType.DANNY` (820). */
export enum DannyVariant {
  DANNY = 0,
  COAL_BOY = 1,
}

/** For `EntityType.GYRO` (824). */
export enum GyroVariant {
  GYRO = 0,
  GRILLED_GYRO = 1,
}

/** For `EntityType.FACELESS` (827). */
export enum FacelessVariant {
  FACELESS = 0,
  TAINTED_FACELESS = 1,
}

/** For `EntityType.MOLE` (829). */
export enum MoleVariant {
  MOLE = 0,
  TAINTED_MOLE = 1,
}

/** For `EntityType.BIG_BONY` (830). */
export enum BigBonyVariant {
  BIG_BONY = 0,
  BIG_BONE = 10,
}

/** For `EntityType.GUTTED_FATTY` (831). */
export enum GuttyFattyVariant {
  GUTTED_FATTY = 0,
  GUTTY_FATTY_EYE = 10,
  FESTERING_GUTS = 20,
}

/** For `EntityType.EXORCIST` (832). */
export enum ExorcistVariant {
  EXORCIST = 0,
  FANATIC = 1,
}

/** For `EntityType.WHIPPER` (834). */
export enum WhipperVariant {
  WHIPPER = 0,
  SNAPPER = 1,
  FLAGELLANT = 2,
}

/** For `EntityType.PEEPER_FATTY` (835). */
export enum PeeperFattyVariant {
  PEEPING_FATTY = 0,
  PEEPING_FATTY_EYE = 10,
}

/** For `EntityType.REVENANT` (841). */
export enum RevenantVariant {
  REVENANT = 0,
  QUAD_REVENANT = 1,
}

/** For `EntityType.CANARY` (843). */
export enum CanaryVariant {
  CANARY = 0,
  FOREIGNER = 1,
}

/** For `EntityType.GAPER_LVL_2` (850). */
export enum Gaper2Variant {
  GAPER = 0,
  HORF = 1,
  GUSHER = 2,
}

/** For `EntityType.CHARGER_LVL_2` (855). */
export enum Charger2Variant {
  CHARGER = 0,
  ELLEECH = 1,
}

/** For `EntityType.EVIS` (865). */
export enum EvisVariant {
  EVIS = 0,
  EVIS_GUTS = 10,
}

/** For `EntityType.DARK_ESAU` (866). */
export enum DarkEsauVariant {
  DARK_ESAU = 0,
  PIT = 1,
}

/** For `EntityType.DUMP` (876). */
export enum DumpVariant {
  DUMP = 0,
  DUMP_HEAD = 1,
}

/** For `EntityType.NEEDLE` (881). */
export enum NeedleVariant {
  NEEDLE = 0,
  PASTY = 1,
}

/** For `EntityType.CULTIST` (885). */
export enum CultistVariant {
  CULTIST = 0,
  BLOOD_CULTIST = 1,
  BONE_TRAP = 10,
}

/** For `EntityType.VIS_FATTY` (886). */
export enum VisFattyVariant {
  VIS_FATTY = 0,
  FETAL_DEMON = 1,
}

/** For `EntityType.GOAT` (891). */
export enum GoatVariant {
  GOAT = 0,
  BLACK_GOAT = 1,
}

/** For `EntityType.VISAGE` (903). */
export enum VisageVariant {
  VISAGE = 0,
  VISAGE_MASK = 1,
  VISAGE_CHAIN = 10,
  VISAGE_PLASMA = 20,
}

/** For `EntityType.SIREN` (904). */
export enum SirenVariant {
  SIREN = 0,
  SIREN_SKULL = 1,
  SIREN_HELPER_PROJECTILE = 10,
}

/** For `EntityType.SCOURGE` (909). */
export enum ScourgeVariant {
  SCOURGE = 0,
  SCOURGE_CHAIN = 10,
}

/** For `EntityType.CHIMERA` (910). */
export enum ChimeraVariant {
  CHIMERA = 0,
  CHIMERA_BODY = 1,
  CHIMERA_HEAD = 2,
}

/** For `EntityType.ROTGUT` (911). */
export enum RotgutVariant {
  PHASE_1_HEAD = 0,
  PHASE_2_MAGGOT = 1,
  PHASE_3_HEART = 2,
}

/** For `EntityType.MOTHER` (912). */
export enum MotherVariant {
  /**
   * The body that is attached to the top of the screen in phase 1. During phase 2, it remains alive
   * but is inactive.
   */
  MOTHER_1 = 0,

  /** The circular body that moves around in phase 2. */
  MOTHER_2 = 10,

  BALL = 100,
}

/** For `EntityType.SINGE` (915). */
export enum SingeVariant {
  SINGE = 0,
  SINGE_BALL = 1,
}

/** For `EntityType.RAGLICH` (919). */
export enum RaglichVariant {
  RAGLICH = 0,
  RAGLICH_ARM = 1,
}

/** For `EntityType.CLUTCH` (921). */
export enum ClutchVariant {
  CLUTCH = 0,
  CLUTCH_ORBITAL = 1,
}

/** For `EntityType.DOGMA` (950). */
export enum DogmaVariant {
  DOGMA_PHASE_1 = 0,
  TV = 1,
  ANGEL_PHASE_2 = 2,
  ANGEL_BABY_UNUSED = 10,
}

/** For `EntityType.BEAST` (951). */
export enum BeastVariant {
  BEAST = 0,
  STALACTITE = 1,
  ROCK_PROJECTILE = 2,
  SOUL = 3,
  ULTRA_FAMINE = 10,
  ULTRA_FAMINE_FLY = 11,
  ULTRA_PESTILENCE = 20,
  ULTRA_PESTILENCE_FLY = 21,
  ULTRA_PESTILENCE_MAGGOT = 22,
  ULTRA_PESTILENCE_FLY_BALL = 23,
  ULTRA_WAR = 30,
  ULTRA_WAR_BOMB = 31,
  ULTRA_DEATH = 40,
  ULTRA_DEATH_SCYTHE = 41,
  ULTRA_DEATH_HEAD = 42,
  BACKGROUND_BEAST = 100,
  BACKGROUND_FAMINE = 101,
  BACKGROUND_PESTILENCE = 102,
  BACKGROUND_WAR = 103,
  BACKGROUND_DEATH = 104,
}

/** For `EntityType.GENERIC_PROP` (960). */
export enum GenericPropVariant {
  GENERIC_PROP = 0,
  MOMS_DRESSER = 1,
  MOMS_VANITY = 2,
  COUCH = 3,
  TV = 4,
}

/** For `EntityType.EFFECT` (1000). */
export enum EffectVariant {
  EFFECT_NULL = 0,
  BOMB_EXPLOSION = 1,
  BLOOD_EXPLOSION = 2,
  FLY_EXPLOSION = 3,
  ROCK_PARTICLE = 4,
  BLOOD_PARTICLE = 5,
  DEVIL = 6,
  BLOOD_SPLAT = 7,
  LADDER = 8,
  ANGEL = 9,
  BLUE_FLAME = 10,
  BULLET_POOF = 11,
  TEAR_POOF_A = 12,
  TEAR_POOF_B = 13,
  RIPPLE_POOF = 14,
  POOF_1 = 15,
  POOF_2 = 16,
  POOF_4 = 17,
  BOMB_CRATER = 18,
  CRACK_THE_SKY = 19,
  SCYTHE_BREAK = 20,
  TINY_BUG = 21,
  CREEP_RED = 22,
  CREEP_GREEN = 23,
  CREEP_YELLOW = 24,
  CREEP_WHITE = 25,
  CREEP_BLACK = 26,
  WOOD_PARTICLE = 27,
  MONSTROS_TOOTH = 28,
  MOM_FOOT_STOMP = 29,
  TARGET = 30,
  ROCKET = 31,
  PLAYER_CREEP_LEMON_MISHAP = 32,
  TINY_FLY = 33,
  FART = 34,
  TOOTH_PARTICLE = 35,
  XRAY_WALL = 36,
  PLAYER_CREEP_HOLY_WATER = 37,
  SPIDER_EXPLOSION = 38,
  HEAVEN_LIGHT_DOOR = 39,
  STAR_FLASH = 40,
  WATER_DROPLET = 41,
  BLOOD_GUSH = 42,
  POOP_EXPLOSION = 43,
  PLAYER_CREEP_WHITE = 44,
  PLAYER_CREEP_BLACK = 45,
  PLAYER_CREEP_RED = 46,
  TRINITY_SHIELD = 47,
  BATTERY = 48,
  HEART = 49,
  LASER_IMPACT = 50,
  HOT_BOMB_FIRE = 51,
  RED_CANDLE_FLAME = 52,
  PLAYER_CREEP_GREEN = 53,
  PLAYER_CREEP_HOLY_WATER_TRAIL = 54,
  SPIKE = 55,
  CREEP_BROWN = 56,
  PULLING_EFFECT = 57,
  POOP_PARTICLE = 58,
  DUST_CLOUD = 59,
  BOOMERANG = 60,
  SHOCKWAVE = 61,
  ROCK_EXPLOSION = 62,
  WORM = 63,
  BEETLE = 64,
  WISP = 65,
  EMBER_PARTICLE = 66,
  SHOCKWAVE_DIRECTIONAL = 67,
  WALL_BUG = 68,
  BUTTERFLY = 69,
  BLOOD_DROP = 70,
  BRIMSTONE_SWIRL = 71,
  CRACK_WAVE = 72,
  SHOCKWAVE_RANDOM = 73,
  CARPET = 74,
  BAR_PARTICLE = 75,
  DICE_FLOOR = 76,
  LARGE_BLOOD_EXPLOSION = 77,
  PLAYER_CREEP_LEMON_PARTY = 78,
  TEAR_POOF_SMALL = 79,
  TEAR_POOF_VERY_SMALL = 80,
  FRIEND_BALL = 81,
  WOMB_TELEPORT = 82,
  SPEAR_OF_DESTINY = 83,
  EVIL_EYE = 84,
  DIAMOND_PARTICLE = 85,
  NAIL_PARTICLE = 86,
  FALLING_EMBER = 87,
  DARK_BALL_SMOKE_PARTICLE = 88,
  ULTRA_GREED_FOOTPRINT = 89,
  PLAYER_CREEP_PUDDLE_MILK = 90,
  MOMS_HAND = 91,
  PLAYER_CREEP_BLACK_POWDER = 92,
  PENTAGRAM_BLACK_POWDER = 93,
  CREEP_SLIPPERY_BROWN = 94,
  GOLD_PARTICLE = 95,
  HUSH_LASER = 96,
  IMPACT = 97,
  COIN_PARTICLE = 98,
  WATER_SPLASH = 99,
  HUSH_ASHES = 100,
  HUSH_LASER_UP = 101,
  BULLET_POOF_HUSH = 102,
  ULTRA_GREED_BLING = 103,
  FIREWORKS = 104,
  BROWN_CLOUD = 105,
  FART_RING = 106,
  BLACK_HOLE = 107,
  MR_ME = 108,
  DEATH_SKULL = 109,
  ENEMY_BRIMSTONE_SWIRL = 110,
  HAEMO_TRAIL = 111,
  HALLOWED_GROUND = 112,
  BRIMSTONE_BALL = 113,
  FORGOTTEN_CHAIN = 114,
  BROKEN_SHOVEL_SHADOW = 115,
  DIRT_PATCH = 116,
  FORGOTTEN_SOUL = 117,
  SMALL_ROCKET = 118,
  TIMER = 119,
  SPAWNER = 120,
  LIGHT = 121,
  BIG_HORN_HOLE_HELPER = 122,
  HALO = 123,
  TAR_BUBBLE = 124,
  BIG_HORN_HAND = 125,
  TECH_DOT = 126,
  MAMA_MEGA_EXPLOSION = 127,
  OPTION_LINE = 128,
  LEECH_EXPLOSION = 130,
  MAGGOT_EXPLOSION = 131,
  BIG_SPLASH = 132,
  WATER_RIPPLE = 133,
  PEDESTAL_RIPPLE = 134,
  RAIN_DROP = 135,
  GRID_ENTITY_PROJECTILE_HELPER = 136,
  WORMWOOD_HOLE = 137,
  MIST = 138,
  TRAPDOOR_COVER = 139,
  BACKDROP_DECORATION = 140,
  SMOKE_CLOUD = 141,
  WHIRLPOOL = 142,
  FART_WAVE = 143,
  ENEMY_GHOST = 144,
  ROCK_POOF = 145,
  DIRT_PILE = 146,
  FIRE_JET = 147,
  FIRE_WAVE = 148,
  BIG_ROCK_EXPLOSION = 149,
  BIG_CRACK_WAVE = 150,
  BIG_ATTRACT = 151,
  HORNFEL_ROOM_CONTROLLER = 152,
  OCCULT_TARGET = 153,
  DOOR_OUTLINE = 154,
  CREEP_SLIPPERY_BROWN_GROWING = 155,
  TALL_LADDER = 156,
  WILLO_SPAWNER = 157,
  TADPOLE = 158,
  LIL_GHOST = 159,
  BISHOP_SHIELD = 160,
  PORTAL_TELEPORT = 161,
  HERETIC_PENTAGRAM = 162,
  CHAIN_GIB = 163,
  SIREN_RING = 164,
  CHARM_EFFECT = 165,
  SPRITE_TRAIL = 166,
  CHAIN_LIGHTNING = 167,
  COLOSTOMIA_PUDDLE = 168,
  CREEP_STATIC = 169,
  DOGMA_DEBRIS = 170,
  DOGMA_BLACK_HOLE = 171,
  DOGMA_ORB = 172,
  CRACKED_ORB_POOF = 173,
  SHOP_SPIKES = 174,
  KINETI_BEAM = 175,
  CLEAVER_SLASH = 176,
  REVERSE_EXPLOSION = 177,
  URN_OF_SOULS = 178,
  ENEMY_SOUL = 179,
  RIFT = 180,
  LAVA_SPAWNER = 181,
  BIG_KNIFE = 182,
  MOTHER_SHOCKWAVE = 183,
  WORM_FRIEND_SNARE = 184,
  REDEMPTION = 185,
  HUNGRY_SOUL = 186,
  EXPLOSION_WAVE = 187,
  DIVINE_INTERVENTION = 188,
  PURGATORY = 189,
  MOTHER_TRACER = 190,
  PICKUP_GHOST = 191,
  FISSURE_SPAWNER = 192,
  ANIMA_CHAIN = 193,
  DARK_SNARE = 194,
  CREEP_LIQUID_POOP = 195,
  GROUND_GLOW = 196,
  DEAD_BIRD = 197,
  GENERIC_TRACER = 198,
  ULTRA_DEATH_SCYTHE = 199,
}
