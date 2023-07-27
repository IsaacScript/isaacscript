import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getSpikes } from "../../functions/gridEntitiesSpecific";
import { shouldFireSpikes } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSpikesRender extends CustomCallback<ModCallbackCustom.POST_SPIKES_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  protected override shouldFire = shouldFireSpikes;

  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const spikes of getSpikes()) {
      this.fire(spikes);
    }
  };
}
