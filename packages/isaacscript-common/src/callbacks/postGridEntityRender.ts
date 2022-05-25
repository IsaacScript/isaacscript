import { ModCallback } from "isaac-typescript-definitions";
import { getGridEntities } from "../functions/gridEntity";
import {
  postGridEntityRenderFire,
  postGridEntityRenderHasSubscriptions,
} from "./subscriptions/postGridEntityRender";

/** @internal */
export function postGridEntityRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postGridEntityRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const gridEntity of getGridEntities()) {
    postGridEntityRenderFire(gridEntity);
  }
}
