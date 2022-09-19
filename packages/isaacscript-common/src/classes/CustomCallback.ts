import { ModUpgraded } from "./ModUpgraded";

/** This is the shape of all of the entries in the `AddCallbackParametersCustom` interface. */
type CustomCallbackParameters = [
  // Use any instead of unknown to prevent compiler errors and to avoid having to manually cast the
  // arguments.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => unknown,
  ...optionalArgs: unknown[],
];

/**
 * The base class for a custom callback. Individual custom callbacks will extend from this class.
 */
export abstract class CustomCallback<T extends CustomCallbackParameters> {
  mod: ModUpgraded;
  initialized = false;
  subscriptions: T[] = [];

  constructor(mod: ModUpgraded) {
    this.mod = mod;
  }

  /**
   * In the init function, we subscribe to the specific vanilla callbacks that the custom callback
   * will need.
   */
  abstract init(): void;

  /**
   * In the uninit function, we unsubscribe from the specific vanilla callbacks that we were using.
   */
  abstract uninit(): void;

  hasSubscriptions(): boolean {
    return this.subscriptions.length > 0;
  }

  add(...args: T): void {
    this.subscriptions.push(args);

    if (!this.initialized) {
      this.initialized = true;
      this.init();
    }
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

    if (!this.hasSubscriptions()) {
      this.initialized = false;
      this.uninit();
    }
  }

  /** For any callback that has one or more filtration arguments, this method must be overridden. */
  fire(...args: Parameters<T[0]>): void {
    for (const [callback] of this.subscriptions) {
      callback(...args);
    }
  }
}
