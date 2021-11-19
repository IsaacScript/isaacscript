import { saveDataManager } from "../features/saveDataManager/exports";
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
    playerHoldingItemLastFrameMap: new Map<PlayerIndex, boolean>(),
  },
};

export function postPurchaseCallbackInit(mod: Mod): void {
  saveDataManager("postPurchase", v, hasSubscriptions);

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
  checkPickupsPurchased(pickups, players);
  storePickupsInMap(pickups);
  storePlayersInMap(players);
}

function checkPickupsPurchased(pickups: Entity[], players: EntityPlayer[]) {
  for (const [index, pickupDescription] of v.room.pickupMap.entries()) {
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
      const playerHoldingItemLastFrame =
        v.room.playerHoldingItemLastFrameMap.get(playerIndex);
      if (playerHoldingItemLastFrame === undefined) {
        continue;
      }

      if (!playerHoldingItemLastFrame && playerHoldingItem) {
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
    if (pickup === undefined || pickup.Price === 0) {
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
    v.room.playerHoldingItemLastFrameMap.set(playerIndex, holdingItem);
  }
}

function pickupIndexExists(index: int, pickups: Entity[]) {
  for (const entity of pickups) {
    if (entity.Index === index && entity.Exists()) {
      return true;
    }
  }

  return false;
}
