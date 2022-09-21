import { ModCallbackCustom2 } from "../enums/ModCallbackCustom2";
import { AddCallbackParametersCustom2 } from "../interfaces/private/AddCallbackParametersCustom2";
import { SaveData } from "../interfaces/SaveData";
import { CallbackTuple, CustomCallbackTuple } from "../types/CallbackTuple";

/**
 * The base class for a custom callback. Individual custom callbacks will extend from this class.
 */
export abstract class CustomCallback<T extends ModCallbackCustom2> {
  /** This is manually managed by the `ModUpgraded` class. */
  initialized = false;

  subscriptions: Array<AddCallbackParametersCustom2[T]> = [];

  otherCallbacksUsed?: CallbackTuple[];
  otherCustomCallbacksUsed?: CustomCallbackTuple[];
  saveDataManager?: [key: string, v: SaveData];

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

  /**
   * For any callback that has one or more optional filtration arguments, this method must be
   * overridden.
   */
  fire(...args: Parameters<AddCallbackParametersCustom2[T][0]>): void {
    for (const [callback] of this.subscriptions) {
      // @ts-expect-error The compiler is not smart enough to discern that the arguments should
      // match the callback.
      callback(...args);
    }
  }
}
