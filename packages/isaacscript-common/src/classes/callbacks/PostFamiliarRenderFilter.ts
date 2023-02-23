import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostFamiliarRenderFilter extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 25
      [ModCallback.POST_FAMILIAR_RENDER, this.postFamiliarRender],
    ];
  }

  protected override shouldFire = shouldFireFamiliar;

  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private postFamiliarRender = (
    familiar: EntityFamiliar,
    renderOffset: Vector,
  ) => {
    this.fire(familiar, renderOffset);
  };
}
