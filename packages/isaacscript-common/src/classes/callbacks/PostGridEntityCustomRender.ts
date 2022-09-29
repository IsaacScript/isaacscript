import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackGridEntityCustom } from "./validation/CustomCallbackGridEntityCustom";

export class PostGridEntityCustomRender extends CustomCallbackGridEntityCustom<ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_RENDER> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_RENDER_DETECTION];
  }
}
