import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerRenderReordered extends CustomCallback<ModCallbackCustom.POST_PLAYER_RENDER_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.PLAYER_REORDERED_CALLBACKS];
  }

  protected override shouldFire = shouldFirePlayer;
}
