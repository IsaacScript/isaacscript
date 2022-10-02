import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getSpikes } from "../../functions/gridEntitiesSpecific";
import { shouldFireSpikes } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSpikesRender extends CustomCallback<ModCallbackCustom2.POST_SPIKES_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  protected override shouldFire = shouldFireSpikes;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const spikes of getSpikes()) {
      this.fire(spikes);
    }
  };
}
