import type { CallbackPriority } from "../../enums/CallbackPriority";

declare global {
  interface ModDescription<T extends keyof AddCallbackParameters | string> {
    Function: T extends keyof AddCallbackParameters
      ? AddCallbackParameters[T][0]
      : unknown;

    Mod: Mod;

    /** The tertiary argument, if any. */
    Param?: int;

    /** The default is 0. */
    Priority: CallbackPriority | int;
  }
}
