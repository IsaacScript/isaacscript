import { ModCallback } from "isaac-typescript-definitions";
import {
  ADD_CALLBACK_ARGS_KEY,
  ADD_CALLBACK_CUSTOM_ARGS_KEY,
  ModFeature,
} from "../classes/ModFeature";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import { AllButFirst } from "../types/AllButFirst";

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `Mod.AddCallback`.
 */
export function Callback<T extends ModCallback>(
  modCallback: T,
  ...optionalArgs: AllButFirst<AddCallbackParameters[T]>
) {
  return <Class extends ModFeature, Fn extends AddCallbackParameters[T][0]>(
    target: Class,
    propertyKey: string,
    _descriptor: TypedPropertyDescriptor<Fn>,
  ): void => {
    // First, prepare the arguments for the `Mod.AddCallback` method.
    const methodName = propertyKey as keyof Class;
    const method = target[methodName] as AddCallbackParameters[T][0];
    const addCallbackArgs = [
      modCallback,
      method,
      ...optionalArgs,
    ] as unknown as AddCallbackParameters[T];

    // Since the decorator runs prior to instantiation, we only have access to get and set static
    // properties, which are located on the "constructor" table. Thus, we store the callback
    // arguments for later.
    const constructor = target.constructor as unknown as LuaTable<
      AnyNotNil,
      unknown
    >;
    if (!constructor.has(ADD_CALLBACK_ARGS_KEY)) {
      constructor.set(ADD_CALLBACK_ARGS_KEY, []);
    }

    const callbackTuples = constructor.get(ADD_CALLBACK_ARGS_KEY) as unknown[];
    callbackTuples.push(addCallbackArgs);
  };
}

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `ModUpgraded.AddCallbackCustom`.
 */
export function CallbackCustom<T extends ModCallbackCustom>(
  modCallbackCustom: T,
  ...optionalArgs: AllButFirst<AddCallbackParametersCustom[T]>
) {
  return <
    Class extends ModFeature,
    Fn extends AddCallbackParametersCustom[T][0],
  >(
    target: Class,
    propertyKey: string,
    _descriptor: TypedPropertyDescriptor<Fn>,
  ): void => {
    // First, prepare the arguments for the `Mod.AddCallbackCustom` method.
    const methodName = propertyKey as keyof Class;
    const method = target[methodName] as AddCallbackParametersCustom[T][0];
    const addCallbackArgs = [
      modCallbackCustom,
      method,
      ...optionalArgs,
    ] as unknown as AddCallbackParametersCustom[T];

    // Since the decorator runs prior to instantiation, we only have access to get and set static
    // properties, which are located on the "constructor" table. Thus, we store the callback
    // arguments for later.
    const constructor = target.constructor as unknown as LuaTable<
      AnyNotNil,
      unknown
    >;
    if (!constructor.has(ADD_CALLBACK_CUSTOM_ARGS_KEY)) {
      constructor.set(ADD_CALLBACK_CUSTOM_ARGS_KEY, []);
    }

    const callbackTuples = constructor.get(
      ADD_CALLBACK_CUSTOM_ARGS_KEY,
    ) as unknown[];
    callbackTuples.push(addCallbackArgs);
  };
}
