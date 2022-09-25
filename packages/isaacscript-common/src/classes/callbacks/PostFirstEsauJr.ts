import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostFirstEsauJr extends CustomCallback<ModCallbackCustom2.POST_FIRST_ESAU_JR> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.ESAU_JR_DETECTION];
  }
}
