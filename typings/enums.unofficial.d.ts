// These are unofficial enums contributed by the community
// We have to use const enums here instead of normal enums because the corresponding Lua globals do
// not exist
// https://www.typescriptlang.org/docs/handbook/enums.html
// Alternatively, we could create new global enums, but that would pollute the global namespace

// Some of the official enums repeat themselves inside of the properties
// e.g. "CollectibleType.COLLECTIBLE_SAD_ONION" is better written as "CollectibleType.SAD_ONION"
// As a standard, enums in this file do not use any unnecessary prefixes

/** For EntityType.ENTITY_PLAYER (1) */
declare const enum PlayerVariant {
  PLAYER = 0,
  COOP_BABY = 1,
}

/** For EntityType.ENTITY_SLOT (6) */
declare const enum SlotVariant {
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
}

/** For EntityType.ENTITY_LASER (7) */
declare const enum LaserVariant {
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
  /** Used for Brimstone + Technology. */
  BRIMTECH = 9,
}

/** For EntityType.ENTITY_KNIFE (8) */
declare const enum KnifeVariant {
  MOMS_KNIFE = 8,
  BONE_CLUB = 1,
  BONE_SCYTHE = 2,
  DONKEY_JAWBONE = 3,
  BAG_OF_CRAFTING = 4,
  SUMPTORIUM = 5,
  NOTCHED_AXE = 9,
  SPIRIT_SWORD = 10,
  TECH_SWORD = 11,
}

