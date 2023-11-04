import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotRender extends CustomCallback<ModCallbackCustom.POST_SLOT_RENDER> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_RENDER_DETECTION];
  }

  protected override shouldFire = shouldFireSlot;
}
