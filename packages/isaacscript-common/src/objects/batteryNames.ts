import { BatterySubType } from "isaac-typescript-definitions";

export const DEFAULT_BATTERY_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const BATTERY_NAMES = {
  [BatterySubType.NULL]: DEFAULT_BATTERY_NAME, // 0
  [BatterySubType.NORMAL]: "Lil' Battery", // 1
  [BatterySubType.MICRO]: "Micro Battery", // 2
  [BatterySubType.MEGA]: "Mega Battery", // 3
  [BatterySubType.GOLDEN]: "Golden Battery", // 4
} as const satisfies Record<BatterySubType, string>;
