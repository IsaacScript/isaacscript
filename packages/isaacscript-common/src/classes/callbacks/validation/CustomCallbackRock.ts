import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureRock = (rock: GridEntityRock) => void;
type ModCallbackCustomRock = MatchingCallbackCustom<CallbackSignatureRock>;

export class CustomCallbackRock<
  T extends ModCallbackCustomRock,
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

    const [rock] = fireArgs;
    // This is not `RockVariant` because `GridEntityRock` can be other grid entity types than just
    // `GridEntityType.ROCK`.
    const variant = rock.GetVariant();
    return variant === callbackVariant;
  }
}
