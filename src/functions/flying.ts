import { getCollectiblesForCacheFlag } from "./collectibleCacheFlag";
import { copySet, deleteSetsFromSet } from "./set";

const FLYING_CHARACTERS = new Set<PlayerType>([
  PlayerType.PLAYER_AZAZEL, // 7
  PlayerType.PLAYER_THELOST, // 10
  PlayerType.PLAYER_THESOUL, // 17
  PlayerType.PLAYER_THELOST_B, // 31
  PlayerType.PLAYER_JACOB2_B, // 39
  PlayerType.PLAYER_THESOUL_B, // 40
]);

const FLYING_TRINKETS = new Set<TrinketType>([
  TrinketType.TRINKET_BAT_WING, // 118
  TrinketType.TRINKET_AZAZELS_STUMP, // 162
]);

const FLYING_NULL_ITEMS = [
  NullItemID.ID_REVERSE_SUN, // 66
  NullItemID.ID_SPIRIT_SHACKLES_SOUL, // 10
];

/**
 * Returns a set of all of the collectibles that grant flight. This is derived from collectibles
 * that have `CacheFlag.CACHE_FLYING` set in the "items.xml" file.
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
  // Instead of manually compiling a list of collectibles that grant flying,
  // we can instead dynamically look for collectibles that have "CacheFlag.CACHE_FLYING"
  const collectiblesWithFlyingCacheFlag = getCollectiblesForCacheFlag(
    CacheFlag.CACHE_FLYING,
  );

  // None of the collectibles with a cache of "all" grant flying,
  // so we can safely remove them from the list
  const collectiblesWithAllCacheFlag = getCollectiblesForCacheFlag(
    CacheFlag.CACHE_ALL,
  );
  deleteSetsFromSet(
    collectiblesWithFlyingCacheFlag,
    collectiblesWithAllCacheFlag,
  );

  if (pruneConditionalItems) {
    collectiblesWithFlyingCacheFlag.delete(CollectibleType.COLLECTIBLE_BIBLE);
    collectiblesWithFlyingCacheFlag.delete(
      CollectibleType.COLLECTIBLE_EMPTY_VESSEL,
    );
    collectiblesWithFlyingCacheFlag.delete(
      CollectibleType.COLLECTIBLE_ASTRAL_PROJECTION,
    );
    collectiblesWithFlyingCacheFlag.delete(CollectibleType.COLLECTIBLE_RECALL);
  }

  return collectiblesWithFlyingCacheFlag;
}

/**
 * Returns a set of all of the trinkets that grant flight. (All trinkets that grant flight do so
 * conditionally, like Bat Wing.)
 */
export function getFlyingTrinkets(): Set<CollectibleType | int> {
  // We use a different algorithm than the "getFlyingCollectibles()" function because Azazel's Stump
  // has a cache of "all"
  return copySet(FLYING_TRINKETS);
}

export function hasFlyingTemporaryEffect(player: EntityPlayer): boolean {
  const effects = player.GetEffects();

  // Hanged Man card gives a Transcendence temporary effect
  // Pinking Shears gives a Transcendence temporary effect
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
