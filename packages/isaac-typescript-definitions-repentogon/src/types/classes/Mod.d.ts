import type { CallbackPriority } from "isaac-typescript-definitions";

declare global {
  interface Mod {
    /** @customName AddCallback */
    AddCallbackRepentogon: <
      T extends keyof AddCallbackParametersRepentogon | string,
    >(
      modCallback: T,
      ...args: T extends keyof AddCallbackParametersRepentogon
        ? AddCallbackParametersRepentogon[T]
        : unknown[]
    ) => void;

    /** @customName AddPriorityCallback */
    AddPriorityCallbackRepentogon: <
      T extends keyof AddCallbackParametersRepentogon,
    >(
      modCallback: T,
      priority: CallbackPriority | int,
      ...args: T extends keyof AddCallbackParametersRepentogon
        ? AddCallbackParametersRepentogon[T]
        : unknown[]
    ) => void;
  }
}
