import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { AddCallbackParametersCustom2 } from "../../interfaces/private/AddCallbackParametersCustom2";
import { SaveData } from "../../interfaces/SaveData";
import { AllButFirst } from "../../types/private/AllButFirst";
import {
  CallbackTuple,
  CustomCallbackTuple,
} from "../../types/private/CallbackTuple";

export type FireArgs<T extends ModCallbackCustom2> = Parameters<
  AddCallbackParametersCustom2[T][0]
>;
export type OptionalArgs<T extends ModCallbackCustom2> = AllButFirst<
  AddCallbackParametersCustom2[T]
>;

/**
 * The base class for a custom callback. Validation custom callbacks will extend from this class.
 */
export abstract class CustomCallback<T extends ModCallbackCustom2> {
  /** This is manually managed by the `ModUpgraded` class. */
  initialized = false;

  subscriptions: Array<AddCallbackParametersCustom2[T]> = [];

  otherCallbacksUsed?: CallbackTuple[];
  otherCustomCallbacksUsed?: CustomCallbackTuple[];
  v?: SaveData;

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

  fire(...fireArgs: FireArgs<T>): void {
    for (const [callback, ...optionalArgs] of this.subscriptions) {
      // @ts-expect-error The compiler is not smart enough to know that the arguments should match
      // the method.
      if (this.shouldFire(fireArgs, optionalArgs)) {
        // @ts-expect-error The compiler is not smart enough to know that the arguments should match
        // the callback.
        callback(...fireArgs);
      }
    }
  }

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
