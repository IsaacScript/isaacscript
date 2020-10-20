// Unofficial enums
// We have to use const enums here instead of normal enums because we do not want to pollute the
// global namespace
// https://www.typescriptlang.org/docs/handbook/enums.html

// EntityType.ENTITY_PLAYER (1)
declare const enum PlayerVariant {
  PLAYER = 0,
  COOP_BABY = 1,
}

// EntityType.ENTITY_SLOT (6)
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

// EntityType.ENTITY_LASER (7)
declare const enum LaserVariant {
  LASER_THICK_RED = 1, // Brimstone
  LASER_THIN_RED = 2, // Technology
  LASER_SHOOP_DA_WHOOP = 3,
  LASER_PRIDE = 4, // Looks like a squiggly line
  LASER_LIGHT_BEAM = 5, // Angel lasers
  LASER_GIANT_RED = 6, // Mega Blast
  LASER_TRACTOR_BEAM = 7,
  LASER_LIGHT_RING = 8, // ?? (looks like a thinner Angel laser)
  LASER_BRIMTECH = 9, // Brimstone + Technology
}

// GridEntityType.GRID_POOP (14)
declare const enum PoopVariant {
  POOP_NORMAL = 0,
  POOP_RED = 1,
  POOP_CORN = 2,
  POOP_GOLDEN = 3,
  POOP_RAINBOW = 4,
  POOP_BLACK = 5,
  POOP_WHITE = 6,
}

/**
 * The grid entity ID used for the `gridspawn` console command
 */
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
  // 5 and higher result in a black screen
}

// These enums loop after 31, so 32 = DPAD_LEFT, 63 = DPAD_LEFT, and so on
// There appears to be no input key for joystick movement
declare const enum Controller {
  DPAD_LEFT = 0,
  DPAD_RIGHT = 1,
  DPAD_UP = 2,
  DPAD_DOWN = 3,
  CPAD_DOWN = 4, // A, X and B on Xbox, Playstation and Nintendo respectively
  CPAD_RIGHT = 5, // B, O and A on Xbox, Playstation and Nintendo respectively
  CPAD_LEFT = 6, // X, □ and Y on Xbox, Playstation and Nintendo respectively
  CPAD_UP = 7, // Y, Δ and X on Xbox, Playstation and Nintendo respectively
  BUTTON_LB = 8, // Left shoulder
  BUTTON_LT = 9, // Left trigger
  BUTTON_LS = 10, // Left stick
  BUTTON_RB = 11, // Right shoulder
  BUTTON_RT = 12, // Right trigger
  BUTTON_RS = 13, // Right stick
  SELECT = 14, // Select, Share and - on Xbox, Playstation and Nintendo respectively
  START = 15, // Start, Options and + on Xbox, Playstation and Nintendo respectively
}

declare const enum LineCheckMode {
  MODE_NORMAL = 0, // Stopped by pits and rocks (e.g. like a Gaper's behavior)
  MODE_ECONOMIC = 1, // Same as MODE_NORMAL, but less resource-intensive
  MODE_EXPLOSION = 2, // Only blocked by walls and metal blocks
  // Not blocked by pits; used by enemies that shoot projectiles at you, such as Hosts
  MODE_PROJECTILE = 3,
}

declare const enum ProjectilesMode {
  ONE_PROJECTILE = 0,
  TWO_PROJECTILES = 1, // Uses params.Spread
  THREE_PROJECTILES = 2, // Uses params.Spread
  THREE_PROJECTILES_SPREAD = 3, // Uses params.Spread
  FOUR_PROJECTILES = 4, // Uses params.Spread
  FIVE_PROJECTILES = 5, // Uses params.Spread
  FOUR_PROJECTILES_PLUS_PATTERN = 6, // Uses velocity.X as speed
  FOUR_PROJECTILES_X_PATTERN = 7, // Uses velocity.X as speed
  EIGHT_PROJECTILES_STAR_PATTERN = 8, // Uses velocity.X as speed
  // Uses velocity.X as speed
  // Uses velocity.y as N
  // Use params.FireDirectionLimit and params.DotProductLimit to fire in an arc only
  N_PROJECTILES_IN_CIRCLE = 9,
}

// Matches the entries in the "cutscenes.xml" file
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
