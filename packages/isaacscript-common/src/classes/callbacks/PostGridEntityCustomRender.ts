import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireGridEntityCustom } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityCustomRender extends CustomCallback<ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_RENDER> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_RENDER_DETECTION];
  }

  protected override shouldFire = shouldFireGridEntityCustom;
}
