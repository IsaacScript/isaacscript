import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { isSlot } from "../../functions/entityTypes";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotCollision extends CustomCallback<ModCallbackCustom2.POST_SLOT_COLLISION> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.PRE_PLAYER_COLLISION, [this.prePlayerCollision]], // 33
    ];
  }

  protected override shouldFire = shouldFireSlot;

  // ModCallback.PRE_PLAYER_COLLISION (33)
  private prePlayerCollision = (
    player: EntityPlayer,
    collider: Entity,
  ): boolean | undefined => {
    if (isSlot(collider)) {
      this.fire(collider, player);
    }

    return undefined;
  };
}
