import { MatchingCallbackCustom } from "packages/isaacscript-common/src/types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignaturePlayer = (player: EntityPlayer) => unknown;
type ModCallbackCustomPlayer = MatchingCallbackCustom<CallbackSignaturePlayer>;

export class CustomCallbackPlayer<
  T extends ModCallbackCustomPlayer,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [player] = fireArgs;
    const [callbackPlayerVariant, callbackCharacter] = optionalArgs;

    if (
      callbackPlayerVariant !== undefined &&
      callbackPlayerVariant !== player.Variant
    ) {
      return false;
    }

    const character = player.GetPlayerType();

    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      return false;
    }

    return true;
  }
}
