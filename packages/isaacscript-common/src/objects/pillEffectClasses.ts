import {
  ItemConfigPillEffectClass,
  PillEffect,
} from "isaac-typescript-definitions";

export const DEFAULT_PILL_EFFECT_CLASS = ItemConfigPillEffectClass.MODDED;

export const PILL_EFFECT_CLASSES = {
  [PillEffect.BAD_GAS]: ItemConfigPillEffectClass.MINOR, // 0
  [PillEffect.BAD_TRIP]: ItemConfigPillEffectClass.MEDIUM, // 1
  [PillEffect.BALLS_OF_STEEL]: ItemConfigPillEffectClass.MEDIUM, // 2
  [PillEffect.BOMBS_ARE_KEYS]: ItemConfigPillEffectClass.MEDIUM, // 3
  [PillEffect.EXPLOSIVE_DIARRHEA]: ItemConfigPillEffectClass.MINOR, // 4
  [PillEffect.FULL_HEALTH]: ItemConfigPillEffectClass.MEDIUM, // 5
  [PillEffect.HEALTH_DOWN]: ItemConfigPillEffectClass.MAJOR, // 6
  [PillEffect.HEALTH_UP]: ItemConfigPillEffectClass.MAJOR, // 7
  [PillEffect.I_FOUND_PILLS]: ItemConfigPillEffectClass.JOKE, // 8
  [PillEffect.PUBERTY]: ItemConfigPillEffectClass.JOKE, // 9
  [PillEffect.PRETTY_FLY]: ItemConfigPillEffectClass.MEDIUM, // 10
  [PillEffect.RANGE_DOWN]: ItemConfigPillEffectClass.MAJOR, // 11
  [PillEffect.RANGE_UP]: ItemConfigPillEffectClass.MAJOR, // 12
  [PillEffect.SPEED_DOWN]: ItemConfigPillEffectClass.MAJOR, // 13
  [PillEffect.SPEED_UP]: ItemConfigPillEffectClass.MAJOR, // 14
  [PillEffect.TEARS_DOWN]: ItemConfigPillEffectClass.MAJOR, // 15
  [PillEffect.TEARS_UP]: ItemConfigPillEffectClass.MAJOR, // 16
  [PillEffect.LUCK_DOWN]: ItemConfigPillEffectClass.MAJOR, // 17
  [PillEffect.LUCK_UP]: ItemConfigPillEffectClass.MAJOR, // 18
  [PillEffect.TELEPILLS]: ItemConfigPillEffectClass.MAJOR, // 19
  [PillEffect.FORTY_EIGHT_HOUR_ENERGY]: ItemConfigPillEffectClass.MEDIUM, // 20
  [PillEffect.HEMATEMESIS]: ItemConfigPillEffectClass.MEDIUM, // 21
  [PillEffect.PARALYSIS]: ItemConfigPillEffectClass.MINOR, // 22
  [PillEffect.I_CAN_SEE_FOREVER]: ItemConfigPillEffectClass.MEDIUM, // 23
  [PillEffect.PHEROMONES]: ItemConfigPillEffectClass.MINOR, // 24
  [PillEffect.AMNESIA]: ItemConfigPillEffectClass.MEDIUM, // 25
  [PillEffect.LEMON_PARTY]: ItemConfigPillEffectClass.MINOR, // 26
  [PillEffect.R_U_A_WIZARD]: ItemConfigPillEffectClass.MINOR, // 27
  [PillEffect.PERCS]: ItemConfigPillEffectClass.MINOR, // 28
  [PillEffect.ADDICTED]: ItemConfigPillEffectClass.MINOR, // 29
  [PillEffect.RELAX]: ItemConfigPillEffectClass.JOKE, // 30
  [PillEffect.QUESTION_MARKS]: ItemConfigPillEffectClass.MINOR, // 31
  [PillEffect.ONE_MAKES_YOU_LARGER]: ItemConfigPillEffectClass.MINOR, // 32
  [PillEffect.ONE_MAKES_YOU_SMALL]: ItemConfigPillEffectClass.MINOR, // 33
  [PillEffect.INFESTED_EXCLAMATION]: ItemConfigPillEffectClass.MINOR, // 34
  [PillEffect.INFESTED_QUESTION]: ItemConfigPillEffectClass.MINOR, // 35
  [PillEffect.POWER]: ItemConfigPillEffectClass.MINOR, // 36
  [PillEffect.RETRO_VISION]: ItemConfigPillEffectClass.MINOR, // 37
  [PillEffect.FRIENDS_TILL_THE_END]: ItemConfigPillEffectClass.MINOR, // 38
  [PillEffect.X_LAX]: ItemConfigPillEffectClass.MINOR, // 39
  [PillEffect.SOMETHINGS_WRONG]: ItemConfigPillEffectClass.JOKE, // 40
  [PillEffect.IM_DROWSY]: ItemConfigPillEffectClass.MINOR, // 41
  [PillEffect.IM_EXCITED]: ItemConfigPillEffectClass.MINOR, // 42
  [PillEffect.GULP]: ItemConfigPillEffectClass.MEDIUM, // 43
  [PillEffect.HORF]: ItemConfigPillEffectClass.JOKE, // 44
  [PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE]:
    ItemConfigPillEffectClass.MINOR, // 45
  [PillEffect.VURP]: ItemConfigPillEffectClass.MEDIUM, // 46
  [PillEffect.SHOT_SPEED_DOWN]: ItemConfigPillEffectClass.MAJOR, // 47
  [PillEffect.SHOT_SPEED_UP]: ItemConfigPillEffectClass.MAJOR, // 48
  [PillEffect.EXPERIMENTAL]: ItemConfigPillEffectClass.MAJOR, // 49
} as const satisfies Record<PillEffect, ItemConfigPillEffectClass>;
