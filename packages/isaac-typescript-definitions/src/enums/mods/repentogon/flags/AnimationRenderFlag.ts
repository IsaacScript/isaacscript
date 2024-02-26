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
  /** Rapidly distorts the spritesheet position. */
  GLITCH: 1 << 1,

  /** This is used by champion NPCs. Applying this render flag on anything else will do nothing. */
  COLOR_OFFSET_CHAMPION: 1 << 4,

  /** Static effect used by Dogma. */
  STATIC: 1 << 5,

  /**
   * If set, animated effects such as `AnimationRenderFlag.STATIC` will continue animating even if
   * the game is paused.
   */
  IGNORE_GAME_TIME: 1 << 6,

  /** Used by golden trinkets. */
  GOLDEN: 1 << 7,

  /** If set, layer names starting with "*" will become fully bright. */
  ENABLE_LAYER_LIGHTING: 1 << 10,

  /** If set, null layer names starting with "*" will emit light. */
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
