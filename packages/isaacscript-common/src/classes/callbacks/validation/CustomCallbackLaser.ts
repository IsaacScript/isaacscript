import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureLaser = (laser: EntityLaser) => void;
type ModCallbackCustomLaser = MatchingCallbackCustom<CallbackSignatureLaser>;

export class CustomCallbackLaser<
  T extends ModCallbackCustomLaser,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackLaserVariant] = optionalArgs;
    if (callbackLaserVariant === undefined) {
      return true;
    }

    const [laser] = fireArgs;
    return laser.Variant === callbackLaserVariant;
  }
}
