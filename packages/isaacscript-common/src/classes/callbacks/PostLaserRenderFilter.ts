import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireLaser } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostLaserRenderFilter extends CustomCallback<ModCallbackCustom.POST_LASER_RENDER_FILTER> {
  // ModCallback.POST_LASER_RENDER (49)
  private readonly postLaserRender = (
    laser: EntityLaser,
    renderOffset: Vector,
  ) => {
    this.fire(laser, renderOffset);
  };

  protected override shouldFire = shouldFireLaser;

  constructor() {
    super();

    this.callbacksUsed = [
      // 49
      [ModCallback.POST_LASER_RENDER, this.postLaserRender],
    ];
  }
}
