import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPoops } from "../../functions/gridEntitiesSpecific";
import { shouldFirePoop } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPoopRender extends CustomCallback<ModCallbackCustom.POST_POOP_RENDER> {
  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const poop of getPoops()) {
      this.fire(poop);
    }
  };

  protected override shouldFire = shouldFirePoop;

  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }
}
