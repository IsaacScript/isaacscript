import {
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postCollectibleEmptyFire,
  postCollectibleEmptyHasSubscriptions,
} from "./subscriptions/postCollectibleEmpty";

const v = {
  room: {
    collectibleTypeMap: new Map<PtrHash, CollectibleType>(),
  },
};

export function postCollectibleEmptyInit(mod: Mod): void {
  saveDataManager("postCollectibleEmpty", v, hasSubscriptions);

  mod.AddCallback(
    ModCallback.POST_PICKUP_UPDATE,
    postPickupUpdateCollectible,
    PickupVariant.COLLECTIBLE,
  ); // 35
}

function hasSubscriptions() {
  return postCollectibleEmptyHasSubscriptions();
}

// ModCallback.POST_PICKUP_UPDATE (35)
// PickupVariant.COLLECTIBLE (100)
function postPickupUpdateCollectible(pickup: EntityPickup) {
  const collectible = pickup as EntityPickupCollectible;
  const ptrHash = GetPtrHash(collectible);
  let oldCollectibleType = v.room.collectibleTypeMap.get(ptrHash);
  if (oldCollectibleType === undefined) {
    oldCollectibleType = collectible.SubType;
  }
  v.room.collectibleTypeMap.set(ptrHash, collectible.SubType);

  if (oldCollectibleType === collectible.SubType) {
    return;
  }

  if (collectible.SubType === CollectibleType.NULL) {
    postCollectibleEmptyFire(collectible, oldCollectibleType);
  }
}
