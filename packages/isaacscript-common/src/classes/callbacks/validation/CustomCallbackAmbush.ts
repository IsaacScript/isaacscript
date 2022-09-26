import { AmbushType } from "../../../enums/AmbushType";
import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureAmbush = (ambushType: AmbushType) => void;
type ModCallbackCustomAmbush = MatchingCallbackCustom<CallbackSignatureAmbush>;

export class CustomCallbackAmbush<
  T extends ModCallbackCustomAmbush,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackAmbushType] = optionalArgs;
    if (callbackAmbushType === undefined) {
      return true;
    }

    const [ambushType] = fireArgs;
    return ambushType === callbackAmbushType;
  }
}
