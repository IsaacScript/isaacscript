import { SlotDestructionType } from "../../../enums/SlotDestructionType";
import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureSlot =
  | ((slot: EntitySlot) => void)
  | ((slot: EntitySlot, slotDestructionType: SlotDestructionType) => void)
  | ((slot: EntitySlot, player: EntityPlayer) => void)
  | ((
      slot: EntitySlot,
      previousAnimation: string,
      currentAnimation: string,
    ) => void);

type ModCallbackCustomSlot = MatchingCallbackCustom<CallbackSignatureSlot>;

export class CustomCallbackSlot<
  T extends ModCallbackCustomSlot,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackSlotVariant] = optionalArgs;
    if (callbackSlotVariant === undefined) {
      return true;
    }

    const [slot] = fireArgs;
    return slot.Variant === callbackSlotVariant;
  }
}
