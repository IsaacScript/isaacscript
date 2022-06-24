import { AmbushType } from "../../enums/AmbushType";

export type PostAmbushFinishedRegisterParameters = [
  callback: (ambushType: AmbushType) => void,
  ambushType?: AmbushType,
];

const subscriptions: PostAmbushFinishedRegisterParameters[] = [];

/** @internal */
export function postAmbushFinishedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postAmbushFinishedRegister(
  ...args: PostAmbushFinishedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postAmbushFinishedFire(ambushType: AmbushType): void {
  for (const [callback, callbackAmbushType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackAmbushType !== undefined && callbackAmbushType !== ambushType) {
      continue;
    }

    callback(ambushType);
  }
}
