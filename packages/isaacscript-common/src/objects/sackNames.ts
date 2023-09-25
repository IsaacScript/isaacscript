import { SackSubType } from "isaac-typescript-definitions";

export const DEFAULT_SACK_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const SACK_NAMES = {
  [SackSubType.NULL]: DEFAULT_SACK_NAME, // 0
  [SackSubType.NORMAL]: "Grab Bag", // 1
  [SackSubType.BLACK]: "Black Sack", // 2
} as const satisfies Record<SackSubType, string>;
