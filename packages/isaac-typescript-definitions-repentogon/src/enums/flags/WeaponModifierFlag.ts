/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @enum
 * @notExported
 * @rename WeaponModifierFlag
 * @see https://repentogon.com/
 */
const WeaponModifierFlagInternal = {
  CHOCOLATE_MILK: 1 << 0,
  CURSED_EYE: 1 << 1,
  BRIMSTONE: 1 << 2,
  MONSTROS_LUNG: 1 << 3,
  LUDOVICO_TECHNIQUE: 1 << 4,
  ANTI_GRAVITY: 1 << 5,
  TRACTOR_BEAM: 1 << 6,
  SOY_MILK: 1 << 7,
  NEPTUNUS: 1 << 8,
  AZAZELS_SNEEZE: 1 << 9,
  C_SECTION: 1 << 11,
  FAMILIAR: 1 << 30,
  BONE: 1 << 31,
} as const;

type WeaponModifierFlagValue = BitFlag & {
  readonly __weaponModifierFlagBrand: symbol;
};
type WeaponModifierFlagType = {
  readonly [K in keyof typeof WeaponModifierFlagInternal]: WeaponModifierFlagValue;
};

export type WeaponModifierFlag =
  WeaponModifierFlagType[keyof WeaponModifierFlagType];
export const WeaponModifierFlag =
  WeaponModifierFlagInternal as WeaponModifierFlagType;

export const WeaponModifierFlagZero = 0 as BitFlags<WeaponModifierFlag>;
