import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureDoor = (door: GridEntityDoor) => void;
type ModCallbackCustomDoor = MatchingCallbackCustom<CallbackSignatureDoor>;

export class CustomCallbackDoor<
  T extends ModCallbackCustomDoor,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackDoorVariant] = optionalArgs;
    if (callbackDoorVariant === undefined) {
      return true;
    }

    const [door] = fireArgs;
    const doorVariant = door.GetVariant();
    return doorVariant === callbackDoorVariant;
  }
}
