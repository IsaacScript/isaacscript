import { PostNewRoomCallback } from "../../types/ModCallbacksCustom";

const subscriptions: Array<[() => void]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(data: PostNewRoomCallback): void {
  subscriptions.push([data.callback]);
}

export function postNewRoom(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
