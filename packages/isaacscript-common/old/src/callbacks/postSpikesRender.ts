import { ModCallback } from "isaac-typescript-definitions";
import { getSpikes } from "../functions/gridEntitySpecific";
import {
  postSpikesRenderFire,
  postSpikesRenderHasSubscriptions,
} from "./subscriptions/postSpikesRender";

/** @internal */
export function postSpikesRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postSpikesRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const spikes of getSpikes()) {
    postSpikesRenderFire(spikes);
  }
}
