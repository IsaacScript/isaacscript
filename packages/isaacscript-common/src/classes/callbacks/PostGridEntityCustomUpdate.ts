import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireGridEntityCustom } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityCustomUpdate extends CustomCallback<ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }

  protected override shouldFire = shouldFireGridEntityCustom;
}
