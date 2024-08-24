/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @enum
 * @notExported
 * @rename EntityTag
 */
const EntityTagInternal = {
  FLY: 1 << 0,
  SPIDER: 1 << 1,
  GHOST: 1 << 3,
  NO_REROLL: 1 << 4,
  CAN_SACRIFICE: 1 << 5,
  EXPLOSIVE_SOUL: 1 << 6,
  HOMING_SOUL: 1 << 7,
  BRIMSTONE_SOUL: 1 << 8,
  NO_DELIRIUM: 1 << 9,
} as const;

type EntityTagValue = BitFlag & {
  readonly __entityTagBrand: symbol;
};
type EntityTagType = {
  readonly [K in keyof typeof EntityTagInternal]: EntityTagValue;
};

export const EntityTag = EntityTagInternal as EntityTagType;
export type EntityTag = EntityTagType[keyof EntityTagType];

export const EntityTagZero = 0 as BitFlags<EntityTag>;
