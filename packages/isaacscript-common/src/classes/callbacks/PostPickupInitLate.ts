import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostPickupInitLate extends CustomCallback<ModCallbackCustom.POST_PICKUP_INIT_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 35
      [ModCallback.POST_PICKUP_UPDATE, this.postPickupUpdate],
    ];
  }

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_UPDATE (35)
  private readonly postPickupUpdate = (pickup: EntityPickup) => {
    const index = GetPtrHash(pickup);
    if (!v.room.firedSet.has(index)) {
      v.room.firedSet.add(index);
      this.fire(pickup);
    }
  };
}
