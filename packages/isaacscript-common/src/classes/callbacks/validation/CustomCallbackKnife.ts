import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureKnife = (knife: EntityKnife) => void;
type ModCallbackCustomKnife = MatchingCallbackCustom<CallbackSignatureKnife>;

export class CustomCallbackKnife<
  T extends ModCallbackCustomKnife,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackKnifeVariant] = optionalArgs;
    if (callbackKnifeVariant === undefined) {
      return true;
    }

    const [knife] = fireArgs;
    return knife.Variant === callbackKnifeVariant;
  }
}
