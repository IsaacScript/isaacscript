import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPoops } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackPoop } from "./validation/CustomCallbackPoop";

export class PostPoopRender extends CustomCallbackPoop<ModCallbackCustom2.POST_POOP_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const poop of getPoops()) {
      this.fire(poop);
    }
  };
}
