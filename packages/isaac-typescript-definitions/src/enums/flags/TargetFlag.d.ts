declare const TargetFlagInternal: {
    /**
     * Allow switching to a better target even if we already have one.
     *
     * 1 << 0
     */
    readonly ALLOW_SWITCHING: number;
    /**
     * Do not prioritize enemies that are close to the familiar's owner.
     *
     * 1 << 1
     */
    readonly DONT_PRIORITIZE_ENEMIES_CLOSE_TO_PLAYER: number;
    /**
     * Prioritize enemies with higher HP.
     *
     * 1 << 2
     */
    readonly PRIORITIZE_ENEMIES_WITH_HIGH_HP: number;
    /**
     * Prioritize enemies with higher HP.
     *
     * 1 << 3
     */
    readonly PRIORITIZE_ENEMIES_WITH_LOW_HP: number;
    /**
     * Give a lower priority to our current target. (This makes it more likely for the familiar to
     * switch between targets.)
     *
     * 1 << 4
     */
    readonly GIVE_LOWER_PRIORITY_TO_CURRENT_TARGET: number;
};
declare type TargetFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __targetFlagBrand: void;
};
declare type TargetFlagType = {
    [K in keyof typeof TargetFlagInternal]: TargetFlagValue;
};
export declare const TargetFlag: TargetFlagType;
export declare type TargetFlag = TargetFlagType[keyof TargetFlagType];
export declare const TargetFlagZero: BitFlags<TargetFlagValue>;
export {};
