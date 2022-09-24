import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostFlip extends CustomCallback<ModCallbackCustom2.POST_FLIP> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.FLIP_DETECTION];
  }
}
