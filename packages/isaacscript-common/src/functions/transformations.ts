import type { CollectibleType } from "isaac-typescript-definitions";
import { ItemConfigTag, PlayerForm } from "isaac-typescript-definitions";
import { PLAYER_FORM_VALUES } from "../arrays/cachedEnumValues";
import { TRANSFORMATION_NAMES } from "../objects/transformationNames";
import { ReadonlyMap } from "../types/ReadonlyMap";
import { ReadonlySet } from "../types/ReadonlySet";
import { getCollectibleTags } from "./collectibles";
import { hasFlag } from "./flag";

const TRANSFORMATION_TO_TAG_MAP = new ReadonlyMap<PlayerForm, ItemConfigTag>([
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

const TRANSFORMATIONS_THAT_GRANT_FLYING = new ReadonlySet<PlayerForm>([
  PlayerForm.GUPPY, // 0
  PlayerForm.BEELZEBUB, // 1
  PlayerForm.SERAPHIM, // 3
  PlayerForm.LEVIATHAN, // 8
]);

/** Returns a set of the player's current transformations. */
export function getPlayerTransformations(
  player: EntityPlayer,
): Set<PlayerForm> {
  const transformations = new Set<PlayerForm>();
  for (const playerForm of PLAYER_FORM_VALUES) {
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
  return TRANSFORMATION_NAMES[playerForm];
}

/**
 * Returns a set containing all of the transformations that the given collectible types contribute
 * towards.
 */
export function getTransformationsForCollectibleType(
  collectibleType: CollectibleType,
): Set<PlayerForm> {
  const itemConfigTags = getCollectibleTags(collectibleType);

  const transformationSet = new Set<PlayerForm>();
  for (const playerForm of PLAYER_FORM_VALUES) {
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
  for (const playerForm of TRANSFORMATIONS_THAT_GRANT_FLYING) {
    if (player.HasPlayerForm(playerForm)) {
      return true;
    }
  }

  return false;
}

export function isTransformationFlying(playerForm: PlayerForm): boolean {
  return TRANSFORMATIONS_THAT_GRANT_FLYING.has(playerForm);
}
