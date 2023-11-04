import {
  ItemConfigPillEffectType,
  PillEffect,
} from "isaac-typescript-definitions";

export const DEFAULT_PILL_EFFECT_TYPE = ItemConfigPillEffectType.MODDED;

export const PILL_EFFECT_TYPES = {
  [PillEffect.BAD_GAS]: ItemConfigPillEffectType.POSITIVE, // 0
  [PillEffect.BAD_TRIP]: ItemConfigPillEffectType.NEGATIVE, // 1
  [PillEffect.BALLS_OF_STEEL]: ItemConfigPillEffectType.POSITIVE, // 2
  [PillEffect.BOMBS_ARE_KEYS]: ItemConfigPillEffectType.NEUTRAL, // 3
  [PillEffect.EXPLOSIVE_DIARRHEA]: ItemConfigPillEffectType.NEUTRAL, // 4
  [PillEffect.FULL_HEALTH]: ItemConfigPillEffectType.POSITIVE, // 5
  [PillEffect.HEALTH_DOWN]: ItemConfigPillEffectType.NEGATIVE, // 6
  [PillEffect.HEALTH_UP]: ItemConfigPillEffectType.POSITIVE, // 7
  [PillEffect.I_FOUND_PILLS]: ItemConfigPillEffectType.NEUTRAL, // 8
  [PillEffect.PUBERTY]: ItemConfigPillEffectType.NEUTRAL, // 9
  [PillEffect.PRETTY_FLY]: ItemConfigPillEffectType.POSITIVE, // 10
  [PillEffect.RANGE_DOWN]: ItemConfigPillEffectType.NEGATIVE, // 11
  [PillEffect.RANGE_UP]: ItemConfigPillEffectType.POSITIVE, // 12
  [PillEffect.SPEED_DOWN]: ItemConfigPillEffectType.NEGATIVE, // 13
  [PillEffect.SPEED_UP]: ItemConfigPillEffectType.POSITIVE, // 14
  [PillEffect.TEARS_DOWN]: ItemConfigPillEffectType.NEGATIVE, // 15
  [PillEffect.TEARS_UP]: ItemConfigPillEffectType.POSITIVE, // 16
  [PillEffect.LUCK_DOWN]: ItemConfigPillEffectType.NEGATIVE, // 17
  [PillEffect.LUCK_UP]: ItemConfigPillEffectType.POSITIVE, // 18
  [PillEffect.TELEPILLS]: ItemConfigPillEffectType.NEUTRAL, // 19
  [PillEffect.FORTY_EIGHT_HOUR_ENERGY]: ItemConfigPillEffectType.POSITIVE, // 20
  [PillEffect.HEMATEMESIS]: ItemConfigPillEffectType.NEUTRAL, // 21
  [PillEffect.PARALYSIS]: ItemConfigPillEffectType.NEGATIVE, // 22
  [PillEffect.I_CAN_SEE_FOREVER]: ItemConfigPillEffectType.POSITIVE, // 23
  [PillEffect.PHEROMONES]: ItemConfigPillEffectType.POSITIVE, // 24
  [PillEffect.AMNESIA]: ItemConfigPillEffectType.NEGATIVE, // 25
  [PillEffect.LEMON_PARTY]: ItemConfigPillEffectType.POSITIVE, // 26
  [PillEffect.R_U_A_WIZARD]: ItemConfigPillEffectType.NEGATIVE, // 27
  [PillEffect.PERCS]: ItemConfigPillEffectType.POSITIVE, // 28
  [PillEffect.ADDICTED]: ItemConfigPillEffectType.NEGATIVE, // 29
  [PillEffect.RELAX]: ItemConfigPillEffectType.NEUTRAL, // 30
  [PillEffect.QUESTION_MARKS]: ItemConfigPillEffectType.NEGATIVE, // 31
  [PillEffect.ONE_MAKES_YOU_LARGER]: ItemConfigPillEffectType.NEUTRAL, // 32
  [PillEffect.ONE_MAKES_YOU_SMALL]: ItemConfigPillEffectType.NEUTRAL, // 33
  [PillEffect.INFESTED_EXCLAMATION]: ItemConfigPillEffectType.POSITIVE, // 34
  [PillEffect.INFESTED_QUESTION]: ItemConfigPillEffectType.POSITIVE, // 35
  [PillEffect.POWER]: ItemConfigPillEffectType.POSITIVE, // 36
  [PillEffect.RETRO_VISION]: ItemConfigPillEffectType.NEGATIVE, // 37
  [PillEffect.FRIENDS_TILL_THE_END]: ItemConfigPillEffectType.POSITIVE, // 38
  [PillEffect.X_LAX]: ItemConfigPillEffectType.NEGATIVE, // 39
  [PillEffect.SOMETHINGS_WRONG]: ItemConfigPillEffectType.POSITIVE, // 40
  [PillEffect.IM_DROWSY]: ItemConfigPillEffectType.NEUTRAL, // 41
  [PillEffect.IM_EXCITED]: ItemConfigPillEffectType.NEUTRAL, // 42
  [PillEffect.GULP]: ItemConfigPillEffectType.POSITIVE, // 43
  [PillEffect.HORF]: ItemConfigPillEffectType.NEUTRAL, // 44
  [PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE]:
    ItemConfigPillEffectType.POSITIVE, // 45
  [PillEffect.VURP]: ItemConfigPillEffectType.POSITIVE, // 46
  [PillEffect.SHOT_SPEED_DOWN]: ItemConfigPillEffectType.NEGATIVE, // 47
  [PillEffect.SHOT_SPEED_UP]: ItemConfigPillEffectType.POSITIVE, // 48
  [PillEffect.EXPERIMENTAL]: ItemConfigPillEffectType.NEUTRAL, // 49
} as const satisfies Record<PillEffect, ItemConfigPillEffectType>;
