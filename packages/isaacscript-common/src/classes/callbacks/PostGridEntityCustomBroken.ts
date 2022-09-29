import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackGridEntityCustom } from "./validation/CustomCallbackGridEntityCustom";

export class PostGridEntityCustomBroken extends CustomCallbackGridEntityCustom<ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_BROKEN> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }
}
