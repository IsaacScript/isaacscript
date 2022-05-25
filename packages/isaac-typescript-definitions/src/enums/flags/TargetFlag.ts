const TargetFlagInternal = {
  /**
   * Allow switching to a better target even if we already have one.
   *
   * 1 << 0
   */
  ALLOW_SWITCHING: 1 << 0,

  /**
   * Do not prioritize enemies that are close to the familiar's owner.
   *
   * 1 << 1
   */
  DONT_PRIORITIZE_ENEMIES_CLOSE_TO_PLAYER: 1 << 1,

  /**
   * Prioritize enemies with higher HP.
   *
   * 1 << 2
   */
  PRIORITIZE_ENEMIES_WITH_HIGH_HP: 1 << 2,

  /**
   * Prioritize enemies with higher HP.
   *
   * 1 << 3
   */
  PRIORITIZE_ENEMIES_WITH_LOW_HP: 1 << 3,

  /**
   * Give a lower priority to our current target. (This makes it more likely for the familiar to
   * switch between targets.)
   *
   * 1 << 4
   */
  GIVE_LOWER_PRIORITY_TO_CURRENT_TARGET: 1 << 4,
} as const;

type TargetFlagValue = number & {
  readonly __bitFlagBrand: void;
  readonly __targetFlagBrand: void;
};
type TargetFlagType = {
  [K in keyof typeof TargetFlagInternal]: TargetFlagValue;
};

export const TargetFlag = TargetFlagInternal as TargetFlagType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TargetFlag = TargetFlagType[keyof TargetFlagType];

export const TargetFlagZero = 0 as BitFlags<TargetFlag>;
