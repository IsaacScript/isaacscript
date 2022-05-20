import { ModCallback } from "isaac-typescript-definitions";
import { getTNT } from "../functions/gridEntitySpecific";
import {
  postTNTRenderFire,
  postTNTRenderHasSubscriptions,
} from "./subscriptions/postTNTRender";

/** @internal */
export function postTNTRenderInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return postTNTRenderHasSubscriptions();
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const tnt of getTNT()) {
    postTNTRenderFire(tnt);
  }
}