/** For EntityType.ENTITY_FIREPLACE (33) */
declare const enum FireplaceVariant {
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

/** For EntityType.ENTITY_MOM (45) */
declare const enum MomVariant {
  MOM = 0,
  STOMP = 10,
}

/** For EntityType.ENTITY_FALLEN (81) */
declare const enum FallenVariant {
  FALLEN = 0,
  KRAMPUS = 1,
}

/** For EntityType.ENTITY_THE_HAUNT (260) */
declare const enum HauntVariant {
  HAUNT = 0,
  LIL_HAUNT = 10,
}

/** For EntityType.ENTITY_DINGLE (261) */
declare const enum DingleVariant {
  DINGLE = 0,
  DANGLE = 1,
}

/** For EntityType.ENTITY_URIEL (271) and EntityType.ENTITY_GABRIEL (272) */
declare const enum AngelVariant {
  NORMAL = 0,
  FALLEN = 1,
}

/** For EntityType.ENTITY_THE_LAMB (273) */
declare const enum LambVariant {
  LAMB = 0,
  BODY = 10,
}

/** For EntityType.ENTITY_ROTGUT (911) */
declare const enum RotgutVariant {
  PHASE_1_HEAD = 0,
  PHASE_2_MAGGOT = 1,
  PHASE_3_HEART = 2,
}

/** For EntityType.ENTITY_MOTHER (912) */
declare const enum MotherVariant {
  PHASE_1 = 0,
  PHASE_2 = 10,
  BALL = 100,
}

/** For EntityType.ENTITY_DOGMA (950) */
declare const enum DogmaVariant {
  DOGMA = 0,
  TV = 1,
  ANGEL = 2,
  ANGEL_BABY = 10,
}

/** For EntityType.ENTITY_BEAST (951) */
declare const enum BeastVariant {
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

/** For GridEntityType.GRID_POOP (14) */
declare const enum PoopVariant {
  NORMAL = 0,
  RED = 1,
  CORN = 2,
  GOLDEN = 3,
  RAINBOW = 4,
  BLACK = 5,
  WHITE = 6,
  GIGA_TOP_LEFT = 7,
  GIGA_TOP_RIGHT = 8,
  GIGA_BOTTOM_LEFT = 9,
  GIGA_BOTTOM_RIGHT = 10,
  CHARMING = 11,
}

/** For GridEntityType.GRID_TRAPDOOR (17)  */
declare const enum TrapdoorState {
  CLOSED = 0,
  OPEN = 1,
}

/**
 * Matches the ItemConfig.CHARGE_* members of the ItemConfig class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum ItemConfigChargeType {
  NORMAL = 0,
  TIMED = 1,
  SPECIAL = 2,
}

/**
 * Matches the ItemConfig.TAG_* members of the ItemConfig class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum ItemConfigTag {
  /** Dead things (for the Parasite unlock) */
  DEAD = 1,
  /** Syringes (for Little Baggy and the Spun! transformation) */
  SYRINGE = 1 << 1,
  /** Mom's things (for Mom's Contact and the Yes Mother? transformation) */
  MOM = 1 << 2,
  /** Technology items (for the Technology Zero unlock) */
  TECH = 1 << 3,
  /** Battery items (for the Jumper Cables unlock) */
  BATTERY = 1 << 4,
  /** -- Guppy items (Guppy transformation) */
  GUPPY = 1 << 5,
  /** Fly items (Beelzebub transformation) */
  FLY = 1 << 6,
  /** Bob items (Bob transformation) */
  BOB = 1 << 7,
  /** Mushroom items (Fun Guy transformation) */
  MUSHROOM = 1 << 8,
  /** Baby items (Conjoined transformation) */
  BABY = 1 << 9,
  /** Angel items (Seraphim transformation) */
  ANGEL = 1 << 10,
  /** Devil items (Leviathan transformation) */
  DEVIL = 1 << 11,
  /** Poop items (Oh Shit transformation) */
  POOP = 1 << 12,
  /** Book items (Book Worm transformation) */
  BOOK = 1 << 13,
  /** Spider items (Spider Baby transformation) */
  SPIDER = 1 << 14,
  /** Quest item (cannot be rerolled or randomly obtained) */
  QUEST = 1 << 15,
  /** Can be spawned by Monster Manual */
  MONSTER_MANUAL = 1 << 16,
  /** Cannot appear in Greed Mode */
  NO_GREED = 1 << 17,
  /** Food item (for Binge Eater) */
  FOOD = 1 << 18,
  /** Tears up item (for Lachryphagy unlock detection) */
  TEARS_UP = 1 << 19,
  /** Whitelisted item for Tainted Lost */
  OFFENSIVE = 1 << 20,
  /** Blacklisted item for Keeper & Tainted Keeper */
  NO_KEEPER = 1 << 21,
  /** Blacklisted item for The Lost's Birthright */
  NO_LOST_BR = 1 << 22,
  /** Star themed items (for the Planetarium unlock) */
  STARS = 1 << 23,
  /** Summonable items (for Tainted Bethany) */
  SUMMONABLE = 1 << 24,
  /** Can't be obtained in Cantripped challenge */
  NO_CANTRIP = 1 << 25,
  /** Active items that have wisps attached to them (automatically set) */
  WISP = 1 << 26,
  /** Unique familiars that cannot be duplicated */
  UNIQUE_FAMILIAR = 1 << 27,
}

/**
 * Matches the ItemConfig.TAG_* members of the ItemConfig class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum ItemConfigCardType {
  TAROT = 0,
  /** Standard playing cards (twos, aces and Joker, does not include Suicide King, Rules Card or Queen of Hearts) */
  CARDTYPE_SUIT = 1,
  CARDTYPE_RUNE = 2,
  /**
   * Anything that doesn't fall in the earlier categories.
   * This excludes non-cards such as Dice Shard, which are located in subsequent enums.
   */
  CARDTYPE_SPECIAL = 3,
  /** Special pocket items that do not qualify as "cards" */
  CARDTYPE_SPECIAL_OBJECT = 4,
  CARDTYPE_TAROT_REVERSE = 5,
}

/** Used for the `gridspawn` console command. */
declare const enum GridEntityRoomType {
  ROCK = 1000,
  BOMB_ROCK = 1001,
  POT = 1002,
  TNT = 1300,
  FIREPLACE = 1400,
  RED_FIREPLACE = 1410,
  RED_POOP = 1490,
  RAINBOW_POOP = 1494,
  CHUNKY_POOP = 1495,
  GOLDEN_POOP = 1496,
  BLACK_POOP = 1497,
  HOLY_POOP = 1498,
  GIGA_POOP = 1499,
  POOP = 1500,
  CHARMING_POOP = 1501,
  BLOCK = 1900,
  SPIKES = 1930,
  RETRACTING_SPIKES = 1931,
  COBWEB = 1940,
  PIT = 3000,
  KEY_BLOCK = 4000,
  PLATE = 4500,
  DEVIL_STATUE = 5000,
  ANGEL_STATUE = 5001,
  TRAP_DOOR = 9000,
  LADDER_DOOR = 9100,
  GRAVITY = 10000,
}

