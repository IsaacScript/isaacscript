import { CoinSubType } from "isaac-typescript-definitions";

export const DEFAULT_COIN_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const COIN_NAMES = {
  [CoinSubType.NULL]: DEFAULT_COIN_NAME, // 0
  [CoinSubType.PENNY]: "Penny", // 1
  [CoinSubType.NICKEL]: "Nickel", // 2
  [CoinSubType.DIME]: "Dime", // 3
  [CoinSubType.DOUBLE_PACK]: "Double Penny", // 4
  [CoinSubType.LUCKY_PENNY]: "Lucky Penny", // 5
  [CoinSubType.STICKY_NICKEL]: "Sticky Nickel", // 6
  [CoinSubType.GOLDEN]: "Golden Penny", // 7
} as const satisfies Record<CoinSubType, string>;
