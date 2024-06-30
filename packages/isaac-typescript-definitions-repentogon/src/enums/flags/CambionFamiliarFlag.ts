/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @enum
 * @notExported
 * @rename CambionFamiliarFlag
 */
const CambionFamiliarFlagInternal = {} as const;

type CambionFamiliarFlagValue = BitFlag & {
  readonly __cambionFamiliarFlagBrand: symbol;
};
type CambionFamiliarFlagType = {
  readonly [K in keyof typeof CambionFamiliarFlagInternal]: CambionFamiliarFlagValue;
};

export const CambionFamiliarFlag =
  CambionFamiliarFlagInternal as CambionFamiliarFlagType;
export type CambionFamiliarFlag =
  CambionFamiliarFlagType[keyof CambionFamiliarFlagType];

export const CambionFamiliarFlagZero = 0 as BitFlags<CambionFamiliarFlag>;
