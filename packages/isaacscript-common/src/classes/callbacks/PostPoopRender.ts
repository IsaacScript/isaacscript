import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPoops } from "../../functions/gridEntitiesSpecific";
import { shouldFirePoop } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPoopRender extends CustomCallback<ModCallbackCustom.POST_POOP_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  protected override shouldFire = shouldFirePoop;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const poop of getPoops()) {
      this.fire(poop);
    }
  };
}
