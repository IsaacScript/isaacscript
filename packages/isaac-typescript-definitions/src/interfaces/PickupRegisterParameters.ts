import { PickupVariant } from "../enums/collections/variants";

export type PickupRegisterParameters<Args extends unknown[], Return> =
  | [
      callback: (pickup: EntityPickup, ...extraArgs: Args) => Return,
      pickupVariant?: PickupVariant,
    ]
  | [
      callback: (pickup: EntityPickupHeart, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.HEART, // 10
    ]
  | [
      callback: (pickup: EntityPickupCoin, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.COIN, // 20
    ]
  | [
      callback: (pickup: EntityPickupKey, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.KEY, // 30
    ]
  | [
      callback: (pickup: EntityPickupBomb, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.BOMB, // 40
    ]
  | [
      callback: (pickup: EntityPickupPoop, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.POOP, // 42
    ]
  | [
      callback: (pickup: EntityPickupSack, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.SACK, // 69
    ]
  | [
      callback: (pickup: EntityPickupPill, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.PILL, // 70
    ]
  | [
      callback: (pickup: EntityPickupBattery, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.LIL_BATTERY, // 90
    ]
  | [
      callback: (pickup: EntityPickupCollectible, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.COLLECTIBLE, // 100
    ]
  | [
      callback: (pickup: EntityPickupCard, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.TAROT_CARD, // 300
    ]
  | [
      callback: (pickup: EntityPickupTrinket, ...extraArgs: Args) => void,
      pickupVariant: PickupVariant.TRINKET, // 350
    ];
