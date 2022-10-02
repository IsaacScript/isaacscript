import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireItemPickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreItemPickup extends CustomCallback<ModCallbackCustom2.PRE_ITEM_PICKUP> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.ITEM_PICKUP_DETECTION];
  }

  protected override shouldFire = shouldFireItemPickup;
}
