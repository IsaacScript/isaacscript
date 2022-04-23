import { ItemConfigTag } from "../enums/ItemConfigTag";
import {
  DEFAULT_TRANSFORMATION_NAME,
  TRANSFORMATION_NAMES,
} from "../objects/transformationNames";
import { getCollectibleTags } from "./collectibles";
import { getCollectibleTypesWithTag } from "./collectibleTag";
import { hasFlag } from "./flag";
import { range } from "./math";
import { getPlayerCollectibleCount } from "./player";

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
    // PlayerForm.PLAYERFORM_ADULTHOOD (11) is based on pill usage
    [PlayerForm.PLAYERFORM_SPIDERBABY, ItemConfigTag.SPIDER], // 12
    // PlayerForm.PLAYERFORM_STOMPY (13) is based on size
    // PlayerForm.PLAYERFORM_FLIGHT (14) is an unused enum
  ]);

const TRANSFORMATIONS_THAT_GRANT_FLYING: ReadonlySet<PlayerForm> = new Set([
  PlayerForm.PLAYERFORM_GUPPY, // 0
  PlayerForm.PLAYERFORM_LORD_OF_THE_FLIES, // 1
  PlayerForm.PLAYERFORM_ANGEL, // 3
  PlayerForm.PLAYERFORM_EVIL_ANGEL, // 8
]);

/**
 * Helper function to get all of the collectible types in the game that count towards a particular
 * transformation.
 *
 * For example, to get all of the collectible types that count towards Guppy:
 *
 * ```ts
 * const guppyCollectibleTypes = getCollectibleTypesForTransformation(PlayerForm.PLAYERFORM_GUPPY);
 * ```
 */
export function getCollectibleTypesForTransformation(
  playerForm: PlayerForm,
): Set<CollectibleType | int> {
  const itemConfigTag = TRANSFORMATION_TO_TAG_MAP.get(playerForm);
  if (itemConfigTag === undefined) {
    error(
      `Failed to get the collectible types for the transformation of ${playerForm} because that transformation is not based on collectibles.`,
    );
  }

  return getCollectibleTypesWithTag(itemConfigTag);
}

/** Returns the number of items that a player has towards a particular transformation. */
export function getPlayerNumCollectiblesForTransformation(
  player: EntityPlayer,
  playerForm: PlayerForm,
): int {
  const collectibleTypes = getCollectibleTypesForTransformation(playerForm);
  return getPlayerCollectibleCount(player, ...collectibleTypes.values());
}

/**
 * Helper function to get a transformation name from a PlayerForm enum.
 *
 * Example:
 * ```ts
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
  const itemConfigTags = getCollectibleTags(collectibleType);

  const transformationSet = new Set<PlayerForm>();
  for (const playerForm of range(0, PlayerForm.NUM_PLAYER_FORMS - 1)) {
    const itemConfigTag = TRANSFORMATION_TO_TAG_MAP.get(playerForm);
    if (itemConfigTag === undefined) {
      continue;
    }

    if (hasFlag(itemConfigTags, itemConfigTag)) {
      transformationSet.add(playerForm);
    }
  }

  return transformationSet;
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
