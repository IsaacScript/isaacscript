import { AmbushType } from "../../enums/AmbushType";

export type PostAmbushStartedRegisterParameters = [
  callback: (ambushType: AmbushType) => void,
  ambushType?: AmbushType,
];

const subscriptions: PostAmbushStartedRegisterParameters[] = [];

/** @internal */
export function postAmbushStartedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postAmbushStartedRegister(
  ...args: PostAmbushStartedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postAmbushStartedFire(ambushType: AmbushType): void {
  for (const [callback, callbackAmbushType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackAmbushType !== undefined && callbackAmbushType !== ambushType) {
      continue;
    }

    callback(ambushType);
  }
}
