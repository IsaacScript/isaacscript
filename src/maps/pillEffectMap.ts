/* cspell:disable */

import { PillEffect } from "isaac-typescript-definitions";

/** Maps pill effect names to the values of the `PillEffect` enum. */
export const PILL_EFFECT_MAP: ReadonlyMap<string, PillEffect> = new Map([
  ["badgas", PillEffect.BAD_GAS], // 0
  ["gas", PillEffect.BAD_GAS], // 0
  ["badtrip", PillEffect.BAD_TRIP], // 1
  ["trip", PillEffect.BAD_TRIP], // 1
  ["ballsofsteel", PillEffect.BALLS_OF_STEEL], // 2
  ["ballssteel", PillEffect.BALLS_OF_STEEL], // 2
  ["steel", PillEffect.BALLS_OF_STEEL], // 2
  ["bombsarekey", PillEffect.BOMBS_ARE_KEYS], // 3
  ["bombskey", PillEffect.BOMBS_ARE_KEYS], // 3
  ["key", PillEffect.BOMBS_ARE_KEYS], // 3
  ["explosivediarrhea", PillEffect.EXPLOSIVE_DIARRHEA], // 4
  ["diarrhea", PillEffect.EXPLOSIVE_DIARRHEA], // 4
  ["fullhealth", PillEffect.FULL_HEALTH], // 5
  ["healthdown", PillEffect.HEALTH_DOWN], // 6
  ["healthup", PillEffect.HEALTH_UP], // 7
  ["ifoundpills", PillEffect.I_FOUND_PILLS], // 8
  ["foundpills", PillEffect.I_FOUND_PILLS], // 8
  ["pills", PillEffect.I_FOUND_PILLS], // 8
  ["puberty", PillEffect.PUBERTY], // 9
  ["prettyfly", PillEffect.PRETTY_FLY], // 10
  ["fly", PillEffect.PRETTY_FLY], // 10
  ["rangedown", PillEffect.RANGE_DOWN], // 11
  ["rangeup", PillEffect.RANGE_UP], // 12
  ["speeddown", PillEffect.SPEED_DOWN], // 13
  ["speedup", PillEffect.SPEED_UP], // 14
  ["tearsdown", PillEffect.TEARS_DOWN], // 15
  ["tearsup", PillEffect.TEARS_UP], // 16
  ["luckdown", PillEffect.LUCK_DOWN], // 17
  ["luckup", PillEffect.LUCK_UP], // 18
  ["telepills", PillEffect.TELEPILLS], // 19
  ["48hourenergy", PillEffect.FORTY_EIGHT_HOUR_ENERGY], // 20
  ["energy", PillEffect.FORTY_EIGHT_HOUR_ENERGY], // 20
  ["48", PillEffect.FORTY_EIGHT_HOUR_ENERGY], // 20
  ["hematemesis", PillEffect.HEMATEMESIS], // 21
  ["paralysis", PillEffect.PARALYSIS], // 22
  ["icanseeforever!", PillEffect.I_CAN_SEE_FOREVER], // 23
  ["cansee", PillEffect.I_CAN_SEE_FOREVER], // 23
  ["see", PillEffect.I_CAN_SEE_FOREVER], // 23
  ["pheromones", PillEffect.PHEROMONES], // 24
  ["amnesia", PillEffect.AMNESIA], // 25
  ["lemonparty", PillEffect.LEMON_PARTY], // 26
  ["party", PillEffect.LEMON_PARTY], // 26
  ["ruawizard", PillEffect.R_U_A_WIZARD], // 27
  ["areyouawizard", PillEffect.R_U_A_WIZARD], // 27
  ["wizard", PillEffect.R_U_A_WIZARD], // 27
  ["percs!", PillEffect.PERCS], // 28
  ["addicted!", PillEffect.ADDICTED], // 29
  ["relax", PillEffect.RELAX], // 30
  ["???", PillEffect.QUESTION_MARKS], // 31
  ["onemakesyoularger", PillEffect.ONE_MAKES_YOU_LARGER], // 32
  ["larger", PillEffect.ONE_MAKES_YOU_LARGER], // 32
  ["onemakesyousmaller", PillEffect.ONE_MAKES_YOU_SMALL], // 33
  ["smaller", PillEffect.ONE_MAKES_YOU_SMALL], // 33
  ["infested!", PillEffect.INFESTED_EXCLAMATION], // 34
  ["infest!", PillEffect.INFESTED_EXCLAMATION], // 34
  ["inf!", PillEffect.INFESTED_EXCLAMATION], // 34
  ["infested?", PillEffect.INFESTED_QUESTION], // 35
  ["infest?", PillEffect.INFESTED_QUESTION], // 35
  ["inf?", PillEffect.INFESTED_QUESTION], // 35
  ["powerpill", PillEffect.POWER], // 36
  ["retrovision", PillEffect.RETRO_VISION], // 37
  ["vision", PillEffect.RETRO_VISION], // 37
  ["friendstilltheend", PillEffect.FRIENDS_TILL_THE_END], // 38
  ["friendsutilltheend", PillEffect.FRIENDS_TILL_THE_END], // 38
  ["xlax", PillEffect.X_LAX], // 39
  ["somethingswrong", PillEffect.SOMETHINGS_WRONG], // 40
  ["wrong", PillEffect.SOMETHINGS_WRONG], // 40
  ["imdrowsy", PillEffect.IM_DROWSY], // 41
  ["drowsy", PillEffect.IM_DROWSY], // 41
  ["imexcited!!!", PillEffect.IM_EXCITED], // 42
  ["excited", PillEffect.IM_EXCITED], // 42
  ["gulp!", PillEffect.GULP], // 43
  ["horf!", PillEffect.HORF], // 44
  [
    "feelslikeimwalkingonsunshine!",
    PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE,
  ], // 45
  ["walking", PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE], // 45
  ["sunshine", PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE], // 45
  ["vurp!", PillEffect.VURP], // 46
  ["shotspeeddown", PillEffect.SHOT_SPEED_DOWN], // 47
  ["shotspeedup", PillEffect.SHOT_SPEED_UP], // 48
  ["experimental", PillEffect.EXPERIMENTAL], // 49
]);
