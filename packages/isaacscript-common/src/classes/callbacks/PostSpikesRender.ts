import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getSpikes } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackSpikes } from "./validation/CustomCallbackSpikes";

export class PostSpikesRender extends CustomCallbackSpikes<ModCallbackCustom2.POST_SPIKES_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    for (const spikes of getSpikes()) {
      this.fire(spikes);
    }
  };
}
