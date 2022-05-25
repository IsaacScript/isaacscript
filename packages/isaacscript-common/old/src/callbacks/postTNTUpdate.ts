import { ModCallback } from "isaac-typescript-definitions";
import { getTNT } from "../functions/gridEntitySpecific";
import {
  postTNTUpdateFire,
  postTNTUpdateHasSubscriptions,
} from "./subscriptions/postTNTUpdate";

/** @internal */
export function postTNTUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postTNTUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const tnt of getTNT()) {
    postTNTUpdateFire(tnt);
  }
}
