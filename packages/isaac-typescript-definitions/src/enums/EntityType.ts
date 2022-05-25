export enum EntityType {
  NULL = 0,
  PLAYER = 1,
  TEAR = 2,
  FAMILIAR = 3,
  BOMB = 4,
  PICKUP = 5,
  SLOT = 6,
  LASER = 7,
  KNIFE = 8,
  PROJECTILE = 9,
  GAPER = 10,
  GUSHER = 11,
  HORF = 12,
  FLY = 13,
  POOTER = 14,
  CLOTTY = 15,
  MULLIGAN = 16,
  SHOPKEEPER = 17,
  ATTACK_FLY = 18,
  LARRY_JR = 19,
  MONSTRO = 20,
  MAGGOT = 21,
  HIVE = 22,
  CHARGER = 23,
  GLOBIN = 24,
  BOOM_FLY = 25,
  MAW = 26,
  HOST = 27,
  CHUB = 28,
  HOPPER = 29,
  BOIL = 30,
  SPITTY = 31,
  BRAIN = 32,
  FIREPLACE = 33,
  LEAPER = 34,
  MR_MAW = 35,
  GURDY = 36,
  BABY = 38,
  VIS = 39,
  GUTS = 40,
  KNIGHT = 41,
  GRIMACE = 42,
  MONSTRO_2 = 43,
  POKY = 44,
  MOM = 45,
  SLOTH = 46,
  LUST = 47,
  WRATH = 48,
  GLUTTONY = 49,
  GREED = 50,
  ENVY = 51,
  PRIDE = 52,
  DOPLE = 53,
  FLAMING_HOPPER = 54,
  LEECH = 55,
  LUMP = 56,
  MEMBRAIN = 57,
  PARA_BITE = 58,
  FRED = 59,
  EYE = 60,
  SUCKER = 61,
  PIN = 62,
  FAMINE = 63,
  PESTILENCE = 64,
  WAR = 65,
  DEATH = 66,
  DUKE = 67,
  PEEP = 68,
  LOKI = 69,
  FISTULA_BIG = 71,
  FISTULA_MEDIUM = 72,
  FISTULA_SMALL = 73,
  BLASTOCYST_BIG = 74,
  BLASTOCYST_MEDIUM = 75,
  BLASTOCYST_SMALL = 76,
  EMBRYO = 77,
  MOMS_HEART = 78,
  GEMINI = 79,
  MOTER = 80,
  FALLEN = 81,
  HEADLESS_HORSEMAN = 82,
  HORSEMAN_HEAD = 83,
  SATAN = 84,
  SPIDER = 85,
  KEEPER = 86,
  GURGLE = 87,
  WALKING_BOIL = 88,
  BUTTLICKER = 89,
  HANGER = 90,
  SWARMER = 91,
  HEART = 92,
  MASK = 93,
  BIG_SPIDER = 94,
  ETERNAL_FLY = 96,
  MASK_OF_INFAMY = 97,
  HEART_OF_INFAMY = 98,
  GURDY_JR = 99,
  WIDOW = 100,
  DADDY_LONG_LEGS = 101,
  ISAAC = 102,

  // ---------------
  // Rebirth Enemies
  // ---------------

  STONE_EYE = 201,
  CONSTANT_STONE_SHOOTER = 202,
  BRIMSTONE_HEAD = 203,
  MOBILE_HOST = 204,
  NEST = 205,
  BABY_LONG_LEGS = 206,
  CRAZY_LONG_LEGS = 207,
  FATTY = 208,
  FAT_SACK = 209,
  BLUBBER = 210,
  HALF_SACK = 211,
  DEATHS_HEAD = 212,
  MOMS_HAND = 213,
  FLY_L2 = 214, // eslint-disable-line isaacscript/enum-member-number-separation
  SPIDER_L2 = 215, // eslint-disable-line isaacscript/enum-member-number-separation
  SWINGER = 216,
  DIP = 217,
  WALL_HUGGER = 218,
  WIZOOB = 219,
  SQUIRT = 220,
  COD_WORM = 221,
  RING_OF_FLIES = 222,
  DINGA = 223,
  OOB = 224,
  BLACK_MAW = 225,
  SKINNY = 226,
  BONY = 227,
  HOMUNCULUS = 228,
  TUMOR = 229,
  CAMILLO_JR = 230,
  NERVE_ENDING = 231,

  // SKINBALL = 232, // This is a non-existent entity.

  // MOM_HEAD = 233, // This is a non-existent entity.

  ONE_TOOTH = 234,
  GAPING_MAW = 235,
  BROKEN_GAPING_MAW = 236,
  GURGLING = 237,
  SPLASHER = 238,
  GRUB = 239,
  WALL_CREEP = 240,
  RAGE_CREEP = 241,
  BLIND_CREEP = 242,
  CONJOINED_SPITTY = 243,
  ROUND_WORM = 244,
  POOP = 245,
  RAGLING = 246,
  FLESH_MOBILE_HOST = 247,
  PSY_HORF = 248,
  FULL_FLY = 249,
  TICKING_SPIDER = 250,
  BEGOTTEN = 251,
  NULLS = 252,
  PSY_TUMOR = 253,
  FLOATING_KNIGHT = 254,
  NIGHT_CRAWLER = 255,

  // ------------------
  // Afterbirth Enemies
  // ------------------

  DART_FLY = 256,
  CONJOINED_FATTY = 257,
  FAT_BAT = 258,
  IMP = 259,

  // --------------
  // Rebirth Bosses
  // --------------

  THE_HAUNT = 260,
  DINGLE = 261,
  MEGA_MAW = 262,
  GATE = 263,
  MEGA_FATTY = 264,
  CAGE = 265,
  MAMA_GURDY = 266,
  DARK_ONE = 267,
  ADVERSARY = 268,
  POLYCEPHALUS = 269,
  MR_FRED = 270,
  URIEL = 271,
  GABRIEL = 272,
  THE_LAMB = 273,
  MEGA_SATAN = 274,
  MEGA_SATAN_2 = 275,

  // -------------------
  // Afterbirth+ Enemies
  // -------------------

  ROUNDY = 276,
  BLACK_BONY = 277,
  BLACK_GLOBIN = 278,
  BLACK_GLOBIN_HEAD = 279,
  BLACK_GLOBIN_BODY = 280,
  SWARM = 281,
  MEGA_CLOTTY = 282,
  BONE_KNIGHT = 283,
  CYCLOPIA = 284,
  RED_GHOST = 285,
  FLESH_DEATHS_HEAD = 286,
  MOMS_DEAD_HAND = 287,
  DUKIE = 288,
  ULCER = 289,
  MEATBALL = 290,
  PITFALL = 291,
  MOVABLE_TNT = 292,
  ULTRA_COIN = 293,
  ULTRA_DOOR = 294,
  CORN_MINE = 295,
  HUSH_FLY = 296,
  HUSH_GAPER = 297,
  HUSH_BOIL = 298,
  GREED_GAPER = 299,
  MUSHROOM = 300,
  POISON_MIND = 301,
  STONEY = 302,
  BLISTER = 303,
  THE_THING = 304,
  MINISTRO = 305,
  PORTAL = 306,

  // --------------------
  // Booster Pack Enemies
  // --------------------

  TAR_BOY = 307,
  FISTULOID = 308,
  GUSH = 309,
  LEPER = 310,
  MR_MINE = 311,

  // -----------------
  // Afterbirth Bosses
  // -----------------

  STAIN = 401,
  BROWNIE = 402,
  FORSAKEN = 403,
  LITTLE_HORN = 404,
  RAG_MAN = 405,
  ULTRA_GREED = 406,
  HUSH = 407,
  HUSH_SKINLESS = 408,
  RAG_MEGA = 409,
  SISTERS_VIS = 410,
  BIG_HORN = 411,
  DELIRIUM = 412,
  MATRIARCH = 413,

  // ------------------
  // Repentance Enemies
  // ------------------

  // BONE_WORM = 801, // This is a non-existent entity.

  BLOOD_PUPPY = 802,
  QUAKE_GRIMACE = 804,
  BISHOP = 805,
  BUBBLES = 806,
  WRAITH = 807,
  WILLO = 808,
  BOMB_GRIMACE = 809,
  SMALL_LEECH = 810,
  DEEP_GAPER = 811,
  SUB_HORF = 812,
  BLURB = 813,
  STRIDER = 814,
  FISSURE = 815,
  POLTY = 816,
  PREY = 817,
  ROCK_SPIDER = 818,
  FLY_BOMB = 819,
  DANNY = 820,
  BLASTER = 821,
  BOUNCER = 822,
  QUAKEY = 823,
  GYRO = 824,
  FIRE_WORM = 825,
  HARDY = 826,
  FACELESS = 827,
  NECRO = 828,
  MOLE = 829,
  BIG_BONY = 830,
  GUTTED_FATTY = 831,
  EXORCIST = 832,
  CANDLER = 833,
  WHIPPER = 834,
  PEEPER_FATTY = 835,
  VIS_VERSA = 836,
  HENRY = 837,
  WILLO_L2 = 838, // eslint-disable-line isaacscript/enum-member-number-separation
  PON = 840,
  REVENANT = 841,
  BOMBGAGGER = 844,
  GAPER_L2 = 850, // eslint-disable-line isaacscript/enum-member-number-separation
  TWITCHY = 851,
  SPIKEBALL = 852,
  SMALL_MAGGOT = 853,
  ADULT_LEECH = 854,
  CHARGER_L2 = 855, // eslint-disable-line isaacscript/enum-member-number-separation
  GASBAG = 856,
  COHORT = 857,
  FLOATING_HOST = 859,
  UNBORN = 860,
  PUSTULE = 861,
  CYST = 862,
  MORNINGSTAR = 863,
  MOCKULUS = 864,
  EVIS = 865,
  DARK_ESAU = 866,
  MOTHERS_SHADOW = 867,
  ARMY_FLY = 868,
  MIGRAINE = 869,
  DRIP = 870,
  SPLURT = 871,
  CLOGGY = 872,
  FLY_TRAP = 873,
  GAS_DWARF = 874,
  POOT_MINE = 875,
  DUMP = 876,
  GRUDGE = 877,
  BUTT_SLICKER = 878,
  BLOATY = 879,
  FLESH_MAIDEN = 880,
  NEEDLE = 881,
  DUST = 882,
  BABY_BEGOTTEN = 883,
  SWARM_SPIDER = 884,
  CULTIST = 885,
  VIS_FATTY = 886,
  DUSTY_DEATHS_HEAD = 887,
  SHADY = 888,
  CLICKETY_CLACK = 889,
  MAZE_ROAMER = 890,
  GOAT = 891,
  POOFER = 892,
  BALL_AND_CHAIN = 893,
  REAP_CREEP = 900,
  LIL_BLUB = 901,
  RAINMAKER = 902,
  VISAGE = 903,
  SIREN = 904,
  HERETIC = 905,
  HORNFEL = 906,
  GIDEON = 907,
  BABY_PLUM = 908,
  SCOURGE = 909,
  CHIMERA = 910,
  ROTGUT = 911,
  MOTHER = 912,
  MIN_MIN = 913,
  CLOG = 914,
  SINGE = 915,
  BUMBINO = 916,
  COLOSTOMIA = 917,
  TURDLET = 918,
  RAGLICH = 919,
  HORNY_BOYS = 920,
  CLUTCH = 921,

  // CADAVRA = 922, // This is a non-existent entity.

  DOGMA = 950,
  BEAST = 951,
  GENERIC_PROP = 960,
  FROZEN_ENEMY = 963,
  DUMMY = 964,
  MINECART = 965,
  SIREN_HELPER = 966,
  HORNFEL_DOOR = 967,

  // TRIGGER_OUTPUT = 969, // This is a non-existent entity.

  // ENVIRONMENT = 970, // This is a non-existent entity.

  // ---------------
  // Special Effects
  // ---------------

  EFFECT = 1000,
  TEXT = 9001,
}
