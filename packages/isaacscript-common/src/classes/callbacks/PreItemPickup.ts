import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireItemPickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreItemPickup extends CustomCallback<ModCallbackCustom.PRE_ITEM_PICKUP> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.ITEM_PICKUP_DETECTION];
  }

  protected override shouldFire = shouldFireItemPickup;
}
