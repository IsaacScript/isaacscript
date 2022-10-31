import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getTNT } from "../../functions/gridEntitiesSpecific";
import { shouldFireTNT } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTNTRender extends CustomCallback<ModCallbackCustom.POST_TNT_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  protected override shouldFire = shouldFireTNT;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const tnt of getTNT()) {
      this.fire(tnt);
    }
  };
}
