import {
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.POST_COLLECTIBLE_EMPTY;

export class PostCollectibleEmpty extends CustomCallback<T> {
  public override v = {
    room: {
      collectibleTypeMap: new Map<PtrHash, CollectibleType>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 35
      [
        ModCallback.POST_PICKUP_UPDATE,
        this.postPickupUpdateCollectible,
        [PickupVariant.COLLECTIBLE],
      ],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_collectible, oldCollectibleType] = fireArgs;
    const [callbackCollectibleType] = optionalArgs;

    return (
      callbackCollectibleType === undefined ||
      callbackCollectibleType === oldCollectibleType
    );
  };

  // ModCallback.POST_PICKUP_UPDATE (35)
  // PickupVariant.COLLECTIBLE (100)
  private postPickupUpdateCollectible = (pickup: EntityPickup): void => {
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

  private collectibleTypeChanged(
    collectible: EntityPickupCollectible,
    oldCollectibleType: CollectibleType,
  ): void {
    if (collectible.SubType === CollectibleType.NULL) {
      this.fire(collectible, oldCollectibleType);
    }
  }
}
