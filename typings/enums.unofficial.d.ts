// Unofficial enums contributed by the community
// We have to use const enums here instead of normal enums because the corresponding Lua globals do
// not exist
// https://www.typescriptlang.org/docs/handbook/enums.html
// Alternatively, we could create new global enums, but that would pollute the global namespace

/** For EntityType.ENTITY_PLAYER (1) */
declare const enum PlayerVariant {
  PLAYER = 0,
  COOP_BABY = 1,
}

/* For EntityType.ENTITY_SLOT (6) */
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

/* For EntityType.ENTITY_LASER (7) */
declare const enum LaserVariant {
  /** Used for Brimstone. */
  LASER_THICK_RED = 1,
  /** Used for Technology. */
  LASER_THIN_RED = 2,
  LASER_SHOOP_DA_WHOOP = 3,
  /** Looks like a squiggly line. */
  LASER_PRIDE = 4,
  /** Used for Angel lasers. */
  LASER_LIGHT_BEAM = 5,
  /** Used for Mega Blast. */
  LASER_GIANT_RED = 6,
  LASER_TRACTOR_BEAM = 7,
  /** Used for Circle of Protection; looks like a thinner Angel laser. */
  LASER_LIGHT_RING = 8,
  /** Used for Brimstone + Technology. */
  LASER_BRIMTECH = 9,
}

/** For GridEntityType.GRID_POOP (14) */
declare const enum PoopVariant {
  POOP_NORMAL = 0,
  POOP_RED = 1,
  POOP_CORN = 2,
  POOP_GOLDEN = 3,
  POOP_RAINBOW = 4,
  POOP_BLACK = 5,
  POOP_WHITE = 6,
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
  POOP = 1500,
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

declare const enum RoomTransition {
  TRANSITION_NONE = 0,
  TRANSITION_DEFAULT = 1,
  TRANSITION_STAGE = 2,
  TRANSITION_TELEPORT = 3,
  TRANSITION_ANKH = 5,
  TRANSITION_DEAD_CAT = 6,
  TRANSITION_1UP = 7,
  TRANSITION_GUPPYS_COLLAR = 8,
  TRANSITION_JUDAS_SHADOW = 9,
  TRANSITION_LAZARUS_RAGS = 10,
  TRANSITION_GLOWING_HOURGLASS = 12,
  TRANSITION_D7 = 13,
  TRANSITION_MISSING_POSTER = 14,
}

declare const enum StageTransition {
  TRANSITION_DISAPPEAR = 0,
  TRANSITION_NONE = 1,
}

declare const enum FadeoutTarget {
  FADEOUT_FILE_SELECT = 0,
  FADEOUT_MAIN_MENU = 1,
  FADEOUT_TITLE_SCREEN = 2,
  FADEOUT_RESTART_RUN = 3,
  FADEOUT_RESTART_RUN_LAP = 4,
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
  MODE_NORMAL = 0,
  /** Same as MODE_NORMAL, but less resource-intensive. */
  MODE_ECONOMIC = 1,
  /** Only blocked by walls and metal blocks. */
  MODE_EXPLOSION = 2,
  /** Not blocked by pits. Used by enemies that shoot projectiles at you, such as Hosts. */
  MODE_PROJECTILE = 3,
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
}

/** These are the types of possible champions that can spawn. */
declare const enum ChampionColorIdx {
  /** No champion. */
  REGULAR = -1,
  /** 2.5x amount of HP. */
  VIVID_RED = 0,
  /** Increased movement speed. */
  DARK_YELLOW = 1,
  /** Leaves green creep as it walks. */
  STRONG_LIME_GREEN = 2,
  /** Attacks cause you to drop coins (like Greed or a Hanger). */
  VIVID_ORANGE = 3,
  /** Decreased speed. */
  VIVID_BLUE = 4,
  /** Explodes when killed. */
  DARK_CYAN = 5,
  /** Invincible until all other enemies are killed. */
  WHITE = 6,
  /** 2/3 health, decreased speed. */
  DARK_GRAY = 7,
  /** Tears become spectral tears, and it can move past environmental obstacles. */
  TRANSPARENT_WHITE = 8,
  /** Fades in and out of visibility. */
  BLACK = 9,
  /** Periodically shoots short-ranged blood shots. */
  PURE_MAGENTA = 10,
  /** Pulls the player (and tears) towards itself. */
  MOSTLY_PURE_VIOLET = 11,
  /** Collapses into a flesh pile upon death and regenerates if not finished off. */
  DARK_RED = 12,
  /** Releases blood shots in 8 directions when killed. */
  VERY_LIGHT_BLUE = 13,
  /** The enemy blends into the background and briefly becomes visible when damaged. */
  CAMOUFLAGE = 14,
  /** Splits into two copies of itself upon death. */
  PULSING_STRONG_LIME = 15,
  /** Repels Isaac's shots when it pulses. */
  PULSING_DARK_GRAY,
  /** Has 1-2 Eternal Flies circling it. Spawns another fly upon death. */
  LIGHT_WHITE = 17,
  /** Decreased health, increased speed. Smaller and more difficult to hit. */
  SMALL = 18,
  /**
   * Increased health, slightly decreased speed. Larger and easier to hit. Deals two full hearts of
   * damage.
   */
  LARGE = 19,
  /**
   * All other enemies in the room regenerate health at the rate of 20 HP per second while this
   * enemy is alive.
   */
  PULSING_VIVID_RED = 20,
  /**
   * Spawns an Attack Fly on hit. After each hit, there is a delay until the next hit results in
   * another Attack Fly. A single Pulsating enemy can have up to 5 Attack Flies at once.
   */
  PULSATING = 21,
  /**
   * Increased health. All enemies in the room that are not champions will turn yellow while the
   * crowned enemy is alive. The affected enemies will drop batteries like yellow champions upon
   * dying.
   */
  CROWN = 22,
  /** Produces a The Necronomicon effect upon death. Deals two full hearts of damage. */
  SKULL = 23,
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
  MEGA_MAW_II = 46,
  MEGA_FATTY = 47,
  MEGA_FATTY_II = 48,
  MEGA_GURDY = 49,
  DARK_ONE = 50,
  DARK_ONE_II = 51,
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
}
