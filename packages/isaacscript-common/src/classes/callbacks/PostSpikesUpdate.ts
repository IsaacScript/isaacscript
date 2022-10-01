import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getSpikes } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackSpikes } from "./validation/CustomCallbackSpikes";

export class PostSpikesUpdate extends CustomCallbackSpikes<ModCallbackCustom2.POST_SPIKES_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const spikes of getSpikes()) {
      this.fire(spikes);
    }
  };
}
