import { ModCallback } from "isaac-typescript-definitions";
import { BOMB_EXPLODE_FRAME } from "../constants";
import {
  postBombExplodedFire,
  postBombExplodedHasSubscriptions,
} from "./subscriptions/postBoneExploded";

/** @internal */
export function postBombExplodedInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_BOMB_UPDATE, postBombUpdate); // 58
}

function hasSubscriptions() {
  return postBombExplodedHasSubscriptions();
}

// ModCallback.POST_BOMB_UPDATE (58)
function postBombUpdate(bomb: EntityBomb) {
  if (!hasSubscriptions()) {
    return;
  }

  if (bomb.FrameCount === BOMB_EXPLODE_FRAME) {
    postBombExplodedFire(bomb);
  }
}
