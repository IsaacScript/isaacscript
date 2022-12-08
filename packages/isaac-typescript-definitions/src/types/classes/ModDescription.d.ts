import { CallbackPriority } from "../../enums/CallbackPriority";
import { ModCallback } from "../../enums/ModCallback";

declare global {
  interface ModDescription<T extends ModCallback> {
    Function: AddCallbackParameters[T][0];

    Mod: Mod;

    /** The tertiary argument, if any. */
    Param?: int;

    /** The default is 0. */
    Priority: CallbackPriority | int;
  }
}
