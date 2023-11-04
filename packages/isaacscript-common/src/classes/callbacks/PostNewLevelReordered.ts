import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireLevel } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNewLevelReordered extends CustomCallback<ModCallbackCustom.POST_NEW_LEVEL_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GAME_REORDERED_CALLBACKS];
  }

  protected override shouldFire = shouldFireLevel;
}
