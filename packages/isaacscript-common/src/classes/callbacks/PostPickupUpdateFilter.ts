import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupUpdateFilter extends CustomCallback<ModCallbackCustom.POST_PICKUP_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 35
      [ModCallback.POST_PICKUP_UPDATE, this.postPickupUpdate],
    ];
  }

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_UPDATE (35)
  private readonly postPickupUpdate = (pickup: EntityPickup) => {
    this.fire(pickup);
  };
}
