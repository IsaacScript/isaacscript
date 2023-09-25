import { PillEffect } from "isaac-typescript-definitions";

export const DEFAULT_PILL_EFFECT_NAME = "Unknown";

export const PILL_EFFECT_NAMES = {
  [PillEffect.BAD_GAS]: "Bad Gas", // 0
  [PillEffect.BAD_TRIP]: "Bad Trip", // 1
  [PillEffect.BALLS_OF_STEEL]: "Balls of Steel", // 2
  [PillEffect.BOMBS_ARE_KEYS]: "Bombs Are Key", // 3
  [PillEffect.EXPLOSIVE_DIARRHEA]: "Explosive Diarrhea", // 4
  [PillEffect.FULL_HEALTH]: "Full Health", // 5
  [PillEffect.HEALTH_DOWN]: "Health Down", // 6
  [PillEffect.HEALTH_UP]: "Health Up", // 7
  [PillEffect.I_FOUND_PILLS]: "I Found Pills", // 8
  [PillEffect.PUBERTY]: "Puberty", // 9
  [PillEffect.PRETTY_FLY]: "Pretty Fly", // 10
  [PillEffect.RANGE_DOWN]: "Range Down", // 11
  [PillEffect.RANGE_UP]: "Range Up", // 12
  [PillEffect.SPEED_DOWN]: "Speed Down", // 13
  [PillEffect.SPEED_UP]: "Speed Up", // 14
  [PillEffect.TEARS_DOWN]: "Tears Down", // 15
  [PillEffect.TEARS_UP]: "Tears Up", // 16
  [PillEffect.LUCK_DOWN]: "Luck Down", // 17
  [PillEffect.LUCK_UP]: "Luck Up", // 18
  [PillEffect.TELEPILLS]: "Telepills", // 19
  [PillEffect.FORTY_EIGHT_HOUR_ENERGY]: "48 Hour Energy", // 20
  [PillEffect.HEMATEMESIS]: "Hematemesis", // 21
  [PillEffect.PARALYSIS]: "Paralysis", // 22
  [PillEffect.I_CAN_SEE_FOREVER]: "I can see forever!", // 23
  [PillEffect.PHEROMONES]: "Pheromones", // 24
  [PillEffect.AMNESIA]: "Amnesia", // 25
  [PillEffect.LEMON_PARTY]: "Lemon Party", // 26
  [PillEffect.R_U_A_WIZARD]: "R U a Wizard?", // 27
  [PillEffect.PERCS]: "Percs!", // 28
  [PillEffect.ADDICTED]: "Addicted!", // 29
  [PillEffect.RELAX]: "Re-Lax", // 30
  [PillEffect.QUESTION_MARKS]: "???", // 31
  [PillEffect.ONE_MAKES_YOU_LARGER]: "One makes you larger", // 32
  [PillEffect.ONE_MAKES_YOU_SMALL]: "One makes you small", // 33
  [PillEffect.INFESTED_EXCLAMATION]: "Infested!", // 34
  [PillEffect.INFESTED_QUESTION]: "Infested?", // 35
  [PillEffect.POWER]: "Power Pill!", // 36
  [PillEffect.RETRO_VISION]: "Retro Vision", // 37
  [PillEffect.FRIENDS_TILL_THE_END]: "Friends Till The End!", // 38
  [PillEffect.X_LAX]: "X-Lax", // 39
  [PillEffect.SOMETHINGS_WRONG]: "Something's wrong...", // 40
  [PillEffect.IM_DROWSY]: "I'm Drowsy...", // 41
  [PillEffect.IM_EXCITED]: "I'm Excited!!!", // 42
  [PillEffect.GULP]: "Gulp!", // 43
  [PillEffect.HORF]: "Horf!", // 44
  [PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE]:
    "Feels like I'm walking on sunshine!", // 45
  [PillEffect.VURP]: "Vurp!", // 46
  [PillEffect.SHOT_SPEED_DOWN]: "Shot Speed Down", // 47
  [PillEffect.SHOT_SPEED_UP]: "Shot Speed Up", // 48
  [PillEffect.EXPERIMENTAL]: "Experimental Pill", // 49
} as const satisfies Record<PillEffect, string>;
