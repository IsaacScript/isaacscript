import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureTear = (tear: EntityTear) => void;
type ModCallbackCustomTear = MatchingCallbackCustom<CallbackSignatureTear>;

export class CustomCallbackTear<
  T extends ModCallbackCustomTear,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackTearVariant] = optionalArgs;
    if (callbackTearVariant === undefined) {
      return true;
    }

    const [tear] = fireArgs;
    return tear.Variant === callbackTearVariant;
  }
}
