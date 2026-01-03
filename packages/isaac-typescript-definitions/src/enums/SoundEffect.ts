export enum SoundEffect {
  NULL = 0,
  ONE_UP = 1,
  BIRD_FLAP = 2,
  BLOBBY_WIGGLE = 3,
  INSECT_SWARM_LOOP = 4,

  /** For Brimstone. */
  BLOOD_LASER = 5,

  /** For Brimstone. */
  BLOOD_LASER_SMALL = 6,

  /** For Brimstone. */
  BLOOD_LASER_LARGE = 7,

  BOOK_PAGE_TURN_12 = 8,
  BOSS_BUG_HISS = 9,
  BLOOD_LASER_LARGER = 10,
  BOSS_GURGLE_ROAR = 11,
  BOSS_LITE_GURGLE = 12,
  BOSS_LITE_HISS = 13,
  BOSS_LITE_ROAR = 14,
  BOSS_LITE_SLOPPY_ROAR = 15,
  BOSS_SPIT_BLOB_BARF = 16,
  PAPER_IN = 17,
  PAPER_OUT = 18,
  CHEST_DROP = 21,
  CHEST_OPEN = 22,
  CHOIR_UNLOCK = 23,

  /** Used by various slot machines. */
  COIN_SLOT = 24,

  CUTE_GRUNT = 25,
  DEATH_BURST_BONE = 27,
  DEATH_BURST_LARGE = 28,
  DEATH_REVERSE = 29,
  DEATH_BURST_SMALL = 30,
  DEATH_CARD = 33,
  DEVIL_CARD = 34,

  /** When entering an uncleared room. */
  DOOR_HEAVY_CLOSE = 35,

  /** When clearing a room. */
  DOOR_HEAVY_OPEN = 36,

  FART = 37,
  FETUS_JUMP = 38,

  /** Placing a bomb. */
  FETUS_LAND = 40,

  FIRE_DEATH_HISS = 43,
  FLOATY_BABY_ROAR = 44,
  COIN_INSERT = 45,
  METAL_DOOR_CLOSE = 46,
  METAL_DOOR_OPEN = 47,

  /** Used by Monstro. */
  FOREST_BOSS_STOMPS = 48,

  SCYTHE_BREAK = 49,
  STONE_WALKER = 50,
  GAS_CAN_POUR = 51,
  HELL_BOSS_GROUND_POUND = 52,

  /** Used by Holy Water. */
  GLASS_BREAK = 53,

  /** When picking up a soul heart. */
  HOLY = 54,

  ISAAC_HURT_GRUNT = 55,
  CHILD_HAPPY_ROAR_SHORT = 56,
  CHILD_ANGRY_ROAR = 57,
  KEY_PICKUP_GAUNTLET = 58,
  KEY_DROP = 59,
  BABY_HURT = 60,
  MAGGOT_BURST_OUT = 64,
  MAGGOT_ENTER_GROUND = 66,

  /** Heart pickup drop. */
  MEAT_FEET_SLOW = 68,

  MEAT_IMPACTS = 69,
  MEAT_IMPACTS_OLD = 70,
  MEAT_JUMPS = 72,

  /** Used by Backstabber. */
  MEATY_DEATHS = 77,

  POT_BREAK_2 = 78,
  MUSHROOM_POOF_2 = 79,
  BLACK_POOF = 80,
  STATIC = 81,

  /** Used by Clicker. */
  MOM_VOX_DEATH = 82,

  MOM_VOX_EVIL_LAUGH = 84,
  MOM_VOX_FILTERED_DEATH_1 = 85,
  MOM_VOX_FILTERED_EVIL_LAUGH = 86,
  MOM_VOX_FILTERED_HURT = 87,
  MOM_VOX_FILTERED_ISAAC = 90,
  MOM_VOX_GRUNT = 93,
  MOM_VOX_HURT = 97,
  MOM_VOX_ISAAC = 101,
  MONSTER_GRUNT_0 = 104,
  MONSTER_GRUNT_1 = 106,
  MONSTER_GRUNT_2 = 108,
  MONSTER_GRUNT_4 = 112,
  MONSTER_GRUNT_5 = 114,
  MONSTER_ROAR_0 = 115,
  MONSTER_ROAR_1 = 116,
  MONSTER_ROAR_2 = 117,
  MONSTER_ROAR_3 = 118,
  MONSTER_YELL_A = 119,
  MONSTER_YELL_B = 122,

  /** When picking up a new collectible. */
  POWER_UP_1 = 128,

  /** When picking up a new collectible. */
  POWER_UP_2 = 129,

  /** When picking up a new collectible. */
  POWER_UP_3 = 130,

  POWER_UP_SPEWER = 132,
  RED_LIGHTNING_ZAP = 133,
  RED_LIGHTNING_ZAP_WEAK = 134,
  RED_LIGHTNING_ZAP_STRONG = 135,
  RED_LIGHTNING_ZAP_BURST = 136,
  ROCK_CRUMBLE = 137,
  POT_BREAK = 138,
  MUSHROOM_POOF = 139,
  ROCKET_BLAST_DEATH = 141,
  SMB_LARGE_CHEWS_4 = 142,
  SCARED_WHIMPER = 143,

  /** Used by the Horf enemy. */
  SHAKEY_KID_ROAR = 146,

  SINK_DRAIN_GURGLE = 149,
  TEAR_IMPACTS = 150,
  TEARS_FIRE = 153,
  UNLOCK_DOOR = 156,
  VAMP_GULP = 157,
  WHEEZY_COUGH = 158,
  SPIDER_COUGH = 159,
  PORTAL_OPEN = 160,
  PORTAL_LOOP = 161,
  PORTAL_SPAWN = 162,
  TAR_LOOP = 163,
  ZOMBIE_WALKER_KID = 165,
  ANIMAL_SQUISH = 166,
  ANGRY_GURGLE = 167,
  BAND_AID_PICK_UP = 169,
  BATTERY_CHARGE = 170,

  /** Used when an active gains a single charge. */
  BEEP = 171,

  LIGHT_BOLT = 172,
  LIGHT_BOLT_CHARGE = 173,
  BLOOD_BANK_TOUCHED = 174,
  PINKING_SHEARS = 175,
  BLOOD_SHOOT = 178,
  BOIL_HATCH = 181,

  /** When a bomb explodes. */
  BOSS_1_EXPLOSIONS = 182,

  EXPLOSION_WEAK = 183,
  EXPLOSION_STRONG = 184,
  BOSS_2_BUBBLES = 185,
  EXPLOSION_DEBRIS = 186,
  BOSS_2_INTRO_ERROR_BUZZ = 187,

  /** When entering a boss room. */
  CASTLE_PORTCULLIS = 190,

  CHARACTER_SELECT_LEFT = 194,
  CHARACTER_SELECT_RIGHT = 195,

  /** Used by I Found Pills. */
  DERP = 197,

  DIME_DROP = 198,
  DIME_PICKUP = 199,
  LUCKY_PICKUP = 200,

  /** When collecting a bomb pickup. */
  FETUS_FEET = 201,

  GOLDEN_KEY = 204,
  GOO_ATTACH = 205,
  GOO_DEATH = 207,
  HAND_LASERS = 211,
  HEART_IN = 212,
  HEART_OUT = 213,
  HELL_PORTAL_1 = 214,
  HELL_PORTAL_2 = 215,
  ISAAC_DIES = 217,
  ITEM_RECHARGE = 218,
  KISS_LIPS = 219,
  LEECH = 221,
  MAGGOT_CHARGE = 224,
  MEAT_HEAD_SHOOT = 226,
  METAL_BLOCK_BREAK = 229,
  NICKEL_DROP = 231,
  NICKEL_PICKUP = 232,
  PENNY_DROP = 233,
  PENNY_PICKUP = 234,

  /** Used by Peep when he spawns an eye and by The Peeper. */
  PLOP = 237,

  SATAN_APPEAR = 238,
  SATAN_BLAST = 239,
  SATAN_CHARGE_UP = 240,
  SATAN_GROW = 241,
  SATAN_HURT = 242,
  SATAN_RISE_UP = 243,
  SATAN_SPIT = 245,
  SATAN_STOMP = 246,
  SCAMPER = 249,

  /** Also used by Forgotten's bone swing. */
  SHELL_GAME = 252,

  SLOT_SPAWN = 255,
  SPLATTER = 258,

  /** When a fireplace is extinguished. */
  STEAM_HALF_SEC = 261,

  STONE_SHOOT = 262,
  WEIRD_WORM_SPIT = 263,
  SUMMON_SOUND = 265,

  /** When picking up an eternal heart. */
  SUPER_HOLY = 266,

  /** Used by the `EntityPlayer.AnimateSad` method. */
  THUMBS_DOWN = 267,

  /** Used by the `EntityPlayer.AnimateHappy` method. */
  THUMBS_UP = 268,

  FIRE_BURN = 269,

  /** Used by rainbow poop. */
  HAPPY_RAINBOW = 270,

  LASER_RING = 271,
  LASER_RING_WEAK = 272,
  LASER_RING_STRONG = 273,
  CASH_REGISTER = 274,
  ANGEL_WING = 275,
  ANGEL_BEAM = 276,
  HOLY_MANTLE = 277,
  MEGA_BLAST_START = 278,
  MEGA_BLAST_LOOP = 279,
  MEGA_BLAST_END = 280,
  BLOOD_LASER_LOOP = 281,
  MENU_SCROLL = 282,
  MENU_NOTE_APPEAR = 283,
  MENU_NOTE_HIDE = 284,
  MENU_CHARACTER_SELECT = 285,

  /** When an enemy spawns, usually connected to the "Appear" animation. */
  SUMMON_POOF = 286,

  BOO_MAD = 300,
  FART_GURG = 301,
  FAT_GRUNT = 302,
  FAT_WIGGLE = 303,
  FIRE_RUSH = 304,
  GHOST_ROAR = 305,
  GHOST_SHOOT = 306,
  GROWL = 307,
  GURG_BARF = 308,
  INHALE = 309,
  LOW_INHALE = 310,
  MEGA_PUKE = 311,
  MOUTH_FULL = 312,
  MULTI_SCREAM = 313,
  SKIN_PULL = 314,
  WHISTLE = 315,
  DEVIL_ROOM_DEAL = 316,
  SPIDER_SPIT_ROAR = 317,
  WORM_SPIT = 318,
  LITTLE_SPIT = 319,
  SATAN_ROOM_APPEAR = 320,
  HEARTBEAT = 321,
  HEARTBEAT_FASTER = 322,
  HEARTBEAT_FASTEST = 323,
  FORTY_EIGHT_HOUR_ENERGY = 324,
  ALGIZ = 325,
  AMNESIA = 326,
  ANZUS = 327,
  BAD_GAS = 328,
  BAD_TRIP = 329,
  BALLS_OF_STEEL = 330,
  BERKANO = 331,
  BOMBS_ARE_KEY = 332,
  CARD_AGAINST_HUMANITY = 333,
  CHAOS_CARD = 334,
  CREDIT_CARD = 335,
  DAGAZ = 336,
  DEATH = 337,
  EHWAZ = 338,
  EXPLOSIVE_DIARRHEA = 339,
  FULL_HP = 340,
  HAGALAZ = 341,
  HP_DOWN = 342,
  HP_UP = 343,
  HEMATEMESIS = 344,
  I_FOUND_PILLS = 345,
  JERA = 346,
  JOKER = 347,
  JUDGEMENT = 348,
  JUSTICE = 349,
  LEMON_PARTY = 350,
  LUCK_DOWN = 351,
  LUCK_UP = 352,
  PARALYSIS = 353,
  PERTHRO = 354,
  PHEROMONES = 355,
  PRETTY_FLY = 356,
  PUBERTY = 357,
  R_U_A_WIZARD = 358,
  RANGE_DOWN = 359,
  RANGE_UP = 360,
  RULES_CARD = 361,
  I_CAN_SEE_FOREVER = 362,
  SPEED_DOWN = 363,
  SPEED_UP = 364,
  STRENGTH = 365,
  SUICIDE_KING = 366,
  TEARS_DOWN = 367,
  TEARS_UP = 368,
  TELEPILLS = 369,
  TEMPERANCE = 370,
  CHARIOT = 371,
  DEVIL = 372,
  EMPEROR = 373,
  EMPRESS = 374,
  FOOL = 375,
  HANGED_MAN = 376,
  HERMIT = 377,
  HIEROPHANT = 378,
  HIGH_PRIESTESS = 379,
  LOVERS = 380,
  MAGICIAN = 381,
  MOON = 382,
  STARS = 383,
  SUN = 384,
  TOWER = 385,
  WORLD = 386,
  TWO_OF_CLUBS = 387,
  TWO_OF_DIAMONDS = 388,
  TWO_OF_HEARTS = 389,
  TWO_OF_SPADES = 390,
  WHEEL_OF_FORTUNE = 391,
  RAGMAN_1 = 392,
  RAGMAN_2 = 393,
  RAGMAN_3 = 394,
  RAGMAN_4 = 395,
  FLUSH = 396,
  WATER_DROP = 397,
  WET_FEET = 398,
  ADDICTED = 399,
  DICE_SHARD = 400,
  EMERGENCY = 401,

  /** Corresponds to `PillEffect.INFESTED_EXCLAMATION` (34). */
  INFESTED_EXCLAMATION = 402,

  /** Corresponds to `PillEffect.INFESTED_QUESTION` (35). */
  INFESTED_QUESTION = 403,

  GET_OUT_OF_JAIL_CARD = 404,
  LARGER = 405,
  PERCS = 406,
  POWER_PILL = 407,

  /** Corresponds to `CardType.QUESTION_MARK` (48). */
  QUESTION_MARK = 408,

  RELAX = 409,
  RETRO = 410,
  SMALL = 411,

  /** Corresponds to `PillEffect.QUESTION_MARKS` (31). */
  QUESTION_MARKS = 412,

  DANGLE_WHISTLE = 413,
  LITTLE_HORN_COUGH = 414,
  LITTLE_HORN_GRUNT_1 = 415,
  LITTLE_HORN_GRUNT_2 = 416,
  FORSAKEN_LAUGH = 417,
  FORSAKEN_SCREAM = 418,
  STAIN_BURST = 419,
  BROWNIE_LAUGH = 420,
  HUSH_ROAR = 421,
  HUSH_GROWL = 422,
  HUSH_LOW_ROAR = 423,
  FRAIL_CHARGE = 424,
  HUSH_CHARGE = 425,
  MAW_OF_VOID = 426,
  ULTRA_GREED_COIN_DESTROY = 427,
  ULTRA_GREED_COINS_FALLING = 428,
  ULTRA_GREED_DEATH_SCREAM = 429,
  ULTRA_GREED_TURN_GOLD_1 = 430,
  ULTRA_GREED_TURN_GOLD_2 = 431,
  ULTRA_GREED_ROAR_1 = 432,
  ULTRA_GREED_ROAR_2 = 433,
  ULTRA_GREED_SPIT = 434,
  ULTRA_GREED_PULL_SLOT = 435,
  ULTRA_GREED_SLOT_SPIN_LOOP = 436,
  ULTRA_GREED_SLOT_STOP = 437,
  ULTRA_GREED_SLOT_WIN_LOOP_END = 438,
  ULTRA_GREED_SLOT_WIN_LOOP = 439,
  ULTRA_GREED_SPINNING = 440,

  /** Used by Dog Tooth. */
  DOG_BARK = 441,

  /** Used by Dog Tooth. */
  DOG_HOWL = 442,

  X_LAX = 443,
  WRONG = 444,
  VURP = 445,
  SUNSHINE = 446,
  ACE_OF_SPADES = 447,
  HORF = 448,
  HOLY_CARD = 449,
  ACE_OF_HEARTS = 450,
  GULP = 451,
  FRIENDS = 452,
  EXCITED = 453,
  DROWSY = 454,
  ACE_OF_DIAMONDS = 455,
  ACE_OF_CLUBS = 456,
  BLACK_RUNE = 457,
  PING_PONG = 458,
  SPEWER = 459,
  MOM_FOOTSTEPS = 460,
  BONE_HEART = 461,
  BONE_SNAP = 462,
  SHOVEL_DROP = 463,
  SHOVEL_DIG = 464,
  GOLD_HEART = 465,
  GOLD_HEART_DROP = 466,
  BONE_DROP = 467,

  /** When picking up a black heart. */
  UNHOLY = 468,

  BUTTON_PRESS = 469,
  GOLDEN_BOMB = 470,
  CANDLE_LIGHT = 471,
  THUNDER = 472,
  WATER_FLOW_LOOP = 473,
  BOSS_2_DIVE = 474,
  BOSS_2_INTRO_PIPES_TURNON = 475,
  WATER_FLOW_LARGE = 476,
  DEMON_HIT = 477,
  PUNCH = 478,
  FLUTE = 479,
  LAVA_LOOP = 480,
  WOOD_PLANK_BREAK = 481,
  BULLET_SHOT = 482,
  FLAME_BURST = 483,
  INFLATE = 484,
  CLAP = 485,
  BOSS_2_INTRO_WATER_EXPLOSION = 486,
  STONE_IMPACT = 487,
  BOSS_2_WATER_THRASHING = 488,
  FART_MEGA = 489,
  MATCHSTICK = 490,
  FORTUNE_COOKIE = 491,
  BULB_FLASH = 492,

  /** When getting hit by a Bulb. */
  BATTERY_DISCHARGE = 493,

  WHIP = 494,
  WHIP_HIT = 495,
  FREEZE = 496,
  ROTTEN_HEART = 497,
  FREEZE_SHATTER = 498,
  BONE_BOUNCE = 499,
  BONE_BREAK = 500,
  BISHOP_HIT = 501,
  CHAIN_LOOP = 503,
  CHAIN_BREAK = 504,
  MINECART_LOOP = 505,
  TOOTH_AND_NAIL = 506,
  TOOTH_AND_NAIL_TICK = 507,
  STATIC_BUILDUP = 508,
  BIG_LEECH = 510,
  REVERSE_EXPLOSION = 511,
  REVERSE_FOOL = 512,
  REVERSE_MAGICIAN = 513,
  REVERSE_HIGH_PRIESTESS = 514,
  REVERSE_EMPRESS = 515,
  REVERSE_EMPEROR = 516,
  REVERSE_HIEROPHANT = 517,
  REVERSE_LOVERS = 518,
  REVERSE_CHARIOT = 519,
  REVERSE_JUSTICE = 520,
  REVERSE_HERMIT = 521,
  REVERSE_WHEEL_OF_FORTUNE = 522,
  REVERSE_STRENGTH = 523,
  REVERSE_HANGED_MAN = 524,
  REVERSE_DEATH = 525,
  REVERSE_TEMPERANCE = 526,
  REVERSE_DEVIL = 527,
  REVERSE_TOWER = 528,
  REVERSE_STARS = 529,
  REVERSE_MOON = 530,
  REVERSE_SUN = 531,
  REVERSE_JUDGEMENT = 532,
  REVERSE_WORLD = 533,
  FLAMETHROWER_START = 534,
  FLAMETHROWER_LOOP = 535,
  FLAMETHROWER_END = 536,
  ROCKET_LAUNCH = 537,
  SWORD_SPIN = 538,
  BABY_BRIM = 539,
  KNIFE_PULL = 540,
  DOGMA_APPEAR_SCREAM = 541,
  DOGMA_DEATH = 542,
  DOGMA_BLACK_HOLE_CHARGE = 543,
  DOGMA_BLACK_HOLE_SHOOT = 544,
  DOGMA_BLACK_HOLE_OPEN = 545,
  DOGMA_BLACK_HOLE_CLOSE = 546,
  DOGMA_BRIMSTONE_CHARGE = 547,
  DOGMA_BRIMSTONE_SHOOT = 548,
  DOGMA_GODHEAD = 549,
  DOGMA_JACOBS = 550,
  DOGMA_JACOBS_ZAP = 551,
  DOGMA_SCREAM = 552,
  DOGMA_PREACHER = 553,
  DOGMA_RING_START = 554,
  DOGMA_RING_LOOP = 555,
  DOGMA_FEATHER_SPRAY = 556,
  DOGMA_JACOBS_DOT = 557,
  DOGMA_BLACK_HOLE_LOOP = 558,
  DOGMA_ANGEL_TRANSFORM = 559,
  DOGMA_ANGEL_TRANSFORM_END = 560,
  DOGMA_LIGHT_APPEAR = 561,
  DOGMA_LIGHT_BALL_THROW = 562,
  DOGMA_LIGHT_RAY_CHARGE = 563,
  DOGMA_LIGHT_RAY_FIRE = 564,
  DOGMA_SPIN_ATTACK = 565,
  DOGMA_WING_FLAP = 566,
  DOGMA_TV_BREAK = 567,
  DIVINE_INTERVENTION = 568,
  MENU_FLIP_LIGHT = 569,
  MENU_FLIP_DARK = 570,
  MENU_RIP = 571,
  URN_OPEN = 572,
  URN_CLOSE = 573,
  RECALL = 574,
  LARYNX_SCREAM_LO = 575,
  LARYNX_SCREAM_MED = 576,
  LARYNX_SCREAM_HI = 577,
  GROUND_TREMOR = 578,
  SOUL_PICKUP = 579,
  BALL_AND_CHAIN_LOOP = 580,
  BALL_AND_CHAIN_HIT = 581,
  LAZARUS_FLIP_DEAD = 582,
  LAZARUS_FLIP_ALIVE = 583,
  RECALL_FINISH = 584,
  ROCKET_LAUNCH_SHORT = 585,
  ROCKET_LAUNCH_TINY = 586,
  ROCKET_EXPLOSION = 587,
  JELLY_BOUNCE = 588,
  POOP_LASER = 589,
  POISON_WARN = 590,
  POISON_HURT = 591,
  BERSERK_START = 592,
  BERSERK_TICK = 593,
  BERSERK_END = 594,
  EDEN_GLITCH = 595,
  RAILROAD_TRACK_RAISE = 596,
  RAILROAD_TRACK_RAISE_FAR = 597,
  MOM_AND_DAD_1 = 598,
  MOM_AND_DAD_2 = 599,
  MOM_AND_DAD_3 = 600,
  MOM_AND_DAD_4 = 601,
  THUMBS_UP_AMPLIFIED = 602,
  THUMBS_DOWN_AMPLIFIED = 603,
  POWER_UP_SPEWER_AMPLIFIED = 604,
  POOP_ITEM_THROW = 605,
  POOP_ITEM_STORE = 606,
  POOP_ITEM_HOLD = 607,
  MIRROR_ENTER = 608,
  MIRROR_EXIT = 609,
  MIRROR_BREAK = 610,
  ANIMA_TRAP = 611,
  ANIMA_RATTLE = 612,
  ANIMA_BREAK = 613,
  VAMP_DOUBLE = 614,
  FLASHBACK = 615,
  DARK_ESAU_OPEN = 616,
  DARK_ESAU_DEATH_OPEN = 617,
  MOTHER_DEATH_1 = 618,
  MOTHER_DEATH_2 = 619,
  MOTHER_FIST_POUND_1 = 620,
  MOTHER_FIST_POUND_2 = 621,
  MOTHER_FIST_POUND_3 = 622,
  MOTHER_FISTULA = 623,
  MOTHER_APPEAR_1 = 624,
  MOTHER_APPEAR_2 = 625,
  MOTHER_KNIFE_START = 626,
  MOTHER_KNIFE_THROW = 627,
  MOTHER_SUMMON_ISAACS_START = 628,
  MOTHER_SUMMON_ISAACS_END = 629,
  MOTHER_HAND_BOIL_START = 630,
  MOTHER_GRUNT_1 = 631,
  MOTHER_GRUNT_5 = 632,
  MOTHER_GRUNT_6 = 633,
  MOTHER_GRUNT_7 = 634,
  MOTHER_LAUGH = 635,
  MOTHER_SPIN_START = 636,
  MOTHER_WALL_SHOT_START = 637,
  MOTHER_MISC = 638,
  MOTHER_SHOOT = 639,
  MOTHER_SUCTION = 640,
  MOTHER_ISAAC_RISE = 641,
  MOTHER_ISAAC_HIT = 642,
  MOTHER_WRIST_SWELL = 643,
  MOTHER_WRIST_EXPLODE = 644,
  MOTHER_DEATH_MELT = 645,
  MOTHER_ANGER_SHAKE = 646,
  MOTHER_CHARGE_1 = 647,
  MOTHER_CHARGE_2 = 648,
  MOTHER_LAND_SMASH = 649,
  ISAAC_ROAR = 650,
  FAMINE_APPEAR = 651,
  FAMINE_DEATH_1 = 652,
  FAMINE_DEATH_2 = 653,
  FAMINE_DASH_START = 654,
  FAMINE_DASH = 655,
  FAMINE_SHOOT = 656,
  FAMINE_BURST = 657,
  FAMINE_GURGLE = 658,
  PESTILENCE_MAGGOT_START = 659,
  PESTILENCE_MAGGOT_SHOOT_1 = 660,
  PESTILENCE_MAGGOT_RETURN = 661,
  PESTILENCE_BODY_SHOOT = 662,
  PESTILENCE_HEAD_DEATH = 663,
  PESTILENCE_DEATH = 664,
  PESTILENCE_COUGH = 665,
  PESTILENCE_BARF = 666,
  PESTILENCE_APPEAR = 667,
  PESTILENCE_HEAD_EXPLODE = 668,
  PESTILENCE_MAGGOT_ENTER = 669,
  PESTILENCE_MAGGOT_POP_OUT = 670,
  PESTILENCE_MAGGOT_SHOOT_2 = 671,
  PESTILENCE_NECK_PUKE = 672,
  PESTILENCE_PUKE_START = 673,
  WAR_APPEAR = 674,
  WAR_APPEAR_LAVA = 675,
  WAR_BOMB_TOSS = 676,
  WAR_DASH_START = 677,
  WAR_DASH = 678,
  WAR_HORSE_DEATH = 679,
  WAR_DEATH = 680,
  WAR_FIRE_SCREAM = 681,
  WAR_GRAB_PLAYER = 682,
  WAR_BOMB_HOLD = 683,
  WAR_BOMB_PULL_OUT = 684,
  WAR_CHASE = 685,
  WAR_BOMB_TICK = 686,
  WAR_FLAME = 687,
  WAR_LAVA_SPLASH = 688,
  WAR_LAVA_DASH = 689,
  DEATH_DIES = 690,
  DEATH_DESTROY_SKULLS = 691,
  DEATH_GROWL = 692,
  DEATH_SWIPE_START = 693,
  DEATH_SWIPE = 694,
  DEATH_SUMMON_SCYTHES = 695,
  DEATH_SUMMON_SKULLS = 696,
  BEAST_DEATH = 697,
  BEAST_LASER = 698,
  BEAST_BACKGROUND_DIVE = 699,
  BEAST_FIRE_RING = 700,
  BEAST_GHOST_DASH = 701,
  BEAST_GHOST_RISE = 702,
  BEAST_LAVA_BALL_SPLASH = 703,
  BEAST_LAVA_RISE = 704,
  BEAST_SUCTION_LOOP = 705,
  BEAST_FIRE_BARF = 706,
  BEAST_GHOST_ROAR = 707,
  BEAST_INTRO_SCREAM = 708,
  BEAST_SUCTION_END = 709,
  BEAST_SUCTION_START = 710,
  BEAST_SPIT = 711,
  BEAST_SURFACE_GROWL = 712,
  BEAST_SWITCH_SIDES = 713,
  MOTHER_SHADOW_APPEAR = 714,
  MOTHER_SHADOW_CHARGE_UP = 715,
  MOTHER_SHADOW_DASH = 716,
  MOTHER_SHADOW_END = 717,
  MOTHER_SHADOW_INTRO = 718,
  BUMBINO_DEATH = 719,
  BUMBINO_DIZZY = 720,
  BUMBINO_HIT_WALL = 721,
  BUMBINO_MISC = 722,
  BUMBINO_PUNCH = 723,
  BUMBINO_RAM = 724,
  BUMBINO_SLAM = 725,
  BUMBINO_SNAP_OUT = 726,
  SIREN_SCREAM = 727,
  SIREN_SING = 728,
  DEATH_SKULL_SUMMON_LOOP = 729,
  DEATH_SKULL_SUMMON_END = 730,
  BEAST_DEATH_2 = 731,
  BEAST_ANGELIC_BLAST = 732,
  ANCIENT_RECALL = 733,
  ERA_WALK = 734,
  HUGE_GROWTH = 735,
  RUNE_SHARD = 736,
  SHOT_SPEED_DOWN = 737,
  SHOT_SPEED_UP = 738,
  EXPERIMENTAL_PILL = 739,
  CRACKED_KEY = 740,
  QUEEN_OF_HEARTS = 741,
  WILD_CARD = 742,
  SOUL_OF_ISAAC = 743,
  SOUL_OF_MAGDALENE = 744,
  SOUL_OF_CAIN = 745,
  SOUL_OF_JUDAS = 746,
  SOUL_OF_XXX = 747,
  SOUL_OF_EVE = 748,
  SOUL_OF_SAMSON = 749,
  SOUL_OF_AZAZEL = 750,
  SOUL_OF_LAZARUS = 751,
  SOUL_OF_EDEN = 752,
  SOUL_OF_THE_LOST = 753,
  SOUL_OF_LILITH = 754,
  SOUL_OF_THE_KEEPER = 755,
  SOUL_OF_APOLLYON = 756,
  SOUL_OF_THE_FORGOTTEN = 757,
  SOUL_OF_BETHANY = 758,
  SOUL_OF_JACOB_AND_ESAU = 759,
  MEGA_BAD_GAS = 760,
  MEGA_BAD_TRIP = 761,
  MEGA_BALLS_OF_STEEL = 762,
  MEGA_BOMBS_ARE_KEY = 763,
  MEGA_EXPLOSIVE_DIARRHEA = 764,
  MEGA_FULL_HEALTH = 765,
  MEGA_HEALTH_UP = 766,
  MEGA_HEALTH_DOWN = 767,
  MEGA_I_FOUND_PILLS = 768,
  MEGA_PUBERTY = 769,
  MEGA_PRETTY_FLY = 770,
  MEGA_RANGE_DOWN = 771,
  MEGA_RANGE_UP = 772,
  MEGA_SPEED_DOWN = 773,
  MEGA_SPEED_UP = 774,
  MEGA_TEARS_DOWN = 775,
  MEGA_TEARS_UP = 776,
  MEGA_LUCK_DOWN = 777,
  MEGA_LUCK_UP = 778,
  MEGA_TELEPILLS = 779,
  MEGA_FORTY_EIGHT_HOUR_ENERGY = 780,
  MEGA_HEMATEMESIS = 781,
  MEGA_PARALYSIS = 782,
  MEGA_I_CAN_SEE_FOREVER = 783,
  MEGA_PHEROMONES = 784,
  MEGA_AMNESIA = 785,
  MEGA_LEMON_PARTY = 786,
  MEGA_R_U_A_WIZARD = 787,
  MEGA_PERCS = 788,
  MEGA_ADDICTED = 789,
  MEGA_RELAX = 790,
  MEGA_QUESTION_MARKS = 791,
  MEGA_ONE_MAKES_YOU_LARGER = 792,
  MEGA_ONE_MAKES_YOU_SMALL = 793,
  MEGA_INFESTED = 794,
  MEGA_INFESTED_1 = 795,
  MEGA_POWER_PILL = 796,
  MEGA_RETRO_VISION = 797,
  MEGA_FRIENDS_TIL_THE_END = 798,
  MEGA_X_LAX = 799,
  MEGA_SOMETHINGS_WRONG = 800,
  MEGA_IM_DROWSY = 801,
  MEGA_IM_EXCITED = 802,
  MEGA_GULP = 803,
  MEGA_HORF = 804,
  MEGA_SUNSHINE = 805,
  MEGA_VURP = 806,
  MEGA_SHOT_SPEED_DOWN = 807,
  MEGA_SHOT_SPEED_UP = 808,
  MEGA_EXPERIMENTAL_PILL = 809,
  SIREN_LUNGE = 810,
  SIREN_MINION_SMOKE = 811,
  SIREN_SCREAM_ATTACK = 812,
  SIREN_SING_STAB = 813,
  BEAST_LAVA_BALL_RISE = 814,
  BEAST_GROWL = 815,
  BEAST_GRUMBLE = 816,
  FAMINE_GRUNT = 817,
  G_FUEL_1 = 818,
  G_FUEL_2 = 819,
  G_FUEL_3 = 820,
  G_FUEL_4 = 821,
  G_FUEL_EXPLOSION_SMALL = 822,
  G_FUEL_EXPLOSION_BIG = 823,
  G_FUEL_GUNSHOT_MEDIUM = 824,
  G_FUEL_GUNSHOT_SMALL = 825,
  G_FUEL_GUNSHOT_LARGE = 826,
  G_FUEL_GUNSHOT_SPREAD = 827,
  G_FUEL_AIR_HORN = 828,
  G_FUEL_ITEM_APPEAR = 829,
  G_FUEL_GUNSHOT_MINI = 830,
  G_FUEL_BULLET_RICOCHET = 831,
  G_FUEL_ROCKET_LAUNCHER = 832,

  /** Added in Repentance+. */
  DEATHMATCH_INTRO = 833,

  /** Added in Repentance+. */
  ABYSS = 834,

  /** Added in Repentance+. */
  BIG_CHUBBY_ATTACK = 835,

  /** Added in Repentance+. */
  BOOMERANG_THROW = 836,

  /** Added in Repentance+. */
  BOOMERANG_LOOP = 837,

  /** Added in Repentance+. */
  BOOMERANG_CATCH = 838,

  /** Added in Repentance+. */
  BOOMERANG_HIT = 839,

  /** Added in Repentance+. */
  BOX_OF_FRIENDS = 840,

  /** Added in Repentance+. */
  BROWN_NUGGET = 841,

  /** Added in Repentance+. */
  BUMBO_1 = 842,

  /** Added in Repentance+. */
  BUMBO_2 = 843,

  /** Added in Repentance+. */
  BUMBO_3 = 844,

  /** Added in Repentance+. */
  BUMBO_4 = 845,

  /** Added in Repentance+. */
  PORTAL_ENTITY_LOOP = 846,

  /** Added in Repentance+. */
  PORTAL_ENTITY_ENTER = 847,

  /** Added in Repentance+. */
  CONVERTER = 848,

  /** Added in Repentance+. */
  LITTLE_CHUBBY_ATTACK = 849,

  /** Added in Repentance+. */
  CRACKED_ORB = 850,

  /** Added in Repentance+. */
  CROOKED_PENNY = 851,

  /** Added in Repentance+. */
  CUBE_BABY_KICK = 852,

  /** Added in Repentance+. */
  DARK_BUM_PAYOUT = 853,

  /** Added in Repentance+. */
  DATAMINER = 854,

  /** Added in Repentance+. */
  DR_REMOTE_WARNING = 855,

  /** Added in Repentance+. */
  FLIP_POOF = 856,

  /** Added in Repentance+. */
  ERASER_HIT = 857,

  /** Added in Repentance+. */
  GNAWED_LEAF = 858,

  /** Added in Repentance+. */
  LIL_HAUNT_CHASE = 859,

  /** Added in Repentance+. */
  LINGER_BEAN = 860,

  /** Added in Repentance+. */
  GLOWING_HOURGLASS_ACTIVATE = 861,

  /** Added in Repentance+. */
  GLOWING_HOURGLASS_FIZZLE = 862,

  /** Added in Repentance+. */
  INFAMY_DEFLECT = 863,

  /** Added in Repentance+. */
  IBS_GURGLE = 864,

  /** Added in Repentance+. */
  POOP_THROW = 865,

  /** Added in Repentance+. */
  GLITTER_BOOM = 866,

  /** Added in Repentance+. */
  GLITTER_FUSE = 867,

  /** Added in Repentance+. */
  LITTLE_HORN_SHOOT = 868,

  /** Added in Repentance+. */
  MEGA_BEAN_BLAST = 869,

  /** Added in Repentance+. */
  MOM_BOTTLE = 870,

  /** Added in Repentance+. */
  SUMMON_PENTAGRAM = 871,

  /** Added in Repentance+. */
  SUMMON_WAVE = 872,

  /** Added in Repentance+. */
  BIGHORN_APPEAR = 873,

  /** Added in Repentance+. */
  BIGHORN_CLOSE_BIG = 874,

  /** Added in Repentance+. */
  BIGHORN_CRACK_BIG = 875,

  /** Added in Repentance+. */
  BIGHORN_OPEN_BIG = 876,

  /** Added in Repentance+. */
  BIGHORN_SHAKE_BIG = 877,

  /** Added in Repentance+. */
  BIGHORN_DEATH = 878,

  /** Added in Repentance+. */
  BIGHORN_DIZZY_SHAKE = 879,

  /** Added in Repentance+. */
  BIGHORN_HAND_APPEAR = 880,

  /** Added in Repentance+. */
  BIGHORN_HAND_HIDE = 881,

  /** Added in Repentance+. */
  BIGHORN_HIDE = 882,

  /** Added in Repentance+. */
  BIGHORN_HURT = 883,

  /** Added in Repentance+. */
  BIGHORN_PRE_SPIT = 884,

  /** Added in Repentance+. */
  BIGHORN_CLOSE_SMALL = 885,

  /** Added in Repentance+. */
  BIGHORN_CRACK_SMALL = 886,

  /** Added in Repentance+. */
  BIGHORN_OPEN_SMALL = 887,

  /** Added in Repentance+. */
  BIGHORN_SHAKE_SMALL = 888,

  /** Added in Repentance+. */
  BIGHORN_SPIT = 889,

  /** Added in Repentance+. */
  MOMS_BOX = 890,

  /** Added in Repentance+. */
  MONSTRO_LUNG_BARF = 891,

  /** Added in Repentance+. */
  MOVING_BOX_PACK = 892,

  /** Added in Repentance+. */
  MOVING_BOX_UNPACK = 893,

  /** Added in Repentance+. */
  PANDORAS_BOX = 894,

  /** Added in Repentance+. */
  PAUSE_FREEZE = 895,

  /** Added in Repentance+. */
  MONSTRO_LUNG_CHARGE = 896,

  /** Added in Repentance+. */
  PLAN_C = 897,

  /** Added in Repentance+. */
  PORTABLE_SLOT_USE = 898,

  /** Added in Repentance+. */
  PORTABLE_SLOT_WIN = 899,

  /** Added in Repentance+. */
  SAFETY_SCISSORS = 900,

  /** Added in Repentance+. */
  BUTTER_DROP = 901,

  /** Added in Repentance+. */
  BUTTER_LAND = 902,

  /** Added in Repentance+. */
  PRIDE_ZAP = 903,

  /** Added in Repentance+. */
  R_KEY = 904,

  /** Added in Repentance+. */
  TEAR_BOUNCE = 905,

  /** Added in Repentance+. */
  SHARP_PLUG = 906,

  /** Added in Repentance+. */
  RIB_DEFLECT = 907,

  /** Added in Repentance+. */
  SMELTER = 908,

  // cspell:disable-next-line-next-line
  /** Added in Repentance+. Note that the vanilla enum is incorrectly spelled as "TELEKENESIS". */
  TELEKINESIS = 909,

  /** Added in Repentance+. */
  // eslint-disable-next-line isaacscript/enum-member-number-separation
  D6_ROLL = 910,

  /** Added in Repentance+. */
  TICK_BURN = 911,

  /** Added in Repentance+. */
  TELEPORT_UNDEFINED = 912,

  /** Added in Repentance+. */
  VOID_CONSUME = 913,

  /** Added in Repentance+. */
  YO_LISTEN = 914,

  /** Added in Repentance+. */
  SPIN_TO_WIN = 915,

  /** Added in Repentance+. */
  SHOVEL_DIG_2 = 916,

  /** Added in Repentance+. */
  SHOVEL_HOLE_OPEN = 917,

  /** Added in Repentance+. */
  CAGE_DEATH = 918,

  /** Added in Repentance+. */
  CAGE_JUMP = 919,

  /** Added in Repentance+. */
  CAGE_RIBS = 920,

  /** Added in Repentance+. */
  CAGE_ROLL_START = 921,

  /** Added in Repentance+. */
  CAGE_PREP_SHOOT = 922,

  /** Added in Repentance+. */
  CAGE_ROLL_STOP = 923,

  /** Added in Repentance+. */
  CAGE_ROLL_BOUNCE = 924,

  /** Added in Repentance+. */
  DEATH_HOURGLASS = 925,

  /** Added in Repentance+. */
  DEATH_SICKLE = 926,

  /** Added in Repentance+. */
  DEATH_LEAN = 927,

  /** Added in Repentance+. */
  DEATH_VOX = 928,

  /** Added in Repentance+. */
  DEATH_SPAWN_PREP = 929,

  /** Added in Repentance+. */
  DEATH_HORSE_ATTACK = 930,

  /** Added in Repentance+. */
  DEATH_HORSE_WOOSH = 931,

  /** Added in Repentance+. */
  PIN_DIVE = 932,

  /** Added in Repentance+. */
  PIN_POPUP = 933,

  /** Added in Repentance+. */
  PIN_PUDDLE = 934,

  /** Added in Repentance+. */
  PIN_SPIT = 935,

  /** Added in Repentance+. */
  GISH_JUMP = 936,

  /** Added in Repentance+. */
  GISH_JUMP_HIGH = 937,

  /** Added in Repentance+. */
  GISH_SPIT = 938,

  /** Added in Repentance+. */
  GURDY_FACE_ATTACK_APPEAR = 939,

  /** Added in Repentance+. */
  GURDY_FACE_ATTACK_HIDE = 940,

  /** Added in Repentance+. */
  GURDY_FACE_SMILE_APPEAR = 941,

  /** Added in Repentance+. */
  GURDY_FACE_SMILE_HIDE = 942,

  /** Added in Repentance+. */
  GURGLING_ATTACK = 943,

  /** Added in Repentance+. */
  LITTLE_HORN_DEATH = 944,

  /** Added in Repentance+. */
  LITTLE_HORN_BOMB_DROP = 945,

  /** Added in Repentance+. */
  LITTLE_HORN_DIVE = 946,

  /** Added in Repentance+. */
  LITTLE_HORN_HOLE_OPEN = 947,

  /** Added in Repentance+. */
  LITTLE_HORN_HOLE_EXIT = 948,

  /** Added in Repentance+. */
  LOKI_GIGGLE = 949,

  /** Added in Repentance+. */
  LOKI_JUMP_OUT = 950,

  /** Added in Repentance+. */
  LOKI_JUMP_IN = 951,

  /** Added in Repentance+. */
  LOKI_SHOOT = 952,

  /** Added in Repentance+. */
  LOKI_SHOOT_8 = 953,

  /** Added in Repentance+. */
  MASK_INFAMY_MAD = 954,

  /** Added in Repentance+. */
  MASK_INFAMY_DASH = 955,

  /** Added in Repentance+. */
  MEGA_FATTY_GULP = 956,

  /** Added in Repentance+. */
  MEGA_FATTY_SUCKING = 957,

  /** Added in Repentance+. */
  MEGA_FATTY_VOMIT = 958,

  /** Added in Repentance+. */
  STAIN_ATTACK_VOX = 959,

  /** Added in Repentance+. */
  SISTERS_VIS_SCARE = 960,

  /** Added in Repentance+. */
  STEVEN_DEATH_BIG = 961,

  /** Added in Repentance+. */
  STEVEN_DEATH_SMALL = 963,

  /** Added in Repentance+. */
  FALLEN_FLAP_CHASE = 964,

  /** Added in Repentance+. */
  FALLEN_GROWL = 965,

  /** Added in Repentance+. */
  FALLEN_FLAP = 966,

  /** Added in Repentance+. */
  FALLEN_OPEN_WINGS = 967,

  /** Added in Repentance+. */
  TERATOMA_BOUNCE_BIG = 968,

  /** Added in Repentance+. */
  TERATOMA_BOUNCE_MEDIUM = 969,

  /** Added in Repentance+. */
  TERATOMA_BOUNCE_SMALL = 970,

  /** Added in Repentance+. */
  FORSAKEN_LASER = 971,

  /** Added in Repentance+. */
  FORSAKEN_ARMS_UP = 972,

  /** Added in Repentance+. */
  FORSAKEN_FADE = 973,

  /** Added in Repentance+. */
  FISTULA_BOUNCE_LARGE = 974,

  /** Added in Repentance+. */
  FISTULA_BOUNCE_MEDIUM = 975,

  /** Added in Repentance+. */
  FISTULA_BOUNCE_SMALL = 976,

  /** Added in Repentance+. */
  FISTULA_BURST_LARGE = 977,

  /** Added in Repentance+. */
  FISTULA_GROWL_LARGE = 978,

  /** Added in Repentance+. */
  FISTULA_GROWL_MEDIUM = 979,

  /** Added in Repentance+. */
  FISTULA_GROWL_SMALL = 980,

  /** Added in Repentance+. */
  RAG_MEGA_BALL_ATTACK = 981,

  /** Added in Repentance+. */
  RAG_MEGA_BEAM = 982,

  /** Added in Repentance+. */
  RAG_MEGA_INHALE = 983,

  /** Added in Repentance+. */
  RAG_MEGA_EXHALE = 984,

  /** Added in Repentance+. */
  RAG_MEGA_INVINCIBLE_ON = 985,

  /** Added in Repentance+. */
  RAG_MEGA_INVINCIBLE_OFF = 986,

  /** Added in Repentance+. */
  BLASTOCYST_JUMP_BIG = 987,

  /** Added in Repentance+. */
  BLASTOCYST_JUMP = 988,

  /** Added in Repentance+. */
  BLASTOCYST_JUMP_SMALL = 989,

  /** Added in Repentance+. */
  POOP_DROP = 990,

  /** Added in Repentance+. */
  CARRION_QUEEN_BOUNCE = 991,

  /** Added in Repentance+. */
  CARRION_QUEEN_DIAGONAL_START = 992,

  /** Added in Repentance+. */
  CARRION_QUEEN_DIAGONAL_VOX = 993,

  /** Added in Repentance+. */
  CARRION_QUEEN_ROAR = 994,

  /** Added in Repentance+. */
  HAUNT_CHARGE = 995,

  /** Added in Repentance+. */
  HAUNT_DEATH = 996,

  /** Added in Repentance+. */
  HAUNT_ROAR = 997,

  /** Added in Repentance+. */
  HAUNT_RELEASE_LIL = 998,

  /** Added in Repentance+. */
  LARRY_JR_DEATH_1 = 999,

  /** Added in Repentance+. */
  LARRY_JR_DEATH_2 = 1000,

  /** Added in Repentance+. */
  LARRY_JR_ROAR = 1001,

  /** Added in Repentance+. */
  MEGA_FATTY_MEGA_FART = 1002,

  /** Added in Repentance+. */
  HOLLOW_DEATH_1 = 1003,

  /** Added in Repentance+. */
  HOLLOW_DEATH_2 = 1004,

  /** Added in Repentance+. */
  HOLLOW_ROAR = 1005,

  /** Added in Repentance+. */
  WAR_KNOCKDOWN = 1006,

  /** Added in Repentance+. */
  WAR_CHARGE = 1007,

  /** Added in Repentance+. */
  BOSS_NEAR = 1008,

  /** Added in Repentance+. */
  CAMBION_CONCEPTION = 1009,

  /** Added in Repentance+. */
  IMMACULATE_CONCEPTION = 1010,

  /** Added in Repentance+. */
  CHARGED_BABY_BATTERY = 1011,

  /** Added in Repentance+. */
  CHARGED_BABY_CHARGE = 1012,

  /** Added in Repentance+. */
  CHARGED_BABY_STUN = 1013,

  /** Added in Repentance+. */
  ROCK_SHINE = 1014,

  /** Added in Repentance+. */
  BLUE_SPIDER_DIE = 1015,

  /** Added in Repentance+. */
  SISSY_LONGLEGS_CHARM = 1016,

  /** Added in Repentance+. */
  ITEM_RAISE = 1017,

  /** Added in Repentance+. */
  CLOG_POOP_SMOKE = 1018,

  /** Added in Repentance+. */
  FRIENDLY_BALL_CAPTURE = 1019,

  /** Added in Repentance+. */
  FRIENDLY_BALL_LAND = 1020,

  /** Added in Repentance+. */
  FRIENDLY_BALL_PICKUP = 1021,

  /** Added in Repentance+. */
  FRIENDLY_BALL_RAISE = 1022,

  /** Added in Repentance+. */
  FRIENDLY_BALL_RELEASE = 1023,

  /** Added in Repentance+. */
  FRIENDLY_BALL_THROW = 1024,

  /** Added in Repentance+. */
  BEST_FRIEND = 1025,

  /** Added in Repentance+. */
  BOOK_SHADOWS_START = 1026,

  /** Added in Repentance+. */
  BOOK_SHADOWS_END = 1027,

  /** Added in Repentance+. */
  BOOK_SHADOWS_SIGIL = 1028,

  /** Added in Repentance+. */
  BOX_SPIDERS = 1029,

  /** Added in Repentance+. */
  SUPLEX_ACTIVATE = 1030,

  /** Added in Repentance+. */
  SUPLEX_GRAB = 1031,

  /** Added in Repentance+. */
  SUPLEX_JUMP = 1032,

  /** Added in Repentance+. */
  SUPLEX_LAND = 1033,

  /** Added in Repentance+. */
  DEAD_SEA_SCROLLS = 1034,

  /** Added in Repentance+. */
  MOMS_BRA = 1035,

  /** Added in Repentance+. */
  RED_CANDLE = 1036,

  /** Added in Repentance+. */
  SATANIC_BIBLE = 1037,

  /** Added in Repentance+. */
  BIBLE = 1038,

  /** Added in Repentance+. */
  HOURGLASS = 1039,

  /** Added in Repentance+. */
  MEGA_MUSH_SHRINK = 1040,

  /** Added in Repentance+. */
  MAGIC_SKIN = 1041,

  /** Added in Repentance+. */
  BOOK_OF_SIN = 1042,

  /** Added in Repentance+. */
  BROKEN_SHOVEL = 1043,

  /** Added in Repentance+. */
  DULL_RAZOR = 1044,

  /** Added in Repentance+. */
  DARK_ARTS = 1045,

  /** Added in Repentance+. */
  DECAP_ACTIVATE = 1046,

  // cspell:disable-next-line
  /** Added in Repentance+. */
  DECAP_THROW = 1047,

  /** Added in Repentance+. */
  ESAU_JR = 1048,

  /** Added in Repentance+. */
  NECROMANCER = 1049,

  /** Added in Repentance+. */
  GELLO = 1050,

  /** Added in Repentance+. */
  HEAVENS_DOOR_ENTER = 1051,

  /** Added in Repentance+. */
  TRAP_DOOR_LEVEL = 1052,

  /** Added in Repentance+. */
  CRYSTAL_BALL = 1053,

  /** Added in Repentance+. */
  FORGET_ME_NOW = 1054,

  /** Added in Repentance+. */
  HOW_TO_JUMP = 1055,

  /** Added in Repentance+. */
  IV_BAG = 1056,

  /** Added in Repentance+. */
  NOTCHED_AXE = 1057,

  /** Added in Repentance+. */
  RAZOR_BLADE = 1058,

  /** Added in Repentance+. */
  TELEPATHY_DUMMY = 1059,

  /** Added in Repentance+. */
  JAR_OF_FLIES = 1060,

  /** Added in Repentance+. */
  DIPLOPIA = 1061,

  /** Added in Repentance+. */
  MINE_CRAFTER = 1062,

  /** Added in Repentance+. */
  TEAR_DETONATOR = 1063,

  /** Added in Repentance+. */
  VENTRICLE_RAZOR = 1064,

  /** Added in Repentance+. */
  WOODEN_NICKEL = 1065,

  /** Added in Repentance+. */
  WOODEN_NICKEL_SPAWN = 1066,

  /** Added in Repentance+. */
  BLACK_HOLE_ACTIVATE = 1067,

  /** Added in Repentance+. */
  BLACK_HOLE_THROW = 1068,

  /** Added in Repentance+. */
  MR_ME = 1069,

  /** Added in Repentance+. */
  SPRINKLER_SPAWN = 1070,

  /** Added in Repentance+. */
  VOID_SUCCESS = 1071,

  /** Added in Repentance+. */
  VOID_FAIL = 1072,

  /** Added in Repentance+. */
  ABYSS_SUCCESS = 1073,

  /** Added in Repentance+. */
  BAG_OF_CRAFTING = 1074,

  /** Added in Repentance+. */
  GIANT_CHEST_OPEN = 1075,

  /** Added in Repentance+. */
  IMP_GROWL = 1076,

  /** Added in Repentance+. */
  IMP_SHOOT = 1077,

  /** Added in Repentance+. */
  IMP_WARP_OUT = 1078,

  /** Added in Repentance+. */
  IMP_WARP_IN = 1079,

  /** Added in Repentance+. */
  BRAIN_MOVE = 1080,

  /** Added in Repentance+. */
  POISON_MIND_HURT = 1081,

  /** Added in Repentance+. */
  KNIGHT_GROWL = 1082,

  /** Added in Repentance+. */
  SELFLESS_KNIGHT_GROWL = 1083,

  /** Added in Repentance+. */
  FLOATING_KNIGHT_GROWL = 1084,

  /** Added in Repentance+. */
  BUTTLICKER_GROWL = 1085,

  /** Added in Repentance+. */
  LADDER = 1086,

  /** Added in Repentance+. */
  OCULAR_RIFT_SHOOT = 1087,

  /** Added in Repentance+. */
  OCULAR_RIFT_PORTAL = 1088,

  /** Added in Repentance+. */
  UNBORN_GROWL = 1089,

  /** Added in Repentance+. */
  UNBORN_WARP = 1090,
}
