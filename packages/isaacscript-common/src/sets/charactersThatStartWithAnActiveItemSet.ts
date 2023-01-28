import { PlayerType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const CHARACTERS_THAT_START_WITH_AN_ACTIVE_ITEM_SET =
  new ReadonlySet<PlayerType>([
    PlayerType.ISAAC, // 0
    PlayerType.MAGDALENE, // 1
    PlayerType.JUDAS, // 3
    PlayerType.BLUE_BABY, // 4
    PlayerType.EVE, // 5
    PlayerType.EDEN, // 9
    PlayerType.LOST, // 10
    PlayerType.LILITH, // 13
    PlayerType.KEEPER, // 14
    PlayerType.APOLLYON, // 15
    PlayerType.EDEN_B, // 30
  ]);
