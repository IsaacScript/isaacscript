import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { shouldFirePit } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPitRender extends CustomCallback<ModCallbackCustom.POST_PIT_RENDER> {
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
