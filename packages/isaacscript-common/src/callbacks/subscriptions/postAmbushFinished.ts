import { AmbushType } from "../../enums/AmbushType";

export type PostAmbushFinishedRegisterParameters = [
  callback: (ambushType: AmbushType) => void,
  ambushType?: AmbushType,
];

const subscriptions: PostAmbushFinishedRegisterParameters[] = [];

export function postAmbushFinishedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postAmbushFinishedRegister(
  ...args: PostAmbushFinishedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postAmbushFinishedFire(ambushType: AmbushType): void {
  for (const [callback, callbackAmbushType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackAmbushType !== undefined && callbackAmbushType !== ambushType) {
      continue;
    }

    callback(ambushType);
  }
}
