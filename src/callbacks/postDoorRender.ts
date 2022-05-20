import { ModCallback } from "isaac-typescript-definitions";
import { getDoors } from "../functions/doors";
import {
  postDoorRenderFire,
  postDoorRenderHasSubscriptions,
} from "./subscriptions/postDoorRender";

/** @internal */
export function postDoorRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postDoorRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const doors of getDoors()) {
    postDoorRenderFire(doors);
  }
}
