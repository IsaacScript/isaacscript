import { CallbackPriority } from "../../enums/CallbackPriority";

declare global {
  interface ModDescription<T extends keyof AddCallbackParameters> {
    Function: AddCallbackParameters[T][0];

    Mod: Mod;

    /** The tertiary argument, if any. */
    Param?: int;

    /** The default is 0. */
    Priority: CallbackPriority | int;
  }
}
