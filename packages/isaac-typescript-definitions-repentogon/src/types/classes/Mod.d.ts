import type { CallbackPriority } from "isaac-typescript-definitions";
import type { ModCallbackRepentogon } from "../../enums/ModCallbackRepentogon";

declare global {
  interface Mod {
    /** @customName AddCallback */
    readonly AddCallbackRepentogon: <
      T extends keyof AddCallbackParametersRepentogon | string,
    >(
      modCallback: T,
      ...args: T extends keyof AddCallbackParametersRepentogon
        ? AddCallbackParametersRepentogon[T]
        : unknown[]
    ) => void;

    /** @customName AddPriorityCallback */
    readonly AddPriorityCallbackRepentogon: <
      T extends keyof AddCallbackParametersRepentogon,
    >(
      modCallback: T,
      priority: CallbackPriority | int,
      ...args: T extends keyof AddCallbackParametersRepentogon
        ? AddCallbackParametersRepentogon[T]
        : unknown[]
    ) => void;

    /** @customName RemoveCallback */
    readonly RemoveCallbackRepentogon: <T extends ModCallbackRepentogon>(
      modCallback: T,
      callback: AddCallbackParametersRepentogon[T][0],
    ) => void;
  }
}
