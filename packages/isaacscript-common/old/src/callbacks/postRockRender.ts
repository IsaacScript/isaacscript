import { ModCallback } from "isaac-typescript-definitions";
import { getRocks } from "../functions/gridEntitySpecific";
import {
  postRockRenderFire,
  postRockRenderHasSubscriptions,
} from "./subscriptions/postRockRender";

/** @internal */
export function postRockRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postRockRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const rock of getRocks()) {
    postRockRenderFire(rock);
  }
}
