import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignaturePickup =
  | ((pickup: EntityPickup) => void)
  | ((pickup: EntityPickup, player: EntityPlayer) => void)
  | ((pickup: EntityPickup, previousState: int, currentState: int) => void);
type ModCallbackCustomPickup = MatchingCallbackCustom<CallbackSignaturePickup>;

export class CustomCallbackPickup<
  T extends ModCallbackCustomPickup,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [pickup] = fireArgs;
    const [callbackPickupVariant, callbackPickupSubType] = optionalArgs;

    if (
      callbackPickupVariant !== undefined &&
      callbackPickupVariant !== pickup.Variant
    ) {
      return false;
    }

    if (
      callbackPickupSubType !== undefined &&
      callbackPickupSubType !== pickup.SubType
    ) {
      return false;
    }

    return true;
  }
}
