import { HeartSubType } from "isaac-typescript-definitions";

/** Used by the `getPlayerHealth` and `setPlayerHealth` helper functions. */
export interface PlayerHealth {
  maxHearts: int;
  hearts: int;
  eternalHearts: int;
  soulHearts: int;
  boneHearts: int;
  goldenHearts: int;
  rottenHearts: int;
  brokenHearts: int;
  soulCharges: int;
  bloodCharges: int;
  soulHeartTypes: HeartSubType[];
}
