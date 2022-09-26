import { DamageFlag } from "isaac-typescript-definitions";
import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignaturePlayer =
  | ((player: EntityPlayer) => void)
  | ((player: EntityPlayer) => int | undefined)
  | ((
      player: EntityPlayer,
      amount: float,
      damageFlags: BitFlags<DamageFlag>,
      source: EntityRef,
      countdownFrames: int,
    ) => boolean | undefined);
type ModCallbackCustomPlayer = MatchingCallbackCustom<CallbackSignaturePlayer>;

export class CustomCallbackPlayer<
  T extends ModCallbackCustomPlayer,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
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
