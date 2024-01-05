/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @enum
 * @notExported
 * @rename AnimationRenderFlag
 */
const AnimationRenderFlagInternal = {
  GLITCH: 1 << 1,
  COLOR_OFFSET_CHAMPION: 1 << 4,
  STATIC: 1 << 5,
  IGNORE_GAME_TIME: 1 << 6,
  GOLDEN: 1 << 7,
  ENABLE_LAYER_LIGHTING: 1 << 10,
  ENABLE_NULL_LAYER_LIGHTING: 1 << 11,
} as const;

type AnimationRenderFlagValue = BitFlag & {
  readonly __animationRenderFlagBrand: symbol;
};
type AnimationRenderFlagType = {
  readonly [K in keyof typeof AnimationRenderFlagInternal]: AnimationRenderFlagValue;
};

export const AnimationRenderFlag =
  AnimationRenderFlagInternal as AnimationRenderFlagType;
export type AnimationRenderFlag =
  AnimationRenderFlagType[keyof AnimationRenderFlagType];

export const AnimationRenderFlagZero = 0 as BitFlags<AnimationRenderFlag>;
