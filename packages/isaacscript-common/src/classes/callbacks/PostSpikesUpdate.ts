import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getSpikes } from "../../functions/gridEntitiesSpecific";
import { shouldFireSpikes } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSpikesUpdate extends CustomCallback<ModCallbackCustom2.POST_SPIKES_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFireSpikes;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const spikes of getSpikes()) {
      this.fire(spikes);
    }
  };
}
