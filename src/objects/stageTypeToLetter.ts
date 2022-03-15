export const STAGE_TYPE_TO_LETTER: { readonly [key in StageType]: string } = {
  // e.g. To go to Basement 2, the command is simply "stage 2" without a letter suffix
  [StageType.STAGETYPE_ORIGINAL]: "", // 0

  [StageType.STAGETYPE_WOTL]: "a", // 1
  [StageType.STAGETYPE_AFTERBIRTH]: "b", // 2

  // There is no corresponding suffix
  [StageType.STAGETYPE_GREEDMODE]: "", // 3

  [StageType.STAGETYPE_REPENTANCE]: "c", // 4
  [StageType.STAGETYPE_REPENTANCE_B]: "d", // 5
};
