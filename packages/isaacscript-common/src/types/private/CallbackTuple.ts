import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { AddCallbackParametersCustom2 } from "../../interfaces/private/AddCallbackParametersCustom2";

/**
 * A mapping of the callback enum to the associated callback functions (and optional arguments).
 * This is so that the respective callback functions can be added/removed on demand as subscribers
 * get added/removed.
 */
export type CallbackTuple = {
  [K in ModCallback]: [K, AddCallbackParameters[K]];
}[ModCallback];

/**
 * A mapping of the custom callback enum to the associated callback functions (and optional
 * arguments). This is so that the respective callback functions can be added/removed on demand as
 * subscribers get added/removed.
 */
export type CustomCallbackTuple = {
  [K in ModCallbackCustom2]: [K, AddCallbackParametersCustom2[K]];
}[ModCallbackCustom2];
