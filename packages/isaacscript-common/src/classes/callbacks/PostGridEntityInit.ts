import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireGridEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGridEntityInit extends CustomCallback<ModCallbackCustom.POST_GRID_ENTITY_INIT> {
  protected override shouldFire = shouldFireGridEntity;
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }
}
