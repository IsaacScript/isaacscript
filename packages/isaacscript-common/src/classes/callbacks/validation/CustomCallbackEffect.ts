import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureEffect =
  | ((effect: EntityEffect) => void)
  | ((effect: EntityEffect, previousState: int, currentState: int) => void);
type ModCallbackCustomEffect = MatchingCallbackCustom<CallbackSignatureEffect>;

export class CustomCallbackEffect<
  T extends ModCallbackCustomEffect,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackEffectVariant] = optionalArgs;
    if (callbackEffectVariant === undefined) {
      return true;
    }

    const [effect] = fireArgs;
    return effect.Variant === callbackEffectVariant;
  }
}
