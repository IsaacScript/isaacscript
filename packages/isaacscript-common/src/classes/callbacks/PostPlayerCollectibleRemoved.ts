import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireCollectibleType } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerCollectibleRemoved extends CustomCallback<ModCallbackCustom2.POST_PLAYER_COLLECTIBLE_REMOVED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PLAYER_COLLECTIBLE_DETECTION];
  }

  protected override shouldFire = shouldFireCollectibleType;
}
