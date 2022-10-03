import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupStateChanged extends CustomCallback<ModCallbackCustom.POST_PICKUP_STATE_CHANGED> {
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

  protected override shouldFire = shouldFirePickup;

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
