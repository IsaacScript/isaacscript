import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureGridEntity =
  | ((gridEntity: GridEntity) => void)
  | ((gridEntity: GridEntity, oldState: int, newState: int) => void);
type ModCallbackCustomGridEntity =
  MatchingCallbackCustom<CallbackSignatureGridEntity>;

export class CustomCallbackGridEntity<
  T extends ModCallbackCustomGridEntity,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [gridEntity] = fireArgs;
    const [callbackGridEntityType, callbackVariant] = optionalArgs;

    const gridEntityType = gridEntity.GetType();

    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      return false;
    }

    const variant = gridEntity.GetVariant();

    if (callbackVariant !== undefined && callbackVariant !== variant) {
      return false;
    }

    return true;
  }
}
