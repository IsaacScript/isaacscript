import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { AddCallbackParametersCustom } from "../../interfaces/private/AddCallbackParametersCustom";
import { AllButFirst } from "../AllButFirst";

/**
 * A mapping of the callback enum to the associated callback function and optional arguments. This
 * is so that the respective callback functions can be added/removed on demand as subscribers get
 * added/removed.
 */
export type CallbackTuple = {
  [Key in ModCallback]: [
    modCallback: Key,
    callbackFunc: AddCallbackParameters[Key][0],
    optionalArgs?: AllButFirst<AddCallbackParameters[Key]>,
  ];
}[ModCallback];

/**
 * A mapping of the custom callback enum to the associated callback function and optional arguments.
 * This is so that the respective callback functions can be added/removed on demand as subscribers
 * get added/removed.
 */
export type CustomCallbackTuple = {
  [Key in ModCallbackCustom]: [
    modCallback: Key,
    callbackFunc: AddCallbackParametersCustom[Key][0],
    optionalArgs?: AllButFirst<AddCallbackParametersCustom[Key]>,
  ];
}[ModCallbackCustom];