declare const enum PlateVariant {
  PRESSURE_PLATE_ROOM_CLEAR = 0,
  GIFT_PLATE = 1,
  GREED_PLATE = 2,
}

declare const enum StageTransition {
  DISAPPEAR = 0,
  NONE = 1,
}

declare const enum FadeoutTarget {
  FILE_SELECT = 0,
  MAIN_MENU = 1,
  TITLE_SCREEN = 2,
  RESTART_RUN = 3,
  RESTART_RUN_LAP = 4,
  // 5 and higher results in a black screen
}

/**
 * These enums loop after 31, so 32 = DPAD_LEFT, 63 = DPAD_LEFT, and so on.
 * There appears to be no input key for joystick movement.
 */
declare const enum Controller {
  DPAD_LEFT = 0,
  DPAD_RIGHT = 1,
  DPAD_UP = 2,
  DPAD_DOWN = 3,
  /** A, X and B on Xbox, Playstation and Nintendo respectively. */
  CPAD_DOWN = 4,
  /** B, O and A on Xbox, Playstation and Nintendo respectively. */
  CPAD_RIGHT = 5,
  /** X, □ and Y on Xbox, Playstation and Nintendo respectively. */
  CPAD_LEFT = 6,
  /** Y, Δ and X on Xbox, Playstation and Nintendo respectively. */
  CPAD_UP = 7,
  /** Left shoulder */
  BUTTON_LB = 8,
  /** Left trigger */
  BUTTON_LT = 9,
  /** Left stick */
  BUTTON_LS = 10,
  /** Right shoulder */
  BUTTON_RB = 11,
  /** Right trigger */
  BUTTON_RT = 12,
  /** Right stick */
  BUTTON_RS = 13,
  /** Select, Share and - on Xbox, Playstation and Nintendo respectively. */
  SELECT = 14,
  /** Start, Options and + on Xbox, Playstation and Nintendo respectively. */
  START = 15,
}

declare const enum LineCheckMode {
  /** Stopped by pits and rocks (e.g. like a Gaper's behavior). */
  NORMAL = 0,
  /** Same as MODE_NORMAL, but less resource-intensive. */
  ECONOMIC = 1,
  /** Only blocked by walls and metal blocks. */
  EXPLOSION = 2,
  /** Not blocked by pits. Used by enemies that shoot projectiles at you, such as Hosts. */
  PROJECTILE = 3,
}

declare const enum ProjectilesMode {
  ONE_PROJECTILE = 0,
  /** Uses params.Spread */
  TWO_PROJECTILES = 1,
  /** Uses params.Spread */
  THREE_PROJECTILES = 2,
  /** Uses params.Spread */
  THREE_PROJECTILES_SPREAD = 3,
  /** Uses params.Spread */
  FOUR_PROJECTILES = 4,
  /** Uses params.Spread */
  FIVE_PROJECTILES = 5,
  /** Uses velocity.X as speed. */
  FOUR_PROJECTILES_PLUS_PATTERN = 6,
  /** Uses velocity.X as speed. */
  FOUR_PROJECTILES_X_PATTERN = 7,
  /** Uses velocity.X as speed. */
  EIGHT_PROJECTILES_STAR_PATTERN = 8,
  /**
   * Uses velocity.X as speed.
   * Uses velocity.y as N.
   * To fire in an arc, use params.FireDirectionLimit and params.DotProductLimit.
   */
  N_PROJECTILES_IN_CIRCLE = 9,
}

/** Matches the entries in the "cutscenes.xml" file. */
declare const enum Ending {
  INTRO = 1,
  CREDITS = 2,
  EPILOGUE = 3,
  WOMB_EDEN = 4,
  WOMB_RUBBER_CEMENT = 5,
  WOMB_NOOSE = 6,
  WOMB_WIRE_COAT_HANGER = 7,
  WOMB_EVERYTHING_IS_TERRIBLE = 8,
  WOMB_IPECAC = 9,
  WOMB_EXPERIMENTAL_TREATMENT = 10,
  WOMB_A_QUARTER = 11,
  WOMB_DR_FETUS = 12,
  WOMB_BLUE_BABY = 13,
  WOMB_IT_LIVES = 14,
  SHEOL = 15,
  CATHEDRAL = 16,
  CHEST = 17,
  DARK_ROOM = 18,
  MEGA_SATAN = 19,
  BLUE_WOMB = 20,
  GREED_MODE = 21,
  THE_VOID = 22,
  GREEDIER = 23,
  MOTHER = 24,
  DOGMA = 25,
  BEAST = 26,
}

