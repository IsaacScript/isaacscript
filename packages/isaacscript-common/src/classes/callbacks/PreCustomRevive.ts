import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackPlayer } from "./validation/CustomCallbackPlayer";

export class PreCustomRevive extends CustomCallbackPlayer<ModCallbackCustom2.PRE_CUSTOM_REVIVE> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.CUSTOM_REVIVE];
  }
}
