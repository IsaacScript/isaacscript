import type {
  CollectibleType,
  ItemPoolType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { isQuestCollectible } from "../../../functions/collectibleTag";
import { spawnCollectibleUnsafe } from "../../../functions/spawnCollectible";
import { Feature } from "../../private/Feature";
import type { PreventCollectibleRotation } from "./PreventCollectibleRotation";

export class SpawnCollectible extends Feature {
  private readonly preventCollectibleRotation: PreventCollectibleRotation;

  /** @internal */
  constructor(preventCollectibleRotation: PreventCollectibleRotation) {
    super();

    this.featuresUsed = [ISCFeature.PREVENT_COLLECTIBLE_ROTATION];

    this.preventCollectibleRotation = preventCollectibleRotation;
  }

  /**
   * Helper function to spawn a collectible.
   *
   * Use this instead of the `Game.Spawn` method because it handles the cases of Tainted Keeper
   * collectibles costing coins and preventing quest items from being rotated by Tainted Isaac's
   * rotation mechanic.
   *
   * If you do not need to handle quest items being rotated (i.e. the collectible is guaranteed not
   * to be a quest item), then you can use the `spawnCollectibleUnsafe` helper function instead
   * (which does not require an upgraded mod).
   *
   * If you want to spawn an unseeded collectible, you must explicitly pass `undefined` to the
   * `seedOrRNG` parameter.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.SPAWN_COLLECTIBLE`.
   *
   * @param collectibleType The collectible type to spawn.
   * @param positionOrGridIndex The position or grid index to spawn the collectible at.
   * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
   *                  `RNG.Next` method will be called. If `undefined` is provided, it will default
   *                  to a random seed.
   * @param options Optional. Set to true to make the collectible a "There's Options" style
   *                collectible. Default is false.
   * @param forceFreeItem Optional. Set to true to disable the logic that gives the item a price for
   *                      Tainted Keeper. Default is false.
   * @param spawner Optional.
   */
  @Exported
  public spawnCollectible(
    collectibleType: CollectibleType,
    positionOrGridIndex: Vector | int,
    seedOrRNG: Seed | RNG | undefined,
    options = false,
    forceFreeItem = false,
    spawner?: Entity,
  ): EntityPickupCollectible {
    const collectible = spawnCollectibleUnsafe(
      collectibleType,
      positionOrGridIndex,
      seedOrRNG,
      options,
      forceFreeItem,
      spawner,
    );

    if (isQuestCollectible(collectibleType)) {
      this.preventCollectibleRotation.preventCollectibleRotation(
        collectible,
        collectibleType,
      );
    }

    return collectible;
  }

  /**
   * Helper function to spawn a collectible from a specific item pool.
   *
   * Use this instead of the `Game.Spawn` method because it handles the cases of Tainted Keeper
   * collectibles costing coins and preventing quest items from being rotated by Tainted Isaac's
   * rotation mechanic.
   *
   * If you want to spawn an unseeded collectible, you must explicitly pass `undefined` to the
   * `seedOrRNG` parameter.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.SPAWN_COLLECTIBLE`.
   *
   * @param itemPoolType The item pool to draw the collectible type from.
   * @param positionOrGridIndex The position or grid index to spawn the collectible at.
   * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
   *                  `RNG.Next` method will be called. If `undefined` is provided, it will default
   *                  to a random seed.
   * @param options Optional. Set to true to make the collectible a "There's Options" style
   *                collectible. Default is false.
   * @param forceFreeItem Optional. Set to true to disable the logic that gives the item a price for
   *                      Tainted Keeper. Default is false.
   * @param spawner Optional.
   */
  @Exported
  public spawnCollectibleFromPool(
    itemPoolType: ItemPoolType,
    positionOrGridIndex: Vector | int,
    seedOrRNG: Seed | RNG | undefined,
    options = false,
    forceFreeItem = false,
    spawner?: Entity,
  ): EntityPickupCollectible {
    const itemPool = game.GetItemPool();
    const collectibleType = itemPool.GetCollectible(itemPoolType);

    return this.spawnCollectible(
      collectibleType,
      positionOrGridIndex,
      seedOrRNG,
      options,
      forceFreeItem,
      spawner,
    );
  }
}
