import type { TearFlag } from "isaac-typescript-definitions";

/**
 * These are the possible types that player stats can be. For example, `EntityPlayer.Damage` is of
 * type `float`, `EntityPlayer.CanFly` is of type `boolean`, and so on.
 */
export type PossibleStatType =
  | number
  | boolean
  | BitFlags<TearFlag>
  | Color
  | Vector;
