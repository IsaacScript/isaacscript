import { saveDataManager } from "../features/saveDataManager/exports";
import { getPickups } from "../functions/pickups";
import { getPlayerIndex, getPlayers } from "../functions/player";
import { DefaultMap } from "../types/DefaultMap";
import {
  getPickupDescription,
  PickupDescription,
} from "../types/PickupDescription";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPurchaseFire,
  postPurchaseHasSubscriptions,
} from "./subscriptions/postPurchase";

const v = {
  room: {
    /** Indexed by EntityPickup.Index. Only tracks pickups with a price. */
    pickupMap: new Map<int, PickupDescription>(),

    playersHoldingItemOnLastFrameMap: new DefaultMap<PlayerIndex, boolean>(
      false,
    ),
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
  const pickupsWithPrice = pickups.filter(
    (pickup) => pickup.Exists() && pickup.Price !== 0,
  );
  const players = getPlayers();

  checkPickupsPurchased(pickupsWithPrice, players);
  storePickupsInMap(pickupsWithPrice);
  storePlayersInMap(players);
}

function checkPickupsPurchased(
  nonCollectiblesWithPrice: EntityPickup[],
  players: EntityPlayer[],
) {
  // We only handle tracking non-collectibles in this function,
  // since the general algorithm does not work in that special case
  const pickupIndexes = nonCollectiblesWithPrice.map((pickup) => pickup.Index);
  const pickupIndexSet = new Set(pickupIndexes);

  for (const [index, pickupDescription] of v.room.pickupMap.entries()) {
    if (pickupIndexSet.has(index)) {
      // The pickupDescription is from the previous frame,
      // and the corresponding index still exists on this frame
      continue;
    }

    const player = getPlayerThatIsNoLongerHoldingAnItem(players);
    if (player !== undefined) {
      // Assume that this is the player that purchased the pickup
      postPurchaseFire(player, pickupDescription);
    }
  }
}

/** Find a player that was not holding an item on the previous frame, but is holding an item now. */
function getPlayerThatIsNoLongerHoldingAnItem(players: EntityPlayer[]) {
  return players.find((player) => {
    const playerHoldingItemNow = player.IsHoldingItem();
    const playerIndex = getPlayerIndex(player);
    const playerHoldingItemOnLastFrame =
      v.room.playersHoldingItemOnLastFrameMap.getAndSetDefault(playerIndex);
    return !playerHoldingItemOnLastFrame && playerHoldingItemNow;
  });
}

function storePickupsInMap(nonCollectiblesWithPrice: EntityPickup[]) {
  v.room.pickupMap.clear();
  for (const pickup of nonCollectiblesWithPrice) {
    const pickupDescription = getPickupDescription(pickup);
    v.room.pickupMap.set(pickup.Index, pickupDescription);
  }
}

function storePlayersInMap(players: EntityPlayer[]) {
  for (const player of players) {
    const playerIndex = getPlayerIndex(player);
    const holdingItem = player.IsHoldingItem();
    v.room.playersHoldingItemOnLastFrameMap.set(playerIndex, holdingItem);
  }
}
