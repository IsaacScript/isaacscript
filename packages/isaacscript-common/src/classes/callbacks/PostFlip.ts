import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

export class PostFlip extends CustomCallback<ModCallbackCustom.POST_FLIP> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.FLIP_DETECTION];
  }
}
