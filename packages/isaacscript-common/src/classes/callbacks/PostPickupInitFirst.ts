import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isPastRoomFrame } from "../../functions/frames";
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
    const room = game.GetRoom();
    const isFirstVisit = room.IsFirstVisit();

    // The room visited count is not reset when re-entering a Treasure Room or Boss room in the
    // Ascent.
    if (isPastRoomFrame(0) || isFirstVisit) {
      this.fire(pickup);
    }
  };
}
