import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTearRenderFilter extends CustomCallback<ModCallbackCustom.POST_TEAR_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 41
      [ModCallback.POST_TEAR_RENDER, this.postTearRender],
    ];
  }

  protected override shouldFire = shouldFireTear;

  // ModCallback.POST_TEAR_RENDER (41)
  private readonly postTearRender = (
    tear: EntityTear,
    renderOffset: Vector,
  ) => {
    this.fire(tear, renderOffset);
  };
}
