import { PillEffect } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/** Maps pill effect names to the values of the `PillEffect` enum. */
export const PILL_NAME_TO_EFFECT_MAP = new ReadonlyMap<string, PillEffect>([
  ["badGas", PillEffect.BAD_GAS], // 0
  ["gas", PillEffect.BAD_GAS], // 0
  ["badTrip", PillEffect.BAD_TRIP], // 1
  ["trip", PillEffect.BAD_TRIP], // 1
  ["ballsOfSteel", PillEffect.BALLS_OF_STEEL], // 2
  ["ballsSteel", PillEffect.BALLS_OF_STEEL], // 2
  ["steel", PillEffect.BALLS_OF_STEEL], // 2
  ["bombsAreKey", PillEffect.BOMBS_ARE_KEYS], // 3
  ["bombsKey", PillEffect.BOMBS_ARE_KEYS], // 3
  ["key", PillEffect.BOMBS_ARE_KEYS], // 3
  ["explosiveDiarrhea", PillEffect.EXPLOSIVE_DIARRHEA], // 4
  ["diarrhea", PillEffect.EXPLOSIVE_DIARRHEA], // 4
  ["fullHealth", PillEffect.FULL_HEALTH], // 5
  ["healthDown", PillEffect.HEALTH_DOWN], // 6
  ["healthUp", PillEffect.HEALTH_UP], // 7
  ["iFoundPills", PillEffect.I_FOUND_PILLS], // 8
  ["foundPills", PillEffect.I_FOUND_PILLS], // 8
  ["pills", PillEffect.I_FOUND_PILLS], // 8
  ["puberty", PillEffect.PUBERTY], // 9
  ["prettyFly", PillEffect.PRETTY_FLY], // 10
  ["fly", PillEffect.PRETTY_FLY], // 10
  ["rangeDown", PillEffect.RANGE_DOWN], // 11
  ["rangeUp", PillEffect.RANGE_UP], // 12
  ["speedDown", PillEffect.SPEED_DOWN], // 13
  ["speedUp", PillEffect.SPEED_UP], // 14
  ["tearsDown", PillEffect.TEARS_DOWN], // 15
  ["tearsUp", PillEffect.TEARS_UP], // 16
  ["luckDown", PillEffect.LUCK_DOWN], // 17
  ["luckUp", PillEffect.LUCK_UP], // 18
  ["telepills", PillEffect.TELEPILLS], // 19
  ["48HourEnergy", PillEffect.FORTY_EIGHT_HOUR_ENERGY], // 20
  ["energy", PillEffect.FORTY_EIGHT_HOUR_ENERGY], // 20
  ["48", PillEffect.FORTY_EIGHT_HOUR_ENERGY], // 20
  ["hematemesis", PillEffect.HEMATEMESIS], // 21
  ["paralysis", PillEffect.PARALYSIS], // 22
  ["iCanSeeForever!", PillEffect.I_CAN_SEE_FOREVER], // 23
  ["canSee", PillEffect.I_CAN_SEE_FOREVER], // 23
  ["see", PillEffect.I_CAN_SEE_FOREVER], // 23
  ["pheromones", PillEffect.PHEROMONES], // 24
  ["amnesia", PillEffect.AMNESIA], // 25
  ["lemonParty", PillEffect.LEMON_PARTY], // 26
  ["party", PillEffect.LEMON_PARTY], // 26
  ["RUAWizard", PillEffect.R_U_A_WIZARD], // 27
  ["areYouAWizard", PillEffect.R_U_A_WIZARD], // 27
  ["wizard", PillEffect.R_U_A_WIZARD], // 27
  ["percs!", PillEffect.PERCS], // 28
  ["addicted!", PillEffect.ADDICTED], // 29
  ["relax", PillEffect.RELAX], // 30
  ["???", PillEffect.QUESTION_MARKS], // 31
  ["oneMakesYouLarger", PillEffect.ONE_MAKES_YOU_LARGER], // 32
  ["larger", PillEffect.ONE_MAKES_YOU_LARGER], // 32
  ["oneMakesYouSmaller", PillEffect.ONE_MAKES_YOU_SMALL], // 33
  ["smaller", PillEffect.ONE_MAKES_YOU_SMALL], // 33
  ["infested!", PillEffect.INFESTED_EXCLAMATION], // 34
  ["infest!", PillEffect.INFESTED_EXCLAMATION], // 34
  ["inf!", PillEffect.INFESTED_EXCLAMATION], // 34
  ["infested?", PillEffect.INFESTED_QUESTION], // 35
  ["infest?", PillEffect.INFESTED_QUESTION], // 35
  ["inf?", PillEffect.INFESTED_QUESTION], // 35
  ["powerPill", PillEffect.POWER], // 36
  ["retroVision", PillEffect.RETRO_VISION], // 37
  ["vision", PillEffect.RETRO_VISION], // 37
  ["friendsTillTheEnd", PillEffect.FRIENDS_TILL_THE_END], // 38
  ["friendsUntilTheEnd", PillEffect.FRIENDS_TILL_THE_END], // 38
  ["xlax", PillEffect.X_LAX], // 39
  ["somethingsWrong", PillEffect.SOMETHINGS_WRONG], // 40
  ["wrong", PillEffect.SOMETHINGS_WRONG], // 40
  ["imDrowsy", PillEffect.IM_DROWSY], // 41
  ["drowsy", PillEffect.IM_DROWSY], // 41
  ["imExcited!!!", PillEffect.IM_EXCITED], // 42
  ["excited", PillEffect.IM_EXCITED], // 42
  ["gulp!", PillEffect.GULP], // 43
  ["horf!", PillEffect.HORF], // 44
  [
    "feelsLikeImWalkingOnSunshine!",
    PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE,
  ], // 45
  ["walking", PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE], // 45
  ["sunshine", PillEffect.FEELS_LIKE_IM_WALKING_ON_SUNSHINE], // 45
  ["vurp!", PillEffect.VURP], // 46
  ["shotSpeedDown", PillEffect.SHOT_SPEED_DOWN], // 47
  ["shotSpeedUp", PillEffect.SHOT_SPEED_UP], // 48
  ["experimental", PillEffect.EXPERIMENTAL], // 49
]);
