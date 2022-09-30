import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackPickup } from "./validation/CustomCallbackPickup";

export class PostPickupInitLate extends CustomCallbackPickup<ModCallbackCustom2.POST_PICKUP_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PICKUP_UPDATE, [this.postPickupUpdate]], // 35
    ];
  }

  // ModCallback.POST_PICKUP_UPDATE (35)
  private postPickupUpdate = (pickup: EntityPickup) => {
    const index = GetPtrHash(pickup);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(pickup);
    }
  };
}
