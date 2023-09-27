/* eslint-disable sort-exports/sort-exports */

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.SHOP` (2).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum ShopSubType {
  LEVEL_1 = 0,
  LEVEL_2 = 1,
  LEVEL_3 = 2,
  LEVEL_4 = 3,
  LEVEL_5 = 4,
  RARE_GOOD = 10,
  RARE_BAD = 11,
  TAINTED_KEEPER_LEVEL_1 = 100,
  TAINTED_KEEPER_LEVEL_2 = 101,
  TAINTED_KEEPER_LEVEL_3 = 102,
  TAINTED_KEEPER_LEVEL_4 = 103,
  TAINTED_KEEPER_LEVEL_5 = 104,
  TAINTED_KEEPER_RARE_GOOD = 110,
  TAINTED_KEEPER_RARE_BAD = 111,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.TREASURE` (4).
 *
 * This matches the sub-type in the "00.special rooms.stb" file and elsewhere.
 */
export enum TreasureRoomSubType {
  NORMAL = 0,
  MORE_OPTIONS = 1,
  PAY_TO_WIN = 2,
  MORE_OPTIONS_AND_PAY_TO_WIN = 3,
  KNIFE_PIECE = 34,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.BOSS` (5).
 *
 * This matches the "bossID" attribute in the "entities2.xml" file. It also matches the sub-type in
 * the "00.special rooms.stb" file.
 *
 * The enum is named `BossID` instead of `BossRoomSubType` in order to match the `Entity.GetBossID`,
 * `Room.GetBossID` and `Room.GetSecondBossID` methods.
 *
 * Also see the `MinibossID` enum.
 */
export enum BossID {
  MONSTRO = 1,
  LARRY_JR = 2,
  CHUB = 3,
  GURDY = 4,
  MONSTRO_2 = 5,
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
  FALLEN = 23,
  SATAN = 24,
  IT_LIVES = 25,
  HOLLOW = 26,
  CARRION_QUEEN = 27,
  GURDY_JR = 28,
  HUSK = 29,
  BLOAT = 30,
  LOKII = 31,
  BLIGHTED_OVUM = 32,
  TERATOMA = 33,
  WIDOW = 34,
  MASK_OF_INFAMY = 35,
  WRETCHED = 36,
  PIN = 37,
  CONQUEST = 38,
  ISAAC = 39,

  /** Also known as "???". */
  BLUE_BABY = 40,

  DADDY_LONG_LEGS = 41,
  TRIACHNID = 42,
  HAUNT = 43,
  DINGLE = 44,
  MEGA_MAW = 45,
  GATE = 46,
  MEGA_FATTY = 47,
  CAGE = 48,
  MAMA_GURDY = 49,
  DARK_ONE = 50,
  ADVERSARY = 51,
  POLYCEPHALUS = 52,
  MR_FRED = 53,
  LAMB = 54,
  MEGA_SATAN = 55,
  GURGLING = 56,
  STAIN = 57,
  BROWNIE = 58,
  FORSAKEN = 59,
  LITTLE_HORN = 60,
  RAG_MAN = 61,
  ULTRA_GREED = 62,
  HUSH = 63,
  DANGLE = 64,
  TURDLING = 65,
  FRAIL = 66,
  RAG_MEGA = 67,
  SISTERS_VIS = 68,
  BIG_HORN = 69,
  DELIRIUM = 70,
  MATRIARCH = 72,
  PILE = 73,
  REAP_CREEP = 74,
  LIL_BLUB = 75,
  WORMWOOD = 76,
  RAINMAKER = 77,
  VISAGE = 78,
  SIREN = 79,
  TUFF_TWINS = 80,
  HERETIC = 81,
  HORNFEL = 82,
  GREAT_GIDEON = 83,
  BABY_PLUM = 84,
  SCOURGE = 85,
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
  SHELL = 96,
  TURDLET = 97,

  /**
   * Raglich is currently unfinished and there are no boss rooms for it. However, the boss ID can be
   * successfully retrieved from the `Entity.GetBossID` method. This works for all variants of
   * `EntityType.RAGLICH` (919).
   */
  RAGLICH = 98,

  /**
   * Dogma does not have its own boss rooms; it appears in a normal room. The `Room.GetBossID`
   * function returns 0 inside of the Dogma Boss Room. However, the boss ID can be successfully
   * retrieved from the `Entity.GetBossID` method. This works for all variants of `EntityType.DOGMA`
   * (950).
   */
  DOGMA = 99,

  /**
   * The Beast does not have its own boss rooms; it appears in a crawl space. The `Room.GetBossID`
   * function returns 0 inside of The Beast Boss Room. However, the boss ID can be successfully
   * retrieved from the `Entity.GetBossID` method, but only if the variant is `BeastVariant.BEAST`
   * (0) or `BeastVariant.STALACTITE` (1).
   */
  BEAST = 100,

  HORNY_BOYS = 101,
  CLUTCH = 102,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.MINI_BOSS` (6).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 *
 * The enum is named `MinibossID` instead of` MinibossRoomSubType` in order to match the `BossID`
 * enum.
 *
 * Also see the `BossID` enum.
 */
export enum MinibossID {
  SLOTH = 0,
  LUST = 1,
  WRATH = 2,
  GLUTTONY = 3,
  GREED = 4,
  ENVY = 5,
  PRIDE = 6,
  SUPER_SLOTH = 7,
  SUPER_LUST = 8,
  SUPER_WRATH = 9,
  SUPER_GLUTTONY = 10,
  SUPER_GREED = 11,
  SUPER_ENVY = 12,
  SUPER_PRIDE = 13,
  ULTRA_PRIDE = 14,
  KRAMPUS = 15,
}

// For `StageID.SPECIAL_ROOMS` (0), `RoomType.SUPER_SECRET` (8), the sub-type corresponds to the
// `BackdropType` enum.

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.CURSE` (10).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum CurseRoomSubType {
  NORMAL = 0,
  VOODOO_HEAD = 1,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.CHALLENGE` (11).
 *
 * This matches the sub-type in the "00.special rooms.stb" file and elsewhere.
 */
export enum ChallengeRoomSubType {
  NORMAL = 0,
  BOSS = 1,
  NORMAL_WAVE = 10,
  BOSS_WAVE = 11,
  GREAT_GIDEON_WAVE = 12,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.LIBRARY` (12).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum LibrarySubType {
  LEVEL_1 = 0,
  LEVEL_2 = 1,
  LEVEL_3 = 2,
  LEVEL_4 = 3,
  LEVEL_5 = 4,
  EXTRA_GOOD = 10,
  EXTRA_BAD = 11,
  TAINTED_KEEPER_LEVEL_1 = 100,
  TAINTED_KEEPER_LEVEL_2 = 101,
  TAINTED_KEEPER_LEVEL_3 = 102,
  TAINTED_KEEPER_LEVEL_4 = 103,
  TAINTED_KEEPER_LEVEL_5 = 104,
  TAINTED_KEEPER_EXTRA_GOOD = 110,
  TAINTED_KEEPER_EXTRA_BAD = 111,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.DEVIL` (14).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum DevilRoomSubType {
  NORMAL = 0,
  NUMBER_SIX_TRINKET = 1,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.ANGEL` (15).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum AngelRoomSubType {
  NORMAL = 0,

  /** This is the kind of Angel Room that appears when players have The Stairway collectible. */
  SHOP = 1,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.DUNGEON` (16).
 *
 * This matches the sub-type in the "00.special rooms.stb" file and elsewhere.
 */
export enum DungeonSubType {
  NORMAL = 0,

  /** This is the room uncovered by throwing a Chaos Card at Great Gideon. */
  GIDEONS_GRAVE = 1,

  /** This is the room for the second phase of Rotgut. */
  ROTGUT_MAGGOT = 2,

  /** This is the room for the third phase of Rotgut. */
  ROTGUT_HEART = 3,

  BEAST_ROOM = 4,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.CLEAN_BEDROOM` (18).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum IsaacsRoomSubType {
  NORMAL = 0,
  GENESIS = 99,
}

/**
 * For `StageID.SPECIAL_ROOMS` (0), `RoomType.SECRET_EXIT` (27).
 *
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
export enum SecretExitSubType {
  DOWNPOUR = 1,
  MINES = 2,
  MAUSOLEUM = 3,
}

/**
 * For `StageID.DOWNPOUR` (27) and `StageID.DROSS` (28), `RoomType.DEFAULT` (1).
 *
 * This matches the sub-type in the "27.downpour.stb" and "28.dross.stb" files.
 */
export enum DownpourRoomSubType {
  NORMAL = 0,
  WHITE_FIRE = 1,
  MIRROR = 34,
}

/**
 * For `StageID.MINES` (29) and `StageID.ASHPIT` (30), `RoomType.DEFAULT` (1).
 *
 * This matches the sub-type in the "29.mines.stb" and "30.ashpit.stb" files.
 */
export enum MinesRoomSubType {
  NORMAL = 0,
  BUTTON_ROOM = 1,
  MINESHAFT_ENTRANCE = 10,
  MINESHAFT_LOBBY = 11,
  MINESHAFT_KNIFE_PIECE = 20,
  MINESHAFT_ROOM_PRE_CHASE = 30,
  MINESHAFT_ROOM_POST_CHASE = 31,
}

/**
 * For `StageID.HOME` (35), `RoomType.DEFAULT` (1).
 *
 * This matches the sub-type in the "35.home.stb" file.
 */
export enum HomeRoomSubType {
  ISAACS_BEDROOM = 0,
  HALLWAY = 1,
  MOMS_BEDROOM = 2,
  LIVING_ROOM = 3,
  CLOSET_RIGHT = 10,
  CLOSET_LEFT = 11,
  DEATH_CERTIFICATE_ENTRANCE = 33,
  DEATH_CERTIFICATE_ITEMS = 34,
}

/**
 * For `StageID.BACKWARDS` (36), `RoomType.DEFAULT` (1).
 *
 * This matches the sub-type in the "36.backwards.stb" file.
 */
export enum BackwardsRoomSubType {
  EXIT = 0,
  BASEMENT = 1,
  CAVES = 4,
  DEPTHS = 7,
  DOWNPOUR = 27,
  MINES = 29,
  MAUSOLEUM = 31,
}
