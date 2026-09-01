import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isSlot } from "../../functions/entityTypes";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostSlotCollision extends CustomCallback<ModCallbackCustom.POST_SLOT_COLLISION> {
  // ModCallback.PRE_PLAYER_COLLISION (33)
  private readonly prePlayerCollision = (
    player: EntityPlayer,
    collider: Entity,
  ): boolean | undefined => {
    if (isSlot(collider)) {
      this.fire(collider, player);
    }

    return undefined;
  };

  protected override shouldFire = shouldFireSlot;

  constructor() {
    super();

    this.callbacksUsed = [
      // 33
      [ModCallback.PRE_PLAYER_COLLISION, this.prePlayerCollision],
    ];
  }
}
