import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import { SaveData } from "../interfaces/SaveData";

/** This is the shape of all of the entries in the `AddCallbackParametersCustom` interface. */
type CustomCallbackParameters = [
  // We have to use any instead of unknown.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => unknown,
  ...optionalArgs: unknown[],
];

/**
 * A mapping of the callback enum to the associated callback functions (and optional arguments).
 * This is so that the respective callback functions can be added/removed on demand as subscribers
 * get added/removed.
 */
type CallbackTuple = {
  [K in ModCallback]: [K, AddCallbackParameters[K]];
}[ModCallback];
type CustomCallbackTuple = {
  [K in ModCallbackCustom]: [K, AddCallbackParametersCustom[K]];
}[ModCallbackCustom];

/**
 * The base class for a custom callback. Individual custom callbacks will extend from this class.
 */
export abstract class CustomCallback<T extends CustomCallbackParameters> {
  subscriptions: T[] = [];

  otherCallbacksUsed?: CallbackTuple[];
  otherCustomCallbacksUsed?: CustomCallbackTuple[];
  saveDataManager?: [key: string, v: SaveData];

  hasSubscriptions(): boolean {
    return this.subscriptions.length > 0;
  }

  add(...args: T): void {
    this.subscriptions.push(args);
  }

  /**
   * If the submitted function does not match any of the existing subscriptions, this method will do
   * nothing.
   */
  remove(callback: T[0]): void {
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

  /** For any callback that has one or more filtration arguments, this method must be overridden. */
  fire(...args: Parameters<T[0]>): void {
    for (const [callback] of this.subscriptions) {
      callback(...args);
    }
  }
}
