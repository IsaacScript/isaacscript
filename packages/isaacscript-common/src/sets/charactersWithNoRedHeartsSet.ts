import { PlayerType } from "isaac-typescript-definitions";

/**
 * The set of characters where red heart containers will be turned into soul hearts (e.g. Blue
 * Baby). This includes The Lost and Tainted Lost. This does not include Keeper or Tainted Keeper.
 */
export const CHARACTERS_WITH_NO_RED_HEARTS_SET: ReadonlySet<PlayerType> =
  new Set([
    PlayerType.BLUE_BABY, // 4
    PlayerType.THE_LOST, // 10
    PlayerType.BLACK_JUDAS, // 12
    PlayerType.JUDAS_B, // 24
    PlayerType.BLUE_BABY_B, // 25
    PlayerType.THE_LOST_B, // 31
    PlayerType.THE_FORGOTTEN_B, // 35
    PlayerType.BETHANY_B, // 36
  ]);
