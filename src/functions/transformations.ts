import {
  ITEM_TO_TRANSFORMATION_MAP,
  TRANSFORMATIONS_NOT_BASED_ON_ITEMS,
  TRANSFORMATION_TO_ITEMS_MAP,
} from "../transformationMap";
import { copySet } from "./util";

/** Returns the number of items that a player has towards a particular transformation. */
export function getPlayerNumTransformationCollectibles(
  player: EntityPlayer,
  playerForm: PlayerForm,
): int {
  if (TRANSFORMATIONS_NOT_BASED_ON_ITEMS.has(playerForm)) {
    error(
      `The transformation of ${playerForm} cannot be tracked by this function.`,
    );
  }

  const itemsForTransformation = TRANSFORMATION_TO_ITEMS_MAP.get(playerForm);
  if (itemsForTransformation === undefined) {
    error(
      `The transformation of ${playerForm} is not a valid value of the PlayerForm enum.`,
    );
  }

  let numCollectibles = 0;
  for (const collectibleType of itemsForTransformation.values()) {
    numCollectibles += player.GetCollectibleNum(collectibleType);
  }

  return numCollectibles;
}

export function getTransformationsForItem(
  collectibleType: CollectibleType | int,
): Set<PlayerForm> {
  const transformations = ITEM_TO_TRANSFORMATION_MAP.get(collectibleType);
  return transformations === undefined ? new Set() : copySet(transformations);
}
