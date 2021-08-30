import { saveDataManager } from "../features/saveDataManager/main";
import { getPlayerIndex, getPlayers, PlayerIndex } from "../functions/player";
import * as postPurchase from "./subscriptions/postPurchase";

interface PickupDescription {
  variant: PickupVariant;
  subtype: int;
  price: int;
}

const v = {
  room: {
    /** Indexed by EntityPickup.Index. Only tracks pickups with a price. */
    pickupMap: new Map<int, PickupDescription>(),
    playerHoldingItemMap: new Map<PlayerIndex, boolean>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPurchaseCallback", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
}

function hasSubscriptions() {
  return postPurchase.hasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const pickups = Isaac.FindByType(EntityType.ENTITY_PICKUP);
  const players = getPlayers();
  checkPickupsGone(pickups, players);
  storePickupsInMap(pickups);
  storePlayersInMap(players);
}

function checkPickupsGone(pickups: Entity[], players: EntityPlayer[]) {
  for (const [index, pickupDescription] of v.room.pickupMap) {
    // First, see if a pickup that existed on the last frame is now gone
    if (pickupIndexExists(index, pickups)) {
      continue;
    }

    // The item has disappeared
    v.room.pickupMap.delete(index);

    // Second, find a player that was not holding an item on the previous frame,
    // but is holding an item now
    for (const player of players) {
      const playerHoldingItem = player.IsHoldingItem();
      const playerIndex = getPlayerIndex(player);
      const playerHoldingItemOnLastFrame =
        v.room.playerHoldingItemMap.get(playerIndex);
      if (playerHoldingItemOnLastFrame === undefined) {
        continue;
      }
      if (!playerHoldingItemOnLastFrame && playerHoldingItem) {
        // Assume that this is the player that purchased the pickup
        postPurchase.fire(
          player,
          pickupDescription.variant,
          pickupDescription.subtype,
          pickupDescription.price,
        );

        break;
      }
    }
  }
}

function storePickupsInMap(pickups: Entity[]) {
  for (const entity of pickups) {
    const pickup = entity.ToPickup();
    if (pickup === null || pickup.Price === 0) {
      continue;
    }

    v.room.pickupMap.set(pickup.Index, {
      variant: pickup.Variant,
      subtype: pickup.SubType,
      price: pickup.Price,
    });
  }
}

function storePlayersInMap(players: EntityPlayer[]) {
  for (const player of players) {
    const playerIndex = getPlayerIndex(player);
    const holdingItem = player.IsHoldingItem();
    v.room.playerHoldingItemMap.set(playerIndex, holdingItem);
  }
}

function pickupIndexExists(index: int, pickups: Entity[]) {
  for (const entity of pickups) {
    if (entity.Index === index) {
      return true;
    }
  }

  return false;
}
