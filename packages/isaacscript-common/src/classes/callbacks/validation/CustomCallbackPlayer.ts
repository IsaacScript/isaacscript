import { DamageFlag, PlayerType } from "isaac-typescript-definitions";
import { HealthType } from "../../../enums/HealthType";
import { StatType } from "../../../enums/StatType";
import { StatTypeType } from "../../../interfaces/StatTypeType";
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
    ) => boolean | undefined)
  | ((
      player: EntityPlayer,
      healthType: HealthType,
      difference: int,
      oldValue: int,
      newValue: int,
    ) => void)
  | (<T extends StatType>(
      player: EntityPlayer,
      statType: StatType,
      difference: int,
      oldValue: StatTypeType[T],
      newValue: StatTypeType[T],
    ) => void)
  | ((
      player: EntityPlayer,
      oldCharacter: PlayerType,
      newCharacter: PlayerType,
    ) => void);

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
