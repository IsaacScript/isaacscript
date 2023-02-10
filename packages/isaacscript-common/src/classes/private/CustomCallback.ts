import { CallbackPriority } from "isaac-typescript-definitions/dist/src/enums/CallbackPriority";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { sortObjectArrayByKey } from "../../functions/sort";
import { AddCallbackParametersCustom } from "../../interfaces/private/AddCallbackParametersCustom";
import { AllButFirst } from "../../types/AllButFirst";
import { AnyFunction } from "../../types/AnyFunction";
import { Feature } from "./Feature";

export type FireArgs<T extends ModCallbackCustom> = Parameters<
  AddCallbackParametersCustom[T][0]
>;

export type OptionalArgs<T extends ModCallbackCustom> = AllButFirst<
  AddCallbackParametersCustom[T]
>;

interface Subscription<T extends ModCallbackCustom> {
  priority: CallbackPriority | int;
  callbackFunc: AddCallbackParametersCustom[T][0];
  optionalArgs: AllButFirst<AddCallbackParametersCustom[T]>;
}

/**
 * The base class for a custom callback. Individual custom callbacks (and validation callbacks) will
 * extend from this class.
 */
export abstract class CustomCallback<
  T extends ModCallbackCustom,
> extends Feature {
  private subscriptions: Array<Subscription<T>> = [];

  public addSubscriber(
    priority: CallbackPriority | int,
    callbackFunc: AddCallbackParametersCustom[T][0],
    ...optionalArgs: AllButFirst<AddCallbackParametersCustom[T]>
  ): void {
    const subscription: Subscription<T> = {
      priority,
      callbackFunc,
      optionalArgs,
    };
    this.subscriptions.push(subscription);
    this.subscriptions.sort(sortObjectArrayByKey("priority"));
  }

  /**
   * If the submitted function does not match any of the existing subscriptions, this method will do
   * nothing.
   */
  public removeSubscriber(callback: AddCallbackParametersCustom[T][0]): void {
    const subscriptionIndexMatchingCallback = this.subscriptions.findIndex(
      (subscription) => {
        const subscriptionCallback = subscription.callbackFunc;
        return callback === subscriptionCallback;
      },
    );
    if (subscriptionIndexMatchingCallback !== -1) {
      this.subscriptions.splice(subscriptionIndexMatchingCallback, 1);
    }
  }

  public fire = (
    ...fireArgs: FireArgs<T>
  ): ReturnType<AddCallbackParametersCustom[T][0]> => {
    for (const subscription of this.subscriptions) {
      const { callbackFunc, optionalArgs } = subscription;

      if (this.shouldFire(fireArgs, optionalArgs)) {
        // TypeScript is not smart enough to know that the arguments match the function.
        const value = (callbackFunc as AnyFunction)(...fireArgs);
        if (value !== undefined) {
          return value as ReturnType<AddCallbackParametersCustom[T][0]>;
        }
      }
    }

    return undefined as ReturnType<AddCallbackParametersCustom[T][0]>;
  };

  /**
   * This method needs to be overwritten for any callback that has optional filtration arguments.
   * See "shouldFire.ts" for methods tailored to specific kinds of callbacks.
   */
  protected shouldFire: (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ) => boolean = () => true;
}
