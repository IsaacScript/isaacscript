import { saveDataManager } from "../features/saveDataManager/exports";
import { getPickups } from "../functions/pickups";
import { getPlayerIndex, getPlayers } from "../functions/player";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPurchaseFire,
  postPurchaseHasSubscriptions,
} from "./subscriptions/postPurchase";

interface PickupDescription {
  variant: PickupVariant | int;
  subType: int;
  price: int;
}

const v = {
  room: {
    /** Indexed by EntityPickup.Index. Only tracks pickups with a price. */
    pickupMap: new Map<int, PickupDescription>(),
    playerHoldingItemLastFrameMap: new Map<PlayerIndex, boolean>(),
  },
};

/** @internal */
export function postPurchaseCallbackInit(mod: Mod): void {
  saveDataManager("postPurchase", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
}

function hasSubscriptions() {
  return postPurchaseHasSubscriptions();
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const pickups = getPickups();
  const players = getPlayers();
  checkPickupsPurchased(pickups, players);
  storePickupsInMap(pickups);
  storePlayersInMap(players);
}

function checkPickupsPurchased(
  pickups: EntityPickup[],
  players: EntityPlayer[],
) {
  for (const [index, pickupDescription] of v.room.pickupMap.entries()) {
    // First, see if a pickup that existed on the last frame is now gone
    if (pickupAtIndexStillExists(index, pickups)) {
      continue;
    }

    // The item has disappeared
    v.room.pickupMap.delete(index);

    const player = getPlayerThatIsNoLongerHoldingAnItem(players);
    if (player !== undefined) {
      // Assume that this is the player that purchased the pickup
      postPurchaseFire(
        player,
        pickupDescription.variant,
        pickupDescription.subType,
        pickupDescription.price,
      );
    }
  }
}

/** Find a player that was not holding an item on the previous frame, but is holding an item now. */
function getPlayerThatIsNoLongerHoldingAnItem(players: EntityPlayer[]) {
  return players.find((player) => {
    const playerHoldingItem = player.IsHoldingItem();
    const playerIndex = getPlayerIndex(player);
    const playerHoldingItemLastFrame =
      v.room.playerHoldingItemLastFrameMap.get(playerIndex);
    return playerHoldingItemLastFrame === false && playerHoldingItem;
  });
}

function storePickupsInMap(pickups: EntityPickup[]) {
  const pickupsWithPrice = pickups.filter((pickup) => pickup.Price !== 0);

  for (const pickup of pickupsWithPrice) {
    v.room.pickupMap.set(pickup.Index, {
      variant: pickup.Variant,
      subType: pickup.SubType,
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

function pickupAtIndexStillExists(index: int, pickups: EntityPickup[]) {
  const pickupAtIndex = pickups.find((pickup) => pickup.Index);
  return pickupAtIndex !== undefined && pickupAtIndex.Exists();
}
