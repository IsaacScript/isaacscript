/* eslint-disable jsdoc/escape-inline-tags */

/**
 * If you decide to structure your mod as a set of feature classes, you can use decorators to
 * automatically register callbacks.
 *
 * Currently, there are two decorators:
 * - `@Callback`
 * - `@CallbackCustom`
 *
 * For example:
 *
 * ```ts
 * export class MyFeature extends ModFeature {
 *   @Callback(ModCallback.POST_GAME_STARTED)
 *   postGameStarted(isContinued: boolean): void {
 *     Isaac.DebugString(`Callback fired: POST_GAME_STARTED`);
 *   }
 * }
 * ```
 *
 * @module
 */

import type { ModCallback } from "isaac-typescript-definitions";
import { CallbackPriority } from "isaac-typescript-definitions";
import type { ModFeature } from "../classes/ModFeature";
import {
  MOD_FEATURE_CALLBACKS_KEY,
  MOD_FEATURE_CUSTOM_CALLBACKS_KEY,
} from "../classes/ModFeature";
import type { ModCallbackCustom } from "../enums/ModCallbackCustom";
import type { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import type { AllButFirst } from "../types/AllButFirst";
import { getTSTLClassName } from "./tstlClass";

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `Mod.AddCallback`.
 *
 * @allowEmptyVariadic
 * @ignore
 */
// We tell TypeDoc to ignore this function because it generates a bunch of spam.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Callback<T extends ModCallback>(
  modCallback: T,
  ...optionalArgs: AllButFirst<AddCallbackParameters[T]>
) {
  return PriorityCallback(
    modCallback,
    CallbackPriority.DEFAULT,
    ...optionalArgs,
  );
}

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `ModUpgraded.AddCallbackCustom`.
 *
 * @allowEmptyVariadic
 * @ignore
 */
// We tell TypeDoc to ignore this function because it generates a bunch of spam.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function CallbackCustom<T extends ModCallbackCustom>(
  modCallbackCustom: T,
  ...optionalArgs: AllButFirst<AddCallbackParametersCustom[T]>
) {
  return PriorityCallbackCustom(
    modCallbackCustom,
    CallbackPriority.DEFAULT,
    ...optionalArgs,
  );
}

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `Mod.AddPriorityCallback`.
 *
 * @allowEmptyVariadic
 * @ignore
 */
// We tell TypeDoc to ignore this function because it generates a bunch of spam.
export function PriorityCallback<T extends ModCallback>(
  modCallback: T,
  priority: CallbackPriority | int,
  ...optionalArgs: AllButFirst<AddCallbackParameters[T]>
) {
  return <Fn extends AddCallbackParameters[T][0]>(
    target: ModFeature,
    propertyKey: string,
    _descriptor: TypedPropertyDescriptor<Fn>,
  ): void => {
    // First, prepare the arguments for the `Mod.AddPriorityCallback` method.
    const methodName = propertyKey as keyof ModFeature;
    const method = target[methodName] as AddCallbackParameters[T][0];
    const callbackTuple = [modCallback, priority, method, optionalArgs];

    // Since the decorator runs prior to instantiation, we only have access to get and set static
    // properties, which are located on the "constructor" table. Thus, we store the callback
    // arguments for later.
    const constructor = target.constructor as unknown as
      | Record<string, unknown>
      | undefined;

    if (constructor === undefined) {
      const tstlClassName = getTSTLClassName(target) ?? "Unknown";
      error(
        `Failed to get the constructor for class "${tstlClassName}". Did you decorate a static method? You can only decorate non-static class methods, because the "Mod" object is not present before the class is instantiated.`,
      );
    }

    const key = MOD_FEATURE_CALLBACKS_KEY;
    let callbackTuples = constructor[key] as unknown[] | undefined;
    if (callbackTuples === undefined) {
      callbackTuples = [];
      constructor[key] = callbackTuples;
    }

    callbackTuples.push(callbackTuple);
  };
}

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `ModUpgraded.AddCallbackCustom`.
 *
 * @allowEmptyVariadic
 * @ignore
 */
// We tell TypeDoc to ignore this function because it generates a bunch of spam.
export function PriorityCallbackCustom<T extends ModCallbackCustom>(
  modCallbackCustom: T,
  priority: CallbackPriority | int,
  ...optionalArgs: AllButFirst<AddCallbackParametersCustom[T]>
) {
  return <Fn extends AddCallbackParametersCustom[T][0]>(
    target: ModFeature,
    propertyKey: string,
    _descriptor: TypedPropertyDescriptor<Fn>,
  ): void => {
    // First, prepare the arguments for the `Mod.AddCallbackCustom` method.
    const methodName = propertyKey as keyof ModFeature;
    const method = target[methodName] as AddCallbackParametersCustom[T][0];
    const callbackTuple = [modCallbackCustom, priority, method, optionalArgs];

    // Since the decorator runs prior to instantiation, we only have access to get and set static
    // properties, which are located on the "constructor" table. Thus, we store the callback
    // arguments for later.
    const constructor = target.constructor as unknown as
      | Record<string, unknown>
      | undefined;

    if (constructor === undefined) {
      const tstlClassName = getTSTLClassName(target) ?? "Unknown";
      error(
        `Failed to get the constructor for class "${tstlClassName}". Did you decorate a static method? You can only decorate non-static class methods, because the "Mod" object is not present before the class is instantiated.`,
      );
    }

    const key = MOD_FEATURE_CUSTOM_CALLBACKS_KEY;
    let callbackTuples = constructor[key] as unknown[] | undefined;
    if (callbackTuples === undefined) {
      callbackTuples = [];
      constructor[key] = callbackTuples;
    }
    callbackTuples.push(callbackTuple);
  };
}
