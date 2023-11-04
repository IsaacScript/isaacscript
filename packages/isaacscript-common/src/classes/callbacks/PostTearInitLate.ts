import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostTearInitLate extends CustomCallback<ModCallbackCustom.POST_TEAR_INIT_LATE> {
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
    const ptrHash = GetPtrHash(tear);
    if (!v.room.firedSet.has(ptrHash)) {
      v.room.firedSet.add(ptrHash);
      this.fire(tear);
    }
  };
}
