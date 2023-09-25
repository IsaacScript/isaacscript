import { HeartSubType } from "isaac-typescript-definitions";

export const DEFAULT_HEART_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const HEART_NAMES = {
  [HeartSubType.NULL]: DEFAULT_HEART_NAME, // 0
  [HeartSubType.FULL]: "Heart", // 1
  [HeartSubType.HALF]: "Heart (half)", // 2
  [HeartSubType.SOUL]: "Heart (soul)", // 3
  [HeartSubType.ETERNAL]: "Heart (eternal)", // 4
  [HeartSubType.DOUBLE_PACK]: "Heart (double)", // 5
  [HeartSubType.BLACK]: "Black Heart", // 6
  [HeartSubType.GOLDEN]: "Gold Heart", // 7
  [HeartSubType.HALF_SOUL]: "Heart (half soul)", // 8
  [HeartSubType.SCARED]: "Scared Heart", // 9
  [HeartSubType.BLENDED]: "Blended Heart", // 10
  [HeartSubType.BONE]: "Bone Heart", // 11
  [HeartSubType.ROTTEN]: "Rotten Heart", // 12
} as const satisfies Record<HeartSubType, string>;
