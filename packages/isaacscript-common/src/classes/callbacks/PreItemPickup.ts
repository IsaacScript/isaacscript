import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackItemPickup } from "./validation/CustomCallbackItemPickup";

export class PreItemPickup extends CustomCallbackItemPickup<ModCallbackCustom2.PRE_ITEM_PICKUP> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.ITEM_PICKUP_DETECTION];
  }
}
