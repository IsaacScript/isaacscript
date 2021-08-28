import {
  TRANSFORMATIONS_NOT_TRACKED,
  TRANSFORMATION_TO_ITEMS_MAP,
} from "../transformationMap";

/** Returns the number of items that a player has towards a particular transformation. */
export function getPlayerNumTransformationCollectibles(
  player: EntityPlayer,
  playerForm: PlayerForm,
): int {
  if (TRANSFORMATIONS_NOT_TRACKED.has(playerForm)) {
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
