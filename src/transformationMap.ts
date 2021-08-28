import { collectibleHasTag, getMaxCollectibleID } from "./functions/items";

export const TRANSFORMATION_TO_TAG_MAP = new Map<PlayerForm, ItemConfigTag>([
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
export const TRANSFORMATIONS_NOT_TRACKED = new Set<PlayerForm>([
  PlayerForm.PLAYERFORM_ADULTHOOD, // 11 (based on pill usage)
  PlayerForm.PLAYERFORM_STOMPY, // 13 (based on size)
  PlayerForm.PLAYERFORM_FLIGHT, // 14 (unused enum)
]);

export const TRANSFORMATION_TO_ITEMS_MAP = new Map<
  PlayerForm,
  Set<CollectibleType | int>
>();

export const ITEM_TO_TRANSFORMATION_MAP = new Map<
  CollectibleType | int,
  Set<PlayerForm>
>();

initMaps();

function initMaps() {
  // The transformation to items map should be valid for every transformation,
  // so we initialize it with empty sets
  for (const playerForm of TRANSFORMATION_TO_TAG_MAP.keys()) {
    TRANSFORMATION_TO_ITEMS_MAP.set(playerForm, new Set());
  }

  for (
    let collectibleType = 1;
    collectibleType <= getMaxCollectibleID();
    collectibleType++
  ) {
    for (const [playerForm, tag] of TRANSFORMATION_TO_TAG_MAP) {
      if (!collectibleHasTag(collectibleType, tag)) {
        continue;
      }

      // Update the first map
      const items = TRANSFORMATION_TO_ITEMS_MAP.get(playerForm);
      if (items === undefined) {
        error(`Failed to get the items for transformation: ${playerForm}`);
      }
      items.add(collectibleType);

      // Update the second map
      let transformations = ITEM_TO_TRANSFORMATION_MAP.get(collectibleType);
      if (transformations === undefined) {
        transformations = new Set();
        ITEM_TO_TRANSFORMATION_MAP.set(collectibleType, transformations);
      }
      transformations.add(playerForm);
    }
  }
}
