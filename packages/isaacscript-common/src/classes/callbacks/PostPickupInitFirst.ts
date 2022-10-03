import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
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
      [ModCallback.POST_PICKUP_INIT, [this.postPickupInit]], // 34
    ];
  }

  protected override shouldFire = shouldFirePickup;

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
