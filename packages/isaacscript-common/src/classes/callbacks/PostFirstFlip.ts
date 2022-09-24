import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostFirstFlip extends CustomCallback<ModCallbackCustom2.POST_FIRST_FLIP> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.FLIP_DETECTION];
  }
}
