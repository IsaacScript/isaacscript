import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { shouldFirePit } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPitRender extends CustomCallback<ModCallbackCustom2.POST_PIT_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  protected override shouldFire = shouldFirePit;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };
}
