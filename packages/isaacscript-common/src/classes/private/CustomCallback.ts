import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { AddCallbackParametersCustom } from "../../interfaces/private/AddCallbackParametersCustom";
import { AllButFirst } from "../../types/private/AllButFirst";
import { Feature } from "./Feature";

export type FireArgs<T extends ModCallbackCustom> = Parameters<
  AddCallbackParametersCustom[T][0]
>;
export type OptionalArgs<T extends ModCallbackCustom> = AllButFirst<
  AddCallbackParametersCustom[T]
>;

/**
 * The base class for a custom callback. Individual custom callbacks (and validation callbacks) will
 * extend from this class.
 */
export abstract class CustomCallback<
  T extends ModCallbackCustom,
> extends Feature {
  private subscriptions: Array<AddCallbackParametersCustom[T]> = [];

  public addSubscriber(...args: AddCallbackParametersCustom[T]): void {
    this.subscriptions.push(args);
  }

  /**
   * If the submitted function does not match any of the existing subscriptions, this method will do
   * nothing.
   */
  public removeSubscriber(callback: AddCallbackParametersCustom[T][0]): void {
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

  public fire = (
    ...fireArgs: FireArgs<T>
  ): ReturnType<AddCallbackParametersCustom[T][0]> => {
    for (const [callback, ...optionalArgsArray] of this.subscriptions) {
      // The TypeScript compiler is bugged with the spread operator here, as it converts the
      // optional arguments to an array instead of a tuple.
      const optionalArgs = optionalArgsArray as OptionalArgs<T>;

      if (this.shouldFire(fireArgs, optionalArgs)) {
        // The TypeScript compiler is not smart enough to know that the fire args match the callback
        // signature.
        const callbackCasted = callback as (
          ...args: FireArgs<T>
        ) => ReturnType<AddCallbackParametersCustom[T][0]>;
        const value = callbackCasted(...fireArgs);
        if (value !== undefined) {
          return value;
        }
      }
    }

    return undefined as ReturnType<AddCallbackParametersCustom[T][0]>;
  };

  /**
   * This method needs to be overwritten for any callback that has optional filtration arguments.
   * See "shouldFire.ts" for methods tailored to specific kinds of callbacks.
   */
  // eslint-disable-next-line class-methods-use-this
  protected shouldFire: (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ) => boolean = () => true;
}
