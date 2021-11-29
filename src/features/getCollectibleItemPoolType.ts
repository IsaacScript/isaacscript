// The item pool type of a collectible is not stored on the collectible
// Thus, we scan for incoming item pool types in the PreGetCollectible callback,
// and then assume that the next spawned collectible has this item pool type

import { getUpgradeErrorMsg } from "../errors";
import { arrayEmpty } from "../functions/array";
import {
  getRoomIndex,
  getRoomItemPoolType,
  getRoomVisitedCount,
} from "../functions/rooms";
import { ModUpgraded } from "../types/ModUpgraded";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "get collectible item pool type";

let initialized = false;

const v = {
  // We can't use the save data manager room resetting feature since the PreGetCollectible callback
  // fires before the PostNewRoom callback
  run: {
    collectibleQueue: [] as ItemPoolType[],
    collectibleItemPoolTypeMap: new Map<PtrHash, ItemPoolType>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

/** @hidden */
export function getCollectibleItemPoolTypeInit(mod: ModUpgraded): void {
  initialized = true;
  saveDataManager("getCollectibleItemPoolType", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PICKUP_INIT,
    postPickupInitCollectible,
    PickupVariant.PICKUP_COLLECTIBLE,
  ); // 34
  mod.AddCallback(ModCallbacks.MC_PRE_GET_COLLECTIBLE, preGetCollectible); // 62
}

// ModCallbacks.MC_POST_PICKUP_INIT (34)
// PickupVariant.PICKUP_COLLECTIBLE (100)
function postPickupInitCollectible(pickup: EntityPickup) {
  const itemPoolType = v.run.collectibleQueue.shift();
  if (itemPoolType === undefined) {
    return;
  }

  const ptrHash = GetPtrHash(pickup);
  v.run.collectibleItemPoolTypeMap.set(ptrHash, itemPoolType);
}

// ModCallbacks.MC_PRE_GET_COLLECTIBLE (62)
function preGetCollectible(
  itemPoolType: ItemPoolType,
  _decrease: boolean,
  _seed: int,
) {
  const roomIndex = getRoomIndex();
  const roomVisitedCount = getRoomVisitedCount();
  if (
    roomIndex !== v.run.currentRoomIndex ||
    roomVisitedCount !== v.run.currentRoomVisitedCount
  ) {
    v.run.currentRoomIndex = roomIndex;
    v.run.currentRoomVisitedCount = roomVisitedCount;

    arrayEmpty(v.run.collectibleQueue);
    v.run.collectibleItemPoolTypeMap.clear();
  }

  v.run.collectibleQueue.push(itemPoolType);
}

/**
 * Helper function to get the item pool type that a given collectible came from. Since there is no
 * native method in the API to get this, IsaacScript listens in the PreGetCollectible callback for
 * item pool types, and then assumes that the next spawned collectible will match.
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
    error(
      `The "getCollectibleItemPoolType()" function was given a non-collectible: ${collectible.Type}.${collectible.Variant}.${collectible.SubType}`,
    );
  }

  const ptrHash = GetPtrHash(collectible);
  const itemPoolType = v.run.collectibleItemPoolTypeMap.get(ptrHash);
  return itemPoolType === undefined ? getRoomItemPoolType() : itemPoolType;
}
