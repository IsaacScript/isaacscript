// This provides the logic for the following callbacks:
// - PostPlayerCollectibleAdded
// - PostPlayerCollectibleRemoved

import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerCollectibleMap } from "../functions/player";
import {
  defaultMapGetPlayer,
  mapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
import { repeat } from "../functions/utils";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerCollectibleAddedFire,
  postPlayerCollectibleAddedHasSubscriptions,
} from "./subscriptions/postPlayerCollectibleAdded";
import {
  postPlayerCollectibleRemovedFire,
  postPlayerCollectibleRemovedHasSubscriptions,
} from "./subscriptions/postPlayerCollectibleRemoved";

const v = {
  run: {
    playersCollectibleCount: new Map<PlayerIndex, int>(),
    playersCollectibleMap: new DefaultMap<
      PlayerIndex,
      Map<CollectibleType, int>
    >(() => new Map()),
  },
};

/** @internal */
export function postPlayerCollectibleCallbacksInit(mod: Mod): void {
  saveDataManager("postPlayerCollectible", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
}

function hasSubscriptions() {
  return (
    postPlayerCollectibleAddedHasSubscriptions() ||
    postPlayerCollectibleRemovedHasSubscriptions()
  );
}

// ModCallback.POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const oldCollectibleCount = mapGetPlayer(
    v.run.playersCollectibleCount,
    player,
  );
  const newCollectibleCount = player.GetCollectibleCount();
  mapSetPlayer(v.run.playersCollectibleCount, player, newCollectibleCount);

  if (oldCollectibleCount === undefined) {
    return;
  }

  const difference = newCollectibleCount - oldCollectibleCount;

  if (difference > 0) {
    collectibleCountChanged(player, difference, true);
  } else if (difference < 0) {
    collectibleCountChanged(player, difference * -1, false);
  }
}

function collectibleCountChanged(
  player: EntityPlayer,
  numCollectiblesChanged: int,
  increased: boolean,
) {
  const oldCollectibleMap = defaultMapGetPlayer(
    v.run.playersCollectibleMap,
    player,
  );
  const newCollectibleMap = getPlayerCollectibleMap(player);
  mapSetPlayer(v.run.playersCollectibleMap, player, newCollectibleMap);

  const collectibleTypes = [
    ...oldCollectibleMap.keys(),
    ...newCollectibleMap.keys(),
  ];
  collectibleTypes.sort();

  let numFired = 0;
  for (const collectibleType of collectibleTypes) {
    const oldNum = oldCollectibleMap.get(collectibleType) ?? 0;
    const newNum = newCollectibleMap.get(collectibleType) ?? 0;
    const difference = Math.abs(newNum - oldNum);

    repeat(difference, () => {
      if (increased) {
        postPlayerCollectibleAddedFire(player, collectibleType);
      } else {
        postPlayerCollectibleRemovedFire(player, collectibleType);
      }
      numFired++;
    });

    if (numFired === numCollectiblesChanged) {
      return;
    }
  }
}
