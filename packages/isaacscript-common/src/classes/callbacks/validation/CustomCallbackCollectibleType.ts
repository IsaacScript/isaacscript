import { CollectibleType } from "isaac-typescript-definitions";
import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureCollectibleType = (
  player: EntityPlayer,
  collectibleType: CollectibleType,
) => void;
type ModCallbackCustomCollectibleType =
  MatchingCallbackCustom<CallbackSignatureCollectibleType>;

export class CustomCallbackCollectibleType<
  T extends ModCallbackCustomCollectibleType,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackCollectibleType] = optionalArgs;
    if (callbackCollectibleType === undefined) {
      return true;
    }

    const [_player, collectibleType] = fireArgs;
    return collectibleType === callbackCollectibleType;
  }
}
