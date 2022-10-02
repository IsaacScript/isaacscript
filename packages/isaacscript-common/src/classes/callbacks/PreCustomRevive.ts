import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreCustomRevive extends CustomCallback<ModCallbackCustom2.PRE_CUSTOM_REVIVE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.CUSTOM_REVIVE];
  }

  protected override shouldFire = shouldFirePlayer;
}
