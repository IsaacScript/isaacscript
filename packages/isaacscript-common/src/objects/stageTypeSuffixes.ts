import { StageType } from "isaac-typescript-definitions";

export const STAGE_TYPE_SUFFIXES = {
  [StageType.ORIGINAL]: "", // 0
  [StageType.WRATH_OF_THE_LAMB]: "a", // 1
  [StageType.AFTERBIRTH]: "b", // 2
  [StageType.GREED_MODE]: "", // 3
  [StageType.REPENTANCE]: "c", // 4
  [StageType.REPENTANCE_B]: "d", // 5
} as const satisfies Record<StageType, string>;
