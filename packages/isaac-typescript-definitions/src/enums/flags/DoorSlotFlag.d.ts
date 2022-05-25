/** For GridEntityType.DOOR (16) */
declare const DoorSlotFlagInternal: {
    /** 1 << 0 */
    LEFT_0: number;
    /** 1 << 1 */
    UP_0: number;
    /** 1 << 2 */
    RIGHT_0: number;
    /** 1 << 3 */
    DOWN_0: number;
    /** 1 << 4 */
    LEFT_1: number;
    /** 1 << 5 */
    UP_1: number;
    /** 1 << 6 */
    RIGHT_1: number;
    /** 1 << 7 */
    DOWN_1: number;
};
declare type DoorSlotFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __doorSlotFlagBrand: void;
};
declare type DoorSlotFlagType = {
    [K in keyof typeof DoorSlotFlagInternal]: DoorSlotFlagValue;
};
export declare const DoorSlotFlag: DoorSlotFlagType;
export declare type DoorSlotFlag = DoorSlotFlagType[keyof DoorSlotFlagType];
export declare const DoorSlotFlagZero: BitFlags<DoorSlotFlagValue>;
export {};
