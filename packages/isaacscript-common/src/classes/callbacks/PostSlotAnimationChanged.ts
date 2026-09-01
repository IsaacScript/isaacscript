import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotAnimationChanged extends CustomCallback<ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED> {
  protected override shouldFire = shouldFireSlot;
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_RENDER_DETECTION];
  }
}
