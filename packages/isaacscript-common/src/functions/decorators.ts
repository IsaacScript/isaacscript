import { ModCallback } from "isaac-typescript-definitions";
import { ModFeature } from "../classes/ModFeature";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom2 } from "../enums/ModCallbackCustom2";
import { AddCallbackParametersCustom2 } from "../interfaces/private/AddCallbackParametersCustom2";
import { AllButFirst } from "../types/AllButFirst";

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `Mod.AddCallback`.
 */
export function Callback<T extends ModCallback>(
  modCallback: T,
  ...args: AllButFirst<AddCallbackParameters[T]>
) {
  return <Class extends ModFeature, Fn extends AddCallbackParameters[T][0]>(
    target: Class,
    propertyKey: string,
    _descriptor: TypedPropertyDescriptor<Fn>,
  ): void => {
    const methodName = propertyKey as keyof Class;
    const method = target[methodName] as AddCallbackParameters[T][0];
    // @ts-expect-error The compiler is not smart enough to join the types together.
    target.mod.AddCallback(modCallback, method, ...args);
  };
}

/**
 * A decorator function that signifies that the decorated class method should be automatically
 * registered with `ModUpgraded.AddCallbackCustom`.
 */
export function CallbackCustom<T extends ModCallbackCustom2>(
  modCallbackCustom: T,
  ...args: AllButFirst<AddCallbackParametersCustom2[T]>
) {
  return <Class extends { mod: ModUpgraded }>(
    target: Class,
    propertyKey: string,
  ): void => {
    const methodName = propertyKey as keyof Class;
    const method = target[methodName] as AddCallbackParametersCustom2[T][0];
    // @ts-expect-error The compiler is not smart enough to join the types together.
    target.mod.AddCallbackCustom2(modCallbackCustom, method, ...args);
  };
}
