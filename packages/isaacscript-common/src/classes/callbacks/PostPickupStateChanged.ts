import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { DefaultMap } from "../DefaultMap";
import { CustomCallbackPickup } from "./validation/CustomCallbackPickup";

export class PostPickupStateChanged extends CustomCallbackPickup<ModCallbackCustom2.POST_PICKUP_STATE_CHANGED> {
  public override v = {
    run: {
      stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
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
    const ptrHash = GetPtrHash(pickup);
    const previousState = this.v.run.stateMap.getAndSetDefault(
      ptrHash,
      pickup.State,
    );
    const currentState = pickup.State;
    this.v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(pickup, previousState, currentState);
    }
  };
}
