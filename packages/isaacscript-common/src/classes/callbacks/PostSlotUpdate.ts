import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotUpdate extends CustomCallback<ModCallbackCustom2.POST_SLOT_UPDATE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_UPDATE_DETECTION];
  }

  protected override shouldFire = shouldFireSlot;
}
