import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreCustomRevive extends CustomCallback<ModCallbackCustom.PRE_CUSTOM_REVIVE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.CUSTOM_REVIVE];
  }

  protected override shouldFire = shouldFirePlayer;
}
