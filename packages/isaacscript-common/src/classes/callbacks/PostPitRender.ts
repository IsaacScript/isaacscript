import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { CustomCallback } from "../private/CustomCallback";

export class PostPitRender extends CustomCallback<ModCallbackCustom2.POST_PIT_RENDER> {
  constructor() {
    super();

    this.otherCallbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  override fire(pit: GridEntityPit): void {
    const pitVariant = pit.GetVariant();

    for (const [callback, callbackPitVariant] of this.subscriptions) {
      if (
        callbackPitVariant !== undefined &&
        callbackPitVariant !== pitVariant
      ) {
        continue;
      }

      callback(pit);
    }
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };
}
