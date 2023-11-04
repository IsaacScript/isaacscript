import { PlayerType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

/**
 * The set of characters where soul hearts will be automatically stripped away (e.g. Bethany). This
 * includes The Lost and Tainted Lost.
 */
export const CHARACTERS_WITH_NO_SOUL_HEARTS_SET = new ReadonlySet<PlayerType>([
  PlayerType.LOST, // 10
  PlayerType.KEEPER, // 14
  PlayerType.BETHANY, // 18
  PlayerType.LOST_B, // 31
  PlayerType.KEEPER_B, // 33
]);
