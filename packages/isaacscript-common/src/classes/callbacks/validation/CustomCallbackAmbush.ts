import { AmbushType } from "packages/isaacscript-common/src/enums/AmbushType";
import { MatchingCallbackCustom } from "packages/isaacscript-common/src/types/private/MatchingCallbackCustom";
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
  override shouldFire(
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
