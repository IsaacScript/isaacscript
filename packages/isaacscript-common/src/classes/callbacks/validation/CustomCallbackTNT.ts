import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureTNT = (tnt: GridEntityTNT) => void;
type ModCallbackCustomTNT = MatchingCallbackCustom<CallbackSignatureTNT>;

export class CustomCallbackTNT<
  T extends ModCallbackCustomTNT,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackVariant] = optionalArgs;
    if (callbackVariant === undefined) {
      return true;
    }

    const [tnt] = fireArgs;
    const variant = tnt.GetVariant();
    return variant === callbackVariant;
  }
}
