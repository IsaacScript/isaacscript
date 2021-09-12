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
  BATTERY_BUM = 13,
  ISAAC_SECRET = 14,
  HELL_GAME = 15,
  CRANE_GAME = 16,
  CONFESSIONAL = 17,
  ROTTEN_BEGGAR = 18,
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

/** For EntityType.ENTITY_VIS (39) */
declare const enum VisVariant {
  VIS = 0,
  DOUBLE_VIS = 1,
  CHUBBER = 2,
  SCARRED_DOUBLE_VIS = 3,
  CHUBBER_PROJECTILE = 22,
}

/** For EntityType.ENTITY_MOM (45) */
declare const enum MomVariant {
  MOM = 0,
  STOMP = 10,
}

/** For EntityType.ENTITY_PIN (62) */
declare const enum PinVariant {
  PIN = 0,
  SCOLEX = 1,
  FRAIL = 2,
  WORMWOOD = 3,
}

/** For EntityType.ENTITY_DEATH (66) */
declare const enum DeathVariant {
  DEATH = 0,
  DEATH_SCYTHE = 10,
  DEATH_HORSE = 20,
  DEATH_WITHOUT_HORSE = 30,
}

/** For EntityType.ENTITY_PEEP (68) */
declare const enum PeepVariant {
  PEEP = 0,
  BLOAT = 1,
  PEEP_EYE = 10,
  BLOAT_EYE = 11,
}

/** For EntityType.ENTITY_GEMINI (79) */
declare const enum GeminiVariant {
  GEMINI = 0,
  STEVEN = 1,
  BLIGHTED_OVUM = 2,
  GEMINI_BABY = 10,
  STEVEN_BABY = 11,
  BLIGHTED_OVUM_BABY = 12,
  UMBILICAL_CORD = 20,
}

/** For EntityType.ENTITY_FALLEN (81) */
declare const enum FallenVariant {
  FALLEN = 0,
  KRAMPUS = 1,
}

/** For EntityType.ENTITY_SATAN (84) */
declare const enum SatanVariant {
  SATAN = 0,
  STOMP = 10,
}

/** For EntityType.ENTITY_ISAAC (102) */
declare const enum IsaacVariant {
  ISAAC = 0,
  BLUE_BABY = 1,
  BLUE_BABY_HUSH = 2,
}

/** For EntityType.ENTITY_DEATHS_HEAD (212) */
declare const enum DeathsHeadVariant {
  DEATHS_HEAD = 0,
  /**
   * This is the only Death's Head variant that does not rely on other enemies in the room being
   * alive.
   */
  DANK_DEATHS_HEAD = 1,
  CURSED_DEATHS_HEAD = 2,
  BRIMSTONE_DEATHS_HEAD = 3,
  REDSKULL = 4,
}

/** For EntityType.ENTITY_RAGLING (246) */
declare const enum RaglingVariant {
  RAGLING = 0,
  RAG_MANS_RAGLING = 1,
}

/** For EntityType.ENTITY_BEGOTTEN (251) */
declare const enum BegottenVariant {
  BEGOTTEN = 0,
  BEGOTTEN_CHAIN = 10,
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

/** EntityType.ENTITY_PITFALL (291) */
declare const enum PitfallVariant {
  PITFALL = 0,
  SUCTION_PITFALL = 1,
  TELEPORT_PITFALL = 2,
}

/** For EntityType.ENTITY_DARK_ESAU (866) */
declare const enum DarkEsauVariant {
  DARK_ESAU = 0,
  PIT = 1,
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
  DOGMA_PHASE_1 = 0,
  TV = 1,
  ANGEL_PHASE_2 = 2,
  ANGEL_BABY_UNUSED = 10,
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
