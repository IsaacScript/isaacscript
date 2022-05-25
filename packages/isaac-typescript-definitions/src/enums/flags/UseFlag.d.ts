declare const UseFlagInternal: {
    /**
     * Don't play use animations.
     *
     * 1 << 0
     */
    NO_ANIMATION: number;
    /**
     * Don't add costume.
     *
     * 1 << 1
     */
    NO_COSTUME: number;
    /**
     * Effect was triggered by an active item owned by the player.
     *
     * 1 << 2
     */
    OWNED: number;
    /**
     * Allow the effect to trigger on non-main players (i.e. coop babies).
     *
     * 1 << 3
     */
    ALLOW_NON_MAIN_PLAYERS: number;
    /**
     * D4 only: Reroll the player's active item.
     *
     * 1 << 4
     */
    REMOVE_ACTIVE: number;
    /**
     * Effect was triggered a second time by Car Battery (or Tarot Cloth for cards).
     *
     * 1 << 5
     */
    CAR_BATTERY: number;
    /**
     * Effect was triggered by Void.
     *
     * 1 << 6
     */
    VOID: number;
    /**
     * Effect was mimicked by an active item (Blank Card, Placebo).
     *
     * 1 << 7
     */
    MIMIC: number;
    /**
     * Never play announcer voice.
     *
     * 1 << 8
     */
    NO_ANNOUNCER_VOICE: number;
    /**
     * This allows an item to spawn wisps when called from another item usage as the wisps generator
     * checks for `NO_ANIMATION`, so usually you want to use this with `NO_ANIMATION` call.
     *
     * 1 << 9
     */
    ALLOW_WISP_SPAWN: number;
    /**
     * If set, forces UseActiveItem to use the CustomVarData argument instead of the active item's
     * stored VarData.
     *
     * 1 << 10
     */
    CUSTOM_VARDATA: number;
    /**
     * Don't display text in the HUD. (This is currently only used by Echo Chamber.)
     *
     * 1 << 11
     */
    NO_HUD: number;
};
declare type UseFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __useFlagBrand: void;
};
declare type UseFlagType = {
    [K in keyof typeof UseFlagInternal]: UseFlagValue;
};
export declare const UseFlag: UseFlagType;
export declare type UseFlag = UseFlagType[keyof UseFlagType];
export declare const UseFlagZero: BitFlags<UseFlagValue>;
export {};
