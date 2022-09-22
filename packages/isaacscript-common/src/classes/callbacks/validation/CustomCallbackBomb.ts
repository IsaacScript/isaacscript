import { MatchingCallbackCustom } from "packages/isaacscript-common/src/types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureBomb = (bomb: EntityBomb) => void;
type ModCallbackCustomBomb = MatchingCallbackCustom<CallbackSignatureBomb>;

export class CustomCallbackBomb<
  T extends ModCallbackCustomBomb,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackBombVariant] = optionalArgs;
    if (callbackBombVariant === undefined) {
      return true;
    }

    const [bomb] = fireArgs;
    return bomb.Variant === callbackBombVariant;
  }
}
