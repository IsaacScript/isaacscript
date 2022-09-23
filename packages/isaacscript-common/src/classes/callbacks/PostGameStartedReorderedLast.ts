import { IsaacScriptCommonFeature2 } from "../../enums/IsaacScriptCommonFeature2";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

export class PostGameStartedReorderedLast extends CustomCallback<ModCallbackCustom2.POST_GAME_STARTED_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature2.REORDERED_CALLBACKS];
  }
}
