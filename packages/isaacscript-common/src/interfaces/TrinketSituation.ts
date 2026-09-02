import type { TrinketType } from "isaac-typescript-definitions";

/** This is used by the `temporarilyRemoveTrinkets` and related helper functions. */
export interface TrinketSituation {
  readonly trinketTypeRemoved: TrinketType;
  readonly trinketType1: TrinketType;
  readonly trinketType2: TrinketType;
  readonly numSmeltedTrinkets: int;
}
