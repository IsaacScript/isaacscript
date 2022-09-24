import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackPlayer } from "./validation/CustomCallbackPlayer";

export class PostPEffectUpdateReordered extends CustomCallbackPlayer<ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.PLAYER_REORDERED_CALLBACKS];
  }
}
