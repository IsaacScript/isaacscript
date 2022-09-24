import { GridEntityType } from "isaac-typescript-definitions";
import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureGridEntityCustom =
  | ((gridEntity: GridEntity, gridEntityTypeCustom: GridEntityType) => void)
  | ((
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
      oldState: int,
      newState: int,
    ) => void);
type ModCallbackCustomGridEntityCustom =
  MatchingCallbackCustom<CallbackSignatureGridEntityCustom>;

export class CustomCallbackGridEntityCustom<
  T extends ModCallbackCustomGridEntityCustom,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackGridEntityTypeCustom] = optionalArgs;
    if (callbackGridEntityTypeCustom === undefined) {
      return true;
    }

    const [_gridEntity, gridEntityTypeCustom] = fireArgs;
    return gridEntityTypeCustom === callbackGridEntityTypeCustom;
  }
}
