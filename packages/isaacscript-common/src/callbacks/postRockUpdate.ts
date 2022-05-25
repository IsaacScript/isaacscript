import { ModCallback } from "isaac-typescript-definitions";
import { getRocks } from "../functions/gridEntitySpecific";
import {
  postRockUpdateFire,
  postRockUpdateHasSubscriptions,
} from "./subscriptions/postRockUpdate";

/** @internal */
export function postRockUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
}

function hasSubscriptions() {
  return postRockUpdateHasSubscriptions();
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const rock of getRocks()) {
    postRockUpdateFire(rock);
  }
}
