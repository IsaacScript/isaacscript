/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename UseFlag
 */
const UseFlagInternal = {
  /**
   * Don't play use animations.
   *
   * 1 << 0 (1)
   */
  NO_ANIMATION: 1 << 0,

  /**
   * Don't add costume.
   *
   * 1 << 1 (2)
   */
  NO_COSTUME: 1 << 1,

  /**
   * Effect was triggered by an active item owned by the player.
   *
   * 1 << 2 (4)
   */
  OWNED: 1 << 2,

  /**
   * Allow the effect to trigger on non-main players (i.e. coop babies).
   *
   * 1 << 3 (8)
   */
  ALLOW_NON_MAIN_PLAYERS: 1 << 3,

  /**
   * D4 only: Reroll the player's active item.
   *
   * 1 << 4 (16)
   */
  REMOVE_ACTIVE: 1 << 4,

  /**
   * Effect was triggered a second time by Car Battery (or Tarot Cloth for cards).
   *
   * 1 << 5 (32)
   */
  CAR_BATTERY: 1 << 5,

  /**
   * Effect was triggered by Void.
   *
   * 1 << 6 (64)
   */
  VOID: 1 << 6,

  /**
   * Effect was mimicked by an active item (Blank Card, Placebo).
   *
   * 1 << 7 (128)
   */
  MIMIC: 1 << 7,

  /**
   * Never play announcer voice.
   *
   * 1 << 8 (256)
   */
  NO_ANNOUNCER_VOICE: 1 << 8,

  /**
   * This allows an item to spawn wisps when called from another item usage as the wisps generator
   * checks for `NO_ANIMATION`, so usually you want to use this with `NO_ANIMATION` call.
   *
   * 1 << 9 (512)
   */
  ALLOW_WISP_SPAWN: 1 << 9,

  /**
   * If set, forces UseActiveItem to use the CustomVarData argument instead of the active item's
   * stored VarData.
   *
   * 1 << 10 (1024)
   */
  CUSTOM_VARDATA: 1 << 10,

  /**
   * Don't display text in the HUD. (This is currently only used by Echo Chamber.)
   *
   * 1 << 11 (2048)
   */
  NO_HUD: 1 << 11,
} as const;

type UseFlagValue = BitFlag & {
  readonly __useFlagBrand: symbol;
};
type UseFlagType = {
  readonly [K in keyof typeof UseFlagInternal]: UseFlagValue;
};

export const UseFlag = UseFlagInternal as UseFlagType;
export type UseFlag = UseFlagType[keyof UseFlagType];

export const UseFlagZero = 0 as BitFlags<UseFlag>;
