/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @enum
 * @notExported
 * @rename GibFlag
 * @see https://repentogon.com/
 */
const GibFlagInternal = {
  BLOOD: 1 << 0,
  BONE: 1 << 1,
  GUT: 1 << 2,
  EYE: 1 << 3,
  LARGE: 1 << 4,
  POOP: 1 << 5,
  WORM: 1 << 6,
  ROCK: 1 << 7,
  ROCK_SMALL: 1 << 8,
  SOUND_BABY: 1 << 9,
  SOUND_BONE: 1 << 10,
  CHAIN: 1 << 11,
  DUST: 1 << 12,
  HUGE: 1 << 13,
} as const;

type GibFlagValue = BitFlag & {
  readonly __gibFlagBrand: symbol;
};
type GibFlagType = {
  readonly [K in keyof typeof GibFlagInternal]: GibFlagValue;
};

export const GibFlag = GibFlagInternal as GibFlagType;
export type GibFlag = GibFlagType[keyof GibFlagType];

export const GibFlagZero = 0 as BitFlags<GibFlag>;
