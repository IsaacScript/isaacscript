import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

export class PostFirstFlip extends CustomCallback<ModCallbackCustom.POST_FIRST_FLIP> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.FLIP_DETECTION];
  }
}
