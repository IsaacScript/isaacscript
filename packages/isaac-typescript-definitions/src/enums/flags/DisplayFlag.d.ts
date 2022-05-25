declare const DisplayFlagInternal: {
    /** 1 << -1 */
    readonly INVISIBLE: number;
    /** 1 << 0 */
    readonly VISIBLE: number;
    /** 1 << 1 */
    readonly SHADOW: number;
    /** 1 << 2 */
    readonly SHOW_ICON: number;
};
declare type DisplayFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __displayFlagBrand: void;
};
declare type DisplayFlagType = {
    [K in keyof typeof DisplayFlagInternal]: DisplayFlagValue;
};
export declare const DisplayFlag: DisplayFlagType;
export declare type DisplayFlag = DisplayFlagType[keyof DisplayFlagType];
export declare const DisplayFlagZero: BitFlags<DisplayFlagValue>;
export {};
