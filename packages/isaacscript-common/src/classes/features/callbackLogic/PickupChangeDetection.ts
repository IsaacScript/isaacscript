import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { ISCFeature } from "../../../enums/ISCFeature";
import { PickupIndex } from "../../../types/PickupIndex";
import { PostPickupChanged } from "../../callbacks/PostPickupChanged";
import { Feature } from "../../private/Feature";
import { PickupIndexCreation } from "../other/PickupIndexCreation";

export class PickupChangeDetection extends Feature {
  public override v = {
    room: {
      pickupVariants: new Map<PickupIndex, PickupVariant>(),
      pickupSubTypes: new Map<PickupIndex, int>(),
    },
  };

  private postPickupChanged: PostPickupChanged;
  private pickupIndexCreation: PickupIndexCreation;

  constructor(
    postPickupChanged: PostPickupChanged,
    pickupIndexCreation: PickupIndexCreation,
  ) {
    super();

    this.featuresUsed = [ISCFeature.PICKUP_INDEX_CREATION];

    this.callbacksUsed = [
      // 35
      [ModCallback.POST_PICKUP_UPDATE, this.postPickupUpdate],
    ];

    this.postPickupChanged = postPickupChanged;
    this.pickupIndexCreation = pickupIndexCreation;
  }

  // ModCallback.POST_PICKUP_UPDATE (35)
  private postPickupUpdate = (pickup: EntityPickup) => {
    const pickupIndex = this.pickupIndexCreation.getPickupIndex(pickup);

    const oldVariant = this.v.room.pickupVariants.get(pickupIndex);
    this.v.room.pickupVariants.set(pickupIndex, pickup.Variant);

    const oldSubType = this.v.room.pickupSubTypes.get(pickupIndex);
    this.v.room.pickupSubTypes.set(pickupIndex, pickup.SubType);

    // If this is the first update frame for the pickup, it cannot have changed.
    if (oldVariant === undefined || oldSubType === undefined) {
      return;
    }

    if (oldVariant !== pickup.Variant || oldSubType !== pickup.SubType) {
      this.postPickupChanged.fire(
        pickup,
        oldVariant,
        oldSubType,
        pickup.Variant,
        pickup.SubType,
      );
    }
  };
}
