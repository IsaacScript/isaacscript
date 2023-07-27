import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupChanged extends CustomCallback<ModCallbackCustom.POST_PICKUP_CHANGED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PICKUP_CHANGE_DETECTION];
  }

  protected override shouldFire = shouldFirePickup;
}
