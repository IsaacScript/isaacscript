import { PillEffect } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

export const PHD_PILL_CONVERSIONS_MAP = new ReadonlyMap<PillEffect, PillEffect>(
  [
    [PillEffect.BAD_TRIP, PillEffect.BALLS_OF_STEEL], // 1
    [PillEffect.HEALTH_DOWN, PillEffect.HEALTH_UP], // 6
    [PillEffect.RANGE_DOWN, PillEffect.RANGE_UP], // 11
    [PillEffect.SPEED_DOWN, PillEffect.SPEED_UP], // 13
    [PillEffect.TEARS_DOWN, PillEffect.TEARS_UP], // 15
    [PillEffect.LUCK_DOWN, PillEffect.LUCK_UP], // 17
    [PillEffect.PARALYSIS, PillEffect.PHEROMONES], // 22
    [PillEffect.AMNESIA, PillEffect.I_CAN_SEE_FOREVER], // 25
    [PillEffect.R_U_A_WIZARD, PillEffect.POWER], // 27
    [PillEffect.ADDICTED, PillEffect.PERCS], // 29
    [PillEffect.QUESTION_MARKS, PillEffect.TELEPILLS], // 31
    [PillEffect.RETRO_VISION, PillEffect.I_CAN_SEE_FOREVER], // 37
    [PillEffect.X_LAX, PillEffect.SOMETHINGS_WRONG], // 39
    [PillEffect.IM_EXCITED, PillEffect.IM_DROWSY], // 42
    [PillEffect.HORF, PillEffect.GULP], // 44
    [PillEffect.SHOT_SPEED_DOWN, PillEffect.SHOT_SPEED_UP], // 47
  ],
);
