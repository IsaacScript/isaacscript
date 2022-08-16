/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename EntityPartition
 */
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
} as const;

type EntityPartitionValue = BitFlag & {
  readonly __entityPartitionBrand: symbol;
};
type EntityPartitionType = {
  [K in keyof typeof EntityPartitionInternal]: EntityPartitionValue;
};

export const EntityPartition = EntityPartitionInternal as EntityPartitionType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EntityPartition = EntityPartitionType[keyof EntityPartitionType];

export const EntityPartitionZero = 0 as BitFlags<EntityPartition>;
