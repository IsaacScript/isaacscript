import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackCollectibleType } from "./validation/CustomCallbackCollectibleType";

export class PostPlayerCollectibleAdded extends CustomCallbackCollectibleType<ModCallbackCustom2.POST_PLAYER_COLLECTIBLE_ADDED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PLAYER_COLLECTIBLE_DETECTION];
  }
}
