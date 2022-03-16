import { DefaultMap } from "../classes/DefaultMap";
import {
  DEFAULT_TRANSFORMATION_NAME,
  TRANSFORMATION_NAMES,
} from "../objects/transformationNames";
import { collectibleHasTag, getMaxCollectibleType } from "./collectibles";
import { range } from "./math";
import { copySet } from "./set";

const TRANSFORMATION_TO_TAG_MAP: ReadonlyMap<PlayerForm, ItemConfigTag> =
  new Map([
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

const TRANSFORMATIONS_NOT_BASED_ON_ITEMS: ReadonlySet<PlayerForm> = new Set([
  PlayerForm.PLAYERFORM_ADULTHOOD, // 11 (based on pill usage)
  PlayerForm.PLAYERFORM_STOMPY, // 13 (based on size)
  PlayerForm.PLAYERFORM_FLIGHT, // 14 (unused enum)
]);

const TRANSFORMATIONS_THAT_GRANT_FLYING: ReadonlySet<PlayerForm> = new Set([
  PlayerForm.PLAYERFORM_GUPPY, // 0
  PlayerForm.PLAYERFORM_LORD_OF_THE_FLIES, // 1
  PlayerForm.PLAYERFORM_ANGEL, // 3
  PlayerForm.PLAYERFORM_EVIL_ANGEL, // 8
]);

const TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP = new Map<
  PlayerForm,
  Set<CollectibleType | int>
>();

const COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP = new DefaultMap<
  CollectibleType | int,
  Set<PlayerForm>
>(() => new Set());

function initTransformationMaps() {
  const maxCollectibleType = getMaxCollectibleType();

  // The transformation to items map should be valid for every transformation based on items,
  // so we initialize it with empty sets
  for (const playerForm of TRANSFORMATION_TO_TAG_MAP.keys()) {
    TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.set(playerForm, new Set());
  }

  for (const collectibleType of range(1, maxCollectibleType)) {
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
      const transformations =
        COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.getAndSetDefault(
          collectibleType,
        );
      transformations.add(playerForm);
    }
  }
}

export function getCollectibleTypesForTransformation(
  playerForm: PlayerForm,
): Set<PlayerForm> {
  // Lazy initialize the map
  if (TRANSFORMATION_TO_COLLECTIBLE_TYPES_MAP.size === 0) {
    initTransformationMaps();
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
    initTransformationMaps();
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
export function getTransformationName(playerForm: PlayerForm): string {
  const transformationName = TRANSFORMATION_NAMES[playerForm];
  return transformationName === undefined
    ? DEFAULT_TRANSFORMATION_NAME
    : transformationName;
}

export function getTransformationsForCollectibleType(
  collectibleType: CollectibleType | int,
): Set<PlayerForm> {
  // Lazy initialize the map
  if (COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.size === 0) {
    initTransformationMaps();
  }

  const transformations =
    COLLECTIBLE_TYPE_TO_TRANSFORMATION_MAP.get(collectibleType);
  return transformations === undefined ? new Set() : copySet(transformations);
}

export function hasFlyingTransformation(player: EntityPlayer): boolean {
  for (const playerForm of TRANSFORMATIONS_THAT_GRANT_FLYING.values()) {
    if (player.HasPlayerForm(playerForm)) {
      return true;
    }
  }

  return false;
}

export function isTransformationFlying(playerForm: PlayerForm): boolean {
  return TRANSFORMATIONS_THAT_GRANT_FLYING.has(playerForm);
}
