import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureNPC =
  | ((npc: EntityNPC) => void)
  | ((npc: EntityNPC, previousState: int, currentState: int) => void);
type ModCallbackCustomNPC = MatchingCallbackCustom<CallbackSignatureNPC>;

export class CustomCallbackNPC<
  T extends ModCallbackCustomNPC,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [npc] = fireArgs;
    const [callbackEntityType, callbackVariant] = optionalArgs;

    if (callbackEntityType !== undefined && callbackEntityType !== npc.Type) {
      return false;
    }

    if (callbackVariant !== undefined && callbackVariant !== npc.Variant) {
      return false;
    }

    return true;
  }
}
