import { StageType } from "isaac-typescript-definitions";

export const STAGE_TYPE_SUFFIXES = {
  // For example, to go to Basement 2, the command is simply "stage 2" without a letter suffix.
  [StageType.ORIGINAL]: "", // 0

  [StageType.WRATH_OF_THE_LAMB]: "a", // 1
  [StageType.AFTERBIRTH]: "b", // 2

  // There is no corresponding suffix for Greed Mode.
  [StageType.GREED_MODE]: "", // 3

  [StageType.REPENTANCE]: "c", // 4
  [StageType.REPENTANCE_B]: "d", // 5
} as const satisfies Record<StageType, string>;
