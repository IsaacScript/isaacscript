import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { shouldFirePit } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPitRender extends CustomCallback<ModCallbackCustom.POST_PIT_RENDER> {
  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };

  protected override shouldFire = shouldFirePit;

  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }
}
