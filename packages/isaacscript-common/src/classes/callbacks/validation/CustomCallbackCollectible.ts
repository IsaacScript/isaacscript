import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureCollectible = (
  collectible: EntityPickupCollectible,
) => void;
type ModCallbackCustomCollectible =
  MatchingCallbackCustom<CallbackSignatureCollectible>;

export class CustomCallbackCollectible<
  T extends ModCallbackCustomCollectible,
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

    const [collectible] = fireArgs;
    return collectible.SubType === callbackCollectibleType;
  }
}
