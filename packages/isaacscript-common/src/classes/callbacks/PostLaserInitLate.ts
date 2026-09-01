import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireLaser } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostLaserInitLate extends CustomCallback<ModCallbackCustom.POST_LASER_INIT_LATE> {
  // ModCallback.POST_LASER_UPDATE (48)
  private readonly postLaserUpdate = (laser: EntityLaser) => {
    const index = GetPtrHash(laser);
    if (!v.room.firedSet.has(index)) {
      v.room.firedSet.add(index);
      this.fire(laser);
    }
  };

  public override v = v;

  protected override shouldFire = shouldFireLaser;

  constructor() {
    super();

    this.callbacksUsed = [
      // 48
      [ModCallback.POST_LASER_UPDATE, this.postLaserUpdate],
    ];
  }
}
