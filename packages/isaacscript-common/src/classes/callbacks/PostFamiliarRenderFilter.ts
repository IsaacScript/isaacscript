import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostFamiliarRenderFilter extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_RENDER_FILTER> {
  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private readonly postFamiliarRender = (
    familiar: EntityFamiliar,
    renderOffset: Vector,
  ) => {
    this.fire(familiar, renderOffset);
  };

  protected override shouldFire = shouldFireFamiliar;

  constructor() {
    super();

    this.callbacksUsed = [
      // 25
      [ModCallback.POST_FAMILIAR_RENDER, this.postFamiliarRender],
    ];
  }
}
