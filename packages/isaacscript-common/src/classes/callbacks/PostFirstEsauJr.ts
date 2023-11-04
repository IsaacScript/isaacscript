import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

export class PostFirstEsauJr extends CustomCallback<ModCallbackCustom.POST_FIRST_ESAU_JR> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.ESAU_JR_DETECTION];
  }
}
