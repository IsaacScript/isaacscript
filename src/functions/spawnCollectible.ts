import { preventCollectibleRotate } from "../features/preventCollectibleRotate";
import { areFeaturesInitialized } from "../featuresInitialized";
import { isQuestCollectible } from "./collectibles";
import { anyPlayerIs } from "./player";

/**
 * Helper function to spawn a collectible. Use this instead of `Game.Spawn()` because it handles the
 * cases of Tainted Keeper collectibles costing coins and preventing quest items from being rotated
 * by Tainted Isaac's rotation mechanic.
 *
 * @param collectibleType The collectible type to spawn.
 * @param position The position to spawn the collectible at.
 * @param seed Optional. Random() by default.
 * @param options Optional. Set to true to make the collectible a "There's Options" style
 * collectible. False by default.
 * @param forceFreeItem Optional. Set to true to disable the logic that gives the item a price for
 * Tainted Keeper. False by default.
 */
export function spawnCollectible(
  collectibleType: CollectibleType | int,
  position: Vector,
  seed = Random(),
  options = false,
  forceFreeItem = false,
): EntityPickup {
  if (seed === 0) {
    error(
      "Failed to spawn a collectible since the provided seed was 0, which is not allowed. (It will cause the game to crash.)",
    );
  }

  const game = Game();

  const collectible = game
    .Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      position,
      Vector.Zero,
      undefined,
      collectibleType,
      seed,
    )
    .ToPickup();
  if (collectible === undefined) {
    error("Failed to spawn a collectible.");
  }

  if (options) {
    collectible.OptionsPickupIndex = 1;
  }

  if (
    anyPlayerIs(PlayerType.PLAYER_KEEPER_B) &&
    !isQuestCollectible(collectibleType) &&
    !forceFreeItem
  ) {
    // When playing Tainted Keeper, collectibles are supposed to have a price,
    // and manually spawned items will not have a price, so we have to set it manually

    // Setting the shop item ID in this way prevents the bug where the item will sometimes change to
    // 99 cents
    collectible.ShopItemId = -1;

    // We can set the price to any arbitrary value;
    // it will auto-update to the true price on the next frame
    collectible.Price = 15;
  }

  if (isQuestCollectible(collectibleType) && areFeaturesInitialized()) {
    preventCollectibleRotate(collectible, collectibleType);
  }

  return collectible;
}
