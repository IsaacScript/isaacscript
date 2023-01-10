import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireLaser } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostLaserInitLate extends CustomCallback<ModCallbackCustom.POST_LASER_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 48
      [ModCallback.POST_LASER_UPDATE, this.postLaserUpdate],
    ];
  }

  protected override shouldFire = shouldFireLaser;

  // ModCallback.POST_LASER_UPDATE (48)
  private postLaserUpdate = (laser: EntityLaser) => {
    const index = GetPtrHash(laser);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(laser);
    }
  };
}
