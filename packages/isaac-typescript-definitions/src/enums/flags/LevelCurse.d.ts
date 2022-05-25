declare const LevelCurseInternal: {
    readonly NONE: 0;
    /** 1 << 0 */
    readonly DARKNESS: number;
    /** 1 << 1 */
    readonly LABYRINTH: number;
    /** 1 << 2 */
    readonly LOST: number;
    /** 1 << 3 */
    readonly UNKNOWN: number;
    /** 1 << 4 */
    readonly CURSED: number;
    /** 1 << 5 */
    readonly MAZE: number;
    /** 1 << 6 */
    readonly BLIND: number;
    /** 1 << 7 */
    readonly GIANT: number;
};
declare type LevelCurseValue = number & {
    readonly __bitFlagBrand: void;
    readonly __levelCurseBrand: void;
};
declare type LevelCurseType = {
    [K in keyof typeof LevelCurseInternal]: LevelCurseValue;
};
export declare const LevelCurse: LevelCurseType;
export declare type LevelCurse = LevelCurseType[keyof LevelCurseType];
export declare const LevelCurseZero: BitFlags<LevelCurseValue>;
export {};
