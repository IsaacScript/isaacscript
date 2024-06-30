/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @enum
 * @notExported
 * @rename ConceptionFamiliarFlag
 */
const ConceptionFamiliarFlagInternal = {} as const;

type ConceptionFamiliarFlagValue = BitFlag & {
  readonly __conceptionFamiliarFlagBrand: symbol;
};
type ConceptionFamiliarFlagType = {
  readonly [K in keyof typeof ConceptionFamiliarFlagInternal]: ConceptionFamiliarFlagValue;
};

export type ConceptionFamiliarFlag =
  ConceptionFamiliarFlagType[keyof ConceptionFamiliarFlagType];
export const ConceptionFamiliarFlag =
  ConceptionFamiliarFlagInternal as ConceptionFamiliarFlagType;

export const ConceptionFamiliarFlagZero = 0 as BitFlags<ConceptionFamiliarFlag>;
