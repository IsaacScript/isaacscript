import type { CallbackPriority } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { sortObjectArrayByKey, stableSort } from "../../functions/sort";
import type { AddCallbackParametersCustom } from "../../interfaces/private/AddCallbackParametersCustom";
import type { AllButFirst } from "../../types/AllButFirst";
import type { AnyFunction } from "../../types/AnyFunction";
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

    // Sort the subscriptions by priority so that the callbacks with the lowest priority are first.
    // By default, the `Array.sort` method is transpiled to using Lua's sort, which is not stable.
    // We need to do a stable sort so that we preserve the subscription order.
    this.subscriptions = stableSort(
      this.subscriptions,
      sortObjectArrayByKey("priority"),
    );
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
        // - TypeScript is not smart enough to know that the arguments match the function, so we
        //   must cast it to `AnyFunction`.
        // - We cannot use `...fireArgs` here because it would fail to pass any arguments that exist
        //   beyond `nil` elements.
        const value = (callbackFunc as AnyFunction)(
          fireArgs[0],
          fireArgs[1],
          fireArgs[2],
          fireArgs[3],
          fireArgs[4],
          fireArgs[5],
          fireArgs[6],
        );
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
