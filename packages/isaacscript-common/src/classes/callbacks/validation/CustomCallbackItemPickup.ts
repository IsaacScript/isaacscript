import {
  PickingUpItem,
  PickingUpItemCollectible,
  PickingUpItemTrinket,
} from "../../../types/PickingUpItem";
import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureItemPickup =
  | ((player: EntityPlayer, pickingUpItem: PickingUpItem) => void)
  | ((player: EntityPlayer, pickingUpItem: PickingUpItemCollectible) => void)
  | ((player: EntityPlayer, pickingUpItem: PickingUpItemTrinket) => void);

type ModCallbackCustomItemPickup =
  MatchingCallbackCustom<CallbackSignatureItemPickup>;

export class CustomCallbackItemPickup<
  T extends ModCallbackCustomItemPickup,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [_player, pickingUpItem] = fireArgs;
    const [callbackItemType, callbackSubtype] = optionalArgs;

    if (
      callbackItemType !== undefined &&
      callbackItemType !== pickingUpItem.itemType
    ) {
      return false;
    }

    if (
      callbackSubtype !== undefined &&
      callbackSubtype !== pickingUpItem.subType
    ) {
      return false;
    }

    return true;
  }
}
