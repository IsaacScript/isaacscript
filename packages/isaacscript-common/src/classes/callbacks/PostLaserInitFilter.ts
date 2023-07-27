import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireLaser } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostLaserInitFilter extends CustomCallback<ModCallbackCustom.POST_LASER_INIT_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 47
      [ModCallback.POST_LASER_INIT, this.postLaserInit],
    ];
  }

  protected override shouldFire = shouldFireLaser;

  // ModCallback.POST_LASER_INIT (47)
  private readonly postLaserInit = (laser: EntityLaser) => {
    this.fire(laser);
  };
}
