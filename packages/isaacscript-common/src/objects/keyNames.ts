import { KeySubType } from "isaac-typescript-definitions";

export const DEFAULT_KEY_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const KEY_NAMES = {
  [KeySubType.NULL]: DEFAULT_KEY_NAME, // 0
  [KeySubType.NORMAL]: "Key", // 1
  [KeySubType.GOLDEN]: "Golden Key", // 2
  [KeySubType.DOUBLE_PACK]: "Key Ring", // 3
  [KeySubType.CHARGED]: "Charged Key", // 4
} as const satisfies Record<KeySubType, string>;
