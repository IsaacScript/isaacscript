export enum PickupPrice {
  /** `Pickup.Price` will be equal to 0 for non-purchasable pickups. */
  NULL = 0,

  ONE_HEART = -1,
  TWO_HEARTS = -2,
  THREE_SOUL_HEARTS = -3,
  ONE_HEART_AND_TWO_SOUL_HEARTS = -4,
  SPIKES = -5,

  /**
   * The price when you have the Your Soul trinket. (The collectible will be free and the trinket
   * will be consumed.)
   */
  YOUR_SOUL = -6,

  ONE_SOUL_HEART = -7,
  TWO_SOUL_HEARTS = -8,
  ONE_HEART_AND_ONE_SOUL_HEART = -9,
  FREE = -1000,
}
