import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPoops } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackPoop } from "./validation/CustomCallbackPoop";

export class PostPoopUpdate extends CustomCallbackPoop<ModCallbackCustom2.POST_POOP_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const poop of getPoops()) {
      this.fire(poop);
    }
  };
}
