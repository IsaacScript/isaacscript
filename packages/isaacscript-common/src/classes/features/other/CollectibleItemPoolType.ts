import type { ItemPoolType } from "isaac-typescript-definitions";
import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { getEntityID } from "../../../functions/entities";
import { isCollectible } from "../../../functions/pickupVariants";
import { getRoomItemPoolType } from "../../../functions/rooms";
import type { PickupIndex } from "../../../types/PickupIndex";
import { Feature } from "../../private/Feature";
import type { PickupIndexCreation } from "./PickupIndexCreation";

const v = {
  run: {
    collectibleItemPoolTypeMap: new Map<PickupIndex, ItemPoolType>(),
  },
};

export class CollectibleItemPoolType extends Feature {
  /** @internal */
  public override v = v;

  private readonly pickupIndexCreation: PickupIndexCreation;

  /** @internal */
  constructor(pickupIndexCreation: PickupIndexCreation) {
    super();

    this.featuresUsed = [ISCFeature.PICKUP_INDEX_CREATION];

    this.callbacksUsed = [
      // 34
      [
        ModCallback.POST_PICKUP_INIT,
        this.postPickupInitCollectible,
        [PickupVariant.COLLECTIBLE],
      ],
    ];

    this.pickupIndexCreation = pickupIndexCreation;
  }

  // ModCallback.POST_PICKUP_INIT (34)
  // PickupVariant.COLLECTIBLE (100)
  private readonly postPickupInitCollectible = (collectible: EntityPickup) => {
    const pickupIndex = this.pickupIndexCreation.getPickupIndex(collectible);

    if (!v.run.collectibleItemPoolTypeMap.has(pickupIndex)) {
      const itemPool = game.GetItemPool();
      const lastItemPoolType = itemPool.GetLastPool();

      v.run.collectibleItemPoolTypeMap.set(pickupIndex, lastItemPoolType);
    }
  };

  /**
   * Helper function to get the item pool type that a given collectible came from. Since there is no
   * native method in the API to get this, we listen in the `POST_PICKUP_INIT` callback for
   * collectibles, use the `ItemPool.GetLastPool` method, and then assume that the collectible
   * matches.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.COLLECTIBLE_ITEM_POOL_TYPE`.
   *
   * @public
   */
  @Exported
  public getCollectibleItemPoolType(collectible: EntityPickup): ItemPoolType {
    if (!isCollectible(collectible)) {
      const entityID = getEntityID(collectible);
      error(
        `The "getCollectibleItemPoolType" function was given a non-collectible: ${entityID}`,
      );
    }

    const pickupIndex = this.pickupIndexCreation.getPickupIndex(collectible);
    const itemPoolType = v.run.collectibleItemPoolTypeMap.get(pickupIndex);
    return itemPoolType ?? getRoomItemPoolType();
  }
}
