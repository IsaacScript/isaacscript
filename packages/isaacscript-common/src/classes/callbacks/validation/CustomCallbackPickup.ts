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
    const [callbackPickupVariant] = optionalArgs;
    if (callbackPickupVariant === undefined) {
      return true;
    }

    const [pickup] = fireArgs;
    return pickup.Variant === callbackPickupVariant;
  }
}
