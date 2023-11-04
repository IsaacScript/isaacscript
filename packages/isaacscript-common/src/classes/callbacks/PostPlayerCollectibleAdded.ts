import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireCollectibleType } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerCollectibleAdded extends CustomCallback<ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PLAYER_COLLECTIBLE_DETECTION];
  }

  protected override shouldFire = shouldFireCollectibleType;
}
