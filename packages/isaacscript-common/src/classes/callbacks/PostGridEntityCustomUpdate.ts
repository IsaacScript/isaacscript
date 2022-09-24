import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackGridEntityCustom } from "./validation/CustomCallbackGridEntityCustom";

export class PostGridEntityCustomUpdate extends CustomCallbackGridEntityCustom<ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_UPDATE> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.GRID_ENTITY_DETECTION];
  }
}
