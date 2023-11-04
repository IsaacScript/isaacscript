import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_CUSTOM_REVIVE;

export class PostCustomRevive extends CustomCallback<ModCallbackCustom.POST_CUSTOM_REVIVE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.CUSTOM_REVIVE];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_player, revivalType] = fireArgs;
    const [callbackRevivalType] = optionalArgs;

    return (
      callbackRevivalType === undefined || revivalType === callbackRevivalType
    );
  };
}
