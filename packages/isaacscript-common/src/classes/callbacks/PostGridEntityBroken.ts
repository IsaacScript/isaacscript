import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireGridEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityBroken extends CustomCallback<ModCallbackCustom2.POST_GRID_ENTITY_BROKEN> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }

  protected override shouldFire = shouldFireGridEntity;
}
