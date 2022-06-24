import { ModCallback } from "isaac-typescript-definitions";
import { BOMB_EXPLODE_FRAME } from "../constants";
import {
  postBombDetonatedFire,
  postBombDetonatedHasSubscriptions,
} from "./subscriptions/postBoneDetonated";

/** @internal */
export function postBombDetonatedInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_BOMB_UPDATE, postBombUpdate); // 58
}

function hasSubscriptions() {
  return postBombDetonatedHasSubscriptions();
}

// ModCallback.POST_BOMB_UPDATE (58)
function postBombUpdate(bomb: EntityBomb) {
  if (!hasSubscriptions()) {
    return;
  }

  if (bomb.FrameCount === BOMB_EXPLODE_FRAME) {
    postBombDetonatedFire(bomb);
  }
}
