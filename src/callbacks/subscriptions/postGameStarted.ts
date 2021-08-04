import { PostGameStartedCallback } from "../../types/ModCallbacksCustom";

const subscriptions: Array<[() => void]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(data: PostGameStartedCallback): void {
  subscriptions.push([data.callback]);
}

export function postGameStarted(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
