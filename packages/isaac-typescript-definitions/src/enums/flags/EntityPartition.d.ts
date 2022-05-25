declare const EntityPartitionInternal: {
    /** 1 << 0 */
    FAMILIAR: number;
    /** 1 << 1 */
    BULLET: number;
    /** 1 << 2 */
    TEAR: number;
    /** 1 << 3 */
    ENEMY: number;
    /** 1 << 4 */
    PICKUP: number;
    /** 1 << 5 */
    PLAYER: number;
    /** 1 << 6 */
    EFFECT: number;
};
declare type EntityPartitionValue = number & {
    readonly __bitFlagBrand: void;
    readonly __entityPartitionBrand: void;
};
declare type EntityPartitionType = {
    [K in keyof typeof EntityPartitionInternal]: EntityPartitionValue;
};
export declare const EntityPartition: EntityPartitionType;
export declare type EntityPartition = EntityPartitionType[keyof EntityPartitionType];
export declare const EntityPartitionZero: BitFlags<EntityPartitionValue>;
export {};
