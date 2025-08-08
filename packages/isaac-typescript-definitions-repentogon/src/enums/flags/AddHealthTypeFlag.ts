/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @enum
 * @notExported
 * @rename AddHealthTypeFlag
 * @see https://repentogon.com/
 */
const AddHealthTypeFlagInternal = {
  NONE: 0,
  RED: 1 << 0,
  MAX: 1 << 1,
  SOUL: 1 << 2,
  BLACK: 1 << 3,
  ETERNAL: 1 << 4,
  GOLDEN: 1 << 5,
  BONE: 1 << 6,
  ROTTEN: 1 << 7,
  BROKEN: 1 << 8,
} as const;

type AddHealthTypeFlagValue = BitFlag & {
  readonly __addHealthTypeFlagBrand: symbol;
};
type AddHealthTypeFlagFlag = {
  readonly [K in keyof typeof AddHealthTypeFlagInternal]: AddHealthTypeFlagValue;
};

export const AddHealthTypeFlag =
  AddHealthTypeFlagInternal as AddHealthTypeFlagFlag;
export type AddHealthTypeFlag =
  AddHealthTypeFlagFlag[keyof AddHealthTypeFlagFlag];

export const AddHealthTypeFlagZero = 0 as BitFlags<AddHealthTypeFlag>;
