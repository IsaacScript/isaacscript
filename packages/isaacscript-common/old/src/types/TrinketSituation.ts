import { TrinketType } from "isaac-typescript-definitions";

export interface TrinketSituation {
  trinketTypeRemoved: TrinketType;
  trinketType1: TrinketType;
  trinketType2: TrinketType;
  numSmeltedTrinkets: int;
}
