import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { AddCallbackParametersCustom2 } from "../../interfaces/private/AddCallbackParametersCustom2";
import { AllButFirst } from "../../types/private/AllButFirst";
import { Feature } from "./Feature";

export type FireArgs<T extends ModCallbackCustom2> = Parameters<
  AddCallbackParametersCustom2[T][0]
>;
export type OptionalArgs<T extends ModCallbackCustom2> = AllButFirst<
  AddCallbackParametersCustom2[T]
>;

/**
 * The base class for a custom callback. Individual custom callbacks (and validation callbacks) will
 * extend from this class.
 */
export abstract class CustomCallback<
  T extends ModCallbackCustom2,
> extends Feature {
  subscriptions: Array<AddCallbackParametersCustom2[T]> = [];

  hasSubscriptions(): boolean {
    return this.subscriptions.length > 0;
  }

  add(...args: AddCallbackParametersCustom2[T]): void {
    this.subscriptions.push(args);
  }

  /**
   * If the submitted function does not match any of the existing subscriptions, this method will do
   * nothing.
   */
  remove(callback: AddCallbackParametersCustom2[T][0]): void {
    const subscriptionIndexMatchingCallback = this.subscriptions.findIndex(
      (subscription) => {
        const subscriptionCallback = subscription[0];
        return callback === subscriptionCallback;
      },
    );
    if (subscriptionIndexMatchingCallback !== -1) {
      this.subscriptions.splice(subscriptionIndexMatchingCallback, 1);
    }
  }

  fire = (
    ...fireArgs: FireArgs<T>
  ): ReturnType<AddCallbackParametersCustom2[T][0]> => {
    for (const [callback, ...optionalArgsArray] of this.subscriptions) {
      // The TypeScript compiler is bugged with the spread operator here, as it converts the
      // optional arguments to an array instead of a tuple.
      const optionalArgs = optionalArgsArray as OptionalArgs<T>;

      if (this.shouldFire(fireArgs, optionalArgs)) {
        // The TypeScript compiler is not smart enough to know that the fire args match the callback
        // signature.
        const callbackCasted = callback as (
          ...args: FireArgs<T>
        ) => ReturnType<AddCallbackParametersCustom2[T][0]>;
        const value = callbackCasted(...fireArgs);
        if (value !== undefined) {
          return value;
        }
      }
    }

    return undefined as ReturnType<AddCallbackParametersCustom2[T][0]>;
  };

  /**
   * This method needs to be overwritten for any callback that has optional filtration arguments.
   */
  // eslint-disable-next-line class-methods-use-this
  shouldFire(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fireArgs: FireArgs<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    return true;
  }
}
