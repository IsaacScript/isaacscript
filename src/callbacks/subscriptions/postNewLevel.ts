import { PostNewLevelCallback } from "../../types/ModCallbacksCustom";

const subscriptions: Array<[() => void]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(data: PostNewLevelCallback): void {
  subscriptions.push([data.callback]);
}

export function postNewLevel(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
