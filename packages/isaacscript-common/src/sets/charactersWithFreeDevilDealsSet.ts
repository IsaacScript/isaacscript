import { PlayerType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const CHARACTERS_WITH_FREE_DEVIL_DEALS_SET = new ReadonlySet<PlayerType>(
  [PlayerType.LOST, PlayerType.LOST_B, PlayerType.JACOB_2_B],
);
