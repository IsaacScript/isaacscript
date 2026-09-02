import type { HeartSubType } from "isaac-typescript-definitions";

/** This is used by the `getPlayerHealth` and `setPlayerHealth` helper functions. */
export interface PlayerHealth {
  readonly maxHearts: int;
  readonly hearts: int;
  readonly eternalHearts: int;

  /** For soul hearts to apply, they also have to be specified in the `soulHeartTypes` array. */
  readonly soulHearts: int;

  /** For bone hearts to apply, they also have to be specified in the `soulHeartTypes` array. */
  readonly boneHearts: int;

  readonly goldenHearts: int;
  readonly rottenHearts: int;
  readonly brokenHearts: int;
  readonly soulCharges: int;
  readonly bloodCharges: int;

  readonly soulHeartTypes: readonly SoulHeartType[];
}

export type SoulHeartType =
  | HeartSubType.SOUL // 3
  | HeartSubType.BLACK // 6
  | HeartSubType.BONE; // 11
