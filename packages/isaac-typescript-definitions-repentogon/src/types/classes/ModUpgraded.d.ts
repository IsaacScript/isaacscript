import type { CallbackPriority } from "isaac-typescript-definitions";
import type { ModCallbackRepentogon } from "../../enums/ModCallbackRepentogon";

declare module "isaacscript-common" {
  interface ModUpgraded {
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

    /** @customName RemoveCallback */
    RemoveCallbackRepentogon: <T extends ModCallbackRepentogon>(
      modCallback: T,
      callback: AddCallbackParametersRepentogon[T][0],
    ) => void;
  }
}
