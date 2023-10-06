import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isAfterRoomFrame } from "../../functions/frames";
import { getRoomVisitedCount } from "../../functions/roomData";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupInitFirst extends CustomCallback<ModCallbackCustom.POST_PICKUP_INIT_FIRST> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 34
      [ModCallback.POST_PICKUP_INIT, this.postPickupInit],
    ];
  }

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_INIT (34)
  private readonly postPickupInit = (pickup: EntityPickup) => {
    const roomVisitedCount = getRoomVisitedCount();

    // The room visited count is not reset when re-entering a Treasure Room or Boss room in the
    // Ascent.
    if (isAfterRoomFrame(0) || roomVisitedCount === 0) {
      this.fire(pickup);
    }
  };
}
