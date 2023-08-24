import type { PickupVariant } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePickup } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPickupSelectionFilter
  extends CustomCallback<ModCallbackCustom.POST_PICKUP_SELECTION_FILTER>
{
  constructor() {
    super();

    this.callbacksUsed = [
      // 37
      [ModCallback.POST_PICKUP_SELECTION, this.postPickupSelection],
    ];
  }

  protected override shouldFire = shouldFirePickup;

  // ModCallback.POST_PICKUP_SELECTION (37)
  private readonly postPickupSelection = (
    pickup: EntityPickup,
    variant: PickupVariant,
    subType: int,
  ): [PickupVariant, int] | undefined => this.fire(pickup, variant, subType);
}
