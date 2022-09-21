import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getSpikes } from "../../functions/gridEntitiesSpecific";
import { CustomCallback } from "../private/CustomCallback";

export class PostSpikesRender extends CustomCallback<ModCallbackCustom2.POST_SPIKES_RENDER> {
  constructor() {
    super();

    this.otherCallbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  override fire(spikes: GridEntitySpikes): void {
    const spikesVariant = spikes.GetVariant();

    for (const [callback, callbackSpikesVariant] of this.subscriptions) {
      if (
        callbackSpikesVariant !== undefined &&
        callbackSpikesVariant !== spikesVariant
      ) {
        continue;
      }

      callback(spikes);
    }
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    for (const spikes of getSpikes()) {
      this.fire(spikes);
    }
  };
}
