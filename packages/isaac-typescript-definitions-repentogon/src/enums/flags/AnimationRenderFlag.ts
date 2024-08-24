/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @enum
 * @notExported
 * @rename AnimationRenderFlag
 */
const AnimationRenderFlagInternal = {
  /** Rapidly distorts the spritesheet position. */
  GLITCH: 1 << 1,

  /** This is reserved for champion NPCs and will not render for other NPCs. */
  COLOR_OFFSET_CHAMPION: 1 << 4,

  /** Dogma's static effect. */
  STATIC: 1 << 5,

  /**
   * Animated effects such as `AnimationRenderFlag.GOLDEN` and `AnimationRenderFlag.STATIC` will
   * continue to animate even if the game is paused.
   */
  IGNORE_GAME_TIME: 1 << 6,

  /** Golden effect used by golden trinkets. */
  GOLDEN: 1 << 7,

  /** Layer names starting with "*" will glow. */
  ENABLE_LAYER_LIGHTING: 1 << 10,

  /** Null layer names starting with "*" will glow. */
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
