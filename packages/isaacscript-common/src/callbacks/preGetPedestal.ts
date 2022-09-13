import {
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  preGetPedestalFire,
  preGetPedestalHasSubscriptions,
} from "./subscriptions/preGetPedestal";

export function preGetPedestalInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.PRE_PICKUP_COLLISION,
    prePickupCollision,
    PickupVariant.COLLECTIBLE,
  ); // 38
}

function hasSubscriptions() {
  return preGetPedestalHasSubscriptions();
}

// ModCallback.PRE_PICKUP_COLLISION (35)
function prePickupCollision(
  pickup: EntityPickup,
  collider: Entity,
  _low: boolean,
): boolean | undefined {
  if (!hasSubscriptions()) {
    return undefined;
  }

  const collectible = pickup as EntityPickupCollectible;

  if (collectible.SubType === CollectibleType.NULL) {
    return undefined;
  }

  const player = collider.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  const numCoins = player.GetNumCoins();
  if (collectible.Price > numCoins) {
    return undefined;
  }

  // Collectibles have a special variable to prevent them from being picked up for a certain time.
  // Players have special variable to prevent them from picking up a collectible for a certain time.
  if (collectible.Wait > 0 || player.ItemHoldCooldown > 0) {
    return undefined;
  }

  if (player.IsHoldingItem()) {
    return undefined;
  }

  return preGetPedestalFire(player, collectible);
}
