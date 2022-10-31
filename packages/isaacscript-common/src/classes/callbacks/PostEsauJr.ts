import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

export class PostEsauJr extends CustomCallback<ModCallbackCustom.POST_ESAU_JR> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.ESAU_JR_DETECTION];
  }
}
