import type { HeartSubType } from "isaac-typescript-definitions";

/** This is used by the `getPlayerHealth` and `setPlayerHealth` helper functions. */
export interface PlayerHealth {
  maxHearts: int;
  hearts: int;
  eternalHearts: int;

  /** For soul hearts to apply, they also have to be specified in the `soulHeartTypes` array. */
  soulHearts: int;

  /** For bone hearts to apply, they also have to be specified in the `soulHeartTypes` array. */
  boneHearts: int;

  goldenHearts: int;
  rottenHearts: int;
  brokenHearts: int;
  soulCharges: int;
  bloodCharges: int;

  soulHeartTypes: SoulHeartType[];
}

export type SoulHeartType =
  | HeartSubType.SOUL // 3
  | HeartSubType.BLACK // 6
  | HeartSubType.BONE; // 11
