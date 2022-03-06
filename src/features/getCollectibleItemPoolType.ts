// The item pool type of a collectible is not stored on the collectible
// Thus, we scan for incoming item pool types in the PreGetCollectible callback,
// and then assume that the next spawned collectible has this item pool type

import { getUpgradeErrorMsg } from "../errors";
import { getEntityID } from "../functions/entity";
import { getRoomItemPoolType } from "../functions/rooms";
import { ModUpgraded } from "../types/ModUpgraded";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "get collectible item pool type";

let initialized = false;

const v = {
  run: {
    collectibleItemPoolTypeMap: new Map<PtrHash, ItemPoolType>(),
  },
};

/** @internal */
export function getCollectibleItemPoolTypeInit(mod: ModUpgraded): void {
  initialized = true;
  saveDataManager("getCollectibleItemPoolType", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PICKUP_INIT,
    postPickupInitCollectible,
    PickupVariant.PICKUP_COLLECTIBLE,
  ); // 34
}

// ModCallbacks.MC_POST_PICKUP_INIT (34)
// PickupVariant.PICKUP_COLLECTIBLE (100)
function postPickupInitCollectible(pickup: EntityPickup) {
  const game = Game();
  const itemPool = game.GetItemPool();
  const ptrHash = GetPtrHash(pickup);
  const lastItemPoolType = itemPool.GetLastPool();

  v.run.collectibleItemPoolTypeMap.set(ptrHash, lastItemPoolType);
}

/**
 * Helper function to get the item pool type that a given collectible came from. Since there is no
 * native method in the API to get this, we listen in the PreGetCollectible callback for item pool
 * types, and then assume that the next spawned collectible will match.
 */
export function getCollectibleItemPoolType(
  collectible: EntityPickup,
): ItemPoolType {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  if (
    collectible.Type !== EntityType.ENTITY_PICKUP ||
    collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE
  ) {
    const entityID = getEntityID(collectible);
    error(
      `The "getCollectibleItemPoolType()" function was given a non-collectible: ${entityID}`,
    );
  }

  const ptrHash = GetPtrHash(collectible);
  const itemPoolType = v.run.collectibleItemPoolTypeMap.get(ptrHash);
  return itemPoolType === undefined ? getRoomItemPoolType() : itemPoolType;
}
