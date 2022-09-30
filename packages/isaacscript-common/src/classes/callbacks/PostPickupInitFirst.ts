import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getRoomVisitedCount } from "../../functions/roomData";
import { CustomCallbackPickup } from "./validation/CustomCallbackPickup";

export class PostPickupInitFirst extends CustomCallbackPickup<ModCallbackCustom2.POST_PICKUP_INIT_FIRST> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PICKUP_INIT, [this.postPickupInit]], // 34
    ];
  }

  // ModCallback.POST_PICKUP_INIT (34)
  private postPickupInit = (pickup: EntityPickup) => {
    const room = game.GetRoom();
    const roomFrameCount = room.GetFrameCount();
    const roomVisitedCount = getRoomVisitedCount();

    // The room visited count is not reset when re-entering a Treasure Room or Boss room in the
    // Ascent.
    if (roomFrameCount > 0 || roomVisitedCount === 0) {
      this.fire(pickup);
    }
  };
}
