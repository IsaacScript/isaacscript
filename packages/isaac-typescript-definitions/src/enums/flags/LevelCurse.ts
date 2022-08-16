/**
 * Corresponds to `LevelCurse`.
 *
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 */
const LevelCurseInternal = {
  /**
   * 1 << -1
   *
   * Equal to 0.
   */
  NONE: 1 << -1,

  /**
   * 1 << 0
   *
   * Corresponds to `CurseID.DARKNESS` (1).
   */
  DARKNESS: 1 << 0,

  /**
   * 1 << 1
   *
   * Corresponds to `CurseID.LABYRINTH` (2).
   */
  LABYRINTH: 1 << 1,

  /**
   * 1 << 2
   *
   * Corresponds to `CurseID.LOST` (3).
   */
  LOST: 1 << 2,

  /**
   * 1 << 3
   *
   * Corresponds to `CurseID.UNKNOWN` (4).
   */
  UNKNOWN: 1 << 3,

  /**
   * 1 << 4
   *
   * Corresponds to `CurseID.CURSED` (5).
   */
  CURSED: 1 << 4,

  /**
   * 1 << 5
   *
   * Corresponds to `CurseID.MAZE` (6).
   */
  MAZE: 1 << 5,

  /**
   * 1 << 6
   *
   * Corresponds to `CurseID.BLIND` (7).
   */
  BLIND: 1 << 6,

  /**
   * 1 << 7
   *
   * Corresponds to `CurseID.GIANT` (8).
   */
  GIANT: 1 << 7,
} as const;

type LevelCurseValue = BitFlag & {
  readonly __levelCurseBrand: symbol;
};
type LevelCurseType = {
  [K in keyof typeof LevelCurseInternal]: LevelCurseValue;
};

export const LevelCurse = LevelCurseInternal as LevelCurseType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LevelCurse = LevelCurseType[keyof LevelCurseType];

export const LevelCurseZero = 0 as BitFlags<LevelCurse>;
