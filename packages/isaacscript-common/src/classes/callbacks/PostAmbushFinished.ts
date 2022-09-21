import { AmbushType } from "../../enums/AmbushType";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallback } from "../private/CustomCallback";

const v = {};

export class PostAmbushFinished extends CustomCallback<ModCallbackCustom2.POST_AMBUSH_FINISHED> {
  constructor() {
    super();

    this.otherCallbacksUsed = [];

    this.v = v;
  }

  override fire(ambushType: AmbushType): void {
    for (const [callback, callbackAmbushType] of this.subscriptions) {
      if (
        callbackAmbushType !== undefined &&
        callbackAmbushType !== ambushType
      ) {
        continue;
      }

      callback(ambushType);
    }
  }
}
