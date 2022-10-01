import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getTNT } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackTNT } from "./validation/CustomCallbackTNT";

export class PostTNTRender extends CustomCallbackTNT<ModCallbackCustom2.POST_TNT_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const tnt of getTNT()) {
      this.fire(tnt);
    }
  };
}
