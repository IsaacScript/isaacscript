/* eslint-disable sort-exports/sort-exports */

export const DEFAULT_COIN_VALUE = 1;

export const COIN_SUBTYPE_TO_VALUE: { readonly [key in CoinSubType]: int } = {
  [CoinSubType.COIN_PENNY]: 1, // 1
  [CoinSubType.COIN_NICKEL]: 5, // 2
  [CoinSubType.COIN_DIME]: 10, // 3
  [CoinSubType.COIN_DOUBLEPACK]: 2, // 4
  [CoinSubType.COIN_LUCKYPENNY]: 1, // 5
  [CoinSubType.COIN_STICKYNICKEL]: 5, // 6
  [CoinSubType.COIN_GOLDEN]: 1, // 7
};
