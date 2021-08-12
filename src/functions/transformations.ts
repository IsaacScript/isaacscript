import { collectibleHasTag, getMaxCollectibleID } from "./items";

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

// Some transformations are not tracked since they do not have to do with how many items you have
const TRANSFORMATIONS_NOT_TRACKED = [
  PlayerForm.PLAYERFORM_ADULTHOOD, // 11 (based on pill usage)
  PlayerForm.PLAYERFORM_STOMPY, // 13 (based on size)
  PlayerForm.PLAYERFORM_FLIGHT, // 14 (unused enum)
];

const TRANSFORMATION_TO_ITEMS_MAP = new Map<PlayerForm, CollectibleType[]>();

/**
 * In order to use the `getPlayerNumTransformationCollectibles` function, you must first call this
 * function at the beginning of your mod to initialize the necessary data structures.
 * This function iterates over every item in the game to determine which items have which tags.
 * Then, it stores the information in a map for future use.
 */
export function initTransformationTracking(): void {
  // Initialize the map with empty arrays
  for (const playerForm of TRANSFORMATION_TO_TAG_MAP.keys()) {
    TRANSFORMATION_TO_ITEMS_MAP.set(playerForm, []);
  }

  for (
    let collectibleType = 1;
    collectibleType <= getMaxCollectibleID();
    collectibleType++
  ) {
    for (const [playerForm, tag] of TRANSFORMATION_TO_TAG_MAP) {
      if (collectibleHasTag(collectibleType, tag)) {
        const items = TRANSFORMATION_TO_ITEMS_MAP.get(playerForm);
        if (items === undefined) {
          error(`Failed to get the items for transformation: ${playerForm}`);
        }
        items.push(collectibleType);
      }
    }
  }
}

/** Returns the number of items that a player has towards a particular transformation. */
export function getPlayerNumTransformationCollectibles(
  player: EntityPlayer,
  playerForm: PlayerForm,
): int {
  if (TRANSFORMATIONS_NOT_TRACKED.includes(playerForm)) {
    error(
      `The transformation of ${playerForm} cannot be tracked this function.`,
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
