import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBoolean } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostGameStartedReorderedLast extends CustomCallback<ModCallbackCustom.POST_GAME_STARTED_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GAME_REORDERED_CALLBACKS];
  }

  protected override shouldFire = shouldFireBoolean;
}
