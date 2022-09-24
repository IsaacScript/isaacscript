import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackPlayer } from "./validation/CustomCallbackPlayer";

export class PostPlayerUpdateReordered extends CustomCallbackPlayer<ModCallbackCustom2.POST_PLAYER_UPDATE_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.PLAYER_REORDERED_CALLBACKS];
  }
}
