import { IsaacScriptCommonFeature2 } from "../../enums/IsaacScriptCommonFeature2";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallbackRevive } from "./validation/CustomCallbackRevive";

export class PostCustomRevive extends CustomCallbackRevive<ModCallbackCustom2.POST_CUSTOM_REVIVE> {
  override v = {
    run: {
      playersDamageFrameMap: new Map<
        PlayerIndex,
        [lastDamageFrame: int, callbackFiredOnThisFrame: boolean]
      >(),
    },

    level: {
      numSacrifices: 0,
    },
  };

  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature2.CUSTOM_REVIVE];
  }
}
