declare const ActionTriggerInternal: {
    /** 1 << -1 */
    NONE: number;
    /** 1 << 0 */
    BOMB_PLACED: number;
    /** 1 << 1 */
    MOVED: number;
    /** 1 << 2 */
    SHOOTING: number;
    /** 1 << 3 */
    CARD_PILL_USED: number;
    /** 1 << 4 */
    ITEM_ACTIVATED: number;
    /** 1 << 5 */
    ITEMS_DROPPED: number;
};
declare type ActionTriggerValue = number & {
    readonly __bitFlagBrand: void;
    readonly __actionTriggerBrand: void;
};
declare type ActionTriggerType = {
    [K in keyof typeof ActionTriggerInternal]: ActionTriggerValue;
};
export declare const ActionTrigger: ActionTriggerType;
export declare type ActionTrigger = ActionTriggerType[keyof ActionTriggerType];
export declare const ActionTriggerZero: BitFlags<ActionTriggerValue>;
export {};
