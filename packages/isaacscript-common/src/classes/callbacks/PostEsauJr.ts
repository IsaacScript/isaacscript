import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostEsauJr extends CustomCallback<ModCallbackCustom2.POST_ESAU_JR> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.ESAU_JR_DETECTION];
  }
}
