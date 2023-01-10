import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getClosestPlayer } from "../../functions/players";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupCollect extends CustomCallback<ModCallbackCustom.POST_PICKUP_COLLECT> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 36
      [ModCallback.POST_PICKUP_RENDER, this.postPickupRender],
    ];
  }

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_RENDER (36)
  private postPickupRender = (pickup: EntityPickup) => {
    const sprite = pickup.GetSprite();
    const animation = sprite.GetAnimation();
    if (animation !== "Collect") {
      return;
    }

    const index = GetPtrHash(pickup);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);

      const player = getClosestPlayer(pickup.Position);
      this.fire(pickup, player);
    }
  };
}
