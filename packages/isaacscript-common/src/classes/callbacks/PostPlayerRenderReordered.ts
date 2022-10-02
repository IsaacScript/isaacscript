import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerRenderReordered extends CustomCallback<ModCallbackCustom2.POST_PLAYER_RENDER_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PLAYER_REORDERED_CALLBACKS];
  }

  protected override shouldFire = shouldFirePlayer;
}
