import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotDestroyed extends CustomCallback<ModCallbackCustom.POST_SLOT_DESTROYED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_DESTROYED_DETECTION];
  }

  protected override shouldFire = shouldFireSlot;
}
