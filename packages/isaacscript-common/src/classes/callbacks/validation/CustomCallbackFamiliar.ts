import { MatchingCallbackCustom } from "packages/isaacscript-common/src/types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureFamiliar =
  | ((familiar: EntityFamiliar) => void)
  | ((familiar: EntityFamiliar, previousState: int, currentState: int) => void);
type ModCallbackCustomFamiliar =
  MatchingCallbackCustom<CallbackSignatureFamiliar>;

export class CustomCallbackFamiliar<
  T extends ModCallbackCustomFamiliar,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackFamiliarVariant] = optionalArgs;
    if (callbackFamiliarVariant === undefined) {
      return true;
    }

    const [familiar] = fireArgs;
    return familiar.Variant === callbackFamiliarVariant;
  }
}
