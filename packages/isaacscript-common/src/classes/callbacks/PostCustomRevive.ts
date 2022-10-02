import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_CUSTOM_REVIVE;

export class PostCustomRevive extends CustomCallback<ModCallbackCustom2.POST_CUSTOM_REVIVE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.CUSTOM_REVIVE];
  }

  // eslint-disable-next-line class-methods-use-this
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
