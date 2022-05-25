declare const DamageFlagInternal: {
    /** 1 << 0 */
    NO_KILL: number;
    /** 1 << 1 */
    FIRE: number;
    /** 1 << 2 */
    EXPLOSION: number;
    /** 1 << 3 */
    LASER: number;
    /** 1 << 4 */
    ACID: number;
    /** 1 << 5 */
    RED_HEARTS: number;
    /** 1 << 6 */
    COUNTDOWN: number;
    /** 1 << 7 */
    SPIKES: number;
    /** 1 << 8 */
    CLONES: number;
    /** 1 << 9 */
    POOP: number;
    /** 1 << 10 */
    DEVIL: number;
    /** 1 << 11 */
    ISSAC_HEART: number;
    /** 1 << 12 */
    TNT: number;
    /** 1 << 13 */
    INVINCIBLE: number;
    /** 1 << 14 */
    SPAWN_FLY: number;
    /** 1 << 15 */
    POISON_BURN: number;
    /** 1 << 16 */
    CURSED_DOOR: number;
    /** 1 << 17 */
    TIMER: number;
    /** 1 << 18 */
    IV_BAG: number;
    /** 1 << 19 */
    PITFALL: number;
    /** 1 << 20 */
    CHEST: number;
    /** 1 << 21 */
    FAKE: number;
    /** 1 << 22 */
    BOOGER: number;
    /** 1 << 23 */
    SPAWN_BLACK_HEART: number;
    /** 1 << 24 */
    CRUSH: number;
    /** 1 << 25 */
    NO_MODIFIERS: number;
    /** 1 << 26 */
    SPAWN_RED_HEART: number;
    /** 1 << 27 */
    SPAWN_COIN: number;
    /** 1 << 28 */
    NO_PENALTIES: number;
    /** 1 << 29 */
    SPAWN_TEMP_HEART: number;
    /** 1 << 30 */
    IGNORE_ARMOR: number;
    /** 1 << 31 */
    SPAWN_CARD: number;
    /** 1 << 32 */
    SPAWN_RUNE: number;
};
declare type DamageFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __damageFlagBrand: void;
};
declare type DamageFlagType = {
    [K in keyof typeof DamageFlagInternal]: DamageFlagValue;
};
export declare const DamageFlag: DamageFlagType;
export declare type DamageFlag = DamageFlagType[keyof DamageFlagType];
export declare const DamageFlagZero: BitFlags<DamageFlagValue>;
export {};
