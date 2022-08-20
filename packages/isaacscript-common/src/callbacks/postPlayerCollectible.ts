// This provides the logic for the following callbacks:
// - `POST_PLAYER_COLLECTIBLE_ADDED`
// - `POST_PLAYER_COLLECTIBLE_REMOVED`

import {
  ActiveSlot,
  CollectibleType,
  ModCallback,
} from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { saveDataManager } from "../features/saveDataManager/exports";
import { arrayEquals } from "../functions/array";
import { getEnumValues } from "../functions/enums";
import {
  defaultMapGetPlayer,
  mapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
import { getPlayerCollectibleMap } from "../functions/players";
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
    playersActiveItemMap: new DefaultMap<
      PlayerIndex,
      Map<ActiveSlot, CollectibleType>
    >(() => new Map()),
  },
};

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
    collectibleCountChanged(player, difference);
  } else if (difference < 0) {
    collectibleCountChanged(player, difference * -1);
  } else if (difference === 0) {
    checkActiveItemsChanged(player);
  }
}

function collectibleCountChanged(
  player: EntityPlayer,
  numCollectiblesChanged: int,
) {
  const oldCollectibleMap = defaultMapGetPlayer(
    v.run.playersCollectibleMap,
    player,
  );
  const newCollectibleMap = getPlayerCollectibleMap(player);
  mapSetPlayer(v.run.playersCollectibleMap, player, newCollectibleMap);

  const collectibleTypeSet = new Set<CollectibleType>([
    ...oldCollectibleMap.keys(),
    ...newCollectibleMap.keys(),
  ]);

  let numFired = 0;
  for (const collectibleType of collectibleTypeSet.values()) {
    const oldNum = oldCollectibleMap.get(collectibleType) ?? 0;
    const newNum = newCollectibleMap.get(collectibleType) ?? 0;
    const difference = newNum - oldNum;
    const increased = difference > 0;
    const absoluteDifference = Math.abs(difference);

    repeat(absoluteDifference, () => {
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

/**
 * The special case is when a player swaps their active item for another active item. In this
 * situation, their overall collectible count will not change. Thus, we explicitly check for this.
 */
function checkActiveItemsChanged(player: EntityPlayer) {
  const activeItemMap = defaultMapGetPlayer(v.run.playersActiveItemMap, player);

  const oldCollectibleTypes: CollectibleType[] = [];
  const newCollectibleTypes: CollectibleType[] = [];

  for (const activeSlot of getEnumValues(ActiveSlot)) {
    const oldCollectibleType =
      activeItemMap.get(activeSlot) ?? CollectibleType.NULL;
    const newCollectibleType = player.GetActiveItem(activeSlot);
    activeItemMap.set(activeSlot, newCollectibleType);

    oldCollectibleTypes.push(oldCollectibleType);
    newCollectibleTypes.push(newCollectibleType);
  }

  // For example, it is possible for the player to switch Schoolbag items, which will cause the
  // collectibles in the array to be the same, but in a different order. Thus, sort both arrays
  // before comparing them.
  oldCollectibleTypes.sort();
  newCollectibleTypes.sort();

  if (!arrayEquals(oldCollectibleTypes, newCollectibleTypes)) {
    const collectibleTypeSet = new Set<CollectibleType>([
      ...oldCollectibleTypes,
      ...newCollectibleTypes,
    ]);
    activeItemsChanged(player, collectibleTypeSet);
  }
}

/**
 * One or more active items have changed (with the player's total collectible count remaining the
 * same).
 */
function activeItemsChanged(
  player: EntityPlayer,
  collectibleTypesSet: Set<CollectibleType>,
) {
  const oldCollectibleMap = defaultMapGetPlayer(
    v.run.playersCollectibleMap,
    player,
  );
  const newCollectibleMap = getPlayerCollectibleMap(player);
  mapSetPlayer(v.run.playersCollectibleMap, player, newCollectibleMap);

  for (const collectibleType of collectibleTypesSet.values()) {
    const oldNum = oldCollectibleMap.get(collectibleType) ?? 0;
    const newNum = newCollectibleMap.get(collectibleType) ?? 0;
    const difference = newNum - oldNum;
    const increased = difference > 0;
    const absoluteDifference = Math.abs(difference);

    repeat(absoluteDifference, () => {
      if (increased) {
        postPlayerCollectibleAddedFire(player, collectibleType);
      } else {
        postPlayerCollectibleRemovedFire(player, collectibleType);
      }
    });
  }
}
