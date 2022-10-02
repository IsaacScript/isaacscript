import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotAnimationChanged extends CustomCallback<ModCallbackCustom2.POST_SLOT_ANIMATION_CHANGED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_RENDER_DETECTION];
  }

  protected override shouldFire = shouldFireSlot;
}
