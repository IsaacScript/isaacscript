/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @enum
 * @notExported
 * @rename WaterClipFlag
 * @see https://repentogon.com/
 */
const WaterClipFlagInternal = {
  /** When set for an Entity, also enables rendering below water. */
  DISABLE_RENDER_ABOVE_WATER: 1 << 1,
  /**
   * Allows the entity to be rendered below the water along with being rendered above the water.
   * Only works for entities.
   */
  ENABLE_RENDER_BELOW_WATER: 1 << 2,

  /** Prevents the entity from being rendered below the water. Takes priority over other flags. */
  DISABLE_RENDER_BELOW_WATER: 1 << 3,

  /** Prevents the entity from having its reflection be rendered. Only works for entities. */
  DISABLE_RENDER_REFLECTION: 1 << 5,

  /** Overrides other flags and only allows the entity to render above water with no reflection. */
  IGNORE_WATER_RENDERING: 1 << 6,

  /**
   * Forces the entity to spawn water ripple effects regardless of if they're on the ground or not.
   * Only works for entities.
   */
  FORCE_WATER_RIPPLE_WHEN_MOVING: 1 << 7,
} as const;

type WaterClipFlagValue = BitFlag & {
  readonly __waterClipFlagBrand: symbol;
};
type WaterClipFlagType = {
  readonly [K in keyof typeof WaterClipFlagInternal]: WaterClipFlagValue;
};

export const WaterClipFlag = WaterClipFlagInternal as WaterClipFlagType;
export type WaterClipFlag = WaterClipFlagType[keyof WaterClipFlagType];

export const WaterClipFlagZero = 0 as BitFlags<WaterClipFlag>;
