import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostNewLevelReordered extends CustomCallback<ModCallbackCustom2.POST_NEW_LEVEL_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.GAME_REORDERED_CALLBACKS];
  }
}
