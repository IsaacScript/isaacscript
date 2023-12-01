import type { ItemPoolType } from "isaac-typescript-definitions";
import { CollectibleType } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { arrayRemoveIndexInPlace } from "../../../functions/array";
import { copyMap } from "../../../functions/map";
import { assertDefined } from "../../../functions/utils";
import { getRandomIndexFromWeightedArray } from "../../../functions/weighted";
import { ReadonlyMap } from "../../../types/ReadonlyMap";
import type { WeightedArray } from "../../../types/WeightedArray";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    customItemPools: new ReadonlyMap<
      ItemPoolType,
      WeightedArray<CollectibleType>
    >(),
  },
};

const customItemPoolMap = new Map<
  ItemPoolType,
  WeightedArray<CollectibleType>
>();

export class CustomItemPools extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GAME_STARTED_REORDERED,
        this.postGameStartedReorderedFalse,
        [false],
      ],
    ];
  }

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED
  // false
  private readonly postGameStartedReorderedFalse = () => {
    v.run.customItemPools = copyMap(customItemPoolMap);
  };

  /**
   * Helper function to register a custom item pool. Use this function once when your mod first
   * loads to declare the items that you want to be in the item pools. Then, in the middle of a run,
   * you can use `getCustomItemPoolCollectible`.
   *
   * For example:
   *
   * ```ts
   * const ItemPoolTypeCustom = {
   *   FOO = 0 as ItemPoolType,
   * } as const;
   *
   * const FOO_ITEM_POOL = [
   *   [CollectibleType.SAD_ONION, 1],
   *   [CollectibleType.INNER_EYE, 0.5],
   * ];
   *
   * registerCustomItemPool(ItemPoolTypeCustom.FOO, FOO_ITEM_POOL);
   * ```
   *
   * Note that custom item pools do not currently support partial weight decrementation on sight.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.CUSTOM_ITEM_POOLS`.
   *
   * @param itemPoolTypeCustom An integer that identifies what kind of item pool you are creating.
   *                           It should correspond to a local `ItemPoolTypeCustom` enum in your
   *                           mod. The integer can be any unique value and can safely overlap with
   *                           the vanilla item pool type values (or values chosen by other mods).
   * @param collectibles An array of weighted collectible tuples that represent the item pool that
   *                     you are creating. The first element in he tuple is the `CollectibleType`,
   *                     and the second element in the tuple is the float that represents the weight
   *                     of the collectible.
   * @public
   */
  @Exported
  public registerCustomItemPool(
    itemPoolTypeCustom: ItemPoolType,
    collectibles: Readonly<WeightedArray<CollectibleType>>,
  ): void {
    if (customItemPoolMap.has(itemPoolTypeCustom)) {
      error(
        `Failed to register a custom item pool since the provided type of ${itemPoolTypeCustom} was already registered.`,
      );
    }

    customItemPoolMap.set(
      itemPoolTypeCustom,
      collectibles as WeightedArray<CollectibleType>,
    );
  }

  /**
   * Helper function to get a new collectible from a custom item pool created with the
   * `registerCustomItemPool` function. This function has the same format as the
   * `ItemPool.GetCollectible` method.
   *
   * By default, a collectible will not be removed from the pool once it is selected, unless the
   * `decrease` argument is set to true (similar to how a vanilla item pool works).
   *
   * If you want to get an unseeded collectible type, you must explicitly pass `undefined` to the
   * `seedOrRNG` parameter.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.CUSTOM_ITEM_POOLS`.
   *
   * @param itemPoolTypeCustom An integer representing the custom item pool to use.
   * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
   *                  `RNG.Next` method will be called. If `undefined` is provided, it will default
   *                  to a random seed.
   * @param decrease Optional. Whether to remove the selected collectible from the item pool.
   *                 Default is true.
   * @param defaultItem Optional. The collectible to return if the item pool is depleted. Default is
   *                    `CollectibleType.NULL`.
   * @public
   */
  @Exported
  public getCustomItemPoolCollectible(
    itemPoolTypeCustom: ItemPoolType,
    seedOrRNG: Seed | RNG | undefined,
    decrease = false,
    defaultItem = CollectibleType.NULL,
  ): CollectibleType {
    const customItemPool = v.run.customItemPools.get(itemPoolTypeCustom);
    assertDefined(
      customItemPool,
      `Failed to find the custom item pool of: ${itemPoolTypeCustom}`,
    );

    if (customItemPool.length === 0) {
      return defaultItem;
    }

    const randomIndex = getRandomIndexFromWeightedArray(
      customItemPool,
      seedOrRNG,
    );
    const tuple = customItemPool[randomIndex];
    assertDefined(
      tuple,
      `Failed to get an element from a custom item pool using a random index of: ${randomIndex}`,
    );

    if (decrease) {
      arrayRemoveIndexInPlace(customItemPool, randomIndex);
    }

    return tuple[0];
  }
}
