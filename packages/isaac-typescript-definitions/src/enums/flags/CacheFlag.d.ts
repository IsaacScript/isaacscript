declare const CacheFlagInternal: {
    /** 1 << 0 */
    readonly DAMAGE: number;
    /** 1 << 1 */
    readonly FIRE_DELAY: number;
    /** 1 << 2 */
    readonly SHOT_SPEED: number;
    /** 1 << 3 */
    readonly RANGE: number;
    /** 1 << 4 */
    readonly SPEED: number;
    /** 1 << 5 */
    readonly TEAR_FLAG: number;
    /** 1 << 6 */
    readonly TEAR_COLOR: number;
    /** 1 << 7 */
    readonly FLYING: number;
    /** 1 << 8 */
    readonly WEAPON: number;
    /** 1 << 9 */
    readonly FAMILIARS: number;
    /** 1 << 10 */
    readonly LUCK: number;
    /** 1 << 11 */
    readonly SIZE: number;
    /** 1 << 12 */
    readonly COLOR: number;
    /** 1 << 13 */
    readonly PICKUP_VISION: number;
    /** (1 << 16) - 1 */
    readonly ALL: number;
    /** 1 << 31 */
    readonly TWIN_SYNC: number;
};
declare type CacheFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __cacheFlagBrand: void;
};
declare type CacheFlagType = {
    [K in keyof typeof CacheFlagInternal]: CacheFlagValue;
};
export declare const CacheFlag: CacheFlagType;
export declare type CacheFlag = CacheFlagType[keyof CacheFlagType];
export declare const CacheFlagZero: BitFlags<CacheFlagValue>;
export {};
