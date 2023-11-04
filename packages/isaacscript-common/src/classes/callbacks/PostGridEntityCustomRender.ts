import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireGridEntityCustom } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityCustomRender extends CustomCallback<ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_RENDER_DETECTION];
  }

  protected override shouldFire = shouldFireGridEntityCustom;
}
