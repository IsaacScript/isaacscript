import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupInitLate extends CustomCallback<ModCallbackCustom.POST_PICKUP_INIT_LATE> {
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

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_UPDATE (35)
  private postPickupUpdate = (pickup: EntityPickup) => {
    const index = GetPtrHash(pickup);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(pickup);
    }
  };
}
