import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotInit extends CustomCallback<ModCallbackCustom.POST_SLOT_INIT> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_UPDATE_DETECTION];
  }

  protected override shouldFire = shouldFireSlot;
}
