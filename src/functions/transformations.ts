import {
  ITEM_TO_TRANSFORMATION_MAP,
  TRANSFORMATIONS_NOT_BASED_ON_ITEMS,
  TRANSFORMATION_TO_ITEMS_MAP,
} from "../maps/transformationMaps";
import { TRANSFORMATION_NAME_MAP } from "../maps/transformationNameMap";
import { arrayCopy } from "./array";

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
  for (const collectibleType of itemsForTransformation) {
    numCollectibles += player.GetCollectibleNum(collectibleType);
  }

  return numCollectibles;
}

export function getTransformationsForItem(
  collectibleType: CollectibleType | int,
): PlayerForm[] {
  const transformations = ITEM_TO_TRANSFORMATION_MAP.get(collectibleType);
  return transformations === undefined ? [] : arrayCopy(transformations);
}

/**
 * Helper function to get a transformation name from a PlayerForm enum.
 *
 * Example:
 * ```
 * const transformationName = getTransformationName(PlayerForm.PLAYERFORM_LORD_OF_THE_FLIES);
 * // transformationName is "Beelzebub"
 * ```
 */
export function getTransformationName(transformation: PlayerForm): string {
  const defaultName = "Unknown";

  const transformationName = TRANSFORMATION_NAME_MAP.get(transformation);
  return transformationName === undefined ? defaultName : transformationName;
}
