import { CurseID } from "../CurseID";

/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename LevelCurse
 */
const LevelCurseInternal = {
  /** 1 << -1 (0) */
  NONE: 0,

  /**
   * 1 << 0 (1)
   *
   * Corresponds to `CurseID.DARKNESS` (1).
   */
  DARKNESS: getLevelCurse(CurseID.DARKNESS),

  /**
   * 1 << 1 (2)
   *
   * Corresponds to `CurseID.LABYRINTH` (2).
   */
  LABYRINTH: getLevelCurse(CurseID.LABYRINTH),

  /**
   * 1 << 2 (4)
   *
   * Corresponds to `CurseID.LOST` (3).
   */
  LOST: getLevelCurse(CurseID.LOST),

  /**
   * 1 << 3 (8)
   *
   * Corresponds to `CurseID.UNKNOWN` (4).
   */
  UNKNOWN: getLevelCurse(CurseID.UNKNOWN),

  /**
   * 1 << 4 (16)
   *
   * Corresponds to `CurseID.CURSED` (5).
   */
  CURSED: getLevelCurse(CurseID.CURSED),

  /**
   * 1 << 5 (32)
   *
   * Corresponds to `CurseID.MAZE` (6).
   */
  MAZE: getLevelCurse(CurseID.MAZE),

  /**
   * 1 << 6 (64)
   *
   * Corresponds to `CurseID.BLIND` (7).
   */
  BLIND: getLevelCurse(CurseID.BLIND),

  /**
   * 1 << 7 (128)
   *
   * Corresponds to `CurseID.GIANT` (8).
   */
  GIANT: getLevelCurse(CurseID.GIANT),
} as const;

type LevelCurseValue = BitFlag & {
  readonly __levelCurseBrand: symbol;
};
type LevelCurseType = {
  readonly [K in keyof typeof LevelCurseInternal]: LevelCurseValue;
};

export const LevelCurse = LevelCurseInternal as LevelCurseType;
export type LevelCurse = LevelCurseType[keyof LevelCurseType];

export const LevelCurseZero = 0 as BitFlags<LevelCurse>;

/**
 * In the "enums.lua" file, the values of the `LevelCurse` enum are hardcoded. We compute them here
 * to have cleaner code.
 */
function getLevelCurse(curseID: int): int {
  return 1 << (curseID - 1);
}
