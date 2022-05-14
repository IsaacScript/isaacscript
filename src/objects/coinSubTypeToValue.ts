import { CoinSubType } from "isaac-typescript-definitions";

export const DEFAULT_COIN_VALUE = 1;

export const COIN_SUBTYPE_TO_VALUE: { readonly [key in CoinSubType]: int } = {
  [CoinSubType.NULL]: 0, // 0
  [CoinSubType.PENNY]: 1, // 1
  [CoinSubType.NICKEL]: 5, // 2
  [CoinSubType.DIME]: 10, // 3
  [CoinSubType.DOUBLE_PACK]: 2, // 4
  [CoinSubType.LUCKY_PENNY]: 1, // 5
  [CoinSubType.STICKY_NICKEL]: 5, // 6
  [CoinSubType.GOLDEN]: 1, // 7
};
