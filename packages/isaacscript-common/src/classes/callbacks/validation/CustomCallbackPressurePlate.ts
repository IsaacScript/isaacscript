import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignaturePressurePlate = (
  pressurePlate: GridEntityPressurePlate,
) => void;
type ModCallbackCustomPressurePlate =
  MatchingCallbackCustom<CallbackSignaturePressurePlate>;

export class CustomCallbackPressurePlate<
  T extends ModCallbackCustomPressurePlate,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackPressurePlateVariant] = optionalArgs;
    if (callbackPressurePlateVariant === undefined) {
      return true;
    }

    const [pressurePlate] = fireArgs;
    const poopGridEntityVariant = pressurePlate.GetVariant();
    return poopGridEntityVariant === callbackPressurePlateVariant;
  }
}
