import { TRANSFORMATION_NAME_MAP } from "../maps/transformationNameMap";
import { collectibleHasTag, getMaxCollectibleID } from "./collectibles";
import { copySet } from "./set";

const TRANSFORMATION_TO_TAG_MAP = new Map<PlayerForm, ItemConfigTag>([
  [PlayerForm.PLAYERFORM_GUPPY, ItemConfigTag.GUPPY], // 0
  [PlayerForm.PLAYERFORM_LORD_OF_THE_FLIES, ItemConfigTag.FLY], // 1
  [PlayerForm.PLAYERFORM_MUSHROOM, ItemConfigTag.MUSHROOM], // 2
  [PlayerForm.PLAYERFORM_ANGEL, ItemConfigTag.ANGEL], // 3
  [PlayerForm.PLAYERFORM_BOB, ItemConfigTag.BOB], // 4
  [PlayerForm.PLAYERFORM_DRUGS, ItemConfigTag.SYRINGE], // 5
  [PlayerForm.PLAYERFORM_MOM, ItemConfigTag.MOM], // 6
  [PlayerForm.PLAYERFORM_BABY, ItemConfigTag.BABY], // 7
  [PlayerForm.PLAYERFORM_EVIL_ANGEL, ItemConfigTag.DEVIL], // 8
  [PlayerForm.PLAYERFORM_POOP, ItemConfigTag.POOP], // 9
  [PlayerForm.PLAYERFORM_BOOK_WORM, ItemConfigTag.BOOK], // 10
  [PlayerForm.PLAYERFORM_SPIDERBABY, ItemConfigTag.SPIDER], // 12
]);

const TRANSFORMATIONS_NOT_BASED_ON_ITEMS = new Set<PlayerForm>([
  PlayerForm.PLAYERFORM_ADULTHOOD, // 11 (based on pill usage)
  PlayerForm.PLAYERFORM_STOMPY, // 13 (based on size)
  PlayerForm.PLAYERFORM_FLIGHT, // 14 (unused enum)
]);

const TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP = new Map<
  PlayerForm,
  Set<CollectibleType | int>
>();

const COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP = new Map<
  CollectibleType | int,
  Set<PlayerForm>
>();

function initMaps() {
  const maxCollectibleID = getMaxCollectibleID();

  // The transformation to items map should be valid for every transformation based on items,
  // so we initialize it with empty sets
  for (const playerForm of TRANSFORMATION_TO_TAG_MAP.keys()) {
    TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.set(playerForm, new Set());
  }

  for (
    let collectibleType = 1;
    collectibleType <= maxCollectibleID;
    collectibleType++
  ) {
    for (const [playerForm, tag] of TRANSFORMATION_TO_TAG_MAP.entries()) {
      if (!collectibleHasTag(collectibleType, tag)) {
        continue;
      }

      // Update the first map
      const collectibleTypesSet =
        TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.get(playerForm);
      if (collectibleTypesSet === undefined) {
        error(
          `Failed to get the collectible types for transformation: ${playerForm}`,
        );
      }
      collectibleTypesSet.add(collectibleType);

      // Update the second map
      let transformations =
        COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.get(collectibleType);
      if (transformations === undefined) {
        transformations = new Set();
        COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.set(
          collectibleType,
          transformations,
        );
      }
      transformations.add(playerForm);
    }
  }
}

export function getCollectibleTypesForTransformation(
  playerForm: PlayerForm,
): Set<PlayerForm> {
  // Lazy initialize the map
  if (TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.size === 0) {
    initMaps();
  }

  const collectibleTypes =
    TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.get(playerForm);
  return collectibleTypes === undefined ? new Set() : copySet(collectibleTypes);
}

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

  // Lazy initialize the map
  if (TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.size === 0) {
    initMaps();
  }

  const itemsForTransformation =
    TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.get(playerForm);
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

export function getTransformationsForCollectibleType(
  collectibleType: CollectibleType | int,
): Set<PlayerForm> {
  // Lazy initialize the map
  if (COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.size === 0) {
    initMaps();
  }

  const transformations =
    COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.get(collectibleType);
  return transformations === undefined ? new Set() : copySet(transformations);
}
