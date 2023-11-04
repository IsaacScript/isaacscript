import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireGridEntityCustom } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityCustomBroken extends CustomCallback<ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }

  protected override shouldFire = shouldFireGridEntityCustom;
}
