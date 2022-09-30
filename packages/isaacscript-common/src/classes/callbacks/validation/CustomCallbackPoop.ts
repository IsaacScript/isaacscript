import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignaturePoop = (poop: GridEntityPoop) => void;
type ModCallbackCustomPoop = MatchingCallbackCustom<CallbackSignaturePoop>;

export class CustomCallbackPoop<
  T extends ModCallbackCustomPoop,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackPoopGridEntityVariant] = optionalArgs;
    if (callbackPoopGridEntityVariant === undefined) {
      return true;
    }

    const [poop] = fireArgs;
    const poopGridEntityVariant = poop.GetVariant();
    return poopGridEntityVariant === callbackPoopGridEntityVariant;
  }
}
