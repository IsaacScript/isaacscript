import { CollectibleType, ItemConfigTag } from "isaac-typescript-definitions";
import { isHiddenCollectible, isPassiveCollectible } from "./collectibles";
import { getCollectibleSet } from "./collectibleSet";
import { collectibleHasTag } from "./collectibleTag";
import { getRandomSeed } from "./rng";
import { copySet, getRandomSetElement } from "./set";

const EDEN_PASSIVE_COLLECTIBLES_SET = new Set<CollectibleType>();

function initCollectibleSet() {
  const collectibleSet = getCollectibleSet();

  for (const collectibleType of collectibleSet.values()) {
    if (
      isPassiveCollectible(collectibleType) &&
      !isHiddenCollectible(collectibleType) &&
      !collectibleHasTag(collectibleType, ItemConfigTag.NO_EDEN)
    ) {
      EDEN_PASSIVE_COLLECTIBLES_SET.add(collectibleType);
    }
  }
}

export function getEdenPassives(): Set<CollectibleType> {
  // Lazy initialize the set.
  if (EDEN_PASSIVE_COLLECTIBLES_SET.size === 0) {
    initCollectibleSet();
  }

  return copySet(EDEN_PASSIVE_COLLECTIBLES_SET);
}

export function getRandomEdenPassive(
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: CollectibleType[] | readonly CollectibleType[] = [],
): CollectibleType {
  // Lazy initialize the set.
  if (EDEN_PASSIVE_COLLECTIBLES_SET.size === 0) {
    initCollectibleSet();
  }

  return getRandomSetElement(
    EDEN_PASSIVE_COLLECTIBLES_SET,
    seedOrRNG,
    exceptions,
  );
}
