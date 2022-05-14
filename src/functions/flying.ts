import {
  CacheFlag,
  CollectibleType,
  NullItemID,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { getCollectiblesForCacheFlag } from "./collectibleCacheFlag";
import { copySet, deleteSetsFromSet } from "./set";

const FLYING_CHARACTERS: ReadonlySet<PlayerType> = new Set([
  PlayerType.AZAZEL, // 7
  PlayerType.THE_LOST, // 10
  PlayerType.THE_SOUL, // 17
  PlayerType.THE_LOST_B, // 31
  PlayerType.JACOB_2_B, // 39
  PlayerType.THE_SOUL_B, // 40
]);

const FLYING_TRINKETS: ReadonlySet<TrinketType> = new Set([
  TrinketType.BAT_WING, // 118
  TrinketType.AZAZELS_STUMP, // 162
]);

const FLYING_NULL_ITEMS: readonly NullItemID[] = [
  NullItemID.REVERSE_SUN, // 66
  NullItemID.SPIRIT_SHACKLES_SOUL, // 10
  NullItemID.LOST_CURSE, // 112
];

const CONDITIONAL_FLYING_COLLECTIBLE_TYPES: readonly CollectibleType[] = [
  CollectibleType.BIBLE,
  CollectibleType.EMPTY_VESSEL,
  CollectibleType.ASTRAL_PROJECTION,
  CollectibleType.RECALL,
];

/**
 * Returns a set of all of the collectibles that grant flight. This is derived from collectibles
 * that have `CacheFlag.FLYING` set in the "items.xml" file.
 *
 * Collectibles that only grant flight conditionally are manually pruned. Collectibles such as Empty
 * Vessel should be checked for via the `hasFlyingTemporaryEffect` function.
 *
 * @param pruneConditionalItems Whether or not collectibles that only grant flight conditionally
 * should be included in the set (like Empty Vessel).
 */
export function getFlyingCollectibles(
  pruneConditionalItems: boolean,
): Set<CollectibleType | int> {
  // Instead of manually compiling a list of collectibles that grant flying, we can instead
  // dynamically look for collectibles that have `CacheFlag.FLYING`.
  const collectiblesWithFlyingCacheFlag = getCollectiblesForCacheFlag(
    CacheFlag.FLYING,
  );

  // None of the collectibles with a cache of "all" grant flying, so we can safely remove them from
  // the list.
  const collectiblesWithAllCacheFlag = getCollectiblesForCacheFlag(
    CacheFlag.ALL,
  );
  deleteSetsFromSet(
    collectiblesWithFlyingCacheFlag,
    collectiblesWithAllCacheFlag,
  );

  if (pruneConditionalItems) {
    for (const collectibleType of CONDITIONAL_FLYING_COLLECTIBLE_TYPES) {
      collectiblesWithFlyingCacheFlag.delete(collectibleType);
    }
  }

  return collectiblesWithFlyingCacheFlag;
}

/**
 * Returns a set of all of the trinkets that grant flight. (All trinkets that grant flight do so
 * conditionally, like Bat Wing.)
 */
export function getFlyingTrinkets(): ReadonlySet<CollectibleType | int> {
  // We use a different algorithm than the "getFlyingCollectibles" function because Azazel's Stump
  // has a cache of "all".
  return copySet(FLYING_TRINKETS);
}

export function hasFlyingTemporaryEffect(player: EntityPlayer): boolean {
  const effects = player.GetEffects();

  // - Hanged Man card gives a Transcendence temporary effect.
  // - Pinking Shears gives a Transcendence temporary effect.
  const flyingCollectibles = getFlyingCollectibles(false);
  for (const collectibleType of flyingCollectibles.values()) {
    if (effects.HasCollectibleEffect(collectibleType)) {
      return true;
    }
  }

  const flyingTrinkets = getFlyingTrinkets();
  for (const trinketType of flyingTrinkets.values()) {
    if (effects.HasTrinketEffect(trinketType)) {
      return true;
    }
  }

  for (const nullItemID of FLYING_NULL_ITEMS) {
    if (effects.HasNullEffect(nullItemID)) {
      return true;
    }
  }

  return false;
}

export function isFlyingCharacter(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return FLYING_CHARACTERS.has(character);
}
