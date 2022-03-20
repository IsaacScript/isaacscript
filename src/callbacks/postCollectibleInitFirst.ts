import { saveDataManager } from "../features/saveDataManager/exports";
import { getCollectibleIndex } from "../functions/collectibles";
import { CollectibleIndex } from "../types/CollectibleIndex";
import {
  postCollectibleInitFirstFire,
  postCollectibleInitFirstHasSubscriptions,
} from "./subscriptions/postCollectibleInitFirst";

const v = {
  run: {
    seenCollectibles: new Set<CollectibleIndex>(),
  },
};

/** @internal */
export function postCollectibleInitFirstCallbackInit(mod: Mod): void {
  saveDataManager("postCollectibleInitFirst", v, hasSubscriptions);

  mod.AddCallback(
    ModCallbacks.MC_POST_PICKUP_INIT,
    postPickupInitCollectible,
    PickupVariant.PICKUP_COLLECTIBLE,
  ); // 34
}

function hasSubscriptions() {
  return postCollectibleInitFirstHasSubscriptions();
}

function postPickupInitCollectible(collectible: EntityPickup) {
  const collectibleIndex = getCollectibleIndex(collectible);
  if (v.run.seenCollectibles.has(collectibleIndex)) {
    return;
  }

  v.run.seenCollectibles.add(collectibleIndex);
  postCollectibleInitFirstFire(collectible);
}
