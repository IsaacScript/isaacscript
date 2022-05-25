import {
  CollectibleType,
  PickupPrice,
  PickupVariant,
  PlayerType,
} from "isaac-typescript-definitions";
import { VectorZero } from "../constants";
import { preventCollectibleRotate } from "../features/preventCollectibleRotate";
import { areFeaturesInitialized } from "../featuresInitialized";
import { setCollectibleEmpty } from "./collectibles";
import { isQuestCollectible } from "./collectibleTag";
import { spawnPickupWithSeed } from "./entitySpecific";
import { anyPlayerIs } from "./player";
import { getRandomSeed, isRNG } from "./rng";

/**
 * Helper function to spawn a collectible. Use this instead of the `Game.Spawn` method because it
 * handles the cases of Tainted Keeper collectibles costing coins and preventing quest items from
 * being rotated by Tainted Isaac's rotation mechanic. (Rotation prevention will only occur in
 * upgraded mods.)
 *
 * @param collectibleType The collectible type to spawn.
 * @param position The position to spawn the collectible at.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param options Optional. Set to true to make the collectible a "There's Options" style
 *                collectible. Default is false.
 * @param forceFreeItem Optional. Set to true to disable the logic that gives the item a price for
 *                      Tainted Keeper. Default is false.
 * @param spawner Optional.
 */
export function spawnCollectible(
  collectibleType: CollectibleType,
  position: Vector,
  seedOrRNG: Seed | RNG = getRandomSeed(),
  options = false,
  forceFreeItem = false,
  spawner?: Entity,
): EntityPickupCollectible {
  const seed = isRNG(seedOrRNG) ? seedOrRNG.Next() : seedOrRNG;
  const collectible = spawnPickupWithSeed(
    PickupVariant.COLLECTIBLE,
    collectibleType,
    position,
    seed,
    VectorZero,
    spawner,
  ) as EntityPickupCollectible;

  if (options) {
    collectible.OptionsPickupIndex = 1;
  }

  if (
    anyPlayerIs(PlayerType.KEEPER_B) &&
    !isQuestCollectible(collectibleType) &&
    !forceFreeItem
  ) {
    // When playing Tainted Keeper, collectibles are supposed to have a price, and manually spawned
    // items will not have a price, so we have to set it manually.

    // Setting the shop item ID in this way prevents the bug where the item will sometimes change to
    // 99 cents.
    collectible.ShopItemId = -1;

    // We can set the price to any arbitrary value; it will auto-update to the true price on the
    // next frame.
    collectible.Price = 15 as PickupPrice;
  }

  if (isQuestCollectible(collectibleType) && areFeaturesInitialized()) {
    preventCollectibleRotate(collectible, collectibleType);
  }

  return collectible;
}

/**
 * Helper function to spawn an empty collectible. Doing this is tricky since spawning a collectible
 * with `CollectibleType.NULL` will result in spawning a collectible with a random type from the
 * current room's item pool.
 *
 * Instead, this function arbitrarily spawns a collectible with `CollectibleType.SAD_ONION`, and
 * then converts it to an empty pedestal afterward.
 *
 * @param position The position to spawn the empty collectible at.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function spawnEmptyCollectible(
  position: Vector,
  seedOrRNG: Seed | RNG = getRandomSeed(),
): EntityPickup {
  const collectible = spawnCollectible(
    CollectibleType.SAD_ONION,
    position,
    seedOrRNG,
    false,
    true,
  );
  setCollectibleEmpty(collectible);

  return collectible;
}
