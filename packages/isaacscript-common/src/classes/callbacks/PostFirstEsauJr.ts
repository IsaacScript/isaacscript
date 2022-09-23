import { IsaacScriptCommonFeature2 } from "../../enums/IsaacScriptCommonFeature2";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostFirstEsauJr extends CustomCallback<ModCallbackCustom2.POST_FIRST_ESAU_JR> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature2.ESAU_JR];
  }
}
