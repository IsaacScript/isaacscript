/* eslint-disable */

export class CustomCallback<AddParams extends [], FireParams extends []> {
  subscriptions: AddParams[] = [];

  hasSubscriptions(): boolean {
    return this.subscriptions.length > 0;
  }

  add(...args: AddParams): void {
    this.subscriptions.push(args);
  }

  remove(callback: AddParams[0]): void {
    const subscriptionIndexMatchingCallback = this.subscriptions.find(
      (subscription) => {
        // const subscriptionCallback = subscription[0];
      },
    );
  }

  fire(...args: FireParams): void {}
}
