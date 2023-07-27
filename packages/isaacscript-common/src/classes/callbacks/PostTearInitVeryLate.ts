import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostTearInitVeryLate extends CustomCallback<ModCallbackCustom.POST_TEAR_INIT_VERY_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 40
      [ModCallback.POST_TEAR_UPDATE, this.postTearUpdate],
    ];
  }

  protected override shouldFire = shouldFireTear;

  // ModCallback.POST_TEAR_UPDATE (40)
  private readonly postTearUpdate = (tear: EntityTear): void => {
    // This callback fires on frame 1.
    if (tear.FrameCount === 0) {
      return;
    }

    const index = GetPtrHash(tear);
    if (!v.room.firedSet.has(index)) {
      v.room.firedSet.add(index);
      this.fire(tear);
    }
  };
}
