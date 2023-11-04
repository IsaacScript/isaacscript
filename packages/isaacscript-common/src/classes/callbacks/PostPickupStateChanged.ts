import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
  },
};

export class PostPickupStateChanged extends CustomCallback<ModCallbackCustom.POST_PICKUP_STATE_CHANGED> {
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
    const ptrHash = GetPtrHash(pickup);
    const previousState = v.run.stateMap.getAndSetDefault(
      ptrHash,
      pickup.State,
    );
    const currentState = pickup.State;
    v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(pickup, previousState, currentState);
    }
  };
}
