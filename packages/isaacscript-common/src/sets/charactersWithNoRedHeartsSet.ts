import { PlayerType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

/**
 * The set of characters where red heart containers will be turned into soul hearts (e.g. Blue
 * Baby). This includes The Lost and Tainted Lost. This does not include Keeper or Tainted Keeper.
 */
export const CHARACTERS_WITH_NO_RED_HEARTS_SET = new ReadonlySet<PlayerType>([
  PlayerType.BLUE_BABY, // 4
  PlayerType.LOST, // 10
  PlayerType.DARK_JUDAS, // 12
  PlayerType.JUDAS_B, // 24
  PlayerType.BLUE_BABY_B, // 25
  PlayerType.LOST_B, // 31
  PlayerType.FORGOTTEN_B, // 35
  PlayerType.BETHANY_B, // 36
]);