/** Matches the IDs in the "specialrooms.stb" file. */
declare const enum BossIDs {
  MONSTRO = 1,
  LARRY_JR = 2,
  CHUB = 3,
  GURDY = 4,
  MONSTRO_II = 5,
  MOM = 6,
  SCOLEX = 7,
  MOMS_HEART = 8,
  FAMINE = 9,
  PESTILENCE = 10,
  WAR = 11,
  DEATH = 12,
  DUKE_OF_FLIES = 13,
  PEEP = 14,
  LOKI = 15,
  BLASTOCYST = 16,
  GEMINI = 17,
  FISTULA = 18,
  GISH = 19,
  STEVEN = 20,
  CHAD = 21,
  HEADLESS_HORSEMAN = 22,
  THE_FALLEN = 23,
  SATAN = 24,
  IT_LIVES = 25,
  THE_HOLLOW = 26,
  THE_CARRION_QUEEN = 27,
  GURDY_JR = 28,
  THE_HUSK = 29,
  THE_BLOAT = 30,
  LOKII = 31,
  THE_BLIGHTED_OVUM = 32,
  TERATOMA = 33,
  THE_WIDOW = 34,
  MASK_OF_INFAMY = 35,
  THE_WRETCHED = 36,
  PIN = 37,
  CONQUEST = 38,
  ISAAC = 39,
  /** Also known as "???". */
  BLUE_BABY = 40,
  DADDY_LONG_LEGS = 41,
  TRIACHNID = 42,
  THE_HAUNT = 43,
  DINGLE = 44,
  MEGA_MAW = 45,
  MEGA_MAW_II = 46, // The Gate
  MEGA_FATTY = 47,
  MEGA_FATTY_II = 48, // The Cage
  MEGA_GURDY = 49,
  DARK_ONE = 50,
  DARK_ONE_II = 51, // The Adversary
  POLYCEPHALUS = 52,
  MEGA_FRED = 53,
  THE_LAMB = 54,
  MEGA_SATAN = 55,
  GURGLINGS = 56,
  THE_STAIN = 57,
  BROWNIE = 58,
  THE_FORSAKEN = 59,
  LITTLE_HORN = 60,
  RAG_MAN = 61,
  ULTRA_GREED = 62,
  HUSH = 63,
  DANGLE = 64,
  TURDLING = 65,
  THE_FRAIL = 66,
  RAG_MEGA = 67,
  SISTERS_VIS = 68,
  BIG_HORN = 69,
  DELIRIUM = 70,
  THE_MATRIARCH = 72,
  THE_PILE = 73,
  REAP_CREEP = 74,
  BEELZEBLUB = 75,
  WORMWOOD = 76,
  RAINMAKER = 77,
  THE_VISAGE = 78,
  THE_SIREN = 79,
  TUFF_TWINS = 80,
  THE_HERETIC = 81,
  HORNFEL = 82,
  GREAT_GIDEON = 83,
  BABY_PLUM = 84,
  THE_SCOURGE = 85,
  CHIMERA = 86,
  ROTGUT = 87,
  MOTHER = 88,
  MAUSOLEUM_MOM = 89,
  MAUSOLEUM_MOMS_HEART = 90,
  MIN_MIN = 91,
  CLOG = 92,
  SINGE = 93,
  BUMBINO = 94,
  COLOSTOMIA = 95,
  THE_SHELL = 96,
  TURDLET = 97,
  /** This boss is currently unfinished and there are no boss rooms for it. */
  RAGLICH = 98,
  /** Dogma does not have its own boss rooms; it appears in a normal room. */
  DOGMA = 99,
  /** The Beast does not have its own boss rooms; it appears in a crawlspace. */
  BEAST = 100,
  HORNY_BOYS = 101,
  /** This boss is currently unfinished and there are no boss rooms for it. */
  POSSESSOR = 102,
}

declare const enum Dimension {
  CURRENT = -1,
  MAIN = 0,
  /** Used by the mirror sequence and the escape sequence. */
  SECONDARY = 1,
  DEATH_CERTIFICATE = 2,
}
