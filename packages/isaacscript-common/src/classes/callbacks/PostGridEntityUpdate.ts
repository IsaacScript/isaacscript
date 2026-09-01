import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireGridEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityUpdate extends CustomCallback<ModCallbackCustom.POST_GRID_ENTITY_UPDATE> {
  protected override shouldFire = shouldFireGridEntity;
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }
}
