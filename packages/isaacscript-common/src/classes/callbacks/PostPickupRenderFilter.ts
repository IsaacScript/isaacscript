import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupRenderFilter extends CustomCallback<ModCallbackCustom.POST_PICKUP_RENDER_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 36
      [ModCallback.POST_PICKUP_RENDER, this.postPickupRender],
    ];
  }

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_RENDER (36)
  private readonly postPickupRender = (
    pickup: EntityPickup,
    renderOffset: Vector,
  ) => {
    this.fire(pickup, renderOffset);
  };
}
