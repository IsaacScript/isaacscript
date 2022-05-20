import { ModCallback } from "isaac-typescript-definitions";
import { getPoops } from "../functions/gridEntitySpecific";
import {
  postPoopRenderFire,
  postPoopRenderHasSubscriptions,
} from "./subscriptions/postPoopRender";

/** @internal */
export function postPoopRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postPoopRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const poop of getPoops()) {
    postPoopRenderFire(poop);
  }
}
