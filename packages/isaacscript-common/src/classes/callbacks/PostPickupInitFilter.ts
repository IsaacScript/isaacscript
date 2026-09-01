import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupInitFilter extends CustomCallback<ModCallbackCustom.POST_PICKUP_INIT_FILTER> {
  // ModCallback.POST_PICKUP_INIT (34)
  private readonly postPickupInit = (pickup: EntityPickup) => {
    this.fire(pickup);
  };

  protected override shouldFire = shouldFirePickup;

  constructor() {
    super();

    this.callbacksUsed = [
      // 34
      [ModCallback.POST_PICKUP_INIT, this.postPickupInit],
    ];
  }
}
