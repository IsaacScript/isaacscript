import {
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreGetPedestal extends CustomCallback<ModCallbackCustom.PRE_GET_PEDESTAL> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 38
      [
        ModCallback.PRE_PICKUP_COLLISION,
        this.prePickupCollision,
        [PickupVariant.COLLECTIBLE],
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallback.PRE_PICKUP_COLLISION (35)
  private readonly prePickupCollision = (
    pickup: EntityPickup,
    collider: Entity,
    _low: boolean,
  ): boolean | undefined => {
    const collectible = pickup as EntityPickupCollectible;

    if (collectible.SubType === CollectibleType.NULL) {
      return undefined;
    }

    const player = collider.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    const numCoins = player.GetNumCoins();
    if (collectible.Price > numCoins) {
      return undefined;
    }

    // Collectibles have a special variable to prevent them from being picked up for a certain time.
    // Players have special variable to prevent them from picking up a collectible for a certain
    // time.
    if (collectible.Wait > 0 || player.ItemHoldCooldown > 0) {
      return undefined;
    }

    if (player.IsHoldingItem()) {
      return undefined;
    }

    return this.fire(player, collectible);
  };
}
