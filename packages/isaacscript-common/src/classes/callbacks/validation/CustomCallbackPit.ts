import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignaturePit = (pit: GridEntityPit) => void;
type ModCallbackCustomPit = MatchingCallbackCustom<CallbackSignaturePit>;

export class CustomCallbackPit<
  T extends ModCallbackCustomPit,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackPitVariant] = optionalArgs;
    if (callbackPitVariant === undefined) {
      return true;
    }

    const [pit] = fireArgs;
    const pitVariant = pit.GetVariant();
    return pitVariant === callbackPitVariant;
  }
}
