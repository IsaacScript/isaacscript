import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackGridEntity } from "./validation/CustomCallbackGridEntity";

export class PostGridEntityInit extends CustomCallbackGridEntity<ModCallbackCustom2.POST_GRID_ENTITY_INIT> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature.GRID_ENTITY_DETECTION];
  }
}
