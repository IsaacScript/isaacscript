import { PillEffect } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

export const FALSE_PHD_PILL_CONVERSIONS_MAP = new ReadonlyMap<
  PillEffect,
  PillEffect
>([
  [PillEffect.BAD_GAS, PillEffect.HEALTH_DOWN], // 0
  [PillEffect.BALLS_OF_STEEL, PillEffect.BAD_TRIP], // 2
  [PillEffect.BOMBS_ARE_KEYS, PillEffect.TEARS_DOWN], // 3
  [PillEffect.EXPLOSIVE_DIARRHEA, PillEffect.RANGE_DOWN], // 4
  [PillEffect.FULL_HEALTH, PillEffect.BAD_TRIP], // 5
  [PillEffect.HEALTH_UP, PillEffect.HEALTH_DOWN], // 7
  [PillEffect.PRETTY_FLY, PillEffect.LUCK_DOWN], // 10
  [PillEffect.RANGE_UP, PillEffect.RANGE_DOWN], // 12
  [PillEffect.SPEED_UP, PillEffect.SPEED_DOWN], // 14
  [PillEffect.TEARS_UP, PillEffect.TEARS_DOWN], // 16
  [PillEffect.LUCK_UP, PillEffect.LUCK_DOWN], // 18
  [PillEffect.TELEPILLS, PillEffect.QUESTION_MARKS], // 19
  [PillEffect.FORTY_EIGHT_HOUR_ENERGY, PillEffect.SPEED_DOWN], // 20
  [PillEffect.HEMATEMESIS, PillEffect.BAD_TRIP], // 21
  [PillEffect.I_CAN_SEE_FOREVER, PillEffect.AMNESIA], // 23
  [PillEffect.PHEROMONES, PillEffect.PARALYSIS], // 24
  [PillEffect.LEMON_PARTY, PillEffect.AMNESIA], // 26
  [PillEffect.PERCS, PillEffect.ADDICTED], // 28
  [PillEffect.ONE_MAKES_YOU_LARGER, PillEffect.RANGE_DOWN], // 32
  [PillEffect.ONE_MAKES_YOU_SMALL, PillEffect.SPEED_DOWN], // 33
  [PillEffect.INFESTED_EXCLAMATION, PillEffect.TEARS_DOWN], // 34
  [PillEffect.INFESTED_QUESTION, PillEffect.LUCK_DOWN], // 35
  [PillEffect.POWER, PillEffect.R_U_A_WIZARD], // 36
  [PillEffect.FRIENDS_TILL_THE_END, PillEffect.HEALTH_DOWN], // 38
  [PillEffect.SOMETHINGS_WRONG, PillEffect.X_LAX], // 40
  [PillEffect.IM_DROWSY, PillEffect.IM_EXCITED], // 41
  [PillEffect.GULP, PillEffect.HORF], // 43
  [PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE, PillEffect.RETRO_VISION], // 45
  [PillEffect.VURP, PillEffect.HORF], // 46
  [PillEffect.SHOT_SPEED_UP, PillEffect.SHOT_SPEED_DOWN], // 48
]);
