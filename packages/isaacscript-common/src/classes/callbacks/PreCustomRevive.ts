import { IsaacScriptCommonFeature2 } from "../../enums/IsaacScriptCommonFeature2";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.PRE_CUSTOM_REVIVE;

export class PreCustomRevive extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [IsaacScriptCommonFeature2.CUSTOM_REVIVE];
  }

  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [player] = fireArgs;
    const [callbackPlayerVariant, callbackCharacter] = optionalArgs;

    if (
      callbackPlayerVariant !== undefined &&
      callbackPlayerVariant !== player.Variant
    ) {
      return false;
    }

    const character = player.GetPlayerType();

    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      return false;
    }

    return true;
  }
}
