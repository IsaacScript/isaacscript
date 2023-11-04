import {
  CollectibleType,
  PickupVariant,
  PlayerType,
} from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { isQuestCollectible } from "./collectibleTag";
import { setCollectibleEmpty } from "./collectibles";
import { spawnPickupWithSeed } from "./entitiesSpecific";
import { anyPlayerIs } from "./players";
import { getRandomSeed, isRNG } from "./rng";

/**
 * Helper function to spawn a collectible.
 *
 * Use this instead of the `Game.Spawn` method because it handles the cases of Tainted Keeper
 * collectibles costing coins.
 *
 * This function is unsafe because it will not correctly handle quest items being rotated by Tainted
 * Isaac's rotation mechanic. To handle that, use the `spawnCollectible` helper function instead
 * (which is provided by `ISCFeature.SPAWN_COLLECTIBLE`).
 *
 * If you want to spawn an unseeded collectible, you must explicitly pass `undefined` to the
 * `seedOrRNG` parameter.
 *
 * @param collectibleType The collectible type to spawn.
 * @param positionOrGridIndex The position or grid index to spawn the collectible at.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 * @param options Optional. Set to true to make the collectible a "There's Options" style
 *                collectible. Default is false.
 * @param forceFreeItem Optional. Set to true to disable the logic that gives the item a price for
 *                      Tainted Keeper. Default is false.
 * @param spawner Optional.
 */
export function spawnCollectibleUnsafe(
  collectibleType: CollectibleType,
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG | undefined,
  options = false,
  forceFreeItem = false,
  spawner?: Entity,
): EntityPickupCollectible {
  if (seedOrRNG === undefined) {
    seedOrRNG = getRandomSeed();
  }

  const seed = isRNG(seedOrRNG) ? seedOrRNG.Next() : seedOrRNG;
  const collectible = spawnPickupWithSeed(
    PickupVariant.COLLECTIBLE,
    collectibleType,
    positionOrGridIndex,
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
    collectible.Price = 15;
  }

  return collectible;
}

/**
 * Helper function to spawn an empty collectible. Doing this is tricky since spawning a collectible
 * with `CollectibleType.NULL` will result in spawning a collectible with a random type from the
 * current room's item pool.
 *
 * Instead, this function arbitrarily spawns a collectible with `CollectibleType.BROKEN_SHOVEL_1`,
 * and then converts it to an empty pedestal afterward. (Broken Shovel is used instead of e.g. Sad
 * Onion because it is a quest collectible and quest collectibles will prevent Damocles from
 * duplicating the pedestal.)
 *
 * If you want to spawn an unseeded collectible, you must explicitly pass `undefined` to the
 * `seedOrRNG` parameter.
 *
 * @param positionOrGridIndex The position or grid index to spawn the empty collectible at.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 */
export function spawnEmptyCollectible(
  positionOrGridIndex: Vector | int,
  seedOrRNG: Seed | RNG | undefined,
): EntityPickup {
  const collectible = spawnCollectibleUnsafe(
    CollectibleType.BROKEN_SHOVEL_1,
    positionOrGridIndex,
    seedOrRNG,
    false,
    true,
  );
  setCollectibleEmpty(collectible);

  return collectible;
}
