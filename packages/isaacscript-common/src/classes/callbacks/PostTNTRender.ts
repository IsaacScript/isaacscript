import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getTNT } from "../../functions/gridEntitiesSpecific";
import { shouldFireTNT } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTNTRender extends CustomCallback<ModCallbackCustom.POST_TNT_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  protected override shouldFire = shouldFireTNT;

  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const tnt of getTNT()) {
      this.fire(tnt);
    }
  };
}
