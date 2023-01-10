/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename EntityPartition
 */
const EntityPartitionInternal = {
  /** 1 << 0 (1) */
  FAMILIAR: 1 << 0,

  /** 1 << 1 (2) */
  BULLET: 1 << 1,

  /** 1 << 2 (4) */
  TEAR: 1 << 2,

  /** 1 << 3 (8) */
  ENEMY: 1 << 3,

  /** 1 << 4 (16) */
  PICKUP: 1 << 4,

  /** 1 << 5 (32) */
  PLAYER: 1 << 5,

  /** 1 << 6 (64) */
  EFFECT: 1 << 6,
} as const;

type EntityPartitionValue = BitFlag & {
  readonly __entityPartitionBrand: symbol;
};
type EntityPartitionType = {
  [Key in keyof typeof EntityPartitionInternal]: EntityPartitionValue;
};

export const EntityPartition = EntityPartitionInternal as EntityPartitionType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EntityPartition = EntityPartitionType[keyof EntityPartitionType];

export const EntityPartitionZero = 0 as BitFlags<EntityPartition>;
