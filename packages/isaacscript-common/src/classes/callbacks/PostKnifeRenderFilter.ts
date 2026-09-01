import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireKnife } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostKnifeRenderFilter extends CustomCallback<ModCallbackCustom.POST_KNIFE_RENDER_FILTER> {
  // ModCallback.POST_KNIFE_RENDER (52)
  private readonly postKnifeRender = (
    knife: EntityKnife,
    renderOffset: Vector,
  ) => {
    this.fire(knife, renderOffset);
  };

  protected override shouldFire = shouldFireKnife;

  constructor() {
    super();

    this.callbacksUsed = [
      // 52
      [ModCallback.POST_KNIFE_RENDER, this.postKnifeRender],
    ];
  }
}
