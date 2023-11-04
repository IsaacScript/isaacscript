import type { PickupVariant } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import { ISCFeature } from "../../../enums/ISCFeature";
import type { PickupIndex } from "../../../types/PickupIndex";
import type { PostPickupChanged } from "../../callbacks/PostPickupChanged";
import { Feature } from "../../private/Feature";
import type { PickupIndexCreation } from "../other/PickupIndexCreation";

const v = {
  room: {
    pickupVariants: new Map<PickupIndex, PickupVariant>(),
    pickupSubTypes: new Map<PickupIndex, int>(),
  },
};

export class PickupChangeDetection extends Feature {
  public override v = v;

  private readonly postPickupChanged: PostPickupChanged;
  private readonly pickupIndexCreation: PickupIndexCreation;

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
  private readonly postPickupUpdate = (pickup: EntityPickup) => {
    const pickupIndex = this.pickupIndexCreation.getPickupIndex(pickup);

    const oldVariant = v.room.pickupVariants.get(pickupIndex);
    v.room.pickupVariants.set(pickupIndex, pickup.Variant);

    const oldSubType = v.room.pickupSubTypes.get(pickupIndex);
    v.room.pickupSubTypes.set(pickupIndex, pickup.SubType);

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
