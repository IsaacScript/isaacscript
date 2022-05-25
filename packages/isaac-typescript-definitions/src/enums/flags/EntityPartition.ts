const EntityPartitionInternal = {
  /** 1 << 0 */
  FAMILIAR: 1 << 0,

  /** 1 << 1 */
  BULLET: 1 << 1,

  /** 1 << 2 */
  TEAR: 1 << 2,

  /** 1 << 3 */
  ENEMY: 1 << 3,

  /** 1 << 4 */
  PICKUP: 1 << 4,

  /** 1 << 5 */
  PLAYER: 1 << 5,

  /** 1 << 6 */
  EFFECT: 1 << 6,
};

type EntityPartitionValue = number & {
  readonly __bitFlagBrand: void;
  readonly __entityPartitionBrand: void;
};
type EntityPartitionType = {
  [K in keyof typeof EntityPartitionInternal]: EntityPartitionValue;
};

export const EntityPartition = EntityPartitionInternal as EntityPartitionType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EntityPartition = EntityPartitionType[keyof EntityPartitionType];

export const EntityPartitionZero = 0 as BitFlags<EntityPartition>;
