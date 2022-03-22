/**
 * The new soul heart values are missing from the vanilla enum, so this enum is temporarily marked
 * as being a const enum. When it is added to the vanilla game, this will go back to being a normal
 * enum.
 */
declare const enum PickupPrice {
  PRICE_ONE_HEART = -1,
  PRICE_TWO_HEARTS = -2,
  PRICE_THREE_SOULHEARTS = -3,
  PRICE_ONE_HEART_AND_TWO_SOULHEARTS = -4,
  PRICE_SPIKES = -5,
  PRICE_SOUL = -6,
  PRICE_ONE_SOUL_HEART = -7,
  PRICE_TWO_SOUL_HEARTS = -8,
  PRICE_ONE_HEART_AND_ONE_SOUL_HEART = -9,
  PRICE_FREE = -1000,
}
