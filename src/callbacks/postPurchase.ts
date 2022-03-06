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

    /** Indexed by EntityPickup.Index. Only tracks collectibles with a price. */
    collectibleMap: new Map<int, PickupDescription>(),

    /**
     * Tracks whether or not the given player was holding an item on previous frames. The 0th
     * element is 1 frame ago, and the 1st element is 2 frames ago.
     */
    playersHoldingItemLastFramesMap: new DefaultMap<PlayerIndex, boolean[]>(
      () => [false, false],
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
  const pickupsWithPrice = pickups.filter((pickup) => pickup.Price !== 0);
  const nonCollectiblesWithPrice = pickupsWithPrice.filter(
    (pickup) => pickup.Variant !== PickupVariant.PICKUP_COLLECTIBLE,
  );
  const collectiblesWithPrice = pickupsWithPrice.filter(
    (pickup) => pickup.Variant === PickupVariant.PICKUP_COLLECTIBLE,
  );
  const players = getPlayers();

  checkPickupsPurchased(nonCollectiblesWithPrice, players);
  checkCollectiblesPurchased(collectiblesWithPrice, players);

  storePickupsInMap(nonCollectiblesWithPrice);
  storeCollectiblesInMap(collectiblesWithPrice);

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

    const player = getPlayerThatIsNoLongerHoldingAnItem(players, 2);
    if (player !== undefined) {
      // Assume that this is the player that purchased the pickup
      postPurchaseFire(player, pickupDescription);
    }
  }
}

function checkCollectiblesPurchased(
  collectiblesWithPrice: EntityPickup[],
  players: EntityPlayer[],
) {
  // When a collectible is purchased, it's sub-type changes to 0 for a single frame before the
  // pedestal is removed
  // Thus, we can track when collectibles are purchased by scanning for when the sub-type changes
  for (const collectible of collectiblesWithPrice) {
    const pickupDescription = v.room.collectibleMap.get(collectible.Index);
    if (pickupDescription === undefined) {
      // This collectible did not exist last frame, so there is nothing to compare it to
      continue;
    }

    if (
      pickupDescription.subType !== collectible.SubType &&
      collectible.SubType === CollectibleType.COLLECTIBLE_NULL
    ) {
      const player = getPlayerThatIsNoLongerHoldingAnItem(players, 1);
      if (player !== undefined) {
        // Assume that this is the player that purchased the pickup
        postPurchaseFire(player, pickupDescription);
      }
    }
  }
}

/** Find a player that was not holding an item on the previous frame, but is holding an item now. */
function getPlayerThatIsNoLongerHoldingAnItem(
  players: EntityPlayer[],
  numFramesAgo: int,
) {
  return players.find((player) => {
    const playerHoldingItemNow = player.IsHoldingItem();
    const playerIndex = getPlayerIndex(player);
    const playerHoldingItemLastFrames =
      v.room.playersHoldingItemLastFramesMap.getAndSetDefault(playerIndex);

    // 0th element --> 1 frame ago
    // 1st element --> 2 frames ago
    const playerHoldingItemNFramesAgo =
      playerHoldingItemLastFrames[numFramesAgo - 1];
    return !playerHoldingItemNFramesAgo && playerHoldingItemNow;
  });
}

function storePickupsInMap(nonCollectiblesWithPrice: EntityPickup[]) {
  v.room.pickupMap.clear();
  for (const pickup of nonCollectiblesWithPrice) {
    const pickupDescription = getPickupDescription(pickup);
    v.room.pickupMap.set(pickup.Index, pickupDescription);
  }
}

function storeCollectiblesInMap(collectiblesWithPrice: EntityPickup[]) {
  v.room.collectibleMap.clear();
  for (const collectible of collectiblesWithPrice) {
    const pickupDescription = getPickupDescription(collectible);
    v.room.collectibleMap.set(collectible.Index, pickupDescription);
  }
}

function storePlayersInMap(players: EntityPlayer[]) {
  for (const player of players) {
    const playerIndex = getPlayerIndex(player);
    const holdingItem = player.IsHoldingItem();
    const playerHoldingItemLastFrames =
      v.room.playersHoldingItemLastFramesMap.getAndSetDefault(playerIndex);
    const playerHoldingItemLastFrame = playerHoldingItemLastFrames[0];
    const newArray = [holdingItem, playerHoldingItemLastFrame];
    v.room.playersHoldingItemLastFramesMap.set(playerIndex, newArray);
  }
}
