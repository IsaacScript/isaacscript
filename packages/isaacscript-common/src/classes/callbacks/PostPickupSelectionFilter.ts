import type { PickupVariant } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_PICKUP_SELECTION_FILTER;

export class PostPickupSelectionFilter extends CustomCallback<T> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 37
      [ModCallback.POST_PICKUP_SELECTION, this.postPickupSelection],
    ];
  }

  /**
   * We cannot use the `shouldFirePickup` helper function because in the case of non-collectibles,
   * `EntityPickup.Type` and `EntityPickup.Variant` and `EntityPickup.SubType` will all be set to 0
   * in this callback.
   */
  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_pickup, pickupVariant, subType] = fireArgs;
    const [callbackPickupVariant, callbackPickupSubType] = optionalArgs;

    return (
      (callbackPickupVariant === undefined
        || callbackPickupVariant === pickupVariant)
      && (callbackPickupSubType === undefined
        || callbackPickupSubType === subType)
    );
  };

  // ModCallback.POST_PICKUP_SELECTION (37)
  private readonly postPickupSelection = (
    pickup: EntityPickup,
    variant: PickupVariant,
    subType: int,
  ): [PickupVariant, int] | undefined => this.fire(pickup, variant, subType);
}
