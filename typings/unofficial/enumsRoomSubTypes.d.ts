/**
 * For StageID.SPECIAL_ROOMS (0), RoomType.ROOM_BOSS (5)
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
declare const enum BossID {
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

  /** The Gate */
  MEGA_MAW_II = 46,

  MEGA_FATTY = 47,

  /** The Cage */
  MEGA_FATTY_II = 48,

  MEGA_GURDY = 49,
  DARK_ONE = 50,

  /** The Adversary */
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

/**
 * For StageID.SPECIAL_ROOMS (0), RoomType.ROOM_MINIBOSS (6)
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
declare const enum MinibossID {
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

/**
 * For StageID.SPECIAL_ROOMS (0), RoomType.ROOM_DEVIL (14)
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
declare const enum DevilRoomSubType {
  NORMAL = 0,
  NUMBER_SIX_TRINKET_ROOM = 1,
}

/**
 * For StageID.SPECIAL_ROOMS (0), RoomType.ROOM_ANGEL (15)
 * This matches the sub-type in the "00.special rooms.stb" file.
 */
declare const enum AngelRoomSubType {
  NORMAL = 0,
  SHOP = 1,
}

/**
 * For StageID.HOME (35)
 * This matches the sub-type in the "35.home.stb" file.
 */
declare const enum HomeRoomSubType {
  ISAACS_BEDROOM = 0,
  HALLWAY = 1,
  MOMS_BEDROOM = 2,
  LIVING_ROOM = 3,
  BEAST_ROOM = 4,
  CLOSET_RIGHT = 10,
  CLOSET_LEFT = 11,
  DEATH_CERTIFICATE_ENTRANCE = 33,
  DEATH_CERTIFICATE_ITEMS = 33,
}

/**
 * For StageID.BACKWARDS (36)
 * This matches the sub-type in the "36.backwards.stb" file.
 */
declare const enum BackwardsPathRoomSubType {
  EXIT = 0,
  BASEMENT = 1,
  CAVES = 4,
  DEPTHS = 7,
  DOWNPOUR = 27,
  MINES = 29,
  MAUSOLEUM = 31,
}
