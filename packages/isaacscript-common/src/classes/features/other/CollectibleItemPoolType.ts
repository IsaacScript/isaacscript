import {
  ItemPoolType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { getEntityID } from "../../../functions/entities";
import { isCollectible } from "../../../functions/pickupVariants";
import { getRoomItemPoolType } from "../../../functions/rooms";
import { Feature } from "../../private/Feature";

/**
 * The item pool type of a collectible is not stored on the collectible. Thus, we scan for incoming
 * item pool types in the `PRE_GET_COLLECTIBLE` callback, and then assume that the next spawned
 * collectible has this item pool type.
 */
export class CollectibleItemPoolType extends Feature {
  public override v = {
    run: {
      collectibleItemPoolTypeMap: new Map<PtrHash, ItemPoolType>(),
    },
  };

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.POST_PICKUP_INIT,
        [this.postPickupInitCollectible, PickupVariant.COLLECTIBLE],
      ], // 34
    ];
  }

  // ModCallback.POST_PICKUP_INIT (34)
  // PickupVariant.COLLECTIBLE (100)
  private postPickupInitCollectible = (pickup: EntityPickup) => {
    const itemPool = game.GetItemPool();
    const ptrHash = GetPtrHash(pickup);
    const lastItemPoolType = itemPool.GetLastPool();

    this.v.run.collectibleItemPoolTypeMap.set(ptrHash, lastItemPoolType);
  };

  /**
   * Helper function to get the item pool type that a given collectible came from. Since there is no
   * native method in the API to get this, we listen in the `PRE_GET_COLLECTIBLE` callback for item
   * pool types, and then assume that the next spawned collectible will match.
   */
  @Exported
  public getCollectibleItemPoolType(collectible: EntityPickup): ItemPoolType {
    if (!isCollectible(collectible)) {
      const entityID = getEntityID(collectible);
      error(
        `The "getCollectibleItemPoolType" function was given a non-collectible: ${entityID}`,
      );
    }

    const ptrHash = GetPtrHash(collectible);
    const itemPoolType = this.v.run.collectibleItemPoolTypeMap.get(ptrHash);
    return itemPoolType === undefined ? getRoomItemPoolType() : itemPoolType;
  }
}
