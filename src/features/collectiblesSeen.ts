import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { getCollectibleIndex } from "../functions/collectibles";
import { addSetsToSet } from "../functions/set";
import { CollectibleIndex } from "../types/CollectibleIndex";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "collectibles tracker";

const v = {
  run: {
    collectiblesSeenInPreviousRooms: new Set<CollectibleIndex>(),
    collectiblesSeenInThisRoom: new Set<CollectibleIndex>(),
  },
};

/** @internal */
export function collectiblesSeenInit(mod: ModUpgraded): void {
  saveDataManager("collectiblesSave", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PICKUP_INIT,
    postPickupInitCollectible,
    PickupVariant.PICKUP_COLLECTIBLE,
  ); // 34

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

// ModCallbacks.MC_POST_PICKUP_INIT (34)
// PickupVariant.PICKUP_COLLECTIBLE (100)
function postPickupInitCollectible(collectible: EntityPickup) {
  const collectibleIndex = getCollectibleIndex(collectible);
  v.run.collectiblesSeenInThisRoom.add(collectibleIndex);
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  addSetsToSet(
    v.run.collectiblesSeenInPreviousRooms,
    v.run.collectiblesSeenInThisRoom,
  );
  v.run.collectiblesSeenInThisRoom.clear();
}

/**
 * Helper function to determine if a collectible has been previously seen on the run before this
 * room was entered.
 */
export function isCollectiblePreviouslySeen(
  collectible: EntityPickup,
): boolean {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  if (collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot request if the following pickup variant is previously seen: ${collectible.Variant}`,
    );
  }

  const collectibleIndex = getCollectibleIndex(collectible);
  return v.run.collectiblesSeenInPreviousRooms.has(collectibleIndex);
}
