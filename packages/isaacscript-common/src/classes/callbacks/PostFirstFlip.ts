import { IsaacScriptCommonFeature2 } from "../../enums/IsaacScriptCommonFeature2";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostFirstFlip extends CustomCallback<ModCallbackCustom2.POST_FIRST_FLIP> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature2.FLIP_DETECTION];
  }
}
