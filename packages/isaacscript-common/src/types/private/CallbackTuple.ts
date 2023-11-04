import type { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { AddCallbackParametersCustom } from "../../interfaces/private/AddCallbackParametersCustom";
import type { AllButFirst } from "../AllButFirst";

/**
 * A mapping of the callback enum to the associated callback function and optional arguments. This
 * is so that the respective callback functions can be added/removed on demand as subscribers get
 * added/removed.
 */
export type CallbackTuple = {
  [K in ModCallback]: [
    modCallback: K,
    callbackFunc: AddCallbackParameters[K][0],
    optionalArgs?: AllButFirst<AddCallbackParameters[K]>,
  ];
}[ModCallback];

/**
 * A mapping of the custom callback enum to the associated callback function and optional arguments.
 * This is so that the respective callback functions can be added/removed on demand as subscribers
 * get added/removed.
 */
export type CustomCallbackTuple = {
  [K in ModCallbackCustom]: [
    modCallback: K,
    callbackFunc: AddCallbackParametersCustom[K][0],
    optionalArgs?: AllButFirst<AddCallbackParametersCustom[K]>,
  ];
}[ModCallbackCustom];
