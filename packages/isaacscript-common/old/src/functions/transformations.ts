import {
  CollectibleType,
  ItemConfigTag,
  PlayerForm,
} from "isaac-typescript-definitions";
import {
  DEFAULT_TRANSFORMATION_NAME,
  TRANSFORMATION_NAMES,
} from "../objects/transformationNames";
import { getCollectibleTags } from "./collectibles";
import { getCollectibleTypesWithTag } from "./collectibleTag";
import { getEnumValues } from "./enums";
import { hasFlag } from "./flag";
import { getPlayerCollectibleCount } from "./player";

const TRANSFORMATION_TO_TAG_MAP: ReadonlyMap<PlayerForm, ItemConfigTag> =
  new Map([
    [PlayerForm.GUPPY, ItemConfigTag.GUPPY], // 0
    [PlayerForm.BEELZEBUB, ItemConfigTag.FLY], // 1
    [PlayerForm.FUN_GUY, ItemConfigTag.MUSHROOM], // 2
    [PlayerForm.SERAPHIM, ItemConfigTag.ANGEL], // 3
    [PlayerForm.BOB, ItemConfigTag.BOB], // 4
    [PlayerForm.SPUN, ItemConfigTag.SYRINGE], // 5
    [PlayerForm.YES_MOTHER, ItemConfigTag.MOM], // 6
    [PlayerForm.CONJOINED, ItemConfigTag.BABY], // 7
    [PlayerForm.LEVIATHAN, ItemConfigTag.DEVIL], // 8
    [PlayerForm.OH_CRAP, ItemConfigTag.POOP], // 9
    [PlayerForm.BOOKWORM, ItemConfigTag.BOOK], // 10
    // PlayerForm.ADULTHOOD (11) is based on pill usage.
    [PlayerForm.SPIDER_BABY, ItemConfigTag.SPIDER], // 12
    // PlayerForm.STOMPY (13) is based on size.
  ]);

const TRANSFORMATIONS_THAT_GRANT_FLYING: ReadonlySet<PlayerForm> = new Set([
  PlayerForm.GUPPY, // 0
  PlayerForm.BEELZEBUB, // 1
  PlayerForm.SERAPHIM, // 3
  PlayerForm.LEVIATHAN, // 8
]);

/**
 * Helper function to get all of the collectible types in the game that count towards a particular
 * transformation.
 *
 * For example, to get all of the collectible types that count towards Guppy:
 *
 * ```ts
 * const guppyCollectibleTypes = getCollectibleTypesForTransformation(PlayerForm.GUPPY);
 * ```
 */
export function getCollectibleTypesForTransformation(
  playerForm: PlayerForm,
): Set<CollectibleType> {
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

/** Returns a set of the player's current transformations. */
export function getPlayerTransformations(
  player: EntityPlayer,
): Set<PlayerForm> {
  const transformations = new Set<PlayerForm>();
  for (const playerForm of getEnumValues(PlayerForm)) {
    if (player.HasPlayerForm(playerForm)) {
      transformations.add(playerForm);
    }
  }

  return transformations;
}

/**
 * Helper function to get a transformation name from a PlayerForm enum.
 *
 * For example:
 *
 * ```ts
 * const transformationName = getTransformationName(PlayerForm.LORD_OF_THE_FLIES);
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
  collectibleType: CollectibleType,
): Set<PlayerForm> {
  const itemConfigTags = getCollectibleTags(collectibleType);

  const playerForms = getEnumValues(PlayerForm);
  const transformationSet = new Set<PlayerForm>();
  for (const playerForm of playerForms) {
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
