/** For EntityType.ENTITY_FAMILIAR (3), FamiliarVariant.DIP (201) */
declare const enum DipFamiliarSubType {
  NORMAL = 0,
  RED = 1,
  CORNY = 2,
  GOLD = 3,
  RAINBOW = 4,
  BLACK = 5,
  WHITE = 6,
}

/** For EntityType.ENTITY_FAMILIAR (3), FamiliarVariant.BLOOD_BABY (238) */
declare const enum BloodClotSubType {
  RED = 0,
  SOUL = 1,
  BLACK = 2,
  ETERNAL = 3,
  GOLD = 4,
  BONE = 5,
  ROTTEN = 6,
  /** Spawned by the Blood Clot trinket; cannot be turned into health by Sumptorium. */
  RED_NO_SUMPTORIUM = 7,
}
/** For EntityType.ENTITY_CHARGER (23), ChargerVariant.CHARGER (0) */
declare const enum ChargerSubType {
  CHARGER = 0,
  MY_SHADOW = 1,
}

/**
 * For EntityType.ENTITY_CONSTANT_STONE_SHOOTER (202),
 * ConstantStoneShooterVariant.CONSTANT_STONE_SHOOTER (0)
 * (this is the same as the Direction enum)
 */
declare const enum ConstantStoneShooterSubType {
  LEFT = 0,
  UP = 1,
  RIGHT = 2,
  DOWN = 3,
}

/** For EntityType.ENTITY_EFFECT (1000), EffectVariant.POOF01 (15) */
declare const enum PoofSubType {
  NORMAL = 0,
  SMALL = 1,
  // A sub-type of 2 appears to be the same thing as a sub-type of 0
  LARGE = 3,
}

/** For EntityType.ENTITY_EFFECT (1000), EffectVariant.HEAVEN_LIGHT_DOOR (39) */
declare const enum HeavenLightDoorSubType {
  HEAVEN_DOOR = 0,
  MOONLIGHT = 1,
}

/** For EntityType.ENTITY_EFFECT (1000), EffectVariant.TALL_LADDER (156) */
declare const enum LadderSubType {
  TALL_LADDER = 0,
  STAIRWAY = 1,
}

/** For EntityType.ENTITY_EFFECT (1000), EffectVariant.PURGATORY (189) */
declare const enum PurgatorySubType {
  PURGATORY_RIFT = 0,
  PURGATORY_GHOST = 1,
}
