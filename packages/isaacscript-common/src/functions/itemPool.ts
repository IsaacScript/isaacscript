import type {
  CollectibleType,
  TrinketType,
} from "isaac-typescript-definitions";
import { ItemPoolType } from "isaac-typescript-definitions";
import { ITEM_POOL_TYPE_VALUES } from "../arrays/cachedEnumValues";
import { game } from "../core/cachedClasses";
import { ITEM_POOL_TYPE_TO_ITEM_POOL_NAME } from "../maps/itemPoolTypeToItemPoolName";
import { ITEM_POOL_TYPE_TO_COLLECTIBLE_TYPES_SET } from "../objects/itemPoolTypeToCollectibleTypesSet";
import { arrayRemove, getRandomArrayElement } from "./array";

const NORMAL_MODE_ONLY_ITEM_POOL_TYPES = [
  ItemPoolType.TREASURE, // 0
  ItemPoolType.BOSS, // 2
  ItemPoolType.SHOP, // 1
  ItemPoolType.DEVIL, // 3
  ItemPoolType.ANGEL, // 4
  ItemPoolType.CURSE, // 12
  ItemPoolType.SECRET, // 5
] as const;

const GREED_MODE_ONLY_ITEM_POOL_TYPES = [
  ItemPoolType.GREED_TREASURE, // 16
  ItemPoolType.GREED_BOSS, // 17
  ItemPoolType.GREED_SHOP, // 18
  ItemPoolType.GREED_DEVIL, // 19
  ItemPoolType.GREED_ANGEL, // 20
  ItemPoolType.GREED_CURSE, // 21
  ItemPoolType.GREED_SECRET, // 22
] as const;

const FAKE_ITEM_POOL_TYPES = [ItemPoolType.SHELL_GAME] as const;

const NORMAL_MODE_ITEM_POOL_TYPES: readonly ItemPoolType[] = arrayRemove(
  ITEM_POOL_TYPE_VALUES,
  ...GREED_MODE_ONLY_ITEM_POOL_TYPES,
  ...FAKE_ITEM_POOL_TYPES,
);

const GREED_MODE_ITEM_POOL_TYPES: readonly ItemPoolType[] = arrayRemove(
  ITEM_POOL_TYPE_VALUES,
  ...NORMAL_MODE_ONLY_ITEM_POOL_TYPES,
  ...FAKE_ITEM_POOL_TYPES,
);

/**
 * Helper function to get the collectibles that are in a particular item pool at the beginning of a
 * vanilla run.
 */
export function getDefaultCollectibleTypesInItemPool(
  itemPoolType: ItemPoolType,
): Set<CollectibleType> {
  return ITEM_POOL_TYPE_TO_COLLECTIBLE_TYPES_SET[itemPoolType];
}

/**
 * Helper function to get the item pools that a particular collectible starts in at the beginning of
 * a vanilla run.
 *
 * This function will automatically account for Greed Mode. In other words, it will not return the
 * "normal" item pools when playing in Greed Mode.
 */
export function getDefaultItemPoolsForCollectibleType(
  collectibleType: CollectibleType,
): readonly ItemPoolType[] {
  const collectibleItemPoolTypes: ItemPoolType[] = [];

  const itemPoolTypes = game.IsGreedMode()
    ? GREED_MODE_ITEM_POOL_TYPES
    : NORMAL_MODE_ITEM_POOL_TYPES;

  for (const itemPoolType of itemPoolTypes) {
    const collectibleTypesSet =
      ITEM_POOL_TYPE_TO_COLLECTIBLE_TYPES_SET[itemPoolType];
    if (collectibleTypesSet.has(collectibleType)) {
      collectibleItemPoolTypes.push(itemPoolType);
    }
  }

  return collectibleItemPoolTypes;
}

/**
 * Helper function to get the name for an item pool type as it appears in the "itempools.xml" file.
 */
export function getItemPoolName(itemPoolType: ItemPoolType): string {
  return ITEM_POOL_TYPE_TO_ITEM_POOL_NAME[itemPoolType];
}

/**
 * Helper function to get a random item pool. This is not as simple as getting a random value from
 * the `ItemPoolType` enum, since `ItemPoolType.SHELL_GAME` (7) is not a real item pool and the
 * Greed Mode item pools should be excluded if not playing in Greed Mode.
 *
 * If you want to get an unseeded item pool, you must explicitly pass `undefined` to the `seedOrRNG`
 * parameter.
 *
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 */
export function getRandomItemPool(
  seedOrRNG: Seed | RNG | undefined,
): ItemPoolType {
  const itemPoolTypes = game.IsGreedMode()
    ? GREED_MODE_ITEM_POOL_TYPES
    : NORMAL_MODE_ITEM_POOL_TYPES;

  return getRandomArrayElement(itemPoolTypes, seedOrRNG);
}

/**
 * Helper function to check if a particular collectibles is in a particular item pool at the
 * beginning of a vanilla run.
 */
export function isCollectibleTypeInDefaultItemPool(
  collectibleType: CollectibleType,
  itemPoolType: ItemPoolType,
): boolean {
  const collectibleTypesSet =
    ITEM_POOL_TYPE_TO_COLLECTIBLE_TYPES_SET[itemPoolType];
  return collectibleTypesSet.has(collectibleType);
}

/**
 * Helper function to remove one or more collectibles from all item pools.
 *
 * This function is variadic, meaning you can pass as many collectible types as you want to remove.
 */
export function removeCollectibleFromPools(
  ...collectibleTypes: CollectibleType[]
): void {
  const itemPool = game.GetItemPool();

  for (const collectibleType of collectibleTypes) {
    itemPool.RemoveCollectible(collectibleType);
  }
}

/**
 * Helper function to remove one or more trinkets from all item pools.
 *
 * This function is variadic, meaning you can pass as many trinket types as you want to remove.
 */
export function removeTrinketFromPools(...trinketTypes: TrinketType[]): void {
  const itemPool = game.GetItemPool();

  for (const trinketType of trinketTypes) {
    itemPool.RemoveTrinket(trinketType);
  }
}
