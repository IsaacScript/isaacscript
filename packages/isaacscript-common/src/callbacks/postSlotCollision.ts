import { ModCallback } from "isaac-typescript-definitions";
import { isSlot } from "../functions/entityTypes";
import {
  postSlotCollisionFire,
  postSlotCollisionHasSubscriptions,
} from "./subscriptions/postSlotCollision";

export function postSlotCollisionInit(mod: Mod): void {
  mod.AddCallback(ModCallback.PRE_PLAYER_COLLISION, prePlayerCollision); // 33
}

function hasSubscriptions() {
  return postSlotCollisionHasSubscriptions();
}

// ModCallback.PRE_PLAYER_COLLISION (33)
function prePlayerCollision(
  player: EntityPlayer,
  collider: Entity,
): boolean | undefined {
  if (!hasSubscriptions()) {
    return;
  }

  if (isSlot(collider)) {
    postSlotCollisionFire(collider, player);
  }

  return undefined;
}
