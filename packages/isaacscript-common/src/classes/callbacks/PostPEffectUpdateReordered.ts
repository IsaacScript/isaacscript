import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPEffectUpdateReordered extends CustomCallback<ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PLAYER_REORDERED_CALLBACKS];
  }

  protected override shouldFire = shouldFirePlayer;
}
