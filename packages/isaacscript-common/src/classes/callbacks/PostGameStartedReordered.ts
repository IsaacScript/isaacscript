import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostGameStartedReordered extends CustomCallback<ModCallbackCustom2.POST_GAME_STARTED_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.GAME_REORDERED_CALLBACKS];
  }
}
