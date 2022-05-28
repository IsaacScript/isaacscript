import { TrinketType } from "isaac-typescript-definitions";

/** Used by the `temporarilyRemoveTrinkets` and related helper functions. */
export interface TrinketSituation {
  trinketTypeRemoved: TrinketType;
  trinketType1: TrinketType;
  trinketType2: TrinketType;
  numSmeltedTrinkets: int;
}
