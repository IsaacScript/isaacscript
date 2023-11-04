import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireLaser } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostLaserUpdateFilter extends CustomCallback<ModCallbackCustom.POST_LASER_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 48
      [ModCallback.POST_LASER_UPDATE, this.postLaserUpdate],
    ];
  }

  protected override shouldFire = shouldFireLaser;

  // ModCallback.POST_LASER_UPDATE (48)
  private readonly postLaserUpdate = (laser: EntityLaser) => {
    this.fire(laser);
  };
}
