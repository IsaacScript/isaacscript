import {
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_COLLECTIBLE_EMPTY;

export class PostCollectibleEmpty extends CustomCallback<T> {
  override v = {
    room: {
      collectibleTypeMap: new Map<PtrHash, CollectibleType>(),
    },
  };

  constructor() {
    super();

    this.otherCallbacksUsed = [
      [
        ModCallback.POST_PICKUP_UPDATE,
        [this.postPickupUpdateCollectible, PickupVariant.COLLECTIBLE],
      ], // 35
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackCollectibleType] = optionalArgs;
    if (callbackCollectibleType === undefined) {
      return true;
    }

    const [_collectible, oldCollectibleType] = fireArgs;
    return oldCollectibleType === callbackCollectibleType;
  }

  // ModCallback.POST_PICKUP_UPDATE (35)
  // PickupVariant.COLLECTIBLE (100)
  postPickupUpdateCollectible = (pickup: EntityPickup): void => {
    const collectible = pickup as EntityPickupCollectible;

    const ptrHash = GetPtrHash(collectible);
    let oldCollectibleType = this.v.room.collectibleTypeMap.get(ptrHash);
    if (oldCollectibleType === undefined) {
      oldCollectibleType = collectible.SubType;
    }
    this.v.room.collectibleTypeMap.set(ptrHash, collectible.SubType);

    if (oldCollectibleType !== collectible.SubType) {
      this.collectibleTypeChanged(collectible, oldCollectibleType);
    }
  };

  collectibleTypeChanged(
    collectible: EntityPickupCollectible,
    oldCollectibleType: CollectibleType,
  ): void {
    if (collectible.SubType === CollectibleType.NULL) {
      this.fire(collectible, oldCollectibleType);
    }
  }
}
